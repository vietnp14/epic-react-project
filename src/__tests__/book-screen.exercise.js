// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import { userEvent } from 'test/app-test-utils.extra-4'

afterAll(async () => {
  queryCache.clear();
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ])
});

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

test('renders all the book information', async () => {
  await authenticateApp();
  const book = await renderBookScreen();

  console.log('Screen : ', screen.debug());
  
  // Assert book info
  expect(screen.getByRole('heading', { name: book.title }));
  expect(screen.getByText(book.author)).toBeInTheDocument();
  expect(screen.getByText(book.publisher)).toBeInTheDocument();
  expect(screen.getByText(book.synopsis)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', book.coverImgUrl);

  // Assert screen button
  expect(screen.getByRole('button', { name: /add to list/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /remove from list/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /mark as read/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /mark as unread/i })).not.toBeInTheDocument();

  // Assert note textarea
  expect(screen.queryByRole('textbox', { name: /notes/i })).not.toBeInTheDocument();
  
  // Assert stars
  expect(screen.queryByRole('radio', { name: /star/i })).not.toBeInTheDocument();
})

test('add a book to reading list', async () => {
  await authenticateApp();
  await renderBookScreen();

  const addToListButton = screen.getByRole('button', { name: /add to list/i });
  userEvent.click(addToListButton);
  expect(addToListButton).toBeDisabled();

  await waitForLoading();

  expect(screen.getByRole('button', { name: /remove from list/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /mark as read/i })).toBeInTheDocument();

  const removeFromList = screen.getByRole('button', { name: /remove from list/i });
  userEvent.click(removeFromList);
  expect(removeFromList).toBeDisabled();
  await waitForLoading();
  expect(addToListButton).toBeEnabled();
});
