const baseURL = process.env.REACT_APP_API_URL;

const client = (endpoint, customConfig = {}) => {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  return window.fetch(`${baseURL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    });
};

export { client };
