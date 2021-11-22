/** @jsx jsx */
import {jsx} from '@emotion/core'

import { useCallback, cloneElement, useState } from 'react'
import {Input, Button, Spinner, FormGroup} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/Modal'
import Logo from './components/Logo'
import { login, register } from 'store/actions'
import { useDispatch } from 'react-redux'
import { notification } from './utils/notification'
import { AUTHENTICATION_ACTIONS } from './store/actions/types.action'
import { loadBootstrapData } from 'store/actions/async.action'

function LoginForm({ onSubmit, submitButton, isLoading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
    username: username.value,
    password: password.value,
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
    </form>
  )
}

function UnauthenticatedApp() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = useCallback(async (formValue) => {
    setIsLoading(true);
    const { data, error } = await dispatch(login(formValue));
    setIsLoading(false);

    if (!!error) {
      notification.error('Authentication Failure', error.message);
    } else {
      await dispatch(loadBootstrapData());
      notification.success(AUTHENTICATION_ACTIONS.LOGIN_SUCCESS, `Welcome ${data.username}. Have a nice day!`);
    }
  }, [dispatch]);

  const handleLoginRegister = useCallback(async (formValue) => {
    const { data, error } = await dispatch(register(formValue));
    setIsLoading(false);

    if (!!error) {
      notification.error('Authentication Failure', error.message);
    } else {
      await dispatch(loadBootstrapData());
      notification.success(AUTHENTICATION_ACTIONS.REGISTER_SUCCESS, `Welcome ${data.username}. Have a nice day!`);
    }
  }, [dispatch]);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              isLoading={isLoading}
              onSubmit={handleLoginSubmit}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              isLoading={isLoading}
              onSubmit={handleLoginRegister}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
