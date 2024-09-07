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
import { Idioma } from '../../../../features/idiomas/idiomasTypes';
import {
  useGetAllIdiomasQuery,
  useUpdateIdiomaMutation,
} from '../../../../features/idiomas/idiomasApiSlice';

export const ListadoIdioma = () => {
  const [page, setPage] = useState<number>(1);

  const [actualizarIdioma] = useUpdateIdiomaMutation();

  const { data, isLoading, refetch } = useGetAllIdiomasQuery(
    {
      pages: page,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const columns: IColumnBasic<keyof Idioma>[] = [
    {
      id: 'id_idioma',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'nombre',
      headerName: 'Idioma',
      minWidth: 100,
    },
    {
      id: 'estado',
      headerName: 'Estado',
      minWidth: 100,
      formatBool(value) {
        return value ? 'Activo' : 'Inactivo';
      },
    },
    { id: 'action', headerName: 'Acciones', minWidth: 100 },
  ];

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: number, estado: boolean) => {
    await actualizarIdioma({ id, estado })
      .unwrap()
      .then((_response) => {
        enqueueSnackbar(
          `Idioma ${id} ${estado ? 'habilitada' : 'deshabilitada'}  correctamente`,
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
                    <TableCell align="center" colSpan={3}>
                      Idiomas
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        color="success"
                        component={Link}
                        to="crear-idioma"
                      >
                        Crear Idioma
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
                    {data.idiomas.map((idioma) => (
                      <TableRow
                        key={idioma.id_idioma}
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
                                  to={'editar-idioma/' + idioma.id_idioma}
                                  aria-label="edit"
                                  size="small"
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() =>
                                    handleDelete(
                                      idioma.id_idioma,
                                      !idioma.estado
                                    )
                                  }
                                  aria-label="delete"
                                  size="small"
                                >
                                  {idioma.estado ? (
                                    <ToggleOnIcon color="success" />
                                  ) : (
                                    <ToggleOffIcon color="error" />
                                  )}
                                </IconButton>
                              </TableCell>
                            );
                          }

                          const value = idioma[column.id];

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
