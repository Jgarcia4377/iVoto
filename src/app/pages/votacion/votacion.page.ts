import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { ToastExample } from '../../providers/utility/toast'
import { eventoVotacionServices } from '../../services/evento.services';
import { votoServices } from '../../services/voto.sevice';
import { UsuarioServices } from '../../services/usuario.services';
import * as moment from 'moment';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';


@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.page.html',
  styleUrls: ['./votacion.page.scss'],
  providers:[eventoVotacionServices,votoServices,AndroidFingerprintAuth]
})
export class VotacionPage implements OnInit {
  candidatos: any;
  public identity;
  candidatosXiDEvento:any;
  idUsuario: any;

  constructor(private androidFingerprintAuth: AndroidFingerprintAuth,public _votoService: votoServices,public _usuarioService:UsuarioServices, public popoverController: PopoverController ,private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices) { }

  votar ={
    FHVoto:'',
    idevento:'',   
    idcandidato:'',   
    idusuario:'',
    idPuestoCandidato:'',      
  
  }
  
  ngOnInit() {
    this.getCandidatos();
    this.identity = this._eventoVotacion.getIdentity();
    this.idUsuario = JSON.parse(this._usuarioService.getIdentity());
    console.log(this.idUsuario[0][0].idusuario)
   // console.log(this.identity)
  }

  voto(voto){
    let FechaHoraActual: any = new Date();
    this.votar.FHVoto = moment(FechaHoraActual).format('YYYY-MM-DD HH:mm:ss') ;
    this.votar.idevento = voto.idEvento
    this.votar.idcandidato = voto.idcandidato
    this.votar.idusuario =  this.idUsuario[0][0].idusuario
    this.votar.idPuestoCandidato = voto.idPuestoCandidato
    console.log(this.votar)
    this.androidFingerprintAuth.isAvailable().then((result)=> {
      if(result.isAvailable){
        // it is available
          console.log('pider fingerprint');
          
        this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: this.identity[0][0].usuario , password: 'myPassword' })
          .then(result => {
             if (result.withFingerprint) {
              this._votoService.RegistroVoto(this.votar).subscribe(
                response=>{
                  console.log(response)
                  let votohecho = response
                  this.toastController.presentToast(votohecho[0][0].notificacion);
                },
               error=>{
                 var errorMessage = <any>error;
                 console.log(errorMessage);
                 if(errorMessage !=null){
                   console.log(errorMessage);
                 }
               }
              )
              // this.router.navigate(['home']);  
                 console.log('Credenciales encriptadas exitosamente.');
                 console.log('Credenciales cifradas: ' + result.token);
             } else if (result.withBackup) {
               console.log('¡Autentificado exitosamente con contraseña de respaldo!');
              //  this.router.navigate(['home']);  
             } else console.log('No se pudo autenticar!');
          })
          .catch(error => {
             if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
               console.log('Autenticación de huellas dactilares cancelada');
             } else console.error(error)
          });
  
      } else {
        // fingerprint auth isn't available
      }
    })
    .catch(error => console.error(error));
     
    // this._votoService.RegistroVoto(this.votar).subscribe(
    //   response=>{
    //     console.log(response)
    //     let votohecho = response
    //     this.toastController.presentToast(votohecho[0][0].notificacion);
    //   },
    //  error=>{
    //    var errorMessage = <any>error;
    //    console.log(errorMessage);
    //    if(errorMessage !=null){
    //      console.log(errorMessage);
    //    }
    //  }
    // )
    // console.log( this.votar.idevento)
    // console.log(this.votar.idcandidato)
    // console.log( this.votar.idusuario)
    // console.log( this.votar.idPuestoCandidato )
    // console.log(this.votar.FHVoto)

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
