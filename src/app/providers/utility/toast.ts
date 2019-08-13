import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioServices } from '../../services/usuario.services';

@Injectable()

export class ToastExample {
  nombre: any;
  id: any;
  msjOk: any;
  dataTable: any;
  descripcion: any;
  FHincio: any;
  estado: any;

  constructor(private _UsuarioServices:UsuarioServices,public toastController: ToastController) {}

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      color:"dark",
      mode:"ios",
      duration: 2000,
      buttons: ['Ok']
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async borrarTipoUsuario(msg) {
    this.nombre = msg.tipo;
    this.id = msg.idTipoUsuario
    if(this.nombre == "ADMIN"){
      this.presentToast("No se puede borrar el tipo de usuario"+" "+this.nombre)
    }else{
      
      const toast = await this.toastController.create({
        header: '¿Estás seguro?',
        message: 'Desea eliminar el  tipo de usuario' +' '+this.nombre,
        position: 'top',
        color:"light",
        mode:"ios",
        buttons: [
          {
            icon: 'close-circle',
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
   
          ,{
            icon: 'checkmark-circle',
            text: 'Si',
            handler: () => {
              this._UsuarioServices.deleteTipoUsuario(this.id).subscribe(data=>{
                this.msjOk = data.notificacion;
                console.log(data);
              
                this.presentToast(data[0][0].notificacion);
                // this.getTipoUsuario();
              //  window.location.reload();
              });
              console.log('id borrado'+this.id);
            }
          }
        ]
      });
      toast.present();
    }
   
  }

  async PresentToastDetallesEvento(msg) {
    this.descripcion = msg.descripcion;
    this.id = msg.idEvento
    this.FHincio = msg.FHinicio
    this.estado = msg.estado
        
      const toast = await this.toastController.create({
        header: '' +this.descripcion,
        message: 'La fecha del evento fue el' +' '+this.FHincio +' y su estado es '+''+this.estado,
        position: 'top',
        color:"light",
        mode:"ios",
        buttons: [
          {
            icon: 'close-circle',
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
   
          
        ]
      });
      toast.present();
    
   
  }

  // getTipoUsuario(){
  //   this._UsuarioServices.getTipoUsuario().subscribe(
  //     response =>{
  //       console.log(response)
  //       if(!response[0].tipo){
  //         console.log(response.tipo)
  //       }else{
  //         //this.nombres = this.identity[0][0].nombres;
  //         this.dataTable = response;
  //         console.log(response);
  //         // this.total = response.total;
  //         // this.canchas = response.canchas;
  //         // this.pages = response.pages;
  //         // if(page > this.pages){
  //         //   this._router.navigate(['/canchas']);
  //         // }
  //       }
  //     },
  //     error=>{
  //       var errorMessage = <any>error;
  //       console.log(errorMessage);
  //       if(errorMessage !=null){
  //         console.log(errorMessage);
  //       }
  //     }
  //   );
  // }

}