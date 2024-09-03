import { Divider, Grid2, Typography } from '@mui/material';
import { BreadcrumbsCommons } from '../../commons/BreadcrumbsCommons';
import { useParams } from 'react-router-dom';
import { FormularioCandidato } from './FormularioCandidato';

export const CreateCandidate = () => {
  const { puesto_id } = useParams();

  const breadcrumbs = {
    [`/`]: 'Inicio',
    [`/${puesto_id}`]: 'Puesto',
  };

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <BreadcrumbsCommons
            linksItems={breadcrumbs}
            title="Aplicando al puesto"
          />
        </Grid2>
        <Grid2 size={12}>
          <Typography variant="h6" gutterBottom>
            Completar Formulario
          </Typography>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <FormularioCandidato />
        </Grid2>
      </Grid2>
    </>
  );
};
