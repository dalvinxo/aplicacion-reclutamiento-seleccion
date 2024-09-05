import { useState } from 'react';
import { useGetAllCompetenciasQuery } from '../../../../features/competencias/competenciasApiSlice';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { SkeletonLoading } from '../../../commons/SkeletonLoading';
import { Competencia } from '../../../../features/competencias/competenciasTypes';

export const Competencias = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { data, isLoading } = useGetAllCompetenciasQuery(
    {
      pages: page,
      limit: rowsPerPage,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const columns: IColumnBasic<keyof Competencia>[] = [
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

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
          }}
          padding={3}
        >
          <Paper sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Competencias
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">#</TableCell>
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
                        <TableCell align="center">{index + 1}</TableCell>
                        {columns.map((column) => {
                          if (column.id === 'action') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                Edit | Delete
                              </TableCell>
                            );
                          }
                          console.log(competencia);

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
            {data && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.totalPages}
                rowsPerPage={data.limit}
                page={page}
                onPageChange={handleChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </Box>
      )}
    </>
  );
};
