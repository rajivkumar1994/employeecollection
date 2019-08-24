import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  uri = 'http://localhost:4000/employees';

  constructor(private http: HttpClient) {}
    getEmployees() {
      return this.http.get(`${this.uri}`);
    }

    // To Get Employee Details For Single Record Using Id
    getEmployeeById(empid) {
      return this.http.get(`${this.uri}/${empid}`);
    }

    // To Updated Specific Employee
    updateEmployee(id, body) {
      return this.http.post(`${this.uri}/${id}`, body);
    }

    // To Create/Add New Employee
    addEmployee(body) {
      return this.http.put(`${this.uri}/`, body);
    }

    // To Delete Any Employee
    deleteEmployee(empid) {
      return this.http.delete(`${this.uri}/${empid}`);
    }

  }

