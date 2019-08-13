import { Component, OnInit } from '@angular/core';
import { ToastExample } from '../../../providers/utility/toast'
import { UsuarioServices } from '../../../services/usuario.services';
import { Router} from '@angular/router';
import { ValidarCedula } from '../../../providers/utility/validarCedula';


@Component({
  selector: 'app-registro-votante',
  templateUrl: './registro-votante.page.html',
  styleUrls: ['./registro-votante.page.scss'],
  providers:[UsuarioServices]
})
export class RegistroVotantePage implements OnInit {

  isDisabled: boolean=true;
  disableestado: boolean;
  config: any;
  response
  usuarios: any[];
  p: number = 1;
  isDisabledCedula: boolean=false;
  estado: any;
  constructor(private ValidarCedula: ValidarCedula,private _UsuarioServices:UsuarioServices, private router: Router,  private toastController: ToastExample )
   {  
   
	}

   userNuevo ={
    cedula:'',
    nombres:'',
    apellido_p:'',
    apellido_m:'',
    huella_dactilar:'',
    correo:'',
    telefono:'',
    direccion:'',
    tipo_usuario_id:2,
    estado_usuario_id:1
  }

  // handlePage(e){
  //   this.page_size = e.pageSize;
  //   this.page_number = e.pageIndex;

  // }



  ngOnInit() {
    this.getUsuario();
   // this.getTipoUsuario();
   // this.isDisabled
  }

  // enviarCorreo(response) {
  //   this.emailComposer.isAvailable().then((available: boolean) =>{
  //     if(available) {
  //       //Now we know we can send
  //       let email = {
  //         to: response[0][0].correo,
  //         cc: 'administrador@touchVote.com',
  //         subject: 'Usuario y contraseña',
  //         body: 'Estimado' +' '+ response[0][0].nombres + ':' 
  //         + ' Su usuario y contraseña para acceder a la aplicacion TouchVote son los siguientes'
  //         + ' Usuario: ' + response[0][0].usuario 
  //         + ' Contraseña: ' + response[0][0].contraseña,
  //         isHtml: true
  //       };
  //       console.log(response)
  //       console.log(email);
    
  //       this.emailComposer.open(email);
  //     }
  //    });
  
  // }

 

  async validar(){
    if (!this.ValidarCedula.validarDocumento(this.userNuevo.cedula)){
     // this.toastController.presentToast("Cedula Incorrecta! Intente de nuevo")
    }
    else{
     // this.toastController.presentToast("Cedula Correcta");
      this.isDisabledCedula=true;
      this.isDisabled=false;
    }
  }


  onSubmit(){

    if(this.isDisabled == false){
      this._UsuarioServices.RegistroUsuario(this.userNuevo).subscribe(
        response=>{
          this.response = response
          console.log(response);
          this.toastController.presentToast(response[0][0].notificacion);
          this.getUsuario();
        //  this.enviarCorreo(response);
        });
      }else{
        this.toastController.presentToast(this.response[0][0].notificacion);
      }
}

 getUsuario(){
  this._UsuarioServices.getUsuarios().subscribe(
    response =>{ 
     console.log(response)
     this.usuarios = response
     this.estado = response[0].estado
     console.log(this.estado)
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
