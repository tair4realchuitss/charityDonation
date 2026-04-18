import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoriesComponent } from './pages/categories/categories';
import { CharityDetailComponent } from './pages/charity-detail/charity-detail';
import { UserProfileComponent } from './pages/user-profile/user-profile';
import { LoginComponent } from './pages/login/login';
import { DonationComponent } from './pages/donation/donation';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'charity/:id', component: CharityDetailComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'donate/:id', component: DonationComponent },
];