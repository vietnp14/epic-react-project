import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'

import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'

const authenticateApp = async () => {
  const user = buildUser({token: 'viet'});
  await usersDB.create(user)
  const authUser = await usersDB.authenticate(user)

  window.localStorage.setItem(auth.localStorageKey, authUser.token);
}

const renderBookScreen = async () => {
  const book = await booksDB.create(buildBook());
  window.history.pushState({}, 'Test page', `book/${book.id}`);
  render(<App />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

  return book;
}

const waitForLoading = async () => {
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);
};

export { authenticateApp, renderBookScreen, waitForLoading };