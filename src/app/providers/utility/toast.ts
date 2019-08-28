import { Component } from '@angular/core';
import { ToastController,Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioServices } from '../../services/usuario.services';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as moment from 'moment';

@Injectable()

export class ToastExample {
  nombre: any;
  id: any;
  msjOk: any;
  dataTable: any;
  descripcion: any;
  FHincio: any;
  estado: any;
  pdfObj = null;
  evento: any;
  identity: any;
  fecha: any;
  constructor(private plt: Platform,private file: File,private fileOpener: FileOpener,private _UsuarioServices:UsuarioServices,public toastController: ToastController) {}

  toDataURL = 'Logo.png';

  

  crearPDF(){
    this.identity = (localStorage.getItem("identity"))?JSON.parse(localStorage.getItem("identity")):[];
    console.log(this.identity[0][0].nombres);
    
    var docDefinition = {
     
      content: [
       // { image: this.toDataURL},
        { text: 'CERTIFICADO DE VOTACIÓN', style: 'header', alignment: 'center' },
        { text: this.evento, style: 'sub-header', alignment: 'center' },
        { text: this.fecha, style: 'story', alignment: 'center' },
        { text: new Date().toTimeString(), style: 'sub-header',alignment: 'right' },
       
        { text: this.identity[0][0].cedula,style: 'story' ,alignment:'right'},
        { text: 'CÉDULA', style: 'header',alignment:'right', fontSize: 12},
        { margin: [0, 20, 0, 20]},
        { text: this.identity[0][0].nombres,style: 'sub-header' ,alignment:'center' ,fontSize: 10},
        { text: 'APELLIDOS Y NOMBRES DEL VOTANTE', style: 'header',alignment:'center', fontSize: 12},

      ],
      styles: {
        header: {
          fontSize: 18,
          color: "dark",
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'Certificado de Votación.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  async presentToast(msg) {
   
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      color:"dark",
      mode:"ios",
      duration: 1000,
      buttons: ['Ok']
    });
    toast.present();
  }

  async presentToastWithOptions(msg) {
    this.identity = (localStorage.getItem("identity"))?JSON.parse(localStorage.getItem("identity")):[];
    console.log(this.identity[0][0].nombres);
   // this.nombres = this.identity[0][0].nombres;
    
    console.log(msg)
   // this.fecha = msg[0][0].fechaInicio
    this.fecha = moment(msg[0][0].fechaInicio).format('YYYY-MM-DD');
    console.log(this.fecha);
    
    this.evento = msg[0][0].nombreEvento;
    console.log(this.evento);
    
    const toast = await this.toastController.create({
      header: 'Desea Generar su certificado de votación?',
      message: 'Click to Close',
      position: 'top',
      duration: 4000,
      buttons: [
        {
          side: 'start',
          icon: 'cloud-download',
          text: 'Generar',
          handler: () => {
            this.crearPDF();
            this.downloadPdf();
            
            console.log('Favorite clicked');
          }
        }, {
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