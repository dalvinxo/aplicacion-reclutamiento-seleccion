import { Card, CardContent, Typography } from '@mui/material';
import { PuestoVacante } from '../../../features/puestos/puestosTypes';

interface IPuestoCard {
  puesto: PuestoVacante;
}

export const PuestoCard = ({ puesto }: IPuestoCard) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {puesto.nombre}
        </Typography>
        <Typography color="text.secondary">
          Departamento: {puesto.Departamento.nombre}
        </Typography>
        <Typography variant="body2">{puesto.descripcion}</Typography>
        <Typography variant="body2">
          Nivel de Riesgo: {puesto.nivel_riesgo}
        </Typography>
        <Typography variant="body2">
          Salario: ${puesto.nivel_minimo_salario} - $
          {puesto.nivel_maximo_salario}
        </Typography>
      </CardContent>
    </Card>
  );
};
