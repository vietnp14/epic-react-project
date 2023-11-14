import { handleUserResponse, removeStorageKey } from './storage';

const authURL = process.env.REACT_APP_AUTH_URL;

const login = ({username, password}) => client('login', {username, password}).then(handleUserResponse);

const register = ({username, password}) => client('register', {username, password}).then(handleUserResponse);

const logout = () => {
  removeStorageKey();
  window.location.assign(window.location.href);
};

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  };

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export {
  login,
  register,
  logout,
};
