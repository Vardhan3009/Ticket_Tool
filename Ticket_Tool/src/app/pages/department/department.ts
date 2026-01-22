import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {

  masterSrv= inject(Master);

  firstValue: any={
    "deptId": 1,
    "deptName": "Software",
    "createDate": "30-06-2024"
  };

  secondValue: any={
    "deptId": 2,
    "deptName": "Hardware",
    "createDate": "01-07-2024"
  };

  deptList: any[]=[this.firstValue, this.secondValue];

  newDeptObj: any={
    "deptId": 0,
    "deptName": "",
    "createDate": ""
  }

  ngOnInit():void{
    this.getDept();
  }

  getDept(){
    this.masterSrv.getAllDept().subscribe((res:any)=>{
      this.deptList = res.data;
    })
  }

  saveDept(){
    // debugger;
    this.masterSrv.createNewDept(this.newDeptObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){
        
        alert("Department Created Successfully");
        this.getDept();
      }
      else{
        alert(res.message);
      }
    })
  }

  updateDept(){
    // debugger;
    this.masterSrv.updateDept(this.newDeptObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){
        
        alert("Department Updated Successfully");
        this.getDept();
      }
      else{
        alert(res.message);
      }
    })
  }

  onEdit(data: any){
    this.newDeptObj=data;
  }

  onDelete(deptId: number){
    const isDelete = confirm("Are you sure you want to delete this department?");
    if(isDelete){
      this.masterSrv.deleteDept(deptId).subscribe((res:any)=>{
        console.log(res.result)
        if(res.result){
          // Remove from UI list directly using filter
          this.deptList = this.deptList.filter(dept => dept.deptId !== deptId);
          alert("Department Deleted Successfully");
          // this.getDept();
        }
        else{
          alert(res.message);
        }
      })
    }
  }
}
