import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { UserProfileComponent } from './pages/user-profile/user-profile';
import { CharityDetailComponent } from './pages/charity-detail/charity-detail';
import { DonationComponent } from './pages/donation/donation';
import { SuccessComponent } from './pages/success/success';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'charity/:id', component: CharityDetailComponent },
  { path: 'donate/:id', component: DonationComponent },
  { path: 'success', component: SuccessComponent }
];