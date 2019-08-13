import { Component, OnInit } from '@angular/core';
import { ToastExample } from '../../../providers/utility/toast'
import { eventoVotacionServices } from '../../../services/evento.services';

@Component({
  selector: 'app-registro-partido-politico',
  templateUrl: './registro-partido-politico.page.html',
  styleUrls: ['./registro-partido-politico.page.scss'],
  providers:[eventoVotacionServices]
})
export class RegistroPartidoPoliticoPage implements OnInit {
  PartidosPoliticos: any;
  isDisabled: boolean=true;
  data: any;
  p: number = 1;

  constructor(private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices) { }
  newPartido ={
    nombrePartido:'',    
    numeroPartido:'',
  }

  ngOnInit() {
    this.getPartidosPoliticos();
  }

  onSubmit(){
    console.log(this.newPartido)
    if(!this.newPartido.nombrePartido && !this.newPartido.numeroPartido)
    {
      this.toastController.presentToast("No puede haber ningun campo vacio");
    }
    else{
     
      this._eventoVotacion.RegistroPartidoPolitico(this.newPartido).subscribe(
        response=>{
          this.PartidosPoliticos = response;
          this.toastController.presentToast(response[0][0].notificacion);
          this.getPartidosPoliticos();
        },
          error=>{
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage !=null){
              console.log(errorMessage);
            }
          }
      )};
  }

  getPartidosPoliticos(){
    this._eventoVotacion.getPartidosPoliticos().subscribe(
      response =>{ 
       console.log(response)
       this.data = response
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
