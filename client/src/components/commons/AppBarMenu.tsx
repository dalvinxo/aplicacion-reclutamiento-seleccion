import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeIcon from '@mui/icons-material/Brightness4';
import { useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

export const AppBarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { toggleTheme } = useThemeContext();

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

          <Button color="inherit" component={Link} to="/login">
            Iniciar Sesión
          </Button>

          <IconButton color="inherit" onClick={toggleTheme}>
            <ThemeIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/logout">
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
