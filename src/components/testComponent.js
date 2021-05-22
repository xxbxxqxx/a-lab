import React, { useContext, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function testComponent({ atRecord, openFlag, setOpenFlag }) {
  return (
    <div>
      <p>コンポーネントB: {openFlag ? "opened" : "closed"}</p>
    </div>
  )
}
