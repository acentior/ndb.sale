import * as React from 'react';
import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

export default function PaginationBar() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} m={1}>
      <Pagination count={10} page={page} onChange={handleChange} siblingCount={1} boundaryCount={1} showFirstButton showLastButton />
    </Stack>
  );
}