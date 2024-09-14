import Grid from '@mui/material/Grid2';
import { useParams } from 'react-router-dom';
import { BreadcrumbsCommons } from '../../commons/BreadcrumbsCommons';

import VisibilityIcon from '@mui/icons-material/Visibility';
import GavelIcon from '@mui/icons-material/Gavel';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetAllCandidatosPuestoQuery } from '../../../features/puestos/puestosApiSlice';
import { IRootPuestoCandidato } from '../../../features/puestos/puestosTypes';
import { useState } from 'react';
import { EnumStatusCandidato } from '../../../features/candidatos/candidatosTypes';
import { SkeletonLoading } from '../../commons/SkeletonLoading';
import { useLazyGetCandidateByIdQuery } from '../../../features/candidatos/candidatosApiSlice';
import { UserPersonCandidate } from '../../../features/auth/authTypes';
import moment from 'moment';

export const ListCandidate = () => {
  const { puesto_id } = useParams();

  if (!puesto_id || isNaN(parseInt(puesto_id))) {
    return <div>Not Found</div>;
  }

  const [page, setPage] = useState<number>(1);
  const [candidateDetails, setCandidateDetails] =
    useState<UserPersonCandidate | null>(null);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useGetAllCandidatosPuestoQuery(
    {
      puesto_id: parseInt(puesto_id),
      pages: page,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [consultarCandidate, { isLoading: isLoadingCandidate }] =
    useLazyGetCandidateByIdQuery();

  const breadcrumbs = {
    [`/`]: 'Inicio',
    [`/${puesto_id}`]: 'Puesto',
  };

  const columns: IColumnBasic<keyof IRootPuestoCandidato>[] = [
    {
      id: 'id_candidato',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'cedula',
      headerName: 'Cédula',
      minWidth: 80,
    },
    {
      id: 'nombre',
      headerName: 'Nombre',
      minWidth: 100,
    },
    {
      id: 'salario_aspirado',
      headerName: 'Salario Aspirado',
      minWidth: 100,
    },
    {
      id: 'recomendado_por',
      headerName: 'Recomendación',
      minWidth: 100,
    },
    {
      id: 'estado_candidato_id',
      headerName: 'Estado',
      minWidth: 100,
      formatNumber(value) {
        return value === EnumStatusCandidato.POSTULADO
          ? 'Pendiente'
          : 'Contratado';
      },
    },
    { id: 'action', headerName: 'Acciones', minWidth: 100 },
  ];

  const handleConsultingCandidate = async (candidato_id: number) => {
    await consultarCandidate(candidato_id)
      .unwrap()
      .then((response) => {
        setCandidateDetails(response);
      });
  };

  const handleContractCandidate = (candidato_id: number) => {
    console.log('contractar');
  };

  return (
    <>
      {isLoadingCandidate && <SkeletonLoading />}
      <Grid container spacing={2} gap={3} marginTop={5}>
        <Grid size={4}>
          <BreadcrumbsCommons
            linksItems={breadcrumbs}
            title="Listado Candidatos"
          />
        </Grid>

        <Grid size={12}>
          <>
            {isLoading ? (
              <SkeletonLoading />
            ) : (
              <>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left" colSpan={8}>
                            <Typography variant="h6" gutterBottom>
                              Aspirantes al puesto
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ top: 57, minWidth: column.minWidth }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {data && (
                        <TableBody>
                          {data.candidatos_puestos.map((candidato) => (
                            <TableRow
                              key={candidato.id_candidato}
                              hover
                              role="checkbox"
                              tabIndex={-1}
                            >
                              {columns.map((column) => {
                                if (column.id === 'action') {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleConsultingCandidate(
                                            candidato.id_candidato
                                          )
                                        }
                                        color="info"
                                        aria-label="details"
                                        size="small"
                                      >
                                        <VisibilityIcon />
                                      </IconButton>

                                      <IconButton
                                        onClick={() =>
                                          handleContractCandidate(
                                            candidato.id_candidato
                                          )
                                        }
                                        color="info"
                                        aria-label="delete"
                                        size="small"
                                        sx={{
                                          color: 'orange',
                                          marginLeft: '1rem',
                                        }}
                                      >
                                        <GavelIcon />
                                      </IconButton>
                                    </TableCell>
                                  );
                                }

                                const value = candidato[column.id];

                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.formatBool &&
                                    typeof value === 'boolean' ? (
                                      <Chip
                                        label={column.formatBool(value)}
                                        color={
                                          value ? 'secondary' : 'secondary'
                                        }
                                      />
                                    ) : column.formatNumber &&
                                      typeof value === 'number' ? (
                                      <Chip
                                        label={column.formatNumber(value)}
                                        color={'secondary'}
                                      />
                                    ) : (
                                      value
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Paper>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                  }}
                >
                  {data && (
                    <Pagination
                      count={data.totalPages}
                      page={page}
                      onChange={handleChange}
                      color="primary"
                    />
                  )}
                </Box>
              </>
            )}
          </>
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={!!candidateDetails}
        onClose={() => {
          setCandidateDetails(null);
        }}
      >
        <DialogTitle>Detalles del Candidato</DialogTitle>

        <DialogContent dividers={true}>
          <Paper elevation={3} sx={{ padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              {candidateDetails?.persona.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Cédula: {candidateDetails?.persona.cedula}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Puesto Aspirado: {candidateDetails?.puesto_aspirado_id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Salario Aspirado: {candidateDetails?.salario_aspirado}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Recomendado por: {candidateDetails?.recomendado_por}
            </Typography>
          </Paper>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Experiencia Laboral
          </Typography>
          {candidateDetails?.persona.experienciaLaboral.map(
            (experiencia, index) => (
              <Paper elevation={2} sx={{ padding: '1rem' }} key={index}>
                <Typography variant="body1" gutterBottom>
                  Empresa: {experiencia.empresa}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Puesto: {experiencia.puesto_ocupado}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Salario: $ {experiencia.salario}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fecha: Fecha:{' '}
                  {moment(new Date(experiencia.fecha_desde)).format(
                    'DD / MM / YYYY'
                  )}{' '}
                  -{' '}
                  {moment(new Date(experiencia.fecha_hasta)).format(
                    'DD / MM / YYYY'
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Salario: {experiencia.salario}
                </Typography>
              </Paper>
            )
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Capacitaciones
          </Typography>
          {candidateDetails?.persona.capacitaciones.map(
            (capacitacion, index) => (
              <Paper elevation={2} sx={{ padding: '1rem' }} key={index}>
                <Typography variant="body1" gutterBottom>
                  {capacitacion.descripcion}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Institución: {capacitacion.institucion}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Nivel: {capacitacion.nivel}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fecha:{' '}
                  {moment(new Date(capacitacion.fecha_desde)).format(
                    ' DD / MM / YYYY '
                  )}{' '}
                  -{' '}
                  {moment(new Date(capacitacion.fecha_hasta)).format(
                    ' DD / MM / YYYY '
                  )}
                </Typography>
              </Paper>
            )
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setCandidateDetails(null);
            }}
            color="error"
            variant="contained"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
