const ErrorHandler = err => {
  console.log(err);
  if (err.code === 'ERR_NETWORK') {
    return {
      type: 'Error',
      message: 'You are not connected to the internet, refresh and try again',
      title: 'Error',
    };
  }
  if (err.code === 'ERR_BAD_REQUEST') {
    if (err.response.data) {

      return {
        type: 'Error',
        message: err.response.data.message
          ? err.response.data.message
          : 'Something went wrong',
        title: 'Error',
      };
    } else {
      return {
        type: 'Error',
        message: 'Something went wrong',
        title: 'Error',
      };
    }
  }
  if (err.code === 'ERR_BAD_RESPONSE') {
    if (err.response.data) {
      return {
        type: 'Error',
        message: err.response.data.message
          ? err.response.data.message
          : 'Something went wrong',
        title: 'Error',
      };
    } else {
      return {
        type: 'Error',
        message: 'Something went wrong',
        title: 'Error',
      };
    }
  }
  return {
    type: 'Error',
    message: 'Something went wrong',
    title: 'Error',
  };
};

export default ErrorHandler;
