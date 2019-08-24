import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeecollectionsComponent } from './employeecollections/employeecollections.component';
 
const appRoutes: Routes = [
 { path: '', redirectTo:'employees',pathMatch:'full' },
 { 
 path: 'employees', 
 loadChildren: './employeecollections/index.module#EmployeecollectionsModule'
 },
 
];
 
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);