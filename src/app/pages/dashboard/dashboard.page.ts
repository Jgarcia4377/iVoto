import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ToastExample } from '../../providers/utility/toast';
import { Router, Params } from '@angular/router';
import { UsuarioServices } from '../../services/usuario.services';
import { eventoVotacionServices} from '../../services/evento.services';
import * as moment from 'moment';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers:[UsuarioServices, eventoVotacionServices]
})
export class DashboardPage implements OnInit {
  isDisabled: boolean=true;
  nombres: any;
  identity: any;
  eventos: any;
  fechainicio:[];
  evento:any;
  duration: any;

  constructor(private router: Router,private toastController: ToastExample,public popoverController: PopoverController, private _UsuarioServices:UsuarioServices, private _eventos: eventoVotacionServices) { }
  
  actualizar ={
    idevento:'',    
    FHActualSistema :'',
  }

  getEventos(){
    
    this._eventos.getEventos().subscribe(
      response =>{ 
       //console.log(response)
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
 
  ngOnInit() {

    this.getEventos();
   // this.evento = this._eventos.getIdentity();
  
  }
  


  seleccionarEvento(data){

    //console.log(data)
    console.log(data.idevento)
    this.actualizar.idevento = data.idEvento;
    let FechaHoraActual: any = new Date();
    this.actualizar.FHActualSistema = moment(FechaHoraActual).format('YYYY-MM-DD HH:mm:ss') ;
    
    console.log(this.actualizar)
   // console.log(this.eventos)
    this._eventos.UpdateEstadoEvento(this.actualizar).subscribe(
      response =>{ 
        localStorage.setItem('evento',JSON.stringify(this.actualizar.idevento));
        console.log(response)
       //this.toastController.presentToast(response[0][0].notificacion);
       if(response[0][0].idestadoVotacion == 2){
         console.log("paso");
        this.router.navigate(['/home/votacion']);  
       } else if(response[0][0].idestadoVotacion == 3){
        this.toastController.presentToast("EL evento ya finalizo");
        this.duration= 1000,
        this.toastController.presentToastWithOptions(response);
        //this.toastController.crearPDF()
       }
     },
     error=>{
       var errorMessage = <any>error;
       console.log(errorMessage);
       if(errorMessage !=null){
         console.log(errorMessage);
       }
     }
   );
   1000}


}
