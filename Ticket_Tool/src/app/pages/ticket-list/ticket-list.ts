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

  changeMode(selectedMode:string){
    this.mode=selectedMode;
    if(this.mode=='My Tickets'){
      this.masterSrv.getTicketsCreatedByLoggedEmp().subscribe((res:any)=>{
        
      })
    }
  }
}
