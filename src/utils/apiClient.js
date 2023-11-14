import axios from 'axios';
import * as storage from 'utils/storage';
const apiURL = process.env.REACT_APP_API_URL;

const axiosConfig = {
  baseURL: apiURL,
};

const axiosClient = axios.create(axiosConfig);

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
    };
    return { ...config, headers: { ...config.headers, ...headers } };
  },
);

axiosClient.interceptors.response.use(
  async (response) => {
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
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client, axiosClient }
