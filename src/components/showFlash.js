import React from 'react';

const ShowFlash = ({ message, open }) => {

  return (
    <div
      className="flash-message"
      style={open ? {display: "block"} : {display: "none"}}
    >
      {message}
    </div>
  );
};

export default ShowFlash;