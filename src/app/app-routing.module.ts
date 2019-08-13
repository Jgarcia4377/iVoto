import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login', loadChildren:() => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'admin', loadChildren: './admin/login/login.module#LoginPageModule' },
   { path: 'home-admin', loadChildren: './admin/home-admin/home-admin.module#HomeAdminPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
