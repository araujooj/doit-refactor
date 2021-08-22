import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './contexts';
import { Routes } from './routes';

const App = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
