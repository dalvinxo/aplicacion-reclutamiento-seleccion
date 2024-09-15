import { Badge, Card, CardContent, Chip, Typography } from '@mui/material';
import { PuestoVacante } from '../../../features/puestos/puestosTypes';

interface IPuestoCard {
  puesto: PuestoVacante;
}

export const PuestoCard = ({ puesto }: IPuestoCard) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.01)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        },
      }}
    >
      <CardContent>
        {puesto.nombre && <div>{puesto.nombre}</div>}
        {puesto.Departamento?.nombre && (
          <div>Departamento: {puesto.Departamento.nombre}</div>
        )}
        {puesto.descripcion && <div>{puesto.descripcion}</div>}
        {puesto.nivel_riesgo && (
          <div>Nivel de Riesgo: {puesto.nivel_riesgo}</div>
        )}
        {puesto.nivel_minimo_salario && puesto.nivel_maximo_salario && (
          <div>
            Salario: ${puesto.nivel_minimo_salario} - $
            {puesto.nivel_maximo_salario}
          </div>
        )}
        <div>Candidatos: {puesto.candidatos}</div>
      </CardContent>
    </Card>
  );
};
