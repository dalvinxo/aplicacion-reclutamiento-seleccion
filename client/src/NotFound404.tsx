import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirigir al Home
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="div"
          gutterBottom
          sx={{ fontSize: '8rem', fontWeight: 'bold', color: 'primary.main' }}
        >
          404
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Oops! La página que estás buscando no existe.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Puede que la dirección sea incorrecta o que la página haya sido
          movida.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 3 }}
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound404;
