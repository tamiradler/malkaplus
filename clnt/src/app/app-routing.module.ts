import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AddDishesComponent } from './add-dishes/add-dishes.component';
import { ShowMenuComponent } from './show-menu/show-menu.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addDishes', component: AddDishesComponent},
  { path: 'buildMenu', component: AddMenuComponent},
  { path: 'showMenu', component: ShowMenuComponent},
  { path: 'editUser', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
