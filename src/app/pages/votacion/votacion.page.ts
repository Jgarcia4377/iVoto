import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { ToastExample } from '../../providers/utility/toast'
import { eventoVotacionServices } from '../../services/evento.services';
import * as moment from 'moment';


@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.page.html',
  styleUrls: ['./votacion.page.scss'],
  providers:[eventoVotacionServices]
})
export class VotacionPage implements OnInit {
  candidatos: any;

  constructor(public popoverController: PopoverController ,private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices) { }

  votar ={
    FHVoto :'',
    idevento:'',   
    idcandidato:'',   
    idusuario:'',
    idPuestoCandidato:'',      
  
  }
  
  ngOnInit() {
    this.getCandidatos();
  }

  voto(voto){
    let FechaHoraActual: any = new Date();
    this.votar.FHVoto = moment(FechaHoraActual).format('YYYY-MM-DD HH:mm:ss') ;
    this.votar.idevento = voto.idEvento
    this.votar.idcandidato = voto.idcandidato
    this.votar.idusuario = voto.idUsuario
    this.votar.idPuestoCandidato = voto.idPuestoCandidato
    console.log( this.votar.idevento)
    console.log(this.votar.idcandidato)
    console.log( this.votar.idusuario)
    console.log( this.votar.idPuestoCandidato )
    console.log(this.votar.FHVoto)

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
