import { Component, OnInit } from '@angular/core';
import { UsuarioServices } from '../../../services/usuario.services';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {

  public identity;
  constructor( private _UsuarioServices:UsuarioServices) { }

  ngOnInit() {
    this.identity = this._UsuarioServices.getIdentity();
  }


}
