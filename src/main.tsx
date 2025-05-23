import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import App from '@/App';
import '@/main.css';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <>
    <App />
    <ToastContainer />
  </>,
);
