import { useState } from 'react';
import { useGetAllCompetenciasQuery } from '../../../../features/competencias/competenciasApiSlice';
import {
  Box,
  Button,
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
import DeleteIcon from '@mui/icons-material/Delete';

import { SkeletonLoading } from '../../../commons/SkeletonLoading';
import { Competencia } from '../../../../features/competencias/competenciasTypes';
import { Link } from 'react-router-dom';

export const ListadoCompetencia = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetAllCompetenciasQuery(
    {
      pages: page,
      limit: 5,
    },
    {
      refetchOnMountOrArgChange: true,
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

  const handleDelete = () => {
    console.log('eliminando');
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
                                  onClick={handleDelete}
                                  aria-label="delete"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            );
                          }

                          const value = competencia[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.formatBool && typeof value === 'boolean'
                                ? column.formatBool(value)
                                : value}
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
