import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Observable} from 'rxjs/Observable'; 
//import {User} from '../models/usuario';
import {GLOBAL} from './global';
//import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/internal/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/Rx';




@Injectable()
export class UsuarioServices {
   // public usuario:Usuario;
    public url:string;
    public identity;
    public identityUsuario;
    public token;

    

    constructor(public _http: HttpClient){
        this.url ='http://localhost:3000/';
       
    }
//    login(user:User, token=null): Observable <any>{
  //      if(token != null){
    //       user.gettoken = token;
      //  }
        //let params= JSON.stringify(user); 
        //let headers = new HttpHeaders().set('Content-Type','application/json');
        //return this._http.post(this.url+'login', params, {headers:headers});        
   // }

  // loginAdmin(usuario){
       
    //let params= JSON.stringify(usuario);
    // console.log(params+"del servicio")
    // let headers = new HttpHeaders().set('Content-Type','application/json');
     //return this._http.post(this.url+'login', params, {headers:headers});
   //}

   
 

   loginUser(usuario){
                
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post('http://localhost:3000/'+'login', JSON.stringify(usuario), {headers: headers})
    };

    getPersonas(): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
                                    // .set('Authorization', this.getToken());
      return this._http.get(this.url+'admin', {headers: headers});      
  }

    loginUserAdmin(usuario){    
        let params= JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'admin', JSON.stringify(usuario), {headers: headers})
    } 
    
    RegistroTipoUsuario(tipo_usuario): Observable <any>{
      let params= JSON.stringify(tipo_usuario);
      let headers = new HttpHeaders().set('Content-Type','application/json');
                                    // .set('Authorization', this.getToken());
      return this._http.post(this.url+'registro-tipo-usuario',JSON.stringify(tipo_usuario), {headers:headers});      
  }


  RegistroUsuario(userNuevo){
    let params= JSON.stringify(userNuevo);
    let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'registro-votante',JSON.stringify(userNuevo), {headers: headers})
  }
    

    deleteTipoUsuario(id): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
                                    // .set('Authorization', this.getToken());
      return this._http.delete(this.url+'registro-tipo-usuario/'+id, {headers});    
      
  }

    getTipoUsuario(): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
                                    // .set('Authorization', this.getToken());
      return this._http.get(this.url+'registro-tipo-usuario', {headers});      
  }

  getUsuarios(): Observable <any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
                                  // .set('Authorization', this.getToken());
    return this._http.get(this.url+'registro-votante', {headers});      
}


    getIdentity(){
        let identity = JSON.parse(JSON.stringify(localStorage.getItem('identity')));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

  //   getIdentityTipoUsuario(){
  //     let identityUsuario = JSON.parse(JSON.stringify(localStorage.getItem('identity_tipo_usuario')));
  //     if(identityUsuario != "undefined"){
  //         this.identityUsuario = identityUsuario;
  //     }else{
  //         this.identityUsuario = null;
  //     }
  //     return this.identityUsuario;
  // }


    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
 //   register(user: User): Observable <any>{
   //     let params= JSON.stringify(user);
     //   let token = JSON.parse(localStorage.getItem('token'));
       // let headers = new HttpHeaders().set('Content-Type','application/json');
        //return this._http.post(this.url+'register',params, {headers:headers});        
        //console.log(user_to_register);
        //console.log(this.url);
   // }

    
}
