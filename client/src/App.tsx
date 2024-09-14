import CssBaseline from '@mui/material/CssBaseline';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import { blue, grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import { useThemeContext } from './context/ThemeContext';

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
import { ListadoIdioma } from './components/views/Maintenance/Idiomas/ListadoIdioma';
import { NuevaIdioma } from './components/views/Maintenance/Idiomas/NuevaIdioma';
import { EditarIdioma } from './components/views/Maintenance/Idiomas/EditarIdioma';
import { Puestos } from './components/views/Maintenance/Puestos/Puestos';
import { ListadoPuesto } from './components/views/Maintenance/Puestos/ListadoPuesto';
import { NuevoPuesto } from './components/views/Maintenance/Puestos/NuevoPuesto';
import { EditarPuesto } from './components/views/Maintenance/Puestos/EditarPuesto';
import { Signup } from './components/views/Signup/Signup';
import { LayoutAccess } from './components/layouts/LayoutAccess';
import { ListadoEmpleados } from './components/views/Maintenance/Empleados/ListadoEmpleados';
import { Empleados } from './components/views/Maintenance/Empleados/Empleados';
import { ListCandidate } from './components/views/Position/ListCandidate';

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
        ],
      },
      {
        element: <LayoutProtected />,
        children: [
          {
            path: 'iniciar-sesion',
            element: <Login />,
          },
          {
            path: 'inscribirse',
            element: <Signup />,
          },
        ],
      },
      {
        element: <LayoutAuth />,
        children: [
          {
            path: ':puesto_id/crear-candidato',
            element: <CreateCandidate />,
          },
          {
            path: ':puesto_id/list-candidato',
            element: <ListCandidate />,
          },
          {
            path: 'cerrar-sesion',
            element: <Logout />,
          },
          {
            path: 'perfil',
            element: <Profile />,
          },
        ],
      },
      {
        element: <LayoutAccess />,
        children: [
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
                children: [
                  {
                    index: true,
                    element: <ListadoIdioma />,
                  },
                  {
                    path: 'crear-idioma',
                    element: <NuevaIdioma />,
                  },
                  {
                    path: 'editar-idioma/:id',
                    element: <EditarIdioma />,
                  },
                ],
              },
              {
                path: 'puestos',
                element: <Puestos />,
                children: [
                  {
                    index: true,
                    element: <ListadoPuesto />,
                  },
                  {
                    path: 'crear-puesto',
                    element: <NuevoPuesto />,
                  },
                  {
                    path: 'editar-puesto/:id',
                    element: <EditarPuesto />,
                  },
                ],
              },
              {
                path: 'empleados',
                element: <Empleados />,
                children: [
                  {
                    index: true,
                    element: <ListadoEmpleados />,
                  },
                ],
              },
            ],
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
