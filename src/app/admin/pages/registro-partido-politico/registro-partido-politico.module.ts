import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { IonicModule } from '@ionic/angular';

import { RegistroPartidoPoliticoPage } from './registro-partido-politico.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPartidoPoliticoPage
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
  declarations: [RegistroPartidoPoliticoPage]
})
export class RegistroPartidoPoliticoPageModule {}
