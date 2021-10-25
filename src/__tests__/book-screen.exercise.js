// 🐨 here are the things you're going to need for this test:
import {screen} from '@testing-library/react'
import { userEvent } from 'test/app-test-utils'
import { authenticateApp, renderBookScreen, waitForLoading } from 'test/app-test-utils'

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
