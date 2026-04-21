import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  showMenu = false;
  profile: any = null;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('access_token');

    if (this.isLoggedIn) {
      this.loadProfile();
    }
  }

  loadProfile() {
    this.api.getUserProfile().subscribe({
      next: (data: any) => {
        this.profile = data;
      },
      error: () => {
        this.auth.logout();
        this.isLoggedIn = false;
        this.profile = null;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goProfile() {
    if (this.profile?.id) {
      this.router.navigate(['/user', this.profile.id]);
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.profile = null;
    this.showMenu = false;
    this.router.navigate(['/']);
  }

  @HostListener('document:click')
  closeMenu() {
    this.showMenu = false;
  }
}