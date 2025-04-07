import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { NgxSpinnerModule } from "ngx-spinner";
import { EmployeeTableComponent } from "./employee-table/employee-table.component";
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { AlertService } from "../../services/alert.service";
import { SpinnerService } from "../../services/spinner.service";
import { ResponseDTO } from "../../models/response.model";



@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    NgxSpinnerModule,
    EmployeeTableComponent
  ],
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  employees: Employee[] = [];
  loading = false;
  noResults = false;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private spinnerService: SpinnerService
  ) {
    this.initForm();
  }
  
  ngOnInit(): void {
    this.loadAllEmployees();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  onSearch(): void {
    if (this.searchForm.invalid) {
      this.alertService.showToast('Please enter a valid employee ID', 'warning');
      return;
    }
    
    this.loading = true;
    this.noResults = false;
    this.spinnerService.show();
    
    const id = this.searchForm.get('employeeId')?.value?.trim() || '';
    
    if (id === '') {
      this.loadAllEmployees();
    } else {
      this.searchEmployeeById(id);
    }
  }
  
  onClear(): void {
    this.searchForm.reset();
    this.loadAllEmployees();
  }
  
  private initForm(): void {
    this.searchForm = this.fb.group({
      employeeId: ['', [Validators.pattern(/^\d*$/)]]
    });
  }
  
  private loadAllEmployees(): void {
    this.loading = true;
    this.noResults = false;
    this.spinnerService.show();
    
    this.employeeService.getAllEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (employees: ResponseDTO<Employee[]>) => {
          console.log(employees);

          this.employees = employees?.result ?? [];
          this.loading = false;
          this.spinnerService.hide();
          
          if (this.employees.length === 0) {
            this.noResults = true;
            this.alertService.showInfo('No employees found in the database.');
          }
          
        },
        error: (err) => {
          this.handleError(err);
        }
      });
  }
  
  private searchEmployeeById(id: string): void {
    this.employeeService.getEmployeeById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (employee: ResponseDTO<Employee>) => {
          this.employees = employee.result ? [employee.result] : [];
          this.loading = false;
          this.spinnerService.hide();
          
          if (!employee) {
            this.noResults = true;
            this.alertService.showToast(`No employee found with ID: ${id}`, 'info');
          }
        },
        error: (err: any) => {
          this.handleError(err);
        }
      });
  }
  
  private handleError(err: any): void {
    this.loading = false;
    this.spinnerService.hide();
    this.alertService.showError(err);
    console.error('Error fetching employee datassss:', err);
  }
}