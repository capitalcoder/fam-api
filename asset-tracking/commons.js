// Response Template
export const SuccessResponse = (code, message, data) => {
  return {
    response_code: code,
    response_message: message,
    data: data,
  };
};

// Error Template
export const ErrorResponse = (code, message, err) => {
  return {
    response_code: code,
    response_message: message,
    error: err,
  };
};
