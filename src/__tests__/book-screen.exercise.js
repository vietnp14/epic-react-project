// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

afterAll(async () => {
  queryCache.clear();
  await auth.logout();
});

test('renders all the book information', async () => {
  const user = buildUser({token: 'viet'});
  window.localStorage.setItem(auth.localStorageKey, user.token);
  const book = buildBook();

  window.history.pushState({}, 'Test page', `book/${book.id}`)
  window.fetch = (url, config = {}) => {
    let responseData;
    if (url.endsWith('/bootstrap')) {
      responseData = { user, listItems: [] };
    }
    if(url.endsWith('/list-items')) {
      responseData = { listItems: [] };
    }

    if(url.endsWith(`/books/${book.id}`)) {
      responseData = { book };
    }

    return Promise.resolve({ ok: true, json: async () => ({ ...responseData })});
  };

  render(<App />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

  console.log('Screen : ', screen.debug());
  
  // Assert book info
  expect(screen.getByRole('heading', { name: book.title }));
  expect(screen.getByText(book.author)).toBeInTheDocument();
  expect(screen.getByText(book.publisher)).toBeInTheDocument();
  expect(screen.getByText(book.synopsis)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', book.coverImgUrl);


  // Assert screen button
  expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /remove from list/i})).not.toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /mark as read/i})).not.toBeInTheDocument();
  expect(screen.queryByRole('button', {name: /mark as unread/i})).not.toBeInTheDocument();

  // Assert note textarea
  expect(screen.queryByRole('textbox', {name: /notes/i})).not.toBeInTheDocument();
  
  // Assert stars
  expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument();
})

// 🐨 assert the book's info is in the document
