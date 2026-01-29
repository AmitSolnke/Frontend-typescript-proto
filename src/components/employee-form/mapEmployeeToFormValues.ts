import type { EmployeeFormData } from '../../types/EmployeeForm';

export const mapEmployeeToFormValues = (data): EmployeeFormData => ({
  basicDetails: {
    employee_id: data?.employee_details?.emp_id ?? '',
    employee_title: data?.employee_details?.employee_title ?? '',
    first_name: data.first_name ?? '',
    middle_name: data.middle_name ?? '',
    last_name: data.last_name ?? '',
    email_id: data.email_id ?? '',
    profile_picture: data.profile_picture ?? '',
    designation_id: data.designation_id ?? '',
    job_role: data.job_role ?? '',
    reporting_to: data.reporting_to_id ?? '',
    leave_auth_manager: data.leave_auth_managers?.map((m) => m.id) ?? [],
    leaveTemplate: data?.leave_templates?.map((m) => m.leave_template_id) ?? [],
    shift_type_id: data.shift_type_id ?? '',
    hired_branch_id: data.branch_id ?? '',
    department: data.department_id ?? '',
  },

  personalDetails: {
    contact_no: data.contact_no ?? '',
    whats_app_contact_no: data.whats_app_contact_no ?? '',
    sameAsContact: false,
    present_address: data?.employee_details?.present_address ?? '',
    permanent_address: data?.employee_details?.permanent_address ?? '',
    sameAsPresentAddress: false,
    pincode: data.pincode ?? '',
    country_id: data.country_id ?? '',
    state_id: data.state_id ?? '',
    city_id: data.city_id ?? '',
    emergency_contact: data?.employee_details?.emergency_contact ?? '',
    personal_email_id: data?.employee_details?.personal_email_id ?? '',
    dob: data?.employee_details?.dob ?? '',
    gender: data?.gender ?? '',
    blood_group: data?.employee_details?.blood_group ?? '',
    marital_status: data?.employee_details?.marital_status ?? '',
    aadhar_no: data?.employee_details?.aadhar_no ?? '',
    aadhar_photo: data?.employee_details?.aadhar_photo ?? '',
    pan_no: data?.employee_details?.pan_no ?? '',
    physically_handicapped: data?.employee_details?.physically_handicapped == 1 ? 'YES' : 'NO',
  },

  educationalDetails: {
    educations: data.educational_details?.length
      ? data.educational_details
      : [
          {
            course_name: '',
            university: '',
            passing_year: '',
            grade: '',
          },
        ],
  },

  professionalDetails: {
    experiences: data.professional_details ?? [],
  },

  familyDetails: {
    familyMembers: data.family_details ?? [],
  },

  otherDetails: {
    doj: data?.employee_details?.doj ?? '',
    date_of_transfer: data?.employee_details?.date_of_transfer ?? '',
    employee_reference: data?.employee_details?.employee_reference ?? '',
    date_of_promotion: data?.employee_details?.date_of_promotion ?? '',
    date_of_leaving: data?.employee_details?.date_of_leaving ?? '',
    notice_period: data?.employee_details?.notice_period ?? '',
    separation_mode: data?.employee_details?.separation_mode ?? '',
  },
});
