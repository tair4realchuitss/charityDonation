import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; // Ensure you have this service
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  doLogin() {
    const credentials = { username: this.username, password: this.password };
    
    this.auth.login(credentials).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.router.navigate(['/']);
      },
      error: (err) => alert('Invalid credentials')
    });
  }

  fakeRegister() {
    this.router.navigate(['/register']);
  }
}