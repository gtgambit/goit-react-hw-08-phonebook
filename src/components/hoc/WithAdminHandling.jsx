import React from 'react';

const WithAdminHandlings = Component => {
  const ProtectedComponent = props => {
    const isAdmin = false;

    return isAdmin ? <Component admin {...props} /> : <Component {...props} />;
  };

  return ProtectedComponent;
};

export default WithAdminHandlings;
