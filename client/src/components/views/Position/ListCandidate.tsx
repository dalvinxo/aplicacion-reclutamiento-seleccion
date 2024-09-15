import Grid from '@mui/material/Grid2';
import { Navigate, useParams } from 'react-router-dom';
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
  TextField,
  Typography,
} from '@mui/material';
import { useGetAllCandidatosPuestoQuery } from '../../../features/puestos/puestosApiSlice';
import { IRootPuestoCandidato } from '../../../features/puestos/puestosTypes';
import { useState } from 'react';
import { EnumStatusCandidato } from '../../../features/candidatos/candidatosTypes';
import { SkeletonLoading } from '../../commons/SkeletonLoading';
import {
  useContratarCandidatoMutation,
  useLazyGetCandidateByIdQuery,
} from '../../../features/candidatos/candidatosApiSlice';
import { UserPersonCandidate } from '../../../features/auth/authTypes';
import moment from 'moment';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';

const formContratoCandidatoSchema = yup.object().shape({
  fecha_ingreso: yup
    .date()
    .required('La fecha desde es requerida.')
    .typeError('La fecha desde es invalida.')
    .min(new Date(), 'La fecha no puede ser anterior a hoy.'),
  salario_mensual: yup
    .number()
    .required('El salario al que aspira es requerido.')
    .min(1, 'El salario al que aspira debe ser un valor positivo.'),
});

export interface IFormularioContrato
  extends yup.InferType<typeof formContratoCandidatoSchema> {}

export const ListCandidate = () => {
  const { puesto_id } = useParams();

  if (!puesto_id || isNaN(parseInt(puesto_id))) {
    return <Navigate to={'/server/not-found/404'} replace={true} />;
  }

  const [candidatoId, setCandidatoId] = useState<number | null>(null);

  const [page, setPage] = useState<number>(1);
  const [candidateDetails, setCandidateDetails] =
    useState<UserPersonCandidate | null>(null);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading, refetch, isError } = useGetAllCandidatosPuestoQuery(
    {
      puesto_id: parseInt(puesto_id),
      pages: page,
      limit: 10,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [contratarCandidato, { isLoading: isLoadingContrato }] =
    useContratarCandidatoMutation();

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
      minWidth: 60,
    },
    {
      id: 'nombre',
      headerName: 'Nombre',
      minWidth: 100,
    },
    {
      id: 'salario_aspirado',
      headerName: 'Salario Aspirado ($)',
      minWidth: 80,
    },
    {
      id: 'recomendado_por',
      headerName: 'Recomendación',
      minWidth: 100,
    },
    {
      id: 'estado_candidato_id',
      headerName: 'Estado',
      minWidth: 50,
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
    setCandidatoId(candidato_id);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioContrato>({
    resolver: yupResolver(formContratoCandidatoSchema),
    defaultValues: {
      salario_mensual: 0,
      fecha_ingreso: new Date(''),
    },
    resetOptions: {
      keepIsSubmitSuccessful: true,
      keepIsSubmitted: false,
    },
  });

  const onSubmit = async (data: IFormularioContrato) => {
    if (!candidatoId) {
      enqueueSnackbar(`No se reconoce el candidato a contratar`, {
        variant: 'error',
      });
      return;
    }

    await contratarCandidato({
      candidateo_id: candidatoId,
      salario_mensual: data.salario_mensual.toString(),
      fecha_ingreso: data.fecha_ingreso,
    })
      .unwrap()
      .then((response) => {
        enqueueSnackbar(
          `${response.Persona.nombre} ya es parte de la empresa`,
          {
            variant: 'success',
          }
        );

        reset();
        refetch();
        setCandidatoId(null);
      })
      .catch((error: IException) => {
        enqueueSnackbar(`${error.data.message}`, {
          variant: 'error',
        });
      });

    reset();
  };

  if (isError) {
    return <Navigate to={'/server/not-found/404'} replace={true} />;
  }

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
              Puesto Aspirado: $ {candidateDetails?.puesto_aspirado_id}
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
              <Paper
                elevation={2}
                sx={{ padding: '1rem', margin: '1rem 0 1rem 0' }}
                key={index}
              >
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
              <Paper
                elevation={2}
                sx={{ padding: '1rem', margin: '1rem 0 1rem 0' }}
                key={index}
              >
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
            variant="outlined"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={!!candidatoId}
        onClose={() => {
          setCandidatoId(null);
        }}
      >
        <DialogTitle>Contratar Candidato</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers={true}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Fecha de ingreso"
                  type="date"
                  {...register('fecha_ingreso')}
                  error={!!errors.fecha_ingreso}
                  helperText={errors.fecha_ingreso?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Salario mensual"
                  type="number"
                  fullWidth
                  {...register('salario_mensual')}
                  error={!!errors.salario_mensual}
                  helperText={errors.salario_mensual?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {isLoadingContrato && <SpinnerCircularProgress />}

            <Button
              color="success"
              type="submit"
              variant="outlined"
              disabled={isLoadingContrato}
            >
              Contratar
            </Button>

            <Button
              onClick={() => {
                setCandidatoId(null);
              }}
              color="error"
              variant="outlined"
            >
              Cerrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
