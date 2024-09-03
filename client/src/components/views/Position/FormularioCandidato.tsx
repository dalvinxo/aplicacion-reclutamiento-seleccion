import { Grid2, Typography, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import { useGetFormCrearCandidatosQuery } from '../../../features/forms/formsApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';

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

export const FormularioCandidato = () => {
  const { register, control, handleSubmit } = useForm<FormData>();

  const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>([]);
  const [experienciaLaboral, setExperienciaLaboral] = useState<
    ExperienciaLaboral[]
  >([]);

  const { data, isFetching, isSuccess } = useGetFormCrearCandidatosQuery();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const agregarCapacitacion = () => {
    const nuevaCapacitacion: Capacitacion = {
      descripcion: '',
      nivel: '',
      fecha_desde: new Date(),
      fecha_hasta: new Date(),
      institucion: '',
    };
    setCapacitaciones([...capacitaciones, nuevaCapacitacion]);
  };

  const agregarExperienciaLaboral = () => {
    const nuevaExperienciaLaboral: ExperienciaLaboral = {
      empresa: '',
      puesto_ocupado: '',
      fecha_desde: new Date(),
      fecha_hasta: new Date(),
      salario: 0,
    };
    setExperienciaLaboral([...experienciaLaboral, nuevaExperienciaLaboral]);
  };

  return (
    <>
      {isFetching && <SpinnerCircularProgress />}

      {isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                label="Nombre"
                {...register('nombre')}
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                label="Cédula"
                {...register('cedula')}
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="idiomas"
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Select
                    label="Idiomas"
                    multiple
                    value={[]}
                    onChange={(event) => field.onChange(event)}
                    variant="outlined"
                    fullWidth
                  >
                    {[{ id: 1, nombre: 'ingles' }].map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="competencias"
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Select
                    label="Competencias"
                    multiple
                    value={[]}
                    onChange={(event) => field.onChange(event)}
                    variant="outlined"
                    fullWidth
                  >
                    {data.idiomas.map((option) => (
                      <MenuItem key={option.id_idioma} value={option.id_idioma}>
                        {option.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid2>

            <Grid2 size={12}>
              <Typography variant="h6" gutterBottom>
                Capacitaciones
              </Typography>
              <Divider />
              <Button
                variant="contained"
                color="primary"
                onClick={agregarCapacitacion}
              >
                Agregar
              </Button>
              <ul>
                {capacitaciones.map((capacitacion, index) => (
                  <li key={index}>
                    {/* <Typography variant="inherit"> */}
                    {capacitacion.descripcion}
                    {/* </Typography> */}
                  </li>
                ))}
              </ul>
            </Grid2>

            <Grid2 size={12}>
              <Typography variant="h6" gutterBottom>
                Experiencia Laboral
              </Typography>
              <Divider />
              <Button
                variant="contained"
                color="primary"
                onClick={agregarExperienciaLaboral}
              ></Button>
            </Grid2>
          </Grid2>
        </form>
      )}
    </>
  );
};
