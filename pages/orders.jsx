/**
 * Copyright 2023-present Mesh Connect, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, TableFooter, TablePagination, AppBar, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

function OrdersDashboard() {
  const SHOPIFY_ADMIN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_DOMAIN;
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [page, setPage] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const payload = await response.json();

        const newOrders = payload.data.orders.edges.map((edge) => edge.node);
        setOrders(newOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [page]);

  if (loadingOrders) {
    return <CircularProgress />;
  }

  const rowsPerPage = 20;
  const headers = ['Order ID', 'Order Name', 'Order Date', 'Status'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentPageOrders = orders.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      <AppBar position="static">
        <Header />
      </AppBar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Orders table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.secondary.main }}>
              {headers.map((header) => (
                <TableCell key={header} style={{ color: 'black' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageOrders.map((order, index) => {
              const orderId = order.id.split('/').pop();

              return (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor:
                      index % 2
                        ? theme.palette.background.default
                        : theme.palette.background.paper,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>
                    <a
                      href={`${SHOPIFY_ADMIN}/orders/${orderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                      }}
                    >
                      {orderId}
                    </a>
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>{order.displayFinancialStatus}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={headers.length} style={{ padding: 0 }}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    width: '100%',
                  }}
                >
                  <TablePagination
                    rowsPerPageOptions={[rowsPerPage]}
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    component="div"
                    sx={{
                      '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon, .MuiTablePagination-input, .MuiTablePagination-actions':
                        {
                          color: 'black',
                        },
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

OrdersDashboard.propTypes = {
  tab: PropTypes?.number,
  showTable: PropTypes?.bool,
  setShowTable: PropTypes?.func,
  message: PropTypes?.string,
  page: PropTypes?.number,
  setPage: PropTypes?.func,
  setLoadingOrders: PropTypes?.func,
};

export default OrdersDashboard;
