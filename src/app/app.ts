import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html'
})
export class App {

  constructor(private router: Router) {
    const saved = localStorage.getItem('theme');
    if (saved) document.body.className = saved;
  }

  isLoggedIn = localStorage.getItem('auth') === 'true';

  login() {
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['/user', 1]);
  }

  logout() {
    localStorage.removeItem('auth');
    this.isLoggedIn = false;
  }
}