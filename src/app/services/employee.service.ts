import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { Employee, EmployeeResponse } from "../models/employee.model";
import { ResponseDTO } from "../models/response.model";
import { environment } from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_BASE = environment.apiBase;

  constructor(private http: HttpClient) {}


  getAllEmployees(): Observable<ResponseDTO<Employee[]>> {
    return this.http
      .get<ResponseDTO<Employee[]>>(`${this.API_BASE}/Employee/GetAll`)
      .pipe(
        map((response: ResponseDTO<Employee[]>) => response),
        catchError(this.handleError)
      );
  }

  getEmployeeById(id: string): Observable<ResponseDTO<Employee>> {
    return this.http
      .get<ResponseDTO<Employee>>(`${this.API_BASE}/Employee/${id}`)
      .pipe(
        map((response: ResponseDTO<Employee>) => response),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `${error.error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}