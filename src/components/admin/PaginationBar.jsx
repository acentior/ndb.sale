import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux';
// import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { set_Page } from '../../redux/actions/paginationAction';

export default function PaginationBar() {
  const dispatch = u