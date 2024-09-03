import { List, ListItemIcon, ListItemText } from '@mui/material';

import ListItemButton from '@mui/material/ListItemButton';

import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <List component="nav">
      <ListItemButton component={Link} to={'/mantenimiento/competencias'}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Competencia" />
      </ListItemButton>
      <ListItemButton component={Link} to={'/mantenimiento/idiomas'}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Idiomas" />
      </ListItemButton>
    </List>
  );
};
