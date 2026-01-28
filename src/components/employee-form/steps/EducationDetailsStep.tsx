import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { Add, Delete, School } from "@mui/icons-material";
import type { FormikProps } from "formik";
import { FieldArray } from "formik";
import type { EmployeeFormData } from "../../../types/EmployeeForm";
import FormSection from "../FormSection";

interface EducationalDetailsStepProps {
  formik: FormikProps<EmployeeFormData>;
}

const EducationalDetailsStep: React.FC<EducationalDetailsStepProps> = ({
  formik,
}) => {
  const { values, handleChange, handleBlur } = formik;
  const educationalDetails = values.educationalDetails;

  return (
    <Box>
      <FormSection
        title="Educational Qualifications"
        icon={<School sx={{ fontSize: 20 }} />}
      >
        <FieldArray name="educationalDetails.educations">
          {({ push, remove }) => (
            <Box>
              {educationalDetails.educations.map((education, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                    position: "relative",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#4F5BD5",
                      boxShadow: "0 4px 12px rgba(79,91,213,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: "#4F5BD5",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </Box>
                        Education #{index + 1}
                      </Typography>
                      {educationalDetails.educations.length > 1 && (
                        <Tooltip title="Remove Education">
                          <IconButton
                            onClick={() => remove(index)}
                            sx={{
                              color: "#EF4444",
                              "&:hover": {
                                backgroundColor: "rgba(239,68,68,0.1)",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                      <Box sx={{ flex: "1 1 22%", minWidth: 200 }}>
                        <TextField
                          fullWidth
                          label="Highest Qualification"
                          name={`educationalDetails.educations.${index}.course_name`}
                          value={education.course_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter highest qualification"
                        />
                      </Box>

                      <Box sx={{ flex: "1 1 22%", minWidth: 200 }}>
                        <TextField
                          fullWidth
                          label="University/Institute"
                          name={`educationalDetails.educations.${index}.university`}
                          value={education.university}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter university name"
                        />
                      </Box>

                      <Box sx={{ flex: "1 1 22%", minWidth: 200 }}>
                        <TextField
                          fullWidth
                          label="Passing Year"
                          name={`educationalDetails.educations.${index}.passing_year`}
                          value={education.passing_year}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="YYYY"
                          type="number"
                          inputProps={{
                            min: 1900,
                            max: new Date().getFullYear(),
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: "1 1 22%", minWidth: 200 }}>
                        <TextField
                          fullWidth
                          label="Grade/Percentage"
                          name={`educationalDetails.educations.${index}.grade`}
                          value={education.grade}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter grade or percentage"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Tooltip title="Add Another Education">
                  <IconButton
                    onClick={() =>
                      push({
                        highestQualification: "",
                        university: "",
                        passingYear: "",
                        grade: "",
                      })
                    }
                    sx={{
                      width: 56,
                      height: 56,
                      background:
                        "linear-gradient(135deg, #4F5BD5 0%, #7B84E4 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(79,91,213,0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #3A44B0 0%, #5A66D5 100%)",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.2s ease",
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

export default EducationalDetailsStep;
