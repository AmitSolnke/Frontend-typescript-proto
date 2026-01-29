import React,{useMemo} from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CalendarMonth, Assignment } from '@mui/icons-material';
import type { FormikProps } from 'formik';
import type { EmployeeFormData } from '../../../types/EmployeeForm';
import FormSection from '../FormSection';
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeConvention } from '../../../api/employee.api';

interface OtherDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const OtherDetailsStep: React.FC<OtherDetailsStepProps> = ({ formik }) => {
  const { values, handleChange, handleBlur } = formik;
  const otherDetails = values.otherDetails;

     const { data: employeeConventions = [] } = useQuery({
        queryKey: ["employeeConventions"],
        queryFn: fetchEmployeeConvention,
         retry: false,
      });
  
        const statusOptions = useMemo(
          () => employeeConventions.filter((item) => item.type === "separation_mode"),
          [employeeConventions],
        );

  return (
    <Box>
      <FormSection title="Employment Dates" icon={<CalendarMonth sx={{ fontSize: 20 }} />}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Date Of Joining"
              name="otherDetails.doj"
              value={otherDetails.doj}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Date Of Transfer"
              name="otherDetails.date_of_transfer"
              value={otherDetails.date_of_transfer}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Employee Reference"
              name="otherDetails.employee_reference"
              value={otherDetails.employee_reference}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter reference"
            />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Date Of Promotion"
              name="otherDetails.date_of_promotion"
              value={otherDetails.date_of_promotion}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Date Of Leaving"
              name="otherDetails.date_of_leaving"
              value={otherDetails.date_of_leaving}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <TextField
              fullWidth
              label="Notice Period (Days)"
              name="otherDetails.notice_period"
              value={otherDetails.notice_period}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., 30"
              type="number"
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection title="Employment Status" icon={<Assignment sx={{ fontSize: 20 }} />}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 30%', minWidth: 200 }}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="otherDetails.separation_mode"
                value={otherDetails.separation_mode}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Status"
              >
                  {statusOptions?.map((status) => (
                  <MenuItem key={status?.id} value={status?.values}>
                    {status?.values}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </FormSection>
    </Box>
  );
};

export default OtherDetailsStep;
