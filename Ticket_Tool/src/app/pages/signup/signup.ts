import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signUpObj:any={
    "name": "",
    "EmpoloyeeId": "",
    "emailId": "",
    "password": "",
    "contactNo": "",
    "gender": "",
    "Role":"",
    "repeatPassword": ""
  }

  masterSrv= inject(Master);
  router=inject(Router);

  register(signUpObj:any){
    if(this.signUpObj.password !== this.signUpObj.repeatPassword){
      alert("Password and Repeat Password should be same");
    }
    else{
      if( !this.signUpObj.name || !this.signUpObj.emailId || !this.signUpObj.password || !this.signUpObj.contactNo || !this.signUpObj.gender || !this.signUpObj.Role){
        alert("All fields are required");
        return;
      }
      else{
        this.masterSrv.signUp(this.signUpObj).subscribe((res:any)=>{
          if(res.result){
            alert("Registration successful! Please login.");
            this.router.navigateByUrl('/login');
          }
          else{
            alert(res.message);
          }
        });
      }
    }
  }
}
