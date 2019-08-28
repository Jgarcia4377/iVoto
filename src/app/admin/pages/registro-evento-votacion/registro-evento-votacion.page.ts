import { Component, OnInit } from '@angular/core';
import { ToastExample } from '../../../providers/utility/toast'
import { eventoVotacionServices } from '../../../services/evento.services';
import * as moment from 'moment';



@Component({
  selector: 'app-registro-evento-votacion',
  templateUrl: './registro-evento-votacion.page.html',
  styleUrls: ['./registro-evento-votacion.page.scss'],
  providers:[eventoVotacionServices]
})
export class RegistroEventoVotacionPage implements OnInit {
  eventos: any;
  p: number = 1;

  constructor(private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices) { }

  newEvento ={
    descripcion:'',
    observaciones:'',
    fechahorainicio:'',
    fechahorafin:'',
    idestadovotacion:1,
  }
  ngOnInit() {
    this.getEventos();
  }




//   doSomething(date) {
//   this.newEvento.fechahorainicio = moment(date).format('YYYY MM DD HH:mm:ss'); // 2019-04-22
//  }

  onSubmit(){
    console.log(this.newEvento)
    this.newEvento.fechahorainicio = moment(this.newEvento.fechahorainicio).format('YYYY-MM-DD HH:mm:ss');
    console.log(this.newEvento.fechahorainicio)
    this.newEvento.fechahorafin = moment(this.newEvento.fechahorafin).format('YYYY-MM-DD HH:mm:ss');
    console.log(this.newEvento.fechahorafin)
    if(this.newEvento.fechahorafin <= this.newEvento.fechahorainicio){
      this.toastController.presentToast("La finalizacion del evento no puede ser menor a la fecha de inicio del mismo")
    }
    else{

    
  this._eventoVotacion.RegistroEvento(this.newEvento).subscribe(
    response=>{
      this.eventos = response;
      //PERSISTIM0S LSO DATOS EN LA LOCALSTORAGE
     // localStorage.setItem('identity_tipo_usuario',JSON.stringify(this.identityUsuario));
     // console.log(this.tipoUsuario.tipo)
      //this.identity = response;
      console.log(response);
     // window.location.reload()
    // this.getTipoUsuario();
       this.toastController.presentToast(response[0][0].notificacion)
       this.getEventos();
       this.newEvento.descripcion=""
       this.newEvento.fechahorafin=""
       this.newEvento.fechahorainicio=""
       this.newEvento.observaciones=""

  //     this.presentLoading();
      //window.location.reload();
      //PERSISTIR DATOS DEL USUARIO
      //localStorage.setItem('identity',JSON.stringify(this.identity));
      
     } );
    }
    }

    getEventos(){
      this._eventoVotacion.getEventosAdmin().subscribe(
        response =>{ 
         console.log(response)
         this.eventos = response
       },
       error=>{
         var errorMessage = <any>error;
         console.log(errorMessage);
         if(errorMessage !=null){
           console.log(errorMessage);
         }
       }
     );
    }

    mostrarDetalleEvento(evento){ 
      console.log(evento) 
     
    this.toastController.PresentToastDetallesEvento(evento);   
    }
    
}
