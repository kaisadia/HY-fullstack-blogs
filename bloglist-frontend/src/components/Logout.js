import React from 'react';

function Logout({ user }) {
  const clickHandler = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      Welcome {user.name}
      <button onClick={clickHandler}>Logout</button>
    </div>
  );
}

export default Logout;
