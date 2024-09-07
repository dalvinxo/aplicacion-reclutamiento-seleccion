import { useState } from 'react';
import { useGetAllVacantesQuery } from '../../../features/puestos/puestosApiSlice';
import { SpinnerCircularProgress } from '../../commons/SpinnerCircularProgress';
import { PuestoList } from './PuestoList';
import { Box, Pagination } from '@mui/material';

export const Home = () => {
  const [page, setPage] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useGetAllVacantesQuery(
    {
      pages: page,
      limit: 6,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      {isLoading && <SpinnerCircularProgress />}
      {data && (
        <>
          <PuestoList puestos={data} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}
          >
            <Pagination
              count={data.totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </>
  );
};
