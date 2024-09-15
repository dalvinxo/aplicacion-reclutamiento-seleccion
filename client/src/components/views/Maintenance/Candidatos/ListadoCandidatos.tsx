import { useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import { SkeletonLoading } from '../../../commons/SkeletonLoading';
import { useGetFormFilterCandidatosQuery } from '../../../../features/forms/formsApiSlice';
import { useGetAllCandidatosFilterQuery } from '../../../../features/candidatos/candidatosApiSlice';
import { CandidatosPostulados } from '../../../../features/candidatos/candidatosTypes';

import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const ListadoCandidatos = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPorPagina, setItemsPorPagina] = useState<number>(5);

  const [competenciaId, setCompetenciaId] = useState<string>('');
  const [idiomaId, setIdiomaId] = useState<string>('');
  const [puestoId, setPuestoId] = useState<string>('');
  const [nivel, setNivel] = useState<string>('');

  const { data, isLoading } = useGetAllCandidatosFilterQuery(
    {
      pages: page,
      limit: itemsPorPagina,
      competencia_id: Number(competenciaId),
      idioma_id: Number(idiomaId),
      puesto_id: Number(puestoId),
      nivel_capacitacion: nivel,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { data: dataForm, isLoading: isLoadingForm } =
    useGetFormFilterCandidatosQuery();

  const columns: IColumnBasic<keyof CandidatosPostulados>[] = [
    {
      id: 'id_candidato',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'nombre',
      headerName: 'Nombre',
      minWidth: 100,
    },
    {
      id: 'cedula',
      headerName: 'Cédula',
      minWidth: 100,
    },
    {
      id: 'departamento',
      headerName: 'Departamento',
      minWidth: 100,
    },
    {
      id: 'puesto',
      headerName: 'Puesto',
      minWidth: 100,
    },
    {
      id: 'salario_aspirado',
      headerName: 'Salario Aspirado',
      minWidth: 100,
    },
    {
      id: 'candidato_estado',
      headerName: 'Estado',
      minWidth: 100,
    },
  ];

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {isLoading || isLoadingForm ? (
        <SkeletonLoading />
      ) : (
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
              <TextField
                select
                fullWidth
                value={idiomaId}
                label="Idiomas"
                defaultValue={idiomaId}
                onChange={(e) => setIdiomaId(e.target.value)}
              >
                {dataForm?.idiomas.map((option) => (
                  <MenuItem key={option.id_idioma} value={option.id_idioma}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Nivel"
                value={nivel}
                defaultValue={nivel}
                onChange={(e) => setNivel(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="certificacion">Certificación</MenuItem>
                <MenuItem value="tecnico">Técnico</MenuItem>
                <MenuItem value="gestion">Gestión</MenuItem>
                <MenuItem value="bachiller">Bachiller</MenuItem>
                <MenuItem value="grado">Grado</MenuItem>
                <MenuItem value="post-grado">Post-grado</MenuItem>
                <MenuItem value="doctorado">Doctorado</MenuItem>
              </TextField>

              <TextField
                select
                fullWidth
                label="Puestos"
                value={puestoId}
                defaultValue={puestoId}
                onChange={(e) => setPuestoId(e.target.value)}
              >
                {dataForm?.puestos.map((option) => (
                  <MenuItem key={option.id_puesto} value={option.id_puesto}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Competencias"
                value={competenciaId}
                defaultValue={competenciaId}
                onChange={(e) => setCompetenciaId(e.target.value)}
              >
                {dataForm?.competencias.map((option) => (
                  <MenuItem
                    key={option.id_competencia}
                    value={option.id_competencia}
                  >
                    {option.descripcion}
                  </MenuItem>
                ))}
              </TextField>

              <IconButton
                onClick={() => {
                  setCompetenciaId('');
                  setPuestoId('');
                  setNivel('');
                  setIdiomaId('');
                }}
                color="info"
                aria-label="details"
              >
                <CleaningServicesIcon />
              </IconButton>
            </Box>

            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      Empleados
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
                    {data.candidatos.map((candidato) => (
                      <TableRow
                        key={candidato.id_candidato}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {columns.map((column) => {
                          if (column.id === 'action') {
                            return;
                          }

                          const value = candidato[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.formatBool &&
                              typeof value === 'boolean' ? (
                                <Chip
                                  label={column.formatBool(value)}
                                  color={value ? 'primary' : 'secondary'}
                                />
                              ) : column.formatDate &&
                                typeof value === 'string' ? (
                                column.formatDate(value)
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
                count={
                  data.candidatos.length < itemsPorPagina
                    ? 1
                    : competenciaId || idiomaId || puestoId || nivel
                      ? data.candidatos.length
                      : data.totalPages
                }
                page={page}
                onChange={handleChange}
                color="primary"
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};
