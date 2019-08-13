import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IonicModule } from '@ionic/angular';

import { RegistroEventoVotacionPage } from './registro-evento-votacion.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroEventoVotacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistroEventoVotacionPage]
})
export class RegistroEventoVotacionPageModule {}
