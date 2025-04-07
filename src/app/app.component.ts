import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    EmployeeSearchComponent, 
    HttpClientModule, 
    ReactiveFormsModule, 
    CommonModule,
    NgxSpinnerModule
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1>{{ title }}</h1>
          <p class="lead">Find employee information quickly and efficiently</p>
        </div>
      </header>
      
      <main class="container py-4">
        <app-employee-search></app-employee-search>
      </main>
      
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2023 Employee Search Application</p>
        </div>
      </footer>
      
      <!-- Spinner global -->
      <ngx-spinner
        bdColor="rgba(0, 0, 0, 0.8)"
        size="medium"
        color="#fff"
        type="ball-scale-multiple"
        [fullScreen]="true"
      >
        <p style="color: white">Loading...</p>
      </ngx-spinner>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .app-header {
      background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
      color: white;
      padding: 2rem 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .app-header h1 {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    main {
      flex: 1;
      background-color: #f8f9fa;
    }
    
    .app-footer {
      background-color: #343a40;
      color: #f8f9fa;
      padding: 1.5rem 0;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'Employee Search Application';
}