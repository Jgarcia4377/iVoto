import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeAdminPage } from './home-admin.page';

const routes: Routes = [
  {
  path: '',
  redirectTo: '/home-admin/dashboard',
  pathMatch: 'full'
  },
  {
    path: '',
    component: HomeAdminPage,
    children: [
      { path: 'dashboardAdmin', loadChildren: '../pages/dashboard-admin/dashboard-admin.module#DashboardAdminPageModule'},
      { path: 'registro-votante', loadChildren: '../pages/registro-votante/registro-votante.module#RegistroVotantePageModule' },
      { path: 'registro-evento', loadChildren: '../pages/registro-evento-votacion/registro-evento-votacion.module#RegistroEventoVotacionPageModule' },
      { path: 'registro-candidato', loadChildren: '../pages/registro-candidato/registro-candidato.module#RegistroCandidatoPageModule' },
      { path: 'registro-partido-politico', loadChildren: '../pages/registro-partido-politico/registro-partido-politico.module#RegistroPartidoPoliticoPageModule' },
      { path: 'registro-puestos', loadChildren: '../pages/registro-puestos/registro-puestos.module#RegistroPuestosPageModule' },
      { path: 'resultados', loadChildren: '../pages/resultados/resultados-admin.module#ResultadosPageModule' }
 

       
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
  ],
  declarations: [HomeAdminPage]
})
export class HomeAdminPageModule {}
