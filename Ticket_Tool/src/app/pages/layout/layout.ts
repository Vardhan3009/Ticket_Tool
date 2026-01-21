import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  router=inject(Router);

  onLogOut(){
    localStorage.removeItem('ticketUser');
    this.router.navigateByUrl('/login');
  }
}
