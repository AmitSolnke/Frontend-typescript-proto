import React, {useMemo} from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardContent,
  Typography,
  Tooltip,
} from '@mui/material';
import { Add, Delete, FamilyRestroom } from '@mui/icons-material';
import type { FormikProps } from 'formik';
import { FieldArray } from 'formik';
import type { EmployeeFormData } from '../../../types/EmployeeForm';
import FormSection from '../FormSection';
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeConvention } from '../../../api/employee.api';

interface FamilyDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const FamilyDetailsStep: React.FC<FamilyDetailsStepProps> = ({ formik }) => {
  const { values, handleChange, handleBlur } = formik;
  const familyDetails = values.familyDetails;

   const { data: employeeConventions = [] } = useQuery({
      queryKey: ["employeeConventions"],
      queryFn: fetchEmployeeConvention,
       retry: false,
    });

      const relationOptions = useMemo(
        () => employeeConventions.filter((item) => item.type === "relation"),
        [employeeConventions],
      );

  return (
    <Box>
      <FormSection title="Family Members" icon={<FamilyRestroom sx={{ fontSize: 20 }} />}>
        <FieldArray name="familyDetails.familyMembers">
          {({ push, remove }) => (
            <Box>
              {familyDetails.familyMembers.map((member, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    border: '1px solid #E5E7EB',
                    boxShadow: 'none',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#4F5BD5',
                      boxShadow: '0 4px 12px rgba(79,91,213,0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#4F5BD5',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </Box>
                        Family Member #{index + 1}
                      </Typography>
                      {familyDetails.familyMembers.length > 1 && (
                        <Tooltip title="Remove Member">
                          <IconButton
                            onClick={() => remove(index)}
                            sx={{
                              color: '#EF4444',
                              '&:hover': {
                                backgroundColor: 'rgba(239,68,68,0.1)',
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Box sx={{ flex: '1 1 25%', minWidth: 180 }}>
                        <FormControl fullWidth>
                          <InputLabel>Relation</InputLabel>
                          <Select
                            name={`familyDetails.familyMembers.${index}.relation`}
                            value={member.relation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Relation"
                          >
                              {relationOptions?.map((status) => (
                                             <MenuItem key={status?.id} value={status?.values}>
                                               {status?.values}
                                             </MenuItem>
                                           ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ flex: '1 1 35%', minWidth: 200 }}>
                        <TextField
                          fullWidth
                          label="Name"
                          name={`familyDetails.familyMembers.${index}.relative_name`}
                          value={member.relative_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter name"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 25%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="Date Of Birth"
                          name={`familyDetails.familyMembers.${index}.dob`}
                          value={member.dob}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Tooltip title="Add Family Member">
                  <IconButton
                    onClick={() =>
                      push({
                        relation: '',
                        name: '',
                        dateOfBirth: '',
                      })
                    }
                    sx={{
                      width: 56,
                      height: 56,
                      background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(79,91,213,0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3A44B0 0%, #5A66D5 100%)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Add sx={{ fontSize: 28 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </FieldArray>
      </FormSection>
    </Box>
  );
};

export default FamilyDetailsStep;
