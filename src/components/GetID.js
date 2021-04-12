import React, { useContext, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const GetID = () => {
  const { user } = useUser();
  const useriddd = user.sub
  return ({user});
}

export { GetID };