import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NewheroComponent } from './newhero/newhero.component';

const routes: Routes = [
  { path: 'hero', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newhero', component: NewheroComponent },

  { path: 'hero/:id', component: DetailComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
