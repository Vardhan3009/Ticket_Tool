import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';

@Component({
  selector: 'app-parentcategory',
  imports: [FormsModule, CommonModule],
  templateUrl: './parentcategory.html',
  styleUrl: './parentcategory.css',
})
export class Parentcategory {
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

  gridList: any[]=[this.firstValue, this.secondValue];
  deptList: any[]=[];

  newObj: any={
    "categoryId": 0,
    "categoryName": "",
    "deptId": ""
  }

  ngOnInit():void{
    this.getGridData();
    this.getAllData();
  }

  getAllData(){
    this.masterSrv.getAllDept().subscribe((res:any)=>{
      this.gridList = res.data;
    })
  }

  getGridData(){
    this.masterSrv.getAllpCategory().subscribe((res:any)=>{
      this.gridList = res.data;
    })
  }

  save(){
    // debugger;
    this.masterSrv.createpCategory(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){ 
        alert("Parent Category Created Successfully");
        this.getGridData();
      }
      else{
        alert(res.message);
      }
    })
  }

  update(){
    // debugger;
    this.masterSrv.updatepCategory(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){
        
        alert("Parent Category Updated Successfully");
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

  onDelete(deptId: number){
    const isDelete = confirm("Are you sure you want to delete this department?");
    if(isDelete){
      this.masterSrv.deletepCategory(deptId).subscribe((res:any)=>{
        console.log(res.result)
        if(res.result){
          // Remove from UI list directly using filter
          this.gridList = this.gridList.filter(dept => dept.deptId !== deptId);
          alert("Parent Category Deleted Successfully");
          // this.getDept();
        }
        else{
          alert(res.message);
        }
      })
    }
  }
}
