import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeContextProvider } from './context/ThemeContext.tsx';
import { StyledEngineProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </StyledEngineProvider>
  </StrictMode>
);
