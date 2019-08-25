import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  employee: any = {
    _id:'',
    empno: '',
    name: '',
    dob: '',
    salary: '',
    skills: ''
  }

  configUrl = 'http://localhost:4000/employees';
  skillList = ["Angular", "React", "Node", "Java", "MongoDB", "SQL", "Unix", "Express"];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  putConfig() {
    return this.http.put(this.configUrl, JSON.stringify(this.employee), this.httpOptions);
  }

  postConfig(id) {
    return this.http.post(`${this.configUrl}/${id}`, JSON.stringify(this.employee), this.httpOptions);
  }

  deleteConfig(id) {
    return this.http.delete(`${this.configUrl}/${id}`);
  }

  showConfig() {
    this.getConfig()
      .subscribe((data) => {
        console.log(data);
        this.employee = data['employees'];
      });
  }

  displayDialog: boolean;
  selectedEmployee = '';
  newEmployee: boolean;
  employees = [];
  cols: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getConfig()
      .subscribe((data) => {
        console.log(data);
        this.employees = data['employees'];
      });

    this.cols = [{
      width: "15%",
      header: "Employee No",
      field: "empno"
    }, {
      width: "15%",
      header: "Employee Name",
      field: "name"
    },
    {
      width: "25%",
      header: "DOB",
      field: "dob"
    },
    {
      width: "15%",
      header: "Salary",
      field: "salary"
    },
    {
      width: "30%",
      header: "Skills",
      field: "skills"
    }]
  }

  showDialogToAdd() {
    this.newEmployee = true;
    let empno = this.employees[this.employees.length - 1].empno + 1;
    this.employee = {
      _id:'',
      empno,
      name: '',
      dob: '',
      salary: '',
      skills: ''
    };
    this.displayDialog = true;
  }

  save() {
    for (let prop in this.employee) {
      if (!this.employee[prop])
        return;

      if (prop == 'dob')
        this.employee[prop] = moment(this.employee[prop]).format("MM/DD/YYYY");
    }

    let employees = [...this.employees];
    if (this.newEmployee) {
      this.putConfig()
        .subscribe((data) => {
          employees.push(this.employee);
          this.employee = null;
        });
      this.employees = employees;
    } else {
      this.postConfig(this.employee._id)
        .subscribe((data) => {
          employees[this.employees.indexOf(this.selectedEmployee)] = this.employee;
        });
      this.employees = employees;
    }
    this.displayDialog = false;
  }

  delete() {
    this.employees = this.employees.filter(emp => emp._id !== this.employee._id);
    this.deleteConfig(this.employee._id)
      .subscribe((data) => {
        this.employee = null;
      });
    this.displayDialog = false;
  }

  cancel() {
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEmployee = false;
    this.employee = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(e) {
    let emp = {};
    for (let prop in e) {
      emp[prop] = e[prop];
    }
    return emp;
  }

}