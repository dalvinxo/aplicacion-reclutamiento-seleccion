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
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import { SkeletonLoading } from '../../../commons/SkeletonLoading';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import {
  useGetAllPuestosQuery,
  useUpdatePuestoMutation,
} from '../../../../features/puestos/puestosApiSlice';
import { Puesto } from '../../../../features/puestos/puestosTypes';

export const ListadoPuesto = () => {
  const [page, setPage] = useState<number>(1);

  const [actualizarPuesto] = useUpdatePuestoMutation();

  const { data, isLoading, refetch } = useGetAllPuestosQuery(
    {
      pages: page,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const columns: IColumnBasic<keyof Puesto>[] = [
    {
      id: 'id_puesto',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'nombre',
      headerName: 'Puesto',
      minWidth: 80,
    },
    {
      id: 'nivel_riesgo',
      headerName: 'Riesgo',
      minWidth: 100,
    },
    {
      id: 'departamento',
      headerName: 'Departamento',
      minWidth: 100,
    },
    {
      id: 'estado',
      headerName: 'Estado',
      minWidth: 100,
      formatBool(value) {
        return value ? 'Vacante' : 'Lleno';
      },
    },
    { id: 'action', headerName: 'Acciones', minWidth: 100 },
  ];

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: number, estado: boolean) => {
    await actualizarPuesto({ id_puesto: id, estado })
      .unwrap()
      .then((_response) => {
        enqueueSnackbar(
          `Puesto ${id} ${estado ? 'disponible' : 'ocupado'}  correctamente`,
          {
            variant: estado ? 'success' : 'warning',
          }
        );
      })
      .catch((error: IException) => {
        enqueueSnackbar(error.data.message, {
          variant: 'error',
        });
      })
      .finally(() => {
        refetch();
      });
  };

  return (
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
                    <TableCell align="center" colSpan={4}>
                      Puestos
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <Button
                        variant="text"
                        color="success"
                        component={Link}
                        to="crear-puesto"
                      >
                        Crear Puesto
                      </Button>
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
                    {data.puestos.map((puesto) => (
                      <TableRow
                        key={puesto.id_puesto}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {columns.map((column) => {
                          if (column.id === 'action') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <IconButton
                                  component={Link}
                                  to={'editar-puesto/' + puesto.id_puesto}
                                  aria-label="edit"
                                  size="small"
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() =>
                                    handleDelete(
                                      puesto.id_puesto,
                                      !puesto.estado
                                    )
                                  }
                                  aria-label="delete"
                                  size="small"
                                >
                                  {puesto.estado ? (
                                    <ToggleOnIcon color="success" />
                                  ) : (
                                    <ToggleOffIcon color="error" />
                                  )}
                                </IconButton>
                              </TableCell>
                            );
                          }

                          const value = puesto[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.formatBool &&
                              typeof value === 'boolean' ? (
                                <Chip
                                  label={column.formatBool(value)}
                                  color={value ? 'primary' : 'secondary'}
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
  );
};
