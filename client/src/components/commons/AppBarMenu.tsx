import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
  Divider,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

import MenuIcon from '@mui/icons-material/Menu';
import ThemeIcon from '@mui/icons-material/Brightness4';
import { useAppSelector } from '../../store/hook';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { Logout, ConstructionRounded } from '@mui/icons-material';

export const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { toggleTheme } = useThemeContext();

  const user = useAppSelector(selectCurrentUser);
  const isAuth = !!user;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 'text.primary',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Reclutamiento Open Source II
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>

          {!isAuth && (
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
          )}

          <IconButton color="inherit" onClick={toggleTheme}>
            <ThemeIcon />
          </IconButton>

          {isAuth && (
            <>
              <IconButton color="inherit" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/perfil"
                >
                  <Avatar /> &nbsp;&nbsp; Perfil
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/mantenimiento"
                >
                  <ListItemIcon>
                    <ConstructionRounded fontSize="small" />
                  </ListItemIcon>
                  Mantenimiento
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/cerrar-session"
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
