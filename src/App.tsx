import { RouterProvider } from 'react-router';

import StoreProvider from '@/provider/StoreProvider';
import router from '@/routes/routes';

const App = () => {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};

export default App;
