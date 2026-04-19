import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html'
})
export class AppComponent {

  isLoggedIn = localStorage.getItem('auth') === 'true';

  showMenu = false;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  logout() {
    localStorage.removeItem('auth');
    window.location.reload();
  }

  @HostListener('document:click')
  closeMenu() {
    this.showMenu = false;
  }
}