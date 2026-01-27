import { Component, inject } from '@angular/core';
import { Master } from '../../services/master';

@Component({
  selector: 'app-ticket-list',
  imports: [],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList {
  mode: string='My Tickets';
  ticketList: any[]=[];

  masterSrv=inject(Master);
  loggedUserEmployeeId: any;

  ngOnInit(): void{
    const loggedUserData = localStorage.getItem('ticketUser');
    if(loggedUserData !=null){
      const userData= JSON.parse(loggedUserData);
      this.loggedUserEmployeeId= userData.employeeId;
    }
    this.changeMode(this.mode);
  }

  changeMode(selectedMode:string){
    this.mode=selectedMode;
    if(this.mode=='My Tickets'){
      
      this.masterSrv.getTicketsCreatedByLoggedEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
        this.ticketList=res.data;
      })
    }
    else{
      this.masterSrv.getTicketAssignedToEmp(this.loggedUserEmployeeId).subscribe((res:any)=>{
        this.ticketList=res.data;
      })
    }
  }

  changeStatus(state: string, ticketId: number){
    if(state == 'Start'){
      this.masterSrv.startTicket(ticketId).subscribe((res:any)=>{
        if(res.result){
          alert('Ticket Status Changes');
          this.changeMode(this.mode);
        }
        else{
          alert(res.message);
        }
      });
    }else{
      this.masterSrv.closeTicket(ticketId).subscribe((res:any)=>{
        if(res.result){
          alert('Ticket Closed Successfully');
          this.changeMode(this.mode);
        }
        else{
          alert(res.message);
        }
      });
    }
  }
}
