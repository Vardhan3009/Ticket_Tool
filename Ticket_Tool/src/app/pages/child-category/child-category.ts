import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './child-category.html',
  styleUrl: './child-category.css',
})
export class ChildCategory {
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
  parentCategoryList: any[]=[];

  newObj: any={
    "childCategoryId": 0,
    "categoryName": "",
    "parentCategoryId": 0
  }

  ngOnInit():void{
    this.getGridData();
    this.getPCategory();
  }

  getPCategory(){
    this.masterSrv.getAllpCategory().subscribe((res:any)=>{
      this.parentCategoryList = res.data;
    })
  }

  getGridData(){
    this.masterSrv.getAllCCategory().subscribe((res:any)=>{
      this.gridList = res.data;
    })
  }

  save(){
    // debugger;
    this.masterSrv.createCCategory(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){ 
        alert("Child Category Created Successfully");
        this.getGridData();
      }
      else{
        alert(res.message);
      }
    })
  }

  update(){
    // debugger;
    this.masterSrv.updateCCategory(this.newObj).subscribe((res:any)=>{
      console.log(res);
      if(res.result){
        
        alert("Child Category Updated Successfully");
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
      this.masterSrv.deleteCCategory(deptId).subscribe((res:any)=>{
        console.log(res.result)
        if(res.result){
          // Remove from UI list directly using filter
          this.gridList = this.gridList.filter(dept => dept.childCategoryId !== deptId);
          alert("Child Category Deleted Successfully");
          // this.getDept();
        }
        else{
          alert(res.message);
        }
      })
    }
  }
}
