export interface Employee {
    id: string;
    employee_name: string;
    employee_salary: number;
    employee_anual_salary: number;
    employee_age: number;
    profile_image?: string;
    employee_position?: string;
  }
  
  export interface EmployeeResponse {
    status: string;
    data: Employee;
    message: string;
  }