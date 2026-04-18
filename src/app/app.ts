import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html'
})
export class App {

  isLoggedIn = false;

  constructor(private router: Router) {
    const saved = localStorage.getItem('theme');
    if (saved) document.body.className = saved;
  }

  login() {
    this.isLoggedIn = true;
  }

  goProfile() {
    this.router.navigate(['/user', 1]);
  }

  toggleTheme() {
    const current = document.body.className === 'dark' ? 'light' : 'dark';
    document.body.className = current;
    localStorage.setItem('theme', current);
  }
}