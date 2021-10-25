import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync} from '../hooks'

const deferred = () => {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return {promise, resolve, reject}
}

const defaultStatus = {
  status: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
}

test('calling run with a promise which resolves', async () => {
  const {promise, resolve} = deferred()
  const {result} = renderHook(() => useAsync())

  expect(result.current).toEqual(defaultStatus)

  const run = result.current.run

  act(() => {
    run(promise)
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    status: 'pending',
    isIdle: false,
    isLoading: true,
  })

  const resoledValue = 'Resolved'

  await act(async () => {
    resolve(resoledValue)
    await promise
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    status: 'resolved',
    data: resoledValue,
    isSuccess: true,
    isLoading: false,
    isIdle: false,
  })

  const reset = result.current.reset
  act(() => {
    reset()
  })

  expect(result.current).toEqual(defaultStatus)
})

// 🐨 this will be very similar to the previous test, except you'll reject the
// promise instead and assert on the error state.
// 💰 to avoid the promise actually failing your test, you can catch
//    the promise returned from `run` with `.catch(() => {})`
test('calling run with a promise which rejects', async () => {
  const {promise, reject} = deferred()
  const {result} = renderHook(() => useAsync())

  expect(result.current).toEqual(defaultStatus)

  const run = result.current.run
  let rejectFn
  act(() => {
    rejectFn = run(promise)
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    status: 'pending',
    isIdle: false,
    isLoading: true,
  })

  const rejectedValue = 'Rejected'

  await act(async () => {
    reject(rejectedValue)
    await rejectFn.catch(() => {})
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    error: rejectedValue,
    status: 'rejected',
    isIdle: false,
    isError: true,
  })
})

test('can specify an initial state', async () => {
  const initialState = {
    ...defaultStatus,
    data: {
      bookName: 'Harry Potter',
      bookId: '123456789',
    },
  }

  const {result} = renderHook(() => useAsync(initialState))

  expect(result.current).toEqual(initialState)
})

test('can set the data', async () => {
  const {result} = renderHook(() => useAsync(defaultStatus))

  expect(result.current).toEqual(defaultStatus)

  const mockData = {
    bookName: 'Homo Saphiens',
    bookId: '12345',
  }

  act(() => {
    result.current.setData(mockData)
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    status: 'resolved',
    data: mockData,
    isSuccess: true,
    isIdle: false,
  })
})
// 💰 result.current.setData('whatever you want')

test('can set the error', async () => {
  const {result} = renderHook(() => useAsync(defaultStatus))

  expect(result.current).toEqual(defaultStatus)

  const mockError = {
    bookName: 'Homo Saphiens',
    bookId: '12345',
  }

  act(() => {
    result.current.setError(mockError)
  })

  expect(result.current).toEqual({
    ...defaultStatus,
    status: 'rejected',
    error: mockError,
    isError: true,
    isIdle: false,
  })
})
// 💰 result.current.setError('whatever you want')

// 💰 const {result, unmount} = renderHook(...)
// 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)
test('No state updates happen if the component is unmounted while pending', async () => {
  const {result, unmount} = renderHook(() => useAsync(defaultStatus));

  expect(result.current).toEqual(defaultStatus);

  const mockData = {
    bookName: 'Homo Saphiens',
    bookId: '12345',
  };

  unmount();
  act(() => {
    result.current.setData(mockData);
  });

  const errLogFn = jest.fn(console.err);
  expect(errLogFn).not.toBeCalled();
});

test('calling "run" without a promise results in an early error', async () => {
  const {result} = renderHook(() => useAsync(defaultStatus));

  const run = result.current.run;
  expect(() => run()).toThrowErrorMatchingInlineSnapshot(
    `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
  );
});
