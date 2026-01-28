import React, { useMemo } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  Button,
} from "@mui/material";
import {
  Phone,
  Home,
  CalendarMonth,
  CloudUpload,
  LocalHospital,
} from "@mui/icons-material";
import type { FormikProps } from "formik";
import type { EmployeeFormData } from "../../../types/EmployeeForm";
import FormSection from "../FormSection";
import {
  fetchCountry,
  fetchState,
  fetchCity,
  fetchEmployeeConvention,
} from "../../../api/employee.api";
import { useQuery } from "@tanstack/react-query";
import type { SelectChangeEvent } from "@mui/material/Select";

interface PersonalDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({
  formik,
}) => {
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    formik;
  const personalDetails = values.personalDetails;

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountry,
  });

  const { data: states = [] } = useQuery({
    queryKey: ["states"],
    queryFn: fetchState,
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCity,
  });

  const { data: employeeConventions = [] } = useQuery({
    queryKey: ["employeeConventions"],
    queryFn: fetchEmployeeConvention,
  });
  console.log(employeeConventions, "Employee Conventions");

  const handleSameAsContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setFieldValue("personalDetails.sameAsContact", checked);
    if (checked) {
      setFieldValue(
        "personalDetails.whatsappNumber",
        personalDetails.contactNumber,
      );
    }
  };

  const filteredStates = useMemo(() => {
    if (!personalDetails.country) return [];
    return states.filter(
      (state) => state.country_id === Number(personalDetails.country),
    );
  }, [states, personalDetails.country]);

  const filteredCities = useMemo(() => {
    if (!personalDetails.state) return [];
    return cities.filter(
      (city) => city.state_id === Number(personalDetails.state),
    );
  }, [cities, personalDetails.state]);

  const maritalStatusOptions = useMemo(
    () => employeeConventions.filter((item) => item.type === "marital_status"),
    [employeeConventions],
  );

  const bloodGroupOptions = useMemo(
    () => employeeConventions.filter((item) => item.type === "blood_group"),
    [employeeConventions],
  );

  const handleCountryChange = (event: SelectChangeEvent) => {
    const countryId = event.target.value;

    setFieldValue("personalDetails.country", countryId);
    setFieldValue("personalDetails.state", "");
    setFieldValue("personalDetails.city", "");
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    const stateId = event.target.value;

    setFieldValue("personalDetails.state", stateId);
    setFieldValue("personalDetails.city", "");
  };

  const handleSameAsPresentAddress = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    setFieldValue("personalDetails.sameAsPresentAddress", checked);
    if (checked) {
      setFieldValue(
        "personalDetails.permanentAddress",
        personalDetails.presentAddress,
      );
    }
  };

  return (
    <Box>
      <FormSection
        title="Contact Information"
        icon={<Phone sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <TextField
              fullWidth
              label="Contact Number"
              name="personalDetails.contactNumber"
              value={personalDetails.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter contact number"
              error={
                touched.personalDetails?.contactNumber &&
                Boolean(errors.personalDetails?.contactNumber)
              }
              helperText={
                touched.personalDetails?.contactNumber &&
                (errors.personalDetails?.contactNumber as string)
              }
            />
          </Box>
          <Box
            sx={{
              flex: "1 1 45%",
              minWidth: 250,
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            <TextField
              fullWidth
              label="WhatsApp Number"
              name="personalDetails.whatsappNumber"
              value={personalDetails.whatsappNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter WhatsApp number"
              disabled={personalDetails.sameAsContact}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalDetails.sameAsContact}
                  onChange={handleSameAsContact}
                  sx={{ color: "#4F5BD5" }}
                />
              }
              label="Same"
              sx={{ whiteSpace: "nowrap", mt: 1 }}
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <TextField
              fullWidth
              label="Emergency Contact Number"
              name="personalDetails.emergencyContactNumber"
              value={personalDetails.emergencyContactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter emergency contact"
              error={
                touched.personalDetails?.emergencyContactNumber &&
                Boolean(errors.personalDetails?.emergencyContactNumber)
              }
              helperText={
                touched.personalDetails?.emergencyContactNumber &&
                (errors.personalDetails?.emergencyContactNumber as string)
              }
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <TextField
              fullWidth
              label="Personal Email"
              name="personalDetails.personalEmail"
              value={personalDetails.personalEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="personal@email.com"
              type="email"
              error={
                touched.personalDetails?.personalEmail &&
                Boolean(errors.personalDetails?.personalEmail)
              }
              helperText={
                touched.personalDetails?.personalEmail &&
                (errors.personalDetails?.personalEmail as string)
              }
            />
          </Box>
        </Box>
      </FormSection>

      <FormSection
        title="Address Details"
        icon={<Home sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <TextField
              fullWidth
              label="Present Address"
              name="personalDetails.presentAddress"
              value={personalDetails.presentAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter present address"
              multiline
              rows={3}
            />
          </Box>
          <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalDetails.sameAsPresentAddress}
                  onChange={handleSameAsPresentAddress}
                  sx={{ color: "#4F5BD5" }}
                />
              }
              label="Same as Present Address"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Permanent Address"
              name="personalDetails.permanentAddress"
              value={personalDetails.permanentAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter permanent address"
              multiline
              rows={3}
              disabled={personalDetails.sameAsPresentAddress}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 3 }}>
          <Box sx={{ flex: "1 1 20%", minWidth: 150 }}>
            <TextField
              fullWidth
              label="Pincode"
              name="personalDetails.pincode"
              value={personalDetails.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter pincode"
            />
          </Box>
          <Box sx={{ flex: "1 1 20%", minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name="personalDetails.country"
                value={personalDetails.country}
                onChange={handleCountryChange}
                onBlur={handleBlur}
                label="Country"
              >
                {countries?.map((countries) => (
                  <MenuItem key={countries?.id} value={countries?.id}>
                    {countries?.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 20%", minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                name="personalDetails.state"
                value={personalDetails.state}
                onChange={handleStateChange}
                onBlur={handleBlur}
                label="State"
              >
                {filteredStates?.map((states) => (
                  <MenuItem key={states?.id} value={states?.id}>
                    {states?.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 20%", minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                name="personalDetails.city"
                value={personalDetails.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label="City"
              >
                {filteredCities?.map((cities) => (
                  <MenuItem key={cities?.id} value={cities?.id}>
                    {cities?.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </FormSection>

      <FormSection
        title="Personal Information"
        icon={<CalendarMonth sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="personalDetails.dateOfBirth"
              value={personalDetails.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              InputLabelProps={{ shrink: true }}
              error={
                touched.personalDetails?.dateOfBirth &&
                Boolean(errors.personalDetails?.dateOfBirth)
              }
              helperText={
                touched.personalDetails?.dateOfBirth &&
                (errors.personalDetails?.dateOfBirth as string)
              }
            />
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                name="personalDetails.gender"
                value={personalDetails.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio sx={{ color: "#4F5BD5" }} />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio sx={{ color: "#4F5BD5" }} />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio sx={{ color: "#4F5BD5" }} />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="personalDetails.maritalStatus"
                value={personalDetails.maritalStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Marital Status"
              >
                {maritalStatusOptions?.map((status) => (
                  <MenuItem key={status?.id} value={status?.values}>
                    {status?.values}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Blood Group</InputLabel>
              <Select
                name="personalDetails.bloodGroup"
                value={personalDetails.bloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Blood Group"
              >
                {bloodGroupOptions.map((group) => (
                  <MenuItem key={group?.id} value={group?.values}>
                    {group?.values}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Physically Handicapped
              </FormLabel>
              <RadioGroup
                row
                name="personalDetails.physicallyHandicapped"
                value={personalDetails.physicallyHandicapped}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio sx={{ color: "#4F5BD5" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio sx={{ color: "#4F5BD5" }} />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </FormSection>

      <FormSection
        title="Identity Documents"
        icon={<LocalHospital sx={{ fontSize: 20 }} />}
      >
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <TextField
              fullWidth
              label="Aadhar Card Number"
              name="personalDetails.aadharCardNumber"
              value={personalDetails.aadharCardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Aadhar number"
            />
          </Box>
          <Box sx={{ flex: "0 0 120px" }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{
                height: "56px",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": {
                  borderColor: "#4F5BD5",
                  backgroundColor: "rgba(79,91,213,0.05)",
                },
              }}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFieldValue(
                      "personalDetails.aadharCardPhoto",
                      e.target.files[0],
                    );
                  }
                }}
              />
            </Button>
          </Box>
          <Box sx={{ flex: "1 1 30%", minWidth: 200 }}>
            <TextField
              fullWidth
              label="PAN Number"
              name="personalDetails.panNumber"
              value={personalDetails.panNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter PAN number"
            />
          </Box>
          <Box sx={{ flex: "0 0 120px" }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{
                height: "56px",
                borderColor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": {
                  borderColor: "#4F5BD5",
                  backgroundColor: "rgba(79,91,213,0.05)",
                },
              }}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/*,.pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFieldValue(
                      "personalDetails.panCardPhoto",
                      e.target.files[0],
                    );
                  }
                }}
              />
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{
              height: "56px",
              borderColor: "#E5E7EB",
              color: "#6B7280",
              "&:hover": {
                borderColor: "#4F5BD5",
                backgroundColor: "rgba(79,91,213,0.05)",
              },
            }}
          >
            Upload Other Attachments
            <input
              type="file"
              hidden
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFieldValue(
                    "personalDetails.attachments",
                    e.target.files[0],
                  );
                }
              }}
            />
          </Button>
        </Box>
      </FormSection>
    </Box>
  );
};

export default PersonalDetailsStep;
