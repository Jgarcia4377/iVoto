import { Component, OnInit } from '@angular/core';
import { ToastExample } from '../../../providers/utility/toast'
import { eventoVotacionServices } from '../../../services/evento.services';
import { UsuarioServices } from '../../../services/usuario.services';
import * as moment from 'moment';


@Component({
  selector: 'app-registro-candidato',
  templateUrl: './registro-candidato.page.html',
  styleUrls: ['./registro-candidato.page.scss'],
  providers:[eventoVotacionServices,UsuarioServices]
})
export class RegistroCandidatoPage implements OnInit {
  eventos: any;
  personas: any;
  puestosCandidatos: any;
  partidoPolitico: any;
  candidatos: any;
  isDisabled: boolean=true;
  p: number = 1;


  constructor(private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices, private _usuarioServices: UsuarioServices) { }
  newCandidato ={
    idevento:'',    
    idpersona:'',
    idPuestosCandidatos:'',
    idPartidosPoliticos:'',
    cantidadVotos:0
  }
  ngOnInit() {
    this.getEventos();
    this.getPersonas();
    this.getPuestosCandidatos();
    this.getPartidosPoliticos();
    this.getCandidatos();
  }

  onSubmit(){
    console.log(this.newCandidato)
    if(!this.newCandidato.idevento || !this.newCandidato.idpersona || !this.newCandidato.idPuestosCandidatos || !this.newCandidato.idPartidosPoliticos)
    {
      this.toastController.presentToast("No puede haber ningun campo vacio");
    }
    else{
      this.isDisabled=false;
     
    this._eventoVotacion.RegistroCandidato(this.newCandidato).subscribe(
      response =>{
        // this.eventos = response;
        console.log(response);
         this.toastController.presentToast(response[0][0].notificacion)
         this.getCandidatos();
         this.newCandidato;
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage !=null){
            console.log(errorMessage);
          }
        }
  
    )
    }
  }


  getPersonas(){
    this._usuarioServices.getPersonas().subscribe(
      response =>{ 
       console.log(response)
       this.personas = response
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

  
  getEventos(){
    this._eventoVotacion.getEventos().subscribe(
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


  getPuestosCandidatos(){
    this._eventoVotacion.getPuestosCandidatos().subscribe(
      response =>{ 
       console.log(response)
       this.puestosCandidatos = response
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

  getPartidosPoliticos(){
    this._eventoVotacion.getPartidosPoliticos().subscribe(
      response =>{ 
       console.log(response)
       this.partidoPolitico = response
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

  
  getCandidatos(){
    this._eventoVotacion.getCandidatos().subscribe(
      response =>{ 
       console.log(response)
       this.candidatos = response
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


}
