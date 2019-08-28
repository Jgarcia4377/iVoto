import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastExample } from '../../providers/utility/toast'
import { eventoVotacionServices } from '../../services/evento.services';
import { UsuarioServices } from '../../services/usuario.services';
import { Chart } from 'chart.js';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
  providers:[eventoVotacionServices,UsuarioServices]
})
export class ResultadosPage implements OnInit {
  eventos: any;
  candidatos: any;
  puestocandidato: any;
  items:any;
  var_x_labels:any;
  var_y:any;

  @ViewChild('barCanvas', {static: false}) barCanvas: ElementRef;

  constructor(public loadingController: LoadingController,private toastController: ToastExample, private _eventoVotacion: eventoVotacionServices, private _usuarioServices: UsuarioServices) { }

  resultado ={
    idEvento:'',    
  }

  ngOnInit() {
    this.getEventos();        
   
  }

  

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

   

  onSubmit(){
    
    //console.log(this.resultado)
    this.presentLoading();
   
    this._eventoVotacion.MostrarGraficoById(this.resultado).subscribe(
      response =>{
     //   console.log(response)
       
     var labels = []
     var votos = []
     var puestos = []
     for (var i of response[0]) {
      labels.push(i.nombres + " / " + i.puesto  );
      votos.push(i.cantidadVotos)
      puestos.push(i.puesto)

      console.log(puestos)

     
         // console.log(response[0].nombres);
          this.presentLoading();
          var ctx = document.getElementById('myChart');
          this.presentLoading();
      var myChart = new Chart(ctx, {
        
          type: 'line',
          data: {
              labels: labels,
              //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: '# de votos',
                  data: votos,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 3
              }]
          },
          options: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
               fontColor: 'black'
              }
             },
              scales: {
               
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
      }
       
        
      }
    )

  }

  getCandidatos(){
    this._eventoVotacion.getCandidatos().subscribe(
      response =>{ 
       
       this.candidatos = response   
       console.log(this.candidatos[0].nombres);
          
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


  getEventos(){
    this._eventoVotacion.getEventos().subscribe(
      response =>{ 
       console.log(response)
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


}
