import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
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
import { useGetAllEmpleadosFilterQuery } from '../../../../features/empleados/empleadosApiSlice';
import { Empleado } from '../../../../features/empleados/empleadosTypes';
import moment from 'moment';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { ReporteEmpleados } from './ReporteEmpleados';

export const ListadoEmpleados = () => {
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

  const handleReporte = async () => {
    if (!data || !data.empleados) return;

    const blob = await pdf(
      <ReporteEmpleados
        empleados={data.empleados}
        desde={desde}
        hasta={hasta}
      />
    ).toBlob();

    saveAs(blob, 'reporte_empleados.pdf');
  };

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
                  onClick={handleReporte}
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
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            {data && (
              <>
                <Pagination
                  count={
                    data.empleados.length < itemsPorPagina
                      ? 1
                      : desde || hasta
                        ? data.empleados.length
                        : data.totalPages
                  }
                  page={page}
                  onChange={handleChange}
                  color="primary"
                />

                <TextField
                  select
                  fullWidth
                  sx={{ maxWidth: '10rem' }}
                  label="Candida de filas"
                  defaultValue={itemsPorPagina}
                  onChange={(e) => {
                    setItemsPorPagina(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </TextField>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};
