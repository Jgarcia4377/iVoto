import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UsuarioServices } from '../services/usuario.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[UsuarioServices]
})
export class HomePage {

  selectedPath = '';
  pages = [
   
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'home'
    },
    {
      title: 'Mi Votación',
      url: 'votacion',
      icon: 'checkbox-outline'
     
    },
    {
      title: 'Acerca de',
      url: 'about',
      icon: 'information-circle'
      
    },
    // {
    //   title: 'Cool Frameworks',
    //   children: [
    //     {
    //       title: 'Ionic',
    //       url: '/menu/ionic',
    //       icon: 'logo-ionic'
    //     },
    //     {
    //       title: 'Flutter',
    //       url: '/menu/flutter',
    //       icon: 'logo-google'
    //     },
    //   ]
    // }
  ];

  identity: any;
  nombres: any;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
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

}
