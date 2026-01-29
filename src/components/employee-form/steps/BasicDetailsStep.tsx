import React from "react";
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Avatar,
  Card,
} from "@mui/material";
import {
  Badge,
  Email,
  CloudUpload,
  BusinessCenter,
  Group,
  Schedule,
} from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { EmployeeFormData } from "../../../types/EmployeeForm";
import FormSection from "../FormSection";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDesignationMaster,
  fetchJobRoles,
  fetchEmployee,
  fetchLeaveTemplates,
  fetchShifts,
  fetchBranches,
  fetchDepartments,
  fetchEmployeeId,
} from "../../../api/employee.api";

interface BasicDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const BasicDetailsStep: React.FC<BasicDetailsStepProps> = ({ formik }) => {
  const { values, handleChange, handleBlur, setFieldValue } = formik;
  const basicDetails = values.basicDetails;

  const { data: designationList = [] } = useQuery({
    queryKey: ["designationMaster"],
    queryFn: fetchDesignationMaster,
  });

  const { data: jobRoles = [] } = useQuery({
    queryKey: ["jobRoles"],
    queryFn: fetchJobRoles,
  });

  const { data: employees = [] } = useQuery({
  queryKey: ['employees'],
  queryFn: fetchEmployee,
});

  const { data: leaveTemplates = [] } = useQuery({
    queryKey: ['leaveTemplates'],
    queryFn: fetchLeaveTemplates,
  });

  const { data: shifts = [] } = useQuery({
    queryKey: ['shifts'],
    queryFn: fetchShifts,
  });

  const { data: branches = [] } = useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });

  const { data: employeeIds = '' } = useQuery({
    queryKey: ['employeeIds'],
    queryFn: fetchEmployeeId,
      });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("basicDetails.employeePhoto", file);
    }
  };

  return (
    <Box>
      <FormSection
        title="Employee Identification"
        icon={<Badge sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 60%", minWidth: 300 }}>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
              <Box sx={{ flex: "1 1 45%", minWidth: 200 }}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  name="basicDetails.employee_id"
                  defaultValue={employeeIds}
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Employee ID"
                  size="medium"
                />
              </Box>
              <Box sx={{ flex: "1 1 45%", minWidth: 200 }}>
                <TextField
                  fullWidth
                  label="Official Email"
                  name="basicDetails.email_id"
                  value={basicDetails.email_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="employee@company.com"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <Email sx={{ color: "#9CA3AF", mr: 1, fontSize: 20 }} />
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ flex: "0 0 100px" }}>
                <FormControl fullWidth>
                  <InputLabel>Title</InputLabel>
                  <Select
                    name="basicDetails.employee_title"
                    value={basicDetails.employee_title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Title"
                  >
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Ms.">Ms.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: "1 1 25%", minWidth: 150 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="basicDetails.first_name"
                  value={basicDetails.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                />
              </Box>
              <Box sx={{ flex: "1 1 25%", minWidth: 150 }}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="basicDetails.middle_name"
                  value={basicDetails.middle_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Middle Name"
                />
              </Box>
              <Box sx={{ flex: "1 1 25%", minWidth: 150 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="basicDetails.last_name"
                  value={basicDetails.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 250 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
                border: "2px dashed #E5E7EB",
                borderRadius: 3,
                minHeight: 200,
              }}
            >
              <Avatar
                src={
                  basicDetails.profile_picture
                    ? URL.createObjectURL(basicDetails.profile_picture)
                    : undefined
                }
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  bgcolor: "#4F5BD5",
                  fontSize: "2rem",
                  boxShadow: "0 4px 14px rgba(79,91,213,0.3)",
                }}
              >
                {basicDetails.first_name?.charAt(0) || "E"}
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload Employee Photo
              </Typography>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                size="small"
                sx={{
                  borderColor: "#4F5BD5",
                  color: "#4F5BD5",
                  "&:hover": {
                    borderColor: "#3A44B0",
                    backgroundColor: "rgba(79,91,213,0.05)",
                  },
                }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Button>
            </Card>
          </Box>
        </Box>
      </FormSection>

      <FormSection
        title="Job Information"
        icon={<BusinessCenter sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Select Designation</InputLabel>
              <Select
                name="basicDetails.designation_id"
                value={basicDetails.designation_id}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Select Designation"
              >
                {designationList?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.designation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Select Job Role</InputLabel>
              <Select
                name="basicDetails.job_role"
                value={basicDetails.job_role}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Select Job Role"
              >
                {jobRoles?.map((role) => (
                  <MenuItem key={role?.id} value={role?.id}>
                    {role?.job_role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </FormSection>

      <FormSection
        title="Reporting & Management"
        icon={<Group sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Reporting To</InputLabel>
              <Select
                name="basicDetails.reporting_to"
                value={basicDetails.reporting_to}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Reporting To"
              >
                 {employees?.map((emp) => (
    <MenuItem key={emp?.id} value={emp?.id}>
      {[emp?.first_name, emp?.middle_name, emp?.last_name]
        ?.filter(Boolean)
        ?.join(' ')}
    </MenuItem>
  ))}
              </Select>
            </FormControl>
          </Box>
       <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
  <Autocomplete
    multiple
    options={employees}
    getOptionLabel={(option) =>
      [option?.first_name, option?.middle_name, option?.last_name]
        ?.filter(Boolean)
        ?.join(' ')
    }
    value={employees?.filter((emp) =>
      basicDetails?.leave_auth_manager.includes(emp?.id)
    )}
    onChange={(_, selected) => {
      setFieldValue(
        'basicDetails.leave_auth_manager',
        selected.map((emp) => emp.id)
      );
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Leave Auth Manager"
        placeholder="Select Leave Auth Manager(s)"
        onBlur={handleBlur}
        fullWidth
      />
    )}
    isOptionEqualToValue={(option, value) => option.id === value.id}
  />
</Box>

        </Box>
      </FormSection>

      <FormSection
        title="Work Schedule & Location"
        icon={<Schedule sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: '1 1 45%', minWidth: 250 }}>
  <Autocomplete
    multiple
    options={leaveTemplates || []}
    getOptionLabel={(option) => option?.leave_template_name}
    isOptionEqualToValue={(option, value) => option?.id === value?.id}
    value={
      leaveTemplates?.filter((t) =>
        basicDetails?.leaveTemplate?.includes(t.id)
      ) || []
    }
    onChange={(_, selectedOptions) => {
      setFieldValue(
        'basicDetails.leaveTemplate',
        selectedOptions?.map((opt) => opt?.id)
      );
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Leave Template"
        placeholder="Select Leave Templates"
      />
    )}
  />
</Box>

          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Preferred Shift</InputLabel>
              <Select
                name="basicDetails.shift_type_id"
                value={basicDetails.shift_type_id}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Preferred Shift"
              >
                {shifts?.map((shifts) => (
                  <MenuItem key={shifts?.id} value={shifts?.id}>
                    {shifts?.shift_name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="basicDetails.hired_branch_id"
                value={basicDetails.hired_branch_id}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Branch"
              >
                 {branches?.map((branches) => (
                  <MenuItem key={branches?.id} value={branches?.id}>
                    {branches?.location_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="basicDetails.department"
                value={basicDetails.department}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Department"
              >
                  {departments?.map((department) => (
                  <MenuItem key={department?.id} value={department?.id}>
                    {department?.department}
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

export default BasicDetailsStep;
