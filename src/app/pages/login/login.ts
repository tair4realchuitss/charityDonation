import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  doLogin() {
    localStorage.setItem('auth', 'true');
    this.router.navigate(['/']);
  }
}