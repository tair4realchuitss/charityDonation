import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';

  fakeRegister() {
  alert('Account created (simulation)');
  localStorage.setItem('auth', 'true');
  window.location.reload();
}
  doLogin() {
    localStorage.setItem('auth', 'true');
    window.location.reload();
  }
}