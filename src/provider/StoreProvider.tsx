import React from 'react';

import { Provider } from 'react-redux';

import { store } from '@/store/store';

type Props = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
