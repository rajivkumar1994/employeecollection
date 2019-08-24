import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { MatCardModule, MatToolbarModule, MatToolbar, MatButtonModule, MatButton, MatMenuModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

import { EmployeecollectionsComponent } from './employeecollections/employeecollections.component';
import { routing } from './route';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './employeecollections/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employeecollections/list-employee/list-employee.component';
import { EditEmployeeComponent } from './employeecollections/edit-employee/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';


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
    routing,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ],
  exports: [
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
