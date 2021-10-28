import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

const axiosConfig = {
  baseURL: apiURL,
};

const axiosClient = axios.create(axiosConfig);

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await auth.getToken();
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
    return { ...config, headers: { ...config.headers, ...headers } };
  },
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      queryCache.clear();
      await auth.logout();
      // refresh the page for them
      window.location.assign(window.location);
      return Promise.reject({ message: 'Please re-authenticate.' });
    }

    if (response && response.statusText === 'OK' && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      queryCache.clear()
      await auth.logout()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client, axiosClient }
