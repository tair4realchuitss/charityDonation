import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoriesComponent } from './pages/categories/categories';
import { CharityDetailComponent } from './pages/charity-detail/charity-detail';
import { UserProfileComponent } from './pages/user-profile/user-profile';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'charity/:id', component: CharityDetailComponent },
  { path: 'user/:id', component: UserProfileComponent }
];