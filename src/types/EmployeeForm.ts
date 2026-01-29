export interface BasicDetails {
  employee_id: string;
  employee_title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_id: string;
  profile_picture: File | null;
  designation_id: string;
  job_role: string;
  reporting_to: string;
  leave_auth_manager: number[];
  leaveTemplate: number[];
  shift_type_id: string;
  hired_branch_id: string;
  department: string;
}

export interface PersonalDetails {
  contact_no: string;
  whats_app_contact_no: string;
  sameAsContact: boolean;
  present_address: string;
  permanent_address: string;
  sameAsPresentAddress: boolean;
  pincode: string;
  country_id: string;
  state_id: string;
  city_id: string;
  emergency_contact: string;
  personal_email_id: string;
  attachments: File | null;
  dob: string;
  gender: string;
  blood_group: string;
  marital_status: string;
  aadhar_no: string;
  aadhar_photo: File | null;
  pan_no: string;
  pan_photo: File | null;
  physically_handicapped: string;
}

export interface EducationalDetails {
  educations: {
    course_name: string;
    university: string;
    passing_year: string;
    grade: string;
  }[];
}

export interface ProfessionalDetails {
  experiences: {
    company: string;
    designation: string;
    city: string;
    experience: string;
    from_date: string;
    to_date: string;
  }[];
}

export interface FamilyDetails {
  familyMembers: {
    relation: string;
    name: string;
    dob: string;
  }[];
}

export interface OtherDetails {
  doj: string;
  date_of_transfer: string;
  employee_reference: string;
  date_of_promotion: string;
  date_of_leaving: string;
  notice_period: string;
  separation_mode: string;
}
export interface EmployeeFormData {
  basicDetails: BasicDetails;
  personalDetails: PersonalDetails;
  educationalDetails: EducationalDetails;
  professionalDetails: ProfessionalDetails;
  familyDetails: FamilyDetails;
  otherDetails: OtherDetails;
}

export const initialFormData: EmployeeFormData = {
  basicDetails: {
    employee_id: '',
    employee_title: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email_id: '',
    profile_picture: null,
    designation_id: '',
    job_role: '',
    reporting_to: '',
    leave_auth_manager: [],
    leaveTemplate: [],
    shift_type_id: '',
    hired_branch_id: '',
    department: '',
  },
  personalDetails: {
    contact_no: '',
    whats_app_contact_no: '',
    sameAsContact: false,
    present_address: '',
    permanent_address: '',
    sameAsPresentAddress: false,
    pincode: '',
    country_id: '',
    state_id: '',
    city_id: '',
    emergency_contact: '',
    personal_email_id: '',
    attachments: null,
    dob: '',
    gender: '',
    blood_group: '',
    marital_status: '',
    aadhar_no: '',
    aadhar_photo: null,
    pan_no: '',
    pan_photo: null,
    physically_handicapped: 'no',
  },
  educationalDetails: {
    educations: [
      {
        course_name: '',
        university: '',
        passing_year: '',
        grade: '',
      },
    ],
  },
  professionalDetails: {
    experiences: [
      {
        company: '',
        designation: '',
        city: '',
        experience: '',
        from_date: '',
        to_date: '',
      },
    ],
  },
 familyDetails: {
    familyMembers: [
      {
        relation: '',
        name: '',
        dob: '',
      },
    ],
  },
 otherDetails: {
    doj: '',
    date_of_transfer: '',
    employee_reference: '',
    date_of_promotion: '',
    date_of_leaving: '',
    notice_period: '',
    separation_mode: 'Active',
  },
};
