import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeecollectionsComponent } from './employeecollections.component';
import {
    MatCardModule, MatToolbarModule, MatToolbar, MatButtonModule, MatButton,
    MatMenuModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [{
    path: "",
    component: EmployeecollectionsComponent,
    children: [
        {
            path: "",
            loadChildren: './list-employee/index.module#ListEmployeeModule'
        },
        {
            path: "add",
            loadChildren: './add-employee/index.module#AddEmployeeModule'
        },
        {
            path: "edit/:id",
            loadChildren: './edit-employee/index.module#EditEmployeeModule'
        }
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
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
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule
    ],
    declarations: [
        EmployeecollectionsComponent
    ]
})
export class EmployeecollectionsModule { }