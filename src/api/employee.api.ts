import axiosTicketing from "./axiosTicketing";
import axiosNode from "./axiosNode";
import axiosTsNewBackend from "./axiosTsNewBackend";
import type { AxiosResponse } from 'axios';

interface Designation {
  id: number;
  designation: string;
}

interface DesignationApiResponse {
  status: number;
  message: string;
  data: {
    data: Designation[];
  };
}

interface JobRole {
  id: number;
  job_role: string;
  is_active: number;
}

interface JobRoleApiResponse {
  status: number;
  message: string;
  data: {
    data: JobRole[];
  };
}

interface EmployeeApiResponse {
  status: number;
  message: string;
  data: {
    data: Employee[];
  };
}


export interface Employee {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface LeaveTemplateResponse {
  status: number;
  message: string;
data: LeaveTemplate[]; 
}

export interface LeaveTemplate {
  id: number;
  leave_template_name: string;
}

interface shiftsResponse {
      status: number;
  message: string;
    data: shifts[];
}

export interface shifts {
  id: number;
  shift_name: string;
}

interface branchesResponse {
      status: number;
  message: string;
    data: branches[];
}

export interface branches {
  id: number;
  location_name: string;
}

interface departmentResponse {
      status: number;
  message: string;
  data: {
    data: departments[];
  };
}
interface departments {
  id: number;
  department: string;
}

export interface EmployeeIdResponse {
  status: number;
  message: string;
  data: string;
}

interface CountryApiResponse {
  status: number;
  message: string;
   data: {
    data: Country[];
  };
}
export interface Country {
  id: number;
  country: string;
}

interface StateApiResponse {
     status: number;
  message: string;
   data: {
    data: State[];
  };
}
export interface State {
    id: number;
  state: string;
  country_id: number
}

interface CityApiResponse {
        status: number;
  message: string;
   data: {
    data: City[];
  };
}

export interface City {
    id: number;
  city: string;
  state_id: number;
}

interface EmployeeConventionApiResponse {
        status: number;
  message: string;
  data: EmployeeConvention[];
}
export interface EmployeeConvention {
    id: number;
    type: string;
    values: string
}


export const fetchDesignationMaster = async (): Promise<Designation[]> => {
  const res: DesignationApiResponse =
    await axiosTicketing.get('designationMaster/getData?export=1');

  return res?.data?.data;
};

export const fetchJobRoles = async (): Promise<JobRole[]> => {
  const res: JobRoleApiResponse =
    await axiosTicketing.get('jobMaster/getData?export=1');

  return res.data.data;
};

export const fetchEmployee =  async (): Promise<Employee[]> => {
    const res: EmployeeApiResponse = 
      await axiosTicketing.get('employeeMaster/getData?export=1');
      return res?.data?.data
};

export const fetchLeaveTemplates = async (): Promise<LeaveTemplate[]> => {
  const res: LeaveTemplateResponse = await axiosNode.get('leave_template');
  return res.data;
}

export const fetchShifts = async (): Promise<shifts[]> => {
  const res: shiftsResponse = await axiosTicketing.get('hrms/getShiftMaster');
  return res.data;
}

export const fetchBranches = async (): Promise<branches[]> => {
  const res: branchesResponse = await axiosTsNewBackend.get('locationMaster/1');
  return res.data;
}

export const fetchDepartments = async (): Promise<departments[]> => {
  const res: departmentResponse = await axiosTicketing.get('departmentMaster/getData?export=1');
  return res?.data?.data;
}

export const fetchEmployeeId = async (): Promise<EmployeeIdResponse> => {
  const res: AxiosResponse<EmployeeIdResponse> =
    await axiosNode.get('employee_master/getNewEmployeeID');

  return res.data; // 👈 unwrap data
};

export const fetchCountry = async (): Promise<Country[]> => {
  const res: CountryApiResponse = await axiosTicketing.get('countryMaster/getData?export=1');
  return res?.data?.data;
}

export const fetchState = async (): Promise<State[]> => {
  const res: StateApiResponse = await axiosTicketing.get('stateMaster/getData?export=1');
  return res?.data?.data;
}

export const fetchCity = async (): Promise<City[]> => {
  const res: CityApiResponse = await axiosTicketing.get('cityMaster/getData?export=1');
  return res?.data?.data;
}

export const fetchEmployeeConvention = async () : Promise<EmployeeConvention[]> => {
const res: EmployeeConventionApiResponse = await axiosTicketing.get('employeeMaster/getEmployeeConvention');
  return res?.data
}