import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [
      { 
        path: 'dashboard', 
        loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule' 
      },
      
      { 
        path: 'votacion', 
        loadChildren: '../pages/votacion/votacion.module#VotacionPageModule'
       },
       { 
         path: 'resultados', 
         loadChildren: '../pages/resultados/resultados.module#ResultadosPageModule' 
        },
        { 
         path: 'about', 
         loadChildren: '../pages/about/about.module#AboutPageModule' 
        },
       
      //   path: 'main',
      //   loadChildren: '../main/main.module#MainPageModule'
      // },
      // {
      //   path: 'ionic',
      //   loadChildren: '../ionic/ionic.module#IonicPageModule'
      // },
      // {
      //   path: 'flutter',
      //   loadChildren: '../flutter/flutter.module#FlutterPageModule'
      // }
    ]
  }
];

 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: HomePage
    //   }
    // ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
