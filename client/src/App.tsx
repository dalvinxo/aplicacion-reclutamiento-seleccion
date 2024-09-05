import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import { blue, grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import { useThemeContext } from './context/ThemeContext';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import createTheme from '@mui/material/styles/createTheme';

import { Login } from './components/views/Login/Login';
import { Home } from './components/views/Home/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import { Logout } from './components/views/Logout/Logout';
import { Maintenance } from './components/views/Maintenance/Maintenance';
import { Profile } from './components/views/Profile/Profile';
import { LayoutProtected } from './components/layouts/LayoutProtected';
import { LayoutAuth } from './components/layouts/LayoutAuth';
import { Position } from './components/views/Position/Position';
import { PositionDetails } from './components/views/Position/PositionDetails';
import { CreateCandidate } from './components/views/Position/CreateCandidate';
import { Competencias } from './components/views/Maintenance/Competencias/Competencias';
import { Idiomas } from './components/views/Maintenance/Idiomas/Idiomas';
import { NuevaCompetencia } from './components/views/Maintenance/Competencias/NuevaCompetencia';
import { EditarCompetencia } from './components/views/Maintenance/Competencias/EditarCompetencia';
import { ListadoCompetencia } from './components/views/Maintenance/Competencias/ListadoCompetencia';

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
        path: ':puesto_id',
        element: <Position />,
        children: [
          {
            index: true,
            element: <PositionDetails />,
          },
          {
            path: 'crear-candidato',
            element: <CreateCandidate />,
          },
        ],
      },
      {
        element: <LayoutProtected />,
        children: [
          {
            path: 'iniciar-sesion',
            element: <Login />,
          },
        ],
      },
      {
        element: <LayoutAuth />,
        children: [
          {
            path: 'cerrar-sesion',
            element: <Logout />,
          },
          {
            path: 'mantenimiento',
            element: <Maintenance />,
            children: [
              {
                index: true,
                element: <h2>Seleccionar una opcion</h2>,
              },
              {
                path: 'competencias',
                element: <Competencias />,
                children: [
                  {
                    index: true,
                    element: <ListadoCompetencia />,
                  },
                  {
                    path: 'crear-competencia',
                    element: <NuevaCompetencia />,
                  },
                  {
                    path: 'editar-competencia/:id',
                    element: <EditarCompetencia />,
                  },
                ],
              },
              {
                path: 'idiomas',
                element: <Idiomas />,
              },
            ],
          },
          {
            path: 'perfil',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

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

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme == 'dark' ? darkTheme : lightTheme}>
        <Box
          sx={{
            bgcolor: 'background.default',
            minHeight: '100vh',
            padding: '1rem',
          }}
        >
          <CssBaseline />
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
