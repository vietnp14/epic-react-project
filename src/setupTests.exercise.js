import '@testing-library/jest-dom'
import {queryCache} from 'react-query'
import {server} from 'test/server'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import * as auth from 'auth-provider'

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());

afterAll(async () => {
  queryCache.clear();
  server.close();

  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ]);
});

afterEach(() => server.resetHandlers());
