import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import { blue, grey } from '@mui/material/colors';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useThemeContext } from './context/ThemeContext';

import { Login } from './components/views/Login/Login';
import { Home } from './components/views/Home/Home';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

// Definición del tema claro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[600],
    },
    background: {
      default: '#fff',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: grey[700],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[400],
    },
    background: {
      default: '#212121',
      paper: '#303030',
    },
    text: {
      primary: '#FFFFFF',
      secondary: grey[500],
    },
  },
});

function App() {
  const { theme } = useThemeContext();
  console.log(theme);
  return (
    <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          padding: '1rem',
        }}
      >
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
