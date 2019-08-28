import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UsuarioServices } from '../../../services/usuario.services';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
})
export class DashboardAdminPage implements OnInit {

  public identity;
 
  


  myChart: Chart;
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor( private _UsuarioServices:UsuarioServices) { }

  ngOnInit() {
    this.identity = this._UsuarioServices.getIdentity();
    //this.barChartMethod();
   
  }

  
  

}
