import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Header = () => {
  const { user } = useUser();

  return (
    <footer>
      <div className="container">
        footer here
      </div>
    </footer>
  );
};

export default Header;
