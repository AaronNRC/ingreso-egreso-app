import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private autService: AuthService, private router: Router){}

  public logout(): void {
    this.autService.logout().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
