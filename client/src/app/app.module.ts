import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './employeecollections/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employeecollections/list-employee/list-employee.component';
import { EditEmployeeComponent } from './employeecollections/edit-employee/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeecollectionsComponent } from './employeecollections/employeecollections.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    EditEmployeeComponent,
    DashboardComponent,
    EmployeecollectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
