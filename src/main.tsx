
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/error/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </HelmetProvider>
);
