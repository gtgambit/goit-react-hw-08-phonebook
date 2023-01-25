import React from 'react';

const ErrorIndicator = ({ error = '' }) => {
  return (
    <p>
      Біда, щось пішло не так! <b>{error}</b>
    </p>
  );
};

export default ErrorIndicator;
