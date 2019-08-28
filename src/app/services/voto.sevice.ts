import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';
import { Observable } from 'rxjs/internal/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/Rx';

@Injectable()
export class votoServices {
   // public usuario:Usuario;
    public url:string;
    public identity;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    RegistroVoto(voto): Observable <any>{
        console.log(voto);
        
        let params= JSON.stringify(voto);
        let headers = new HttpHeaders().set('Content-Type','application/json');
                                      // .set('Authorization', this.getToken());
        return this._http.post(this.url+'votacion',params, {headers:headers});      
    }
}