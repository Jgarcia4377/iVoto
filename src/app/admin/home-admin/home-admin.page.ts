import { Component, OnInit, DoCheck, } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UsuarioServices } from '../../services/usuario.services';



@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
  providers:[UsuarioServices]
})
export class HomeAdminPage implements OnInit, DoCheck {

  
  pages = [
   
    {
      title: 'Dashboard',
      url: 'dashboardAdmin',
      icon: 'home'
    },
    {
      title: 'Registrar Votantes',
      url: 'registro-votante',
      icon: 'person-add'
    },
    {
      title: 'Resultados',
      url: 'resultados',
      icon: 'pie'
    },
    {
      title: 'Configuraciones',
      children: [
        {
          title: 'Registrar Partidos Politicos',
          url: 'registro-partido-politico',
          icon: 'bookmarks'
        },
        {
          title: 'Registrar Puestos',
          url: 'registro-puestos',
          icon: 'clipboard'
        },
        // {
        //   title: 'Tipos de Usuarios',
        //   url: 'registro-tipo-usuario',
        //   icon: 'person-add'
        // },
        {
          title: 'Registrar Evento',
          url: 'registro-evento',
          icon: 'bookmarks',
        },
        {
          title: 'Registro Candidato',
          url: 'registro-candidato',
          icon:'person-add'
        }
      ]
    },
  ]
 

  identity: any;
  public userStr;
  nombres: any;

  constructor(private _UsuarioServices:UsuarioServices, private router: Router) {
    
  }  



  ngOnInit() {
    // this.identity = this._UsuarioServices.getIdentity();
  //  this.identity = JSON.parse(JSON.stringify(localStorage.getItem('identity')));
    //console.log(this.identity[0][0].notificacion);
    
    // this.identity = localStorage.getItem("identity");
    
    this.identity = (localStorage.getItem("identity"))?JSON.parse(localStorage.getItem("identity")):[];
    console.log(this.identity[0][0].nombres);
    this.nombres = this.identity[0][0].nombres;
  }

  ngDoCheck(){
    this.identity = this._UsuarioServices.getIdentity();
}

logout(){
  localStorage.clear();
  this.identity = null;
 // this._router.navigate(['/inicio']);
  this.router.navigate(['admin']);  
  console.log('sesión cerrada');
}

}
