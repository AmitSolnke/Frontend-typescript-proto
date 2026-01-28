export interface BasicDetails {
  employeeId: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  officialEmail: string;
  employeePhoto: File | null;
  designation: string;
  jobRole: string;
  reportingTo: string;
  leaveAuthManager: number[];
  leaveTemplate: number[];
  preferredShift: string;
  branch: string;
  department: string;
}

export interface PersonalDetails {
  contactNumber: string;
  whatsappNumber: string;
  sameAsContact: boolean;
  presentAddress: string;
  permanentAddress: string;
  sameAsPresentAddress: boolean;
  pincode: string;
  country: string;
  state: string;
  city: string;
  emergencyContactNumber: string;
  personalEmail: string;
  attachments: File | null;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  maritalStatus: string;
  aadharCardNumber: string;
  aadharCardPhoto: File | null;
  panNumber: string;
  panCardPhoto: File | null;
  physicallyHandicapped: string;
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
    previousCompany: string;
    previousDesignation: string;
    city: string;
    experience: string;
    fromDate: string;
    toDate: string;
  }[];
}

export interface FamilyDetails {
  familyMembers: {
    relation: string;
    name: string;
    dateOfBirth: string;
  }[];
}

export interface OtherDetails {
  dateOfJoining: string;
  dateOfTransfer: string;
  employeeReference: string;
  dateOfPromotion: string;
  dateOfLeaving: string;
  noticePeriod: string;
  status: string;
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
    employeeId: '',
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    officialEmail: '',
    employeePhoto: null,
    designation: '',
    jobRole: '',
    reportingTo: '',
    leaveAuthManager: [],
    leaveTemplate: [],
    preferredShift: '',
    branch: '',
    department: '',
  },
  personalDetails: {
    contactNumber: '',
    whatsappNumber: '',
    sameAsContact: false,
    presentAddress: '',
    permanentAddress: '',
    sameAsPresentAddress: false,
    pincode: '',
    country: '',
    state: '',
    city: '',
    emergencyContactNumber: '',
    personalEmail: '',
    attachments: null,
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    aadharCardNumber: '',
    aadharCardPhoto: null,
    panNumber: '',
    panCardPhoto: null,
    physicallyHandicapped: 'no',
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
        previousCompany: '',
        previousDesignation: '',
        city: '',
        experience: '',
        fromDate: '',
        toDate: '',
      },
    ],
  },
 familyDetails: {
    familyMembers: [
      {
        relation: '',
        name: '',
        dateOfBirth: '',
      },
    ],
  },
 otherDetails: {
    dateOfJoining: '',
    dateOfTransfer: '',
    employeeReference: '',
    dateOfPromotion: '',
    dateOfLeaving: '',
    noticePeriod: '',
    status: 'Active',
  },
};
