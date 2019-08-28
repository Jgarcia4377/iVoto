import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';
import { Observable } from 'rxjs/internal/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/Rx';

@Injectable()
export class eventoVotacionServices {
   // public usuario:Usuario;
    public url:string;
    
    public identity;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    RegistroEvento(eventoVotacion): Observable <any>{
       
        let params= JSON.stringify(eventoVotacion);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'registro-evento',JSON.stringify(eventoVotacion), {headers});      
    }

    MostrarGraficoById(resultado): Observable <any>{
        console.log(resultado)
        let params= JSON.stringify(resultado);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'resultados',JSON.stringify(resultado), {headers});      
    }

    getEventos(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.get(this.url+'dashboard', {headers});      
    }

    getEventosAdmin(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.get(this.url+'registro-evento', {headers});      
    }

    RegistroCandidato(candidato): Observable <any>{
        let params= JSON.stringify(candidato);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'registro-candidato',JSON.stringify(candidato), {headers:headers});      
    }

    getCandidatos(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.get(this.url+'registro-candidato', {headers});      
    }

    RegistroPartidoPolitico(partidoPolitico): Observable <any>{
        let params= JSON.stringify(partidoPolitico);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'registro-partido-politico',JSON.stringify(partidoPolitico), {headers:headers});      
    }

    getPartidosPoliticos(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.get(this.url+'registro-partido-politico', {headers});      
    }

    RegistroPuestos(puestos): Observable <any>{
        let params= JSON.stringify(puestos);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'registro-puestos',JSON.stringify(puestos), {headers:headers});      
    }

    getPuestosCandidatos(): Observable <any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.get(this.url+'registro-puestos', {headers});      
    }

    UpdateEstadoEvento(evento): Observable <any>{
        let params= JSON.stringify(evento);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.put(this.url+'registro-evento',JSON.stringify(evento), {headers:headers});      
    }

    getIdentity(){
        let identity = JSON.parse(JSON.stringify(localStorage.getItem('evento')));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }


  

    
}
