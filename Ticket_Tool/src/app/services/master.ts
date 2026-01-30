import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Master {
  
  apiUrl: string = "http://localhost:3000/api/TicketsNew/";

  constructor(private http: HttpClient){  }

  getAllRoles(){
    return this.http.get(`${this.apiUrl}GetAllRoles`);
  }
  
  login(obj:any){
    // debugger;
    return this.http.post(this.apiUrl + "Login", obj);
  }

  signUp(obj:any){
    return this.http.post(this.apiUrl + "SignUp", obj);
  }

  getAllDept(){
    return this.http.get(`${this.apiUrl}GetDepartments`)
  }

  createNewDept(obj:any){
    return this.http.post(`${this.apiUrl}CreateDepartment`, obj)
  }

  updateDept(obj:any){
    return this.http.put(`${this.apiUrl}UpdateDepartment`, obj)
  }

  deleteDept(id:number){
    return this.http.delete(`${this.apiUrl}DeleteDepartment?id=${id}`)
  }

  getAllpCategory(){
    return this.http.get(`${this.apiUrl}GetParentCategory`)
  }

  createpCategory(obj:any){
    return this.http.post(`${this.apiUrl}CreateParentCategory`, obj)
  }

  updatepCategory(obj:any){
    return this.http.put(`${this.apiUrl}UpdateParentCategory`, obj)
  }

  deletepCategory(id:number){
    return this.http.delete(`${this.apiUrl}DeleteParentCategory?id=${id}`)
  }

  getAllCCategory(){
    return this.http.get(`${this.apiUrl}GetChildCategory`)
  }

  createCCategory(obj:any){
    return this.http.post(`${this.apiUrl}CreateChildCategory`, obj)
  }

  updateCCategory(obj:any){
    return this.http.put(`${this.apiUrl}UpdateChildCategory`, obj)
  }

  deleteCCategory(id:number){
    return this.http.delete(`${this.apiUrl}DeleteChildCategory?id=${id}`)
  }

  getAllEmp(){
    return this.http.get(`${this.apiUrl}GetEmployees`);
  }

  createEmp(obj:any){
    return this.http.post(`${this.apiUrl}CreateEmployee`, obj); 
  }

  updateEmp(obj:any){
    return this.http.put(`${this.apiUrl}UpdateEmployee`, obj);
  }

  deleteEmpById(id:number){
    return this.http.delete(`${this.apiUrl}DeleteEmployee?id=${id}`);
  }

  newTicket(obj:any){
    return this.http.post(`${this.apiUrl}CreateNewTicket`, obj);
  }

  getTicketsCreatedByLoggedEmp(empId:number){
    return this.http.get(`${this.apiUrl}GetTicketsCreatedByEmpId?empId=${empId}`)
  }

  getTicketAssignedToEmp(empId:number){
    return this.http.get(`${this.apiUrl}GetAssignedTikcetByEmpId?empId=${empId}`)
  }

  startTicket(ticketId:number){
    return this.http.post(`${this.apiUrl}StartTicket?id=${ticketId}`, {});
  }

  closeTicket(ticketId:number){
    return this.http.post(`${this.apiUrl}closeTicket?id=${ticketId}`, {});
  }
}
