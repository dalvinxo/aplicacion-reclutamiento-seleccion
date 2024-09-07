import { useState } from 'react';
import {
  useGetAllCompetenciasQuery,
  useUpdateCompetenciaMutation,
} from '../../../../features/competencias/competenciasApiSlice';
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
import { Competencia } from '../../../../features/competencias/competenciasTypes';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export const ListadoCompetencia = () => {
  const [page, setPage] = useState<number>(1);

  const [actualizarCompetencia] = useUpdateCompetenciaMutation();

  const { data, isLoading, refetch } = useGetAllCompetenciasQuery(
    {
      pages: page,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const columns: IColumnBasic<keyof Competencia>[] = [
    {
      id: 'id_competencia',
      headerName: 'ID',
      minWidth: 30,
    },
    {
      id: 'descripcion',
      headerName: 'Descripción',
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDelete = async (id: number, estado: boolean) => {
    await actualizarCompetencia({ id, estado })
      .unwrap()
      .then((response) => {
        enqueueSnackbar(
          `Competencia ${id} ${estado ? 'habilitada' : 'deshabilitada'}  correctamente`,
          {
            variant: 'success',
          }
        );
      })
      .catch((error: IException) => {
        enqueueSnackbar(error.data.message, {
          variant: 'success',
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
                      Competencias
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        color="success"
                        component={Link}
                        to="crear-competencia"
                      >
                        Crear Competencia
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
                    {data.competencias.map((competencia, index) => (
                      <TableRow
                        key={competencia.id_competencia}
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
                                  to={
                                    'editar-competencia/' +
                                    competencia.id_competencia
                                  }
                                  aria-label="edit"
                                  size="small"
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() =>
                                    handleDelete(
                                      competencia.id_competencia,
                                      !competencia.estado
                                    )
                                  }
                                  aria-label="delete"
                                  size="small"
                                >
                                  {competencia.estado ? (
                                    <ToggleOnIcon color="success" />
                                  ) : (
                                    <ToggleOffIcon color="error" />
                                  )}
                                </IconButton>
                              </TableCell>
                            );
                          }

                          const value = competencia[column.id];

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
