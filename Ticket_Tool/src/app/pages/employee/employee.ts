import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  masterSrv= inject(Master);

  firstValue: any={
    "deptId": 1,
    "deptName": "Software",
    "employeeName": "Harsh",
    "contactNo": "1234567890",
    "emailId": "harsh@example.com",
    "role": "Developer",
  };

  secondValue: any={
    "deptId": 2,
    "deptName": "Hardware",
    "createDate": "01-07-2024"
  };

  gridList: any[]=[this.firstValue, this.secondValue];
  deptList: any[]=[];
  roleList: any[]=[];
  isNewView: boolean=false;

  newObj: any={
    "employeeId": 0,
    "employeeName": "",
    "contactNo": "",
    "emailId": "",
    "role": "",
    "deptId": 0,
    "gender": "",
    "password": ""
  }

  ngOnInit():void{
    this.getGridData();
    this.getAllDept();
    this.getAllRoles();
  }

  getAllDept(){
    this.masterSrv.getAllDept().subscribe((res:any)=>{
      this.deptList = res.data;
    })
  }

  getAllRoles(){
    this.masterSrv.getAllRoles().subscribe((res:any)=>{
      this.roleList = res.data;
    })
  }

  getGridData(){
    this.masterSrv.getAllCCategory().subscribe((res:any)=> {
      this.gridList = res.data;
    })
  }

  save(){
    // debugger;
    this.masterSrv.createCCategory(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){ 
        alert("Employee Created Successfully");
        this.getGridData();
      }
      else{
        alert(res.message);
      }
    })
  }

  update(){
    // debugger;
    this.masterSrv.updateEmp(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){
        
        alert("Employee Updated Successfully");
        this.getGridData();
      }
      else{
        alert(res.message);
      }
    })
  }

  onEdit(data: any){
    this.newObj=data;
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure you want to delete this Employee?");
    if(isDelete){
      this.masterSrv.deleteEmpById(id).subscribe((res:any)=>{
        console.log(res.result)
        if(res.result){
          // Remove from UI list directly using filter
          alert("Employee Deleted Successfully");
          this.getGridData();
          // this.getDept();
        }
        else{
          alert(res.message);
        }
      })
    }
  }
}
