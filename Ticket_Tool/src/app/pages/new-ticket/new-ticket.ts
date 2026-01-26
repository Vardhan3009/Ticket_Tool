import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [FormsModule],
  templateUrl: './new-ticket.html',
  styleUrl: './new-ticket.css',
})
export class NewTicket {

  masterSrv=inject(Master);
  deptList: any[]=[]
  pCategoryList: any[]=[];
  cCategoryList: any[]=[];
  filterCategory: any[]=[];
  selectPCategory: string = '';

  newTicketObj: any={
    "employeeId": 0,
    "severity": "",
    "childCategoryId": 0,
    "deptId": 0,
    "requestDetails": ""
  }

  ngOnInit():void{
    const loggedUserData = localStorage.getItem('ticketUser');
    if(loggedUserData != null){
      const userData= JSON.parse(loggedUserData)
      this.newTicketObj.employeeId = userData.employeeId;
    }
    this.getDept();
    this.getpCategory();
    this.getCCategory();
  }

  createTicket(){
    this.masterSrv.newTicket(this.newTicketObj).subscribe((res:any)=>{
      if(res.result){
        alert("Ticket Created Successfully");
      }
      else{
        alert(res.message);
      }
    })
  }

  onCategoryChange(){
    this.filterCategory=this.cCategoryList.filter(x=>x.parentCategoryName == this.selectPCategory);
  }

  getDept(){
    this.masterSrv.getAllDept().subscribe((res:any)=>{
      this.deptList=res;
    })
  }

  getpCategory(){
    this.masterSrv.getAllpCategory().subscribe((res:any)=>{
      this.pCategoryList=res;
    })
  }

  getCCategory(){
    this.masterSrv.getAllCCategory().subscribe((res:any)=>{
      this.cCategoryList=res;
    })
  }
}
