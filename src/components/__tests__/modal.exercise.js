import React from 'react';
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {Modal, ModalContents, ModalOpenButton} from '../modal'

test('can be opened and closed', () => {
  const label = 'Modal Label';
  const title = 'Modal Title';
  const content = 'Modal Contents';

  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        <span>{content}</span>
      </ModalContents>
    </Modal>
  );

  userEvent.click(screen.getByRole('button', { name: 'Open' }));

  const modal = screen.getByRole('dialog');
  const inModal = within(modal);

  expect(modal.getAttribute('aria-label')).toBe(label);
  expect(inModal.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(inModal.getByText(content)).toBeInTheDocument();

  userEvent.click(inModal.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
