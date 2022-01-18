import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box m={3} sx={{textAlign: 'center'}}>
      <CircularProgress />
      <p>Loading . . .</p>
    </Box>
  );
}