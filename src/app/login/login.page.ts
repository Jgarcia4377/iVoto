import { Component, OnInit,DoCheck } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, Params } from '@angular/router';
import { UsuarioServices } from '../services/usuario.services';
import { ToastExample } from '../providers/utility/toast'
import { ValidarCedula } from '../providers/utility/validarCedula'
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[UsuarioServices,AndroidFingerprintAuth]
})
export class LoginPage implements OnInit,DoCheck {

  public identity:any;
  user ={
    id:'',
    usuario:'',
    contrasena:''
  }
     
  constructor(private _UsuarioServices:UsuarioServices, public loadingCtrl: LoadingController,private router: Router, private androidFingerprintAuth: AndroidFingerprintAuth,  private toastController: ToastExample, private ValidarCedula: ValidarCedula) { }

  ngOnInit() {
    this.identity = this._UsuarioServices.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._UsuarioServices.getIdentity();
  }

  onSubmit(){
    
    if(!this.user.usuario && !this.user.contrasena)
    {
      this.toastController.presentToast("No puede haber ningun campo vacio");
    }
    else{
      this._UsuarioServices.loginUser(this.user).subscribe(
        response=>{
          this.identity = response;
          console.log(response);

          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('identity',JSON.stringify(this.identity));
          if(this.user.usuario == this.identity[0][0].usuario){   
            this.toastController.presentToast(this.identity[0][0].notificacion);
           // this.router.navigate(['home']);  
            this.androidFingerprintAuth.isAvailable().then((result)=> {
              if(result.isAvailable){
                // it is available
          
                this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: this.identity[0][0].usuario , password: 'myPassword' })
                  .then(result => {
                     if (result.withFingerprint) {
                      this.router.navigate(['home']);  
                         console.log('Credenciales encriptadas exitosamente.');
                         console.log('Credenciales cifradas: ' + result.token);
                     } else if (result.withBackup) {
                       console.log('¡Autentificado exitosamente con contraseña de respaldo!');
                       this.router.navigate(['home']);  
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
              
             
          }
          
          else{
           this.toastController.presentToast(this.identity[0][0].notificacion);  
           localStorage.clear();
           this.identity = null;
          // this._router.navigate([' 
            console.log('error');
          }  
        }
      ); 
  }

}

}
