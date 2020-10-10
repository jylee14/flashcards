import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  const center: React.CSSProperties = {
    fontSize: '15px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }

  return (
    <div style={center}>
      <div style={center}>
        <Spinner animation="border" variant="secondary" />
      </div>
      <br />
      <br />
      <br />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;