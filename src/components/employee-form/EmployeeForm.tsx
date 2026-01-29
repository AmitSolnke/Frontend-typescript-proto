import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Fade,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import  { Formik, Form } from 'formik';
import type { FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  ArrowBack,
  ArrowForward,
  Save,
  PersonAdd,
} from '@mui/icons-material';

import { muiTheme } from '../../theme/muiTheme';
import type { EmployeeFormData } from '../../types/EmployeeForm';
import { initialFormData } from '../../types/EmployeeForm';
import StepperHeader from './StepperHeader';
import BasicDetailsStep from './steps/BasicDetailsStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import EducationalDetailsStep from './steps/EducationDetailsStep';
import ProfessionalDetailsStep from './steps/ProfessionalDetailsStep';
import FamilyDetailsStep from './steps/FamilyDetailsStep';
import OtherDetailsStep from './steps/OtherDetailsStep';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postEmployeeData, updateEmployeeData,fetchEmployeeId } from '../../api/employee.api';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEmployeeDataById } from '../../api/employee.api';
import { mapEmployeeToFormValues } from './mapEmployeeToFormValues';

const steps = [
  'Basic Details',
  'Personal Details',
  'Educational Details',
  'Professional Details',
  'Family Details',
  'Others',
];

// Validation schemas for each step (except first step as requested)
// const personalDetailsSchema = Yup.object().shape({
//   personalDetails: Yup.object().shape({
//     contactNumber: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
//       .required('Contact number is required'),
//     personalEmail: Yup.string().email('Invalid email format'),
//     dateOfBirth: Yup.string().required('Date of birth is required'),
//     emergencyContactNumber: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Emergency contact must be 10 digits'),
//   }),
// });

// const educationalDetailsSchema = Yup.object().shape({
//   educationalDetails: Yup.object().shape({
//     educations: Yup.array().of(
//       Yup.object().shape({
//         course_name: Yup.string().required('Qualification is required'),
//         university: Yup.string().required('University is required'),
//         passing_year: Yup.string().required('Passing year is required'),
//       })
//     ),
//   }),
// });

// const professionalDetailsSchema = Yup.object().shape({
//   professionalDetails: Yup.object().shape({
//     experiences: Yup.array().of(
//       Yup.object().shape({
//         previousCompany: Yup.string().required('Previous company is required'),
//         designation: Yup.string().required('Designation is required'),
//       })
//     ),
//   }),
// });

// const familyDetailsSchema = Yup.object().shape({
//   familyDetails: Yup.object().shape({
//     emergencyContactName: Yup.string().required('Emergency contact name is required'),
//     emergencyContactRelation: Yup.string().required('Relationship is required'),
//   }),
// });

const otherDetailsSchema = Yup.object().shape({
  otherDetails: Yup.object().shape({
    bankName: Yup.string().required('Bank name is required'),
    accountNumber: Yup.string().required('Account number is required'),
    ifscCode: Yup.string().required('IFSC code is required'),
  }),
});



const validationSchemas = [
  null, // No validation for Basic Details
  null,
  null,
  null,
  null,
  otherDetailsSchema,
];

const EmployeeForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
const queryClient = useQueryClient();
  const navigate = useNavigate();

  const formikRef = useRef<FormikProps<EmployeeFormData>>(null);

  const { id } = useParams();
const location = useLocation();
const mode = location.state?.mode ?? 'create';

const { data: employeeData, isLoading } = useQuery({
  queryKey: ['employeeById', id],
  queryFn: () => getEmployeeDataById(id!),
  enabled: !!id, // 🔥 important (runs only for edit/view)
});

 const { data: employeeIds = '' } = useQuery({
    queryKey: ['employeeIds'],
    queryFn: fetchEmployeeId,
     retry: false,
      });
console.log(employeeData,"employeeData")
console.log(mode, "mode")

const { mutate: createEmployee } = useMutation({
  mutationFn: postEmployeeData,
  onSuccess: (res) => {
    setSnackbar({
      open: true,
      message: res?.message || 'Employee created successfully',
      severity: 'success',
    });

    queryClient.invalidateQueries({ queryKey: ['employeeData'] });

    // redirect after short delay (better UX)
    setTimeout(() => {
      navigate('/employee');
    }, 1000);
  },
  onError: () => {
    setSnackbar({
      open: true,
      message: 'Failed to create employee',
      severity: 'error',
    });
  },
});

const { mutate: updateEmployee } = useMutation({
  mutationFn: updateEmployeeData,
  onSuccess: (res) => {
    console.log(res,"res>>>>>")
    setSnackbar({
      open: true,
      message: res?.message || 'Employee updated successfully',
      severity: 'success',
    });

    queryClient.invalidateQueries({ queryKey: ['employeeData'] });

    setTimeout(() => {
      navigate('/employee');
    }, 1000);
  },
  onError: () => {
    setSnackbar({
      open: true,
      message: 'Failed to update employee',
      severity: 'error',
    });
  },
});

  const handleNext = async (formik: FormikProps<EmployeeFormData>) => {
    const currentSchema = validationSchemas[activeStep];
    
    if (currentSchema) {
      try {
        await currentSchema.validate(formik.values, { abortEarly: false });
        setActiveStep((prevStep) => prevStep + 1);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors: Record<string, unknown> = {};
          err.inner.forEach((e) => {
            if (e.path) {
              const pathParts = e.path.split('.');
              let current: Record<string, unknown> = errors;
              for (let i = 0; i < pathParts.length - 1; i++) {
                if (!current[pathParts[i]]) {
                  current[pathParts[i]] = {};
                }
                current = current[pathParts[i]] as Record<string, unknown>;
              }
              current[pathParts[pathParts.length - 1]] = e.message;
            }
          });
          formik.setErrors(errors);
          formik.setTouched(
            Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
          );
          setSnackbar({
            open: true,
            message: 'Please fill in all required fields correctly',
            severity: 'error',
          });
        }
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (values: EmployeeFormData) => {
    console.log('Form submitted:', values);
    const payLoad = {
      employee_id: values.basicDetails.employee_id,
      employee_title: values.basicDetails.employee_title,
      first_name: values.basicDetails.first_name,
      middle_name: values.basicDetails.middle_name,
      last_name: values.basicDetails.last_name,
      email_id: values.basicDetails.email_id,
      profile_picture: values.basicDetails.profile_picture,
      designation_id: values.basicDetails.designation_id,
      job_role: String(values.basicDetails.job_role),
      reporting_to: values.basicDetails.reporting_to,
      leave_auth_manager: values.basicDetails.leave_auth_manager,
      leave_template: values.basicDetails.leaveTemplate,
      shift_type_id: values.basicDetails.shift_type_id,
      hired_branch_id: values.basicDetails.hired_branch_id,
      department: values.basicDetails.department,
      is_active: 1,
      contact_no: values.personalDetails.contact_no,
      whats_app_contact_no: values.personalDetails.whats_app_contact_no,
      sameAsContact: values.personalDetails.sameAsContact,
      present_address: values.personalDetails.present_address,
      permanent_address: values.personalDetails.permanent_address,
      sameAsPresentAddress: values.personalDetails.sameAsPresentAddress,
      pincode: values.personalDetails.pincode,
      country_id: String(values.personalDetails.country_id),
      state_id: String(values.personalDetails.state_id),
      city_id: String(values.personalDetails.city_id),
      emergency_contact: values.personalDetails.emergency_contact,
      personal_email_id: values.personalDetails.personal_email_id,
      dob: values.personalDetails.dob,
      gender: values.personalDetails.gender,
      blood_group: values.personalDetails.blood_group,
      marital_status: values.personalDetails.marital_status,
      aadhar_no: values.personalDetails.aadhar_no,
      aadhar_photo: values.personalDetails.aadhar_photo,
      pan_no: values.personalDetails.pan_no,
      physically_handicapped: values.personalDetails.physically_handicapped,
       educational_details: values.educationalDetails.educations,
       professional_details: values.professionalDetails.experiences,
       family_details: values.familyDetails.familyMembers,
       doj: values.otherDetails.doj,
       date_of_transfer: values.otherDetails.date_of_transfer,
       employee_reference: values.otherDetails.employee_reference,
       date_of_promotion: values.otherDetails.date_of_promotion,
       date_of_leaving: values.otherDetails.date_of_leaving,
       notice_period: values.otherDetails.notice_period,
       separation_mode: values.otherDetails.separation_mode,

    }
    console.log('Payload for submission:', payLoad);
    if(mode === "edit"){
       updateEmployee({id, payload: payLoad})
    }else{
       createEmployee(payLoad);
    }
   
    // setSnackbar({
    //   open: true,
    //   message: 'Employee created successfully!',
    //   severity: 'success',
    // });
  };

  useEffect(() => {
  if (mode === 'edit' && employeeData) {
    formikRef.current?.setValues(
      mapEmployeeToFormValues(employeeData)
    );
  }
}, [employeeData, mode]);


useEffect(() => {
  if (mode === 'create' && employeeIds) {
    formikRef.current?.setFieldValue(
      'basicDetails.employee_id',
      employeeIds
    );
  }
}, [employeeIds, mode]);


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const renderStepContent = (step: number, formik: FormikProps<EmployeeFormData>) => {
    switch (step) {
      case 0:
        return <BasicDetailsStep formik={formik} />;
      case 1:
        return <PersonalDetailsStep formik={formik} />;
      case 2:
        return <EducationalDetailsStep formik={formik} />;
      case 3:
        return <ProfessionalDetailsStep formik={formik} />;
      case 4:
        return <FamilyDetailsStep formik={formik} />;
      case 5:
        return <OtherDetailsStep formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F5F7FA 0%, #E4E8EE 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 4,
  }}
>
  {/* Left: Back + Title */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {/* Back Button */}
    <IconButton
      onClick={() => navigate('/employee')}
      sx={{
        border: '1px solid #E0E3EB',
        borderRadius: 2,
      }}
    >
      <ArrowBack />
    </IconButton>

    {/* Icon */}
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(79,91,213,0.4)',
      }}
    >
      <PersonAdd sx={{ color: '#fff', fontSize: 28 }} />
    </Box>

    {/* Title */}
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Create Employee
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Fill in the details to add a new employee
      </Typography>
    </Box>
  </Box>
</Box>


          {/* Stepper Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <CardContent sx={{ px: 4 }}>
              <StepperHeader activeStep={activeStep} steps={steps} />
            </CardContent>
          </Card>

          {/* Form Content Card */}
          <Formik
           innerRef={formikRef}
            initialValues={initialFormData}
            //  enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    minHeight: 500,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Fade in={true} key={activeStep}>
                      <Box>{renderStepContent(activeStep, formik)}</Box>
                    </Fade>
                  </CardContent>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 3,
                      borderTop: '1px solid #E5E7EB',
                      background: '#FAFBFC',
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      startIcon={<ArrowBack />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderColor: '#E5E7EB',
                        color: '#6B7280',
                        '&:hover': {
                          borderColor: '#4F5BD5',
                          backgroundColor: 'rgba(79,91,213,0.05)',
                        },
                        '&:disabled': {
                          borderColor: '#E5E7EB',
                          color: '#D1D5DB',
                        },
                      }}
                    >
                      Previous
                    </Button>

                    <Typography
                      variant="body2"
                      sx={{ color: '#9CA3AF', fontWeight: 500 }}
                    >
                      Step {activeStep + 1} of {steps.length}
                    </Typography>

                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        type="button"
                        onClick={()=>handleSubmit(formik?.values)}
                        startIcon={<Save />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
                          boxShadow: '0 4px 14px rgba(34,197,94,0.4)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
                          },
                        }}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                       type="button"
                        variant="contained"
                        onClick={() => handleNext(formik)}
                        endIcon={<ArrowForward />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: 'linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)',
                          boxShadow: '0 4px 14px rgba(79,91,213,0.4)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #3A44B0 0%, #5A66D5 100%)',
                          },
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default EmployeeForm;
