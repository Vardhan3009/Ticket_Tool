import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Master {
  
  apiUrl: string = "http://localhost:3000/api/TicketsNew/";

  constructor(private http: HttpClient){  }
  
  login(obj:any){
    // debugger;
    return this.http.post(this.apiUrl + "Login", obj);
  }


}
