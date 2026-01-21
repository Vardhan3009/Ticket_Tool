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

  hardValue: any={
    "deptId": 0,
    "deptName": "Software",
    "createDate": "30-06-2024"
  };

  deptList: any[]=[this.hardValue];
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
}
