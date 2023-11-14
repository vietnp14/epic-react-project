const localStorageKey = '__auth_provider_token__';

const getToken = async () => window.localStorage.getItem(localStorageKey);

function handleUserResponse({user}) {
  window.localStorage.setItem(localStorageKey, user.token);
  return user;
}

async function removeStorageKey() {
  window.localStorage.removeItem(localStorageKey);
}

export {
  removeStorageKey,
  getToken,
  localStorageKey,
  handleUserResponse,
};
