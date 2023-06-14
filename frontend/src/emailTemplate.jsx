import { Flex } from '@chakra-ui/react';
import React from 'react';

const EmailTemplate = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2>
        <b>Hello boss</b>
      </h2>
      <p>
        Your event with id dftyt has been published. <br />
        Below are the details:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p>
          <b>Name:</b> Test Name
        </p>
        <p>
          <b>Date:</b> 12th Novembar 2021
        </p>
        <p>
          <b>Time:</b> 9:00pm
        </p>
      </div>

      <a href="http://localhost:3000/dashboard" rel="noreferrer">
        <button
          style={{
            backgroundColor: '#00BFB2',
            color: 'white',
            fontWeight: '600',
            borderRadius: '5px',
            fontSize: '14px',
            padding: '8px',
            width:"100px",
          }}
        >
          About Event
        </button>
      </a>
      <p>Thanks</p>
    </div>
  );
};

export default EmailTemplate;
