import { Grid2, Typography } from '@mui/material';
import { BreadcrumbsCommons } from '../../commons/BreadcrumbsCommons';

export const CreateCandidate = () => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography variant="h6" gutterBottom>
            Create Candidate
          </Typography>
        </Grid2>
      </Grid2>
    </>
  );
};
