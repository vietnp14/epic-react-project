import {formatDate} from '../misc';

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date('2021-10-25'))).toEqual('Oct 21');
});
