import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  mode: 'login' | 'register' = 'login';

  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  setMode(mode: 'login' | 'register') {
    this.mode = mode;
  }

  doLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.auth.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => alert('Invalid credentials')
    });
  }

  doRegister() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.auth.register(userData).subscribe({
      next: () => {
        alert('Registered successfully. Now sign in.');
        this.mode = 'login';
      },
      error: () => alert('Registration failed')
    });
  }
}