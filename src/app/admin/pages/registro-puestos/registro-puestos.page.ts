import { Component, OnInit } from '@angular/core';
import { ToastExample } from '../../../providers/utility/toast'
import { eventoVotacionServices } from '../../../services/evento.services';

@Component({
  selector: 'app-registro-puestos',
  templateUrl: './registro-puestos.page.html',
  styleUrls: ['./registro-puestos.page.scss'],
  providers:[eventoVotacionServices]
})
export class RegistroPuestosPage implements OnInit {
  data: any;
  p: number = 1;

  constructor(private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices) { }

  newPuesto ={
    tipo:'',
  }
  ngOnInit() {
    this.getPuestosCandidatos();
  }

  onSubmit(){
    console.log(this.newPuesto)
    if(!this.newPuesto.tipo)
    {
      this.toastController.presentToast("No puede haber ningun campo vacio");
    }
    else{
     
      this._eventoVotacion.RegistroPuestos(this.newPuesto).subscribe(
        response=>{
          //this.data = response;
          this.toastController.presentToast(response[0][0].notificacion);
          this.getPuestosCandidatos();
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

  getPuestosCandidatos(){
    this._eventoVotacion.getPuestosCandidatos().subscribe(
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
