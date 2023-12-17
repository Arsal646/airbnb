import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent: () =>
    import('./components/home/home.component').then(
      (c) => c.HomeComponent
    ),
  },
  {
    path:'**',
    loadComponent: () =>
    import('./components/home/home.component').then(
      (c) => c.HomeComponent
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
