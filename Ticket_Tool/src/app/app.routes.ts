import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Department } from './pages/department/department';
import { Parentcategory } from './pages/parentcategory/parentcategory';
import { ChildCategory } from './pages/child-category/child-category';
import { Employee } from './pages/employee/employee';
import { NewTicket } from './pages/new-ticket/new-ticket';
import { TicketList } from './pages/ticket-list/ticket-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path:'department',
                component: Department
            },
            {
                path:'parent-category',
                component: Parentcategory
            },
            {
                path:'child-category',
                component: ChildCategory
            },
            {
                path: 'employee',
                component: Employee
            },
            {
                path:'new-ticket',
                component: NewTicket
            },
            {
                path: 'ticket-list',
                component: TicketList
            }
        ]
    }
];
