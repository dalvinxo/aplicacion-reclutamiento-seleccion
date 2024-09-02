import Grid from '@mui/material/Grid2';
import { NivelRiesgo } from '../../../features/puestos/puestosTypes';
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetPuestoDetailsByIdQuery } from '../../../features/puestos/puestosApiSlice';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { SkeletonLoading } from '../../commons/SkeletonLoading';

export const PositionDetails = () => {
  const { puesto_id } = useParams();

  if (!puesto_id || isNaN(parseInt(puesto_id))) {
    return <div>Not Found</div>;
  }

  const { data, isLoading, isSuccess } = useGetPuestoDetailsByIdQuery(
    parseInt(puesto_id)
  );

  return (
    <>
      {isLoading && <SkeletonLoading />}

      {isSuccess && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h5" component="h2">
              {data.nombre}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" component="p">
              {data.descripcion}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" component="p">
              Nivel de Riesgo: &nbsp;
              {data.nivel_riesgo === NivelRiesgo.Bajo ? (
                <Chip label={data.nivel_riesgo} color="success" />
              ) : data.nivel_riesgo === NivelRiesgo.Alto ? (
                <Chip label={data.nivel_riesgo} color="error" />
              ) : (
                <Chip label={data.nivel_riesgo} color="warning" />
              )}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" component="p">
              Salario: {data.nivel_minimo_salario} - {data.nivel_maximo_salario}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" component="p">
              Departamento: {data.Departamento.nombre}
            </Typography>
          </Grid>

          {data.PuestoIdioma.length > 0 && (
            <Grid size={12}>
              <Typography variant="body1" component="p">
                Idiomas:
                <List>
                  {data.PuestoIdioma.map((idioma, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <RadioButtonCheckedOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={idioma} />
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Grid>
          )}

          {data.PuestoCompetencia.length > 0 && (
            <Grid size={12}>
              <Typography variant="body1" component="p">
                Competencias:
                <List>
                  {data.PuestoCompetencia.map((competencia, index) => (
                    <ListItem key={index + competencia}>
                      <ListItemIcon>
                        <RadioButtonCheckedOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={competencia} />
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Link to="crear-candidato" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          color="info"
          size="medium"
          sx={{ marginTop: '1rem' }}
        >
          Aplicar
        </Button>
      </Link>
    </>
  );
};
