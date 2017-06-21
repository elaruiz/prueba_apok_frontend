import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from'@angular/http';

@Injectable()
export class MyNewServiceService {


  constructor(private _http: Http) {

   }
  
  

  buscarData(){
    let a= this._http.get('http://localhost:3000/clientes');
    return a;
  }


  consulta(id){
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      var id = id;
      const obj = {id:id};
      const body = 'data=' + JSON.stringify(obj);
      return this._http.post('http://localhost:3000/clienteid/', body, { headers });
  }

  eliminar(id){
    let headers: Headers;
    let options: RequestOptions;
      headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
       options = new RequestOptions({ headers: headers });
    let a= this._http.delete('http://localhost:3000/cliente/'+id,options);
    return a;
  }

  registrar(cliente){
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      var nombre = cliente.nombre;
      var rif = cliente.rif;
      var telefono = cliente.telefono;
      var email = cliente.email;
      var direccion = cliente.direccion;
      var contacto = cliente.contacto;
      const obj = {nombre:nombre, rif:rif, telefono:telefono, email:email,direccion:direccion,contacto:contacto};
      const body = 'data=' + JSON.stringify(obj);
      return this._http.post('http://localhost:3000/cliente/', body, { headers });
  }

  editar(cliente,registro){
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      var id = registro._id;
      var nombre = cliente.nombre;
      var rif = cliente.rif;
      var telefono = cliente.telefono;
      var email = cliente.email;
      var direccion = cliente.direccion;
      var contacto = cliente.contacto;
      const obj = {nombre:nombre, rif:rif, telefono:telefono, email:email,direccion:direccion,contacto:contacto};
      const body = 'data=' + JSON.stringify(obj);
      console.log(cliente)
      return this._http.put('http://localhost:3000/cliente/'+id, body, { headers });
  }

  agregaAcceso(acceso,cliente){
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      var id = cliente._id;
      var url = acceso.url;
      var user = acceso.user;
      var pass = acceso.pass;
      
      const obj = { url:url, user:user, pass:pass};
      console.log(obj)
      const body = 'data=' + JSON.stringify(obj);
      
      return this._http.put('http://localhost:3000/acceso/'+id, body, { headers });
  }

  editaAcceso(url,user, pass, a){
      
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     
      var idAcceso = a;
      var url = url;
      var user = user;
      var pass = pass;
      
      const obj = { url:url, username:user, password:pass};
      
      const body = 'data=' + JSON.stringify(obj);
      
      return this._http.put('http://localhost:3000/accesos/'+idAcceso, body, { headers });
  }

 eliminaAcceso(acceso){
   var idAcceso = acceso._id;
   let headers: Headers;
   let options: RequestOptions;
   headers = new Headers({ 'Content-Type': 'application/json','Accept': 'q=0.8;application/json;q=0.9' });
   options = new RequestOptions({ headers: headers });
   let a= this._http.delete('http://localhost:3000/acceso/'+idAcceso,options);
    return a;
  
  }
  

}
