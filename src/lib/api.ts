const checkStatus = async (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    window.location.reload();
  }
  let error: any = '';

  try {
    error = await response.text();
    error = JSON.parse(error);
    error.status = response.status;
  } catch (e) {
    console.log(e);
  }

  throw error;
};

export const api = async (url: any, data?: any, notification?: any, options?: any) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('csi-token')}`,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    },
    method: 'GET',
    ...options,
  };

  if (['PATCH', 'POST', 'PUT', 'DELETE'].includes(requestOptions.method)) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, requestOptions)
    .then(checkStatus)
    .then((r) => r.json())
    .then((response) => response);

  return response;
};
