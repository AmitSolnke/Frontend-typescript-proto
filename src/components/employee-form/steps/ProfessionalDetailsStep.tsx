import React from 'react';
import {
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Tooltip,
} from '@mui/material';
import { Add, Delete, Work } from '@mui/icons-material';
import type { FormikProps } from 'formik';
import { FieldArray } from 'formik';
import type { EmployeeFormData } from '../../../types/EmployeeForm';
import FormSection from '../FormSection';

interface ProfessionalDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const ProfessionalDetailsStep: React.FC<ProfessionalDetailsStepProps> = ({ formik }) => {
  const { values, handleChange, handleBlur } = formik;
  const professionalDetails = values.professionalDetails;

  return (
    <Box>
      <FormSection title="Previous Experience" icon={<Work sx={{ fontSize: 20 }} />}>
        <FieldArray name="professionalDetails.experiences">
          {({ push, remove }) => (
            <Box>
              {professionalDetails.experiences.map((experience, index) => (
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
                        Experience #{index + 1}
                      </Typography>
                      {professionalDetails.experiences.length > 1 && (
                        <Tooltip title="Remove Experience">
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
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="Company"
                          name={`professionalDetails.experiences.${index}.company`}
                          value={experience.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter company name"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="Designation"
                          name={`professionalDetails.experiences.${index}.designation`}
                          value={experience.designation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter designation"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="City"
                          name={`professionalDetails.experiences.${index}.city`}
                          value={experience.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter city"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="Experience (Years)"
                          name={`professionalDetails.experiences.${index}.experience`}
                          value={experience.experience}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g., 2"
                          type="number"
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="From Date"
                          name={`professionalDetails.experiences.${index}.from_date`}
                          value={experience.from_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 22%', minWidth: 180 }}>
                        <TextField
                          fullWidth
                          label="To Date"
                          name={`professionalDetails.experiences.${index}.to_date`}
                          value={experience.to_date}
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
                <Tooltip title="Add Another Experience">
                  <IconButton
                    onClick={() =>
                      push({
                        previousCompany: '',
                        previousDesignation: '',
                        city: '',
                        experience: '',
                        fromDate: '',
                        toDate: '',
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

export default ProfessionalDetailsStep;
