/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEmployeeData } from '../../api/employee.api';
import moment from 'moment';
import { Button, Typography } from '@mui/material';


const EmployeeGrid: React.FC = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['employeeData'],
    queryFn: fetchAllEmployeeData,
  });

  console.log('Employee Data:', data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    mb: 2,
    gap: 4
  }}
>
  <Typography variant="h6">Employee Master</Typography>

  <Button to="/createemployee"  component={Link} variant="contained" startIcon={<>+</>}>
    Create Employee
  </Button>
</Box>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Sr</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Updated By</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row: any, index: number) => (
            <TableRow key={row.id}>
              {/* Action */}
              <TableCell sx={{display:'flex'}}>
                <IconButton
                  component={Link}
                  to={`/editEmployeeForm/${row.id}`}
                  state={{ mode: 'edit' }}
                >
                  <EditIcon color="success" />
                </IconButton>

                {/* <IconButton
                  component={Link}
                  to={`/editEmployeeForm/${row.id}`}
                  state={{ mode: 'view' }}
                >
                  <VisibilityIcon color="primary" />
                </IconButton> */}
              </TableCell>

              {/* Sr */}
              <TableCell>{index + 1}</TableCell>

              {/* Employee ID */}
              <TableCell>{row.employee_id ?? '--'}</TableCell>

              {/* Name */}
              <TableCell sx={{ color: '#f19828', fontWeight: 500 }}>
                {row.name ?? '--'}
              </TableCell>

              {/* Status */}
              <TableCell>
                <Chip
                  label={row.is_active === 1 ? 'Active' : 'Deactive'}
                  color={row.is_active === 1 ? 'primary' : 'error'}
                  size="small"
                />
              </TableCell>

              {/* Created At */}
              <TableCell>
                {row.created_at
                  ? moment(row.created_at).format('MM/DD/YYYY HH:mm:ss')
                  : '--'}
              </TableCell>

              {/* Created By */}
              <TableCell>{row.created_by ?? '--'}</TableCell>

              {/* Updated At */}
              <TableCell>
                {row.updated_at
                  ? moment(row.updated_at).format('MM/DD/YYYY HH:mm:ss')
                  : '--'}
              </TableCell>

              {/* Updated By */}
              <TableCell>{row.updated_by ?? '--'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default EmployeeGrid;
