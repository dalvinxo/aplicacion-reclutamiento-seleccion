import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { BreadcrumbsCommons } from '../../commons/BreadcrumbsCommons';
import { Divider, Typography } from '@mui/material';

export const ListCandidate = () => {
  const { puesto_id } = useParams();

  const breadcrumbs = {
    [`/`]: 'Inicio',
    [`/${puesto_id}`]: 'Puesto',
  };

  return (
    <>
      <Grid container spacing={2} gap={3} marginTop={5}>
        <Grid size={4}>
          <BreadcrumbsCommons
            linksItems={breadcrumbs}
            title="Listado Candidatos"
          />
        </Grid>
        <Grid size={12}>
          <Typography variant="h6" gutterBottom>
            Candidatos
          </Typography>
          <Divider />
        </Grid>
        <Grid size={12}>
          <h1>listado aqui</h1>
        </Grid>
      </Grid>
    </>
  );
};
