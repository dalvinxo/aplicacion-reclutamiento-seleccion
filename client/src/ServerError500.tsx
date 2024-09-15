import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const ServerError500 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h1" component="h1" gutterBottom>
          500
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          ¡Oops! Ha ocurrido un error en el servidor.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lo sentimos, pero algo ha salido mal en nuestro lado. Intenta de nuevo
          más tarde.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Regresar al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default ServerError500;
