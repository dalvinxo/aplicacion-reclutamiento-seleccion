import { List, ListItemIcon, ListItemText } from '@mui/material';

import ListItemButton from '@mui/material/ListItemButton';

import FolderIcon from '@mui/icons-material/Folder';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  return (
    <List component="nav">
      <ListItemButton
        component={Link}
        to={'/mantenimiento'}
        selected={location.pathname == '/mantenimiento'}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={'/mantenimiento/competencias'}
        selected={location.pathname.includes('/mantenimiento/competencias')}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Competencias" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={'/mantenimiento/idiomas'}
        selected={location.pathname.includes('/mantenimiento/idiomas')}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Idiomas" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={'/mantenimiento/puestos'}
        selected={location.pathname.includes('/mantenimiento/puestos')}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Puestos" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={'/mantenimiento/candidatos'}
        selected={location.pathname.includes('/mantenimiento/candidatos')}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Candidatos" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={'/mantenimiento/empleados'}
        selected={location.pathname.includes('/mantenimiento/empleados')}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItemButton>
    </List>
  );
};
