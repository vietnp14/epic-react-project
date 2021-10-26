// 🐨 here are the things you're going to need for this test:
import React from 'react';
import { authenticateApp, renderBookScreen, waitForLoading } from 'test/app-test-utils'
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
  loginAsUser,
} from 'test/app-test-utils.extra-4'
import {buildBook, buildListItem} from 'test/generate'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import { App } from 'app'
import { formatDate } from 'utils/misc'
import faker from 'faker'
import { screen as lbScreen } from '@testing-library/react'

test('renders all the book information', async () => {
  await authenticateApp();
  const book = await renderBookScreen();
  
  // Assert book info
  expect(lbScreen.getByRole('heading', { name: book.title }));
  expect(lbScreen.getByText(book.author)).toBeInTheDocument();
  expect(lbScreen.getByText(book.publisher)).toBeInTheDocument();
  expect(lbScreen.getByText(book.synopsis)).toBeInTheDocument();
  expect(lbScreen.getByRole('img')).toHaveAttribute('src', book.coverImgUrl);

  // Assert screen button
  expect(lbScreen.getByRole('button', { name: /add to list/i })).toBeInTheDocument();
  expect(lbScreen.queryByRole('button', { name: /remove from list/i })).not.toBeInTheDocument();
  expect(lbScreen.queryByRole('button', { name: /mark as read/i })).not.toBeInTheDocument();
  expect(lbScreen.queryByRole('button', { name: /mark as unread/i })).not.toBeInTheDocument();

  // Assert note textarea
  expect(lbScreen.queryByRole('textbox', { name: /notes/i })).not.toBeInTheDocument();
  
  // Assert stars
  expect(lbScreen.queryByRole('radio', { name: /star/i })).not.toBeInTheDocument();
})

test('add a book to reading list', async () => {
  await authenticateApp();
  await renderBookScreen();

  const addToListButton = lbScreen.getByRole('button', { name: /add to list/i });
  userEvent.click(addToListButton);
  expect(addToListButton).toBeDisabled();

  await waitForLoading();

  expect(lbScreen.getByRole('button', { name: /remove from list/i })).toBeInTheDocument();
  expect(lbScreen.getByRole('button', { name: /mark as read/i })).toBeInTheDocument();

  const removeFromList = lbScreen.getByRole('button', { name: /remove from list/i });
  userEvent.click(removeFromList);
  expect(removeFromList).toBeDisabled();
  await waitForLoading();
  expect(addToListButton).toBeEnabled();
});

test('can remove a list item for the book', async () => {
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  await listItemsDB.create(buildListItem({ owner: user, book }));
  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

  const removeFromListButton = screen.getByRole('button', { name: /remove from list/i });
  userEvent.click(removeFromListButton);
  expect(removeFromListButton).toBeDisabled();
  await waitForLoadingToFinish();

  expect(screen.getByRole('button', { name: /add to list/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /remove from list/i })).not.toBeInTheDocument();
})

test('can mark a list item as read', async () => {
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  const listItem = await listItemsDB.create(
    buildListItem({
      owner: user,
      book,
      finishDate: null,
    })
  );

  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

  const markAsReadButton = screen.getByRole('button', { name: /mark as read/i });
  userEvent.click(markAsReadButton);
  expect(markAsReadButton).toBeDisabled();
  await waitForLoadingToFinish();

  expect(screen.getByRole('button', { name: /mark as unread/i })).toBeInTheDocument();
  expect(screen.getAllByRole('radio', { name: /star/i })).toHaveLength(5);

  const startAndFinishDateNode = screen.getByLabelText(/start and finish date/i);
  expect(startAndFinishDateNode).toHaveTextContent(`${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`);
  expect(screen.queryByRole('button', { name: /mark as read/i })).not.toBeInTheDocument();
})

test('can edit a note', async () => {
  jest.useFakeTimers();
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  const listItem = await listItemsDB.create(buildListItem({owner: user, book}));
  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

  const newNotes = faker.lorem.words();
  const notesTextarea = screen.getByRole('textbox', { name: /notes/i });

  userEvent.clear(notesTextarea);
  userEvent.type(notesTextarea, newNotes);

  await screen.findByLabelText(/loading/i);
  await waitForLoadingToFinish();

  expect(notesTextarea).toHaveValue(newNotes);
  expect(await listItemsDB.read(listItem.id)).toMatchObject({ notes: newNotes });
})
