import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { TextField, Select, MenuItem, Button } from '@mui/material';

import { useGetFormCrearCandidatosQuery } from '../../../features/forms/formsApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatCedula } from '../../../utils/formatCedula.utils';
import { LoadingButton } from '@mui/lab';
import useAlert from '../../../hook/useAlert';
import SaveIcon from '@mui/icons-material/Save';

interface FormData {
  nombre: string;
  cedula: string;
  idiomas: number[];
  competencias: number[];
  capacitaciones: Capacitacion[];
  experienciaLaboral: ExperienciaLaboral[];
}

interface Capacitacion {
  descripcion: string;
  nivel: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  institucion: string;
}

interface ExperienciaLaboral {
  empresa: string;
  puesto_ocupado: string;
  fecha_desde: Date;
  fecha_hasta: Date;
  salario: number;
}

const capacitacionSchema = yup.object().shape({
  descripcion: yup.string().required('La descripción es requerida.'),
  nivel: yup
    .string()
    .required('El nivel es requerido.')
    .oneOf(
      [
        'tecnico',
        'gestion',
        'post-grado',
        'grado',
        'bachiller',
        'doctorado',
        'certificacion',
      ],
      'El nivel no es válido.'
    ),
  fecha_desde: yup
    .date()
    .required('La fecha desde es requerida.')
    .typeError('La fecha desde es invalida.'),
  fecha_hasta: yup
    .date()
    .required('La fecha hasta es requerida.')
    .min(
      yup.ref('fecha_desde'),
      'La fecha hasta debe ser posterior a la fecha desde.'
    )
    .typeError('La fecha hasta es invalida.'),
  institucion: yup.string().required('La institución es requerida.'),
});

const experienciaLaboralSchema = yup.object().shape({
  empresa: yup.string().required('La empresa es requerida.'),
  puesto_ocupado: yup.string().required('El puesto ocupado es requerido.'),
  fecha_desde: yup
    .date()
    .required('La fecha desde es requerida.')
    .typeError('La fecha desde es invalida.'),
  fecha_hasta: yup
    .date()
    .required('La fecha hasta es requerida.')
    .min(
      yup.ref('fecha_desde'),
      'La fecha hasta debe ser posterior a la fecha desde.'
    )
    .typeError('La fecha hasta es invalida.'),
  salario: yup
    .number()
    .required('El salario es requerido.')
    .min(1, 'El salario debe ser un valor positivo.'),
});

const formCandidatoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required('El nombre es requerido.')
    .min(5, 'El nombre debe tener al menos 5 caracteres.'),
  cedula: yup
    .string()
    .required('La cédula es requerida.')
    .matches(
      /^\d{3}-\d{7}-\d{1}$/,
      'La cédula debe tener el formato 000-0000000-0.'
    )
    .max(13, 'La cédula no puede exceder los 13 caracteres.'),
  salario_aspirado: yup
    .number()
    .required('El salario al que aspira es requerido.')
    .min(1, 'El salario al que aspira debe ser un valor positivo.'),
  idiomas: yup
    .array()
    .of(yup.number())
    .min(1, 'Debe seleccionar al menos un idioma.'),
  competencias: yup
    .array()
    .of(yup.number())
    .min(1, 'Debe seleccionar al menos una competencia.'),
  capacitaciones: yup
    .array()
    .of(capacitacionSchema)
    .required('Debe ingresar al menos una capacitación.')
    .min(1, 'Debe ingresar al menos una capacitación.'),
  experiencias_laborales: yup
    .array()
    .of(experienciaLaboralSchema)
    .required('Debe ingresar al menos una experiencia laboral.')
    .min(1, 'Debe ingresar al menos una experiencia laboral.'),
  recomendado_por: yup.string(),
});

export interface IFormularioCandidato
  extends yup.InferType<typeof formCandidatoSchema> {}

