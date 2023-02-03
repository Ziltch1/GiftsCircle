const ErrorHandler = (err) => {
  console.log(err);
  if (err.code === "ERR_NETWORK") {
    return {
      type: "Error",
      message: "You are not connected to the internet, refresh and try again",
    };
  }
  if (err.code === "ERR_BAD_REQUEST") {
    if (err.response.data) {
      return {
        type: "Error",
        message: err.response.data.detail
          ? err.response.data.detail
          : "Something went wrong",
      };
    } else {
      return {
        type: "Error",
        message: "Something went wrong",
      };
    }
  }
  if (err.code === "ERR_BAD_RESPONSE") {
    if (err.response.data) {
      return {
        type: "Error",
        message: err.response.data.detail
          ? err.response.data.detail
          : "Something went wrong",
      };
    } else {
      return {
        type: "Error",
        message: "Something went wrong",
      };
    }
  }
  return {
    type: "Error",
    message: "Something went wrong",
  };
};

export default ErrorHandler;
