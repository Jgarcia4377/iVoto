
import { UsuarioServices } from '../../services/usuario.services';
import { ToastExample } from '../../providers/utility/toast'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[UsuarioServices]
})
export class LoginPage implements OnInit {

  public identity:any;

  admin ={
    id:'',
    usuario:'',
    contrasena:''
  }
     
   constructor(private _UsuarioServices:UsuarioServices, private router: Router,  private toastController: ToastExample ) 
   {
     
     
   }


  login(){
   
 }

 
 
   onSubmit(){
    this._UsuarioServices.loginUserAdmin(this.admin).subscribe(
      response=>{
        this.identity = response;
        console.log(response);
        //PERSISTIR DATOS DEL USUARIO
        localStorage.setItem('identity',JSON.stringify(this.identity));
        if(this.admin.usuario == this.identity[0][0].usuario){   
          this.toastController.presentToast(this.identity[0][0].notificacion);
            this.router.navigate(['home-admin/dashboardAdmin']);            
            
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

   

  ngOnInit() {
    // this.identity = this._UsuarioServices.getIdentity();
  }
}
