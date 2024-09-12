import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
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
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import { SkeletonLoading } from '../../../commons/SkeletonLoading';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { useGetAllEmpleadosFilterQuery } from '../../../../features/empleados/empleadosApiSlice';
import { Empleado } from '../../../../features/empleados/empleadosTypes';
import moment from 'moment';

export const ListadoCandidatos = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPorPagina, setItemsPorPagina] = useState<number>(5);
  const [desde, setDesde] = useState<string | null>(null);
  const [hasta, setHasta] = useState<string | null>(null);

  const { data, isLoading } = useGetAllEmpleadosFilterQuery(
    {
      pages: page,
      limit: itemsPorPagina,
      desde: desde ?? undefined,
      hasta: hasta ?? undefined,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const columns: IColumnBasic<keyof Empleado>[] = [
    {
      id: 'id_empleado',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'nombre',
      headerName: 'Nombre',
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
      id: 'fecha_ingreso',
      headerName: 'Fecha de ingreso',
      minWidth: 100,
      formatDate: (value) => {
        const fecha = new Date(value);
        if (isNaN(fecha.getTime())) {
          return '';
        }

        return value ? moment(value).format('DD/MM/YYYY') : '';
      },
    },
    {
      id: 'estado',
      headerName: 'Estado',
      minWidth: 100,
      formatBool(value) {
        return value ? 'Activo' : 'Inactivo';
      },
    },
  ];

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleFilter = () => {};

  return (
    <>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
              <TextField
                label="Desde"
                type="date"
                value={desde || ''}
                onChange={(e) => setDesde(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Hasta"
                type="date"
                value={hasta || ''}
                onChange={(e) => setHasta(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              {data && data.empleados.length > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleFilter}
                >
                  Generar reporte
                </Button>
              )}
            </Box>

            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
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
                    {data.empleados.map((empleado) => (
                      <TableRow
                        key={empleado.id_empleado}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {columns.map((column) => {
                          if (column.id === 'action') {
                            return;
                            // return (
                            //   <TableCell key={column.id} align={column.align}>
                            //     <IconButton
                            //       component={Link}
                            //       to={
                            //         'editar-competencia/' +
                            //         competencia.id_competencia
                            //       }
                            //       aria-label="edit"
                            //       size="small"
                            //     >
                            //       <EditIcon />
                            //     </IconButton>

                            //     <IconButton
                            //       onClick={() =>
                            //         handleDelete(
                            //           competencia.id_competencia,
                            //           !competencia.estado
                            //         )
                            //       }
                            //       aria-label="delete"
                            //       size="small"
                            //     >
                            //       {competencia.estado ? (
                            //         <ToggleOnIcon color="success" />
                            //       ) : (
                            //         <ToggleOffIcon color="error" />
                            //       )}
                            //     </IconButton>
                            //   </TableCell>
                            // );
                          }

                          const value = empleado[column.id];

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
                  data.empleados.length < itemsPorPagina
                    ? 1
                    : desde || hasta
                      ? data.empleados.length
                      : data.total
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
