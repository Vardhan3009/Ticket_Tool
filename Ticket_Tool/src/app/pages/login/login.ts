import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // user: string='oldUser';
  loginObj:any={
    "emailId": "",
    "password": ""
  }

  signUpObj:any={
    
  }

  masterSrv=inject(Master);
  router=inject(Router);

  onLogin(){
    // console.log(this.loginObj);
    // debugger;
    this.masterSrv.login(this.loginObj).subscribe((res:any)=>{
      console.log(res.result);
      if(res.result){
        localStorage.setItem('ticketUser', JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      }
      else{
        alert(res.message);
      }
    })
  }

  onSignUp(){
    this.router.navigateByUrl('/SignUp');
  }
}
