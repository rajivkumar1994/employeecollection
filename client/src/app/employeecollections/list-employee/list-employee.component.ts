import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeserviceService } from '../../service/employeeservice.service';
 
export interface Employee {
 name: string;
 dob: Date;
 salary: Number;
 skills: [String];
}
 
@Component({
 selector: 'app-list-employee',
 templateUrl: './list-employee.component.html',
})
export class ListEmployeeComponent implements OnInit {
 
 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: false}) sort: MatSort;
 
 // Important objects
 MyDataSource: any;
 employeeList: Employee[];
 displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'action'];
 
 constructor(private service: EmployeeserviceService, private router: Router) {
 }
 
 ngOnInit() {
 this.getEmployees();
 }
 
 // To Get List Of Employee
 getEmployees() {
 this.service.getEmployees()
 .subscribe((data: Employee[]) => {
 this.MyDataSource = new MatTableDataSource();
 this.MyDataSource.data = data;
 this.MyDataSource.paginator = this.paginator;
 this.MyDataSource.sort = this.sort;
 });
 }
 
 // To Edit Employee
 editEmployee(empid) {
 this.router.navigate([`/employees/${empid}`]);
 }
 
 // Search specific result
 filterEmployee(searchstring: string) {
 searchstring = searchstring.trim();
 searchstring = searchstring.toLowerCase();
 this.MyDataSource.filter = searchstring;
 }
}