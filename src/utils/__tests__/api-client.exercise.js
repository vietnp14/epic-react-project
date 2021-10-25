import {server, rest} from 'test/server'
import {client} from '../api-client'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'

const apiURL = process.env.REACT_APP_API_URL;
const getEndpoint = endpoint => `${apiURL}/${endpoint}`;
const endpoint = 'test-endpoint';
const testEndpoint = getEndpoint(endpoint);
jest.mock('auth-provider');
jest.mock('react-query');

// beforeAll(() => {
//   server.listen();
// });

// afterAll(() => {
//   server.close();
// });

// afterEach(() => {
//   server.resetHandlers();
// });

test('makes GET request with given endpoint', async () => {
  const mockResult = {
    mockValue: 'VALUE',
  }

  server.use(
    rest.get(testEndpoint, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )

  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('makes Authorization request with a provided token', async () => {
  const fakeToken = 'viet'
  let request

  server.use(
    rest.get(testEndpoint, async (req, res, ctx) => {
      request = req
      return res(ctx.json({}))
    }),
  )

  await client(endpoint, {token: fakeToken})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`)
})

test('makes request with given config', async () => {
  const fakeToken = 'viet'
  const authorization = `Bearer ${fakeToken}`
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
  }
  let request

  server.use(
    rest.post(testEndpoint, async (req, res, ctx) => {
      request = req
      return res(ctx.json({}))
    }),
  )

  await client(endpoint, config)

  expect(request.headers.get('Authorization')).toBe(authorization)
  expect(request.headers.get('Content-Type')).toBe('application/json')
})

test('makes POST request with given data', async () => {
  const data = {
    bookName: 'Harry Poster',
    bookId: '123456789',
  }
  let request

  server.use(
    rest.post(testEndpoint, async (req, res, ctx) => {
      request = req
      return res(ctx.json({}))
    }),
  )

  await client(endpoint, {data})

  expect(request.body).toEqual(data)
})

test('makes Unauthorization request', async () => {
  server.use(
    rest.get(testEndpoint, async (_, res, ctx) => {
      return res(ctx.status(401), ctx.json({}))
    }),
  )

  const response = await client(endpoint).catch(err => err);
  expect(response.message).toMatchInlineSnapshot(`"Please re-authenticate."`);

  expect(queryCache.clear).toHaveBeenCalledTimes(1);
  expect(auth.logout).toHaveBeenCalledTimes(1);
});

test('makes BAD request', async () => {
  const message = 'BAD Request';

  server.use(
    rest.get(testEndpoint, async (_, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message }))
    }),
  )

  const response = await client(endpoint).catch(err => err);
  expect(response.message).toBe(message);
});