export const FormularioCandidato = () => {
  const { AlertComponent, setError } = useAlert();

  const {
    watch,
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormularioCandidato>({
    resolver: yupResolver(formCandidatoSchema),
    defaultValues: {
      capacitaciones: [
        {
          descripcion: '',
          nivel: '',
          fecha_desde: new Date(''),
          fecha_hasta: new Date(''),
          institucion: '',
        },
      ],
      experiencias_laborales: [
        {
          empresa: '',
          puesto_ocupado: '',
          fecha_desde: new Date(''),
          fecha_hasta: new Date(''),
          salario: 0,
        },
      ],
    },
  });

  const {
    fields: capacitacionFields,
    append: appendCapacitacion,
    remove: removeCapacitacion,
  } = useFieldArray({
    control,
    name: 'capacitaciones',
  });

  const {
    fields: experienciaFields,
    append: appendExperiencia,
    remove: removeExperiencia,
  } = useFieldArray({
    control,
    name: 'experiencias_laborales',
  });

  const { data, isFetching, isSuccess } = useGetFormCrearCandidatosQuery();

  const onSubmit = (data: IFormularioCandidato) => {
    console.log(data);
  };

  return (
    <>
      {isFetching && <SpinnerCircularProgress />}

      {isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <AlertComponent />
            </Grid>

            <Grid size={6}>
              <Controller
                name="nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Nombre completo"
                    fullWidth
                    {...field}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="cedula"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Cédula"
                    fullWidth
                    value={value || ''}
                    onChange={(e) => onChange(formatCedula(e.target.value))}
                    error={!!errors.cedula}
                    helperText={errors.cedula?.message}
                    inputProps={{ maxLength: 13 }}
                  />
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="salario_aspirado"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    label="Salario aspirado"
                    type="number"
                    fullWidth
                    {...field}
                    error={!!errors.salario_aspirado}
                    helperText={errors.salario_aspirado?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="idiomas"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="multiple-chip-idioma">Idiomas</InputLabel>
                      <Select
                        {...field}
                        fullWidth
                        multiple
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        error={!!errors.idiomas}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={
                                  data?.idiomas.find(
                                    (idioma) => idioma.id_idioma === value
                                  )?.nombre
                                }
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {data ? (
                          data.idiomas.map((idioma) => (
                            <MenuItem
                              key={idioma.id_idioma}
                              value={idioma.id_idioma}
                            >
                              {idioma.nombre}
                            </MenuItem>
                          ))
                        ) : (
                          <SpinnerCircularProgress />
                        )}
                      </Select>
                      <FormHelperText error={!!errors.idiomas}>
                        {errors.idiomas?.message}
                      </FormHelperText>
                    </FormControl>
                  </>
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="competencias"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="multiple-chip-competencia">
                        Competencias
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="multiple-chip-competencia"
                        multiple
                        label="Competencias"
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        error={!!errors.competencias}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={
                                  data?.competencias.find(
                                    (competencia) =>
                                      competencia.id_competencia === value
                                  )?.descripcion
                                }
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {data ? (
                          data.competencias.map((competencia) => (
                            <MenuItem
                              key={competencia.id_competencia}
                              value={competencia.id_competencia}
                            >
                              {competencia.descripcion}
                            </MenuItem>
                          ))
                        ) : (
                          <SpinnerCircularProgress />
                        )}
                      </Select>
                      <FormHelperText error={!!errors.competencias}>
                        {errors.competencias?.message}
                      </FormHelperText>
                    </FormControl>
                  </>
                )}
              />
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" gutterBottom>
                Capacitaciones
              </Typography>

              {capacitacionFields.map((item, index) => (
                <Grid
                  container
                  size={12}
                  key={item.id}
                  spacing={1}
                  marginBottom={3}
                >
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      {...register(`capacitaciones.${index}.descripcion`)}
                      error={!!errors.capacitaciones?.[index]?.descripcion}
                      helperText={
                        errors.capacitaciones?.[index]?.descripcion?.message
                      }
                    />
                  </Grid>

                  <Grid size={2}>
                    <Controller
                      control={control}
                      defaultValue=""
                      name={`capacitaciones.${index}.nivel`}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          sx={{
                            minWidth: 120,
                          }}
                          select
                          label="Nivel"
                          {...field}
                          error={!!errors.capacitaciones?.[index]?.nivel}
                          helperText={
                            errors.capacitaciones?.[index]?.nivel?.message
                          }
                        >
                          <MenuItem>
                            <em>Seleccione el nivel de riesgo</em>
                          </MenuItem>
                          <MenuItem value="certificacion">
                            Certificación
                          </MenuItem>
                          <MenuItem value="tecnico">Técnico</MenuItem>
                          <MenuItem value="gestion">Gestión</MenuItem>
                          <MenuItem value="bachiller">Bachiller</MenuItem>
                          <MenuItem value="grado">Grado</MenuItem>
                          <MenuItem value="post-grado">Post-grado</MenuItem>
                          <MenuItem value="doctorado">Doctorado</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Fecha Desde"
                      type="date"
                      {...register(`capacitaciones.${index}.fecha_desde`)}
                      error={!!errors.capacitaciones?.[index]?.fecha_desde}
                      helperText={
                        errors.capacitaciones?.[index]?.fecha_desde?.message
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Fecha Hasta"
                      type="date"
                      {...register(`capacitaciones.${index}.fecha_hasta`)}
                      error={!!errors.capacitaciones?.[index]?.fecha_hasta}
                      helperText={
                        errors.capacitaciones?.[index]?.fecha_hasta?.message
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Institución"
                      {...register(`capacitaciones.${index}.institucion`)}
                      error={!!errors.capacitaciones?.[index]?.institucion}
                      helperText={
                        errors.capacitaciones?.[index]?.institucion?.message
                      }
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid
                      size={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => removeCapacitacion(index)}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  )}
                </Grid>
              ))}
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  mb: 2,
                }}
                onClick={() =>
                  appendCapacitacion({
                    descripcion: '',
                    nivel: '',
                    fecha_desde: new Date(''),
                    fecha_hasta: new Date(''),
                    institucion: '',
                  })
                }
              >
                Agregar Capacitación
              </Button>
            </Grid>

            <Grid size={12}>
              <Typography variant="h6" gutterBottom>
                Experiencia Laboral
              </Typography>

              {experienciaFields.map((item, index) => (
                <Grid
                  container
                  size={12}
                  key={item.id}
                  spacing={1}
                  marginBottom={3}
                >
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Empresa"
                      {...register(`experiencias_laborales.${index}.empresa`)}
                      error={!!errors.experiencias_laborales?.[index]?.empresa}
                      helperText={
                        errors.experiencias_laborales?.[index]?.empresa?.message
                      }
                    />
                  </Grid>

                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Puesto Ocupado"
                      {...register(
                        `experiencias_laborales.${index}.puesto_ocupado`
                      )}
                      error={
                        !!errors.experiencias_laborales?.[index]?.puesto_ocupado
                      }
                      helperText={
                        errors.experiencias_laborales?.[index]?.puesto_ocupado
                          ?.message
                      }
                    />
                  </Grid>
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Fecha Desde"
                      type="date"
                      {...register(
                        `experiencias_laborales.${index}.fecha_desde`
                      )}
                      error={
                        !!errors.experiencias_laborales?.[index]?.fecha_desde
                      }
                      helperText={
                        errors.experiencias_laborales?.[index]?.fecha_desde
                          ?.message
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Fecha Hasta"
                      type="date"
                      {...register(
                        `experiencias_laborales.${index}.fecha_hasta`
                      )}
                      error={
                        !!errors.experiencias_laborales?.[index]?.fecha_hasta
                      }
                      helperText={
                        errors.experiencias_laborales?.[index]?.fecha_hasta
                          ?.message
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      label="Salario"
                      type="number"
                      {...register(`experiencias_laborales.${index}.salario`)}
                      error={!!errors.experiencias_laborales?.[index]?.salario}
                      helperText={
                        errors.experiencias_laborales?.[index]?.salario?.message
                      }
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid
                      size={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => removeExperiencia(index)}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  )}
                </Grid>
              ))}
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  mb: 2,
                }}
                onClick={() =>
                  appendExperiencia({
                    empresa: '',
                    puesto_ocupado: '',
                    fecha_desde: new Date(''),
                    fecha_hasta: new Date(''),
                    salario: 0,
                  })
                }
              >
                Agregar Experiencia Laboral
              </Button>
            </Grid>

            <Grid size={6}>
              <Controller
                name="recomendado_por"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Recomendación"
                    fullWidth
                    {...field}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={12} padding={'1rem'}>
              <LoadingButton
                color="success"
                fullWidth
                loadingPosition="start"
                loading={isFetching}
                type="submit"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Postular
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};
