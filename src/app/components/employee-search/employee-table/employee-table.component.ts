import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { AlertService } from '../../../services/alert.service';

/**
 * Componente que muestra una tabla de empleados con opciones para ver detalles,
 * exportar datos y imprimir la tabla.
 */
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  
  constructor(private alertService: AlertService) {}
  
  /**
   * Muestra los detalles de un empleado usando SweetAlert
   * @param employee El empleado cuyos detalles se mostrarán
   */
  onViewDetails(employee: Employee): void {
    this.alertService.showAlert(
      `Employee Details: ${employee.employee_name}`,
      this.formatEmployeeDetails(employee),
      'info'
    );
  }
  
  /**
   * Exporta los datos de empleados a un archivo CSV
   */
  onExport(): void {
    if (this.employees.length === 0) {
      this.alertService.showWarning('No data to export');
      return;
    }
    
    try {
      const headers = ['ID', 'Name', 'Position', 'Age', 'Salary', 'Annual Salary'];
      const csvData = this.employees.map(emp => [
        emp.id,
        emp.employee_name,
        emp.employee_position || 'N/A',
        emp.employee_age,
        emp.employee_salary,
        emp.employee_anual_salary
      ]);
      
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n');
      
      this.downloadCsv(csvContent, 'employees.csv');
      this.alertService.showToast('Data exported successfully', 'success');
    } catch (error) {
      this.alertService.showError('Failed to export data');
      console.error('Export error:', error);
    }
  }
  
  /**
   * Imprime la vista actual de la tabla
   */
  onPrint(): void {
    window.print();
  }
  
  /**
   * Formatea los detalles del empleado para mostrarlos en la alerta
   * @param employee El empleado cuyos detalles se formatearán
   * @returns Texto formateado con los detalles del empleado
   */
  private formatEmployeeDetails(employee: Employee): string {
    return `ID: ${employee.id}
      Age: ${employee.employee_age}
      Position: ${employee.employee_position || 'N/A'}
      Annual Salary: $${employee.employee_salary.toLocaleString()}`;
  }
  
  /**
   * Descarga un archivo CSV con el contenido proporcionado
   * @param content Contenido del archivo CSV
   * @param filename Nombre del archivo a descargar
   */
  private downloadCsv(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}