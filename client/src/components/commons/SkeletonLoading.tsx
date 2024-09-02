import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const SkeletonLoading = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Skeleton variant="rectangular" width={200} height={30} />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="text" />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="text" />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="text" />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="text" />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="rectangular" width={200} height={30} />
      </Grid>
      <Grid size={12}>
        <Skeleton variant="rectangular" width={200} height={30} />
      </Grid>
    </Grid>
  );
};
