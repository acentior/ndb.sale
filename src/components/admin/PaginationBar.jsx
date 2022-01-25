import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux';
// import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { set_Page } from '../../redux/actions/paginationAction';

export default function PaginationBar() {
  const dispatch = useDispatch();
  const { page, limit, total } = useSelector(state => state.pagination);
  
  const setPage = (event, value) => {
    dispatch(set_Page(Number(value), limit));
  };

  return (
    <Stack spacing={2} m={1}>
      <Pagination count={Math.ceil(total / limit)} page={page} onChange={setPage} siblingCount={1} boundaryCount={1} showFirstButton showLastButton />
    </Stack>
  );
}