import { Component, OnInit } from '@angular/core';
import { MyNewServiceService } from '../services/my-new-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-new-component',
  templateUrl: './my-new-component.component.html',
  styleUrls: ['./my-new-component.component.css']
})
export class MyNewComponentComponent implements OnInit {

public clientes: any[] = [];
public cliente: any[] = [];
public n = true; //variable para guardar si el cliente es nuevo
public e = true; //variable para guardar si existe un acceso
public acceso: string = '';

//modelo usuario
public usuario = {
  "nombre": "",
  "rif": "",
  "telefono": "",
  "email": "",
  "direccion": "",
  "contacto": "",
  "accesos" : {
    "url" : "",
    "user" : "",
    "pass" : ""
  }
};
    
  constructor(private _myNewServiceService: MyNewServiceService) { }

  ngOnInit() {
  }
//busca todos los datos
  buscarData(){
    this._myNewServiceService.buscarData().subscribe(
      res=> {
        this.clientes= res.json().clientes;
      }
    );

  }
  //consulta por el RIF
  consulta(id){
     this._myNewServiceService.consulta(id).subscribe(
      res=> {
        this.cliente= res.json().cliente;
        console.log(res.json());
      }
    );
  }

  div(){
    document.getElementById("registros").style.display = "block";
    document.getElementById("registro").style.display = "none";
  }
  div2(){
    document.getElementById("registro").style.display = "inline";
    document.getElementById("registros").style.display = "none";
  }
//Elimina
  eliminar(cliente){
   
    this._myNewServiceService.eliminar(cliente._id).subscribe(
      res=> {
        console.log(res.json());
        
        this.div();
        this.buscarData();
        
      }
    );
  }
//Registra o actualiza dependiendo si el cliente es nuevo
registerUser(cliente,n) {
  if (n===true) {
    this._myNewServiceService.registrar(this.usuario).subscribe(
      res=> {
        console.log(res.json());
        
        this.consulta(this.usuario.rif);
        this.div2();
        document.getElementById('tab2').click();
      }
    );
  
  }
  if (n===false) {
    this._myNewServiceService.editar(this.usuario,cliente).subscribe(
      res=> {
        console.log(res.json());
        
        this.consulta(this.usuario.rif);
        this.div2();
        document.getElementById('tab2').click();
      }
    );  
}
}

  actualizar(cliente){   
     this.usuario.nombre = cliente.nombre;
     this.usuario.rif = cliente.rif;
     this.usuario.telefono = cliente.telefono;
     this.usuario.email = cliente.email;
     this.usuario.direccion = cliente.direccion;
     this.usuario.contacto = cliente.contacto;

    document.getElementById('tab1').click();

    document.getElementById("registra").style.display = "none";
    document.getElementById("actualiza").style.display = "inline-block";
    this.n = false;
    
  }

  nuevo(){
    this.usuario.nombre = "";
     this.usuario.rif = "";
     this.usuario.telefono = "";
     this.usuario.email = "";
     this.usuario.direccion = "";
     this.usuario.contacto = "";
    document.getElementById("registra").style.display = "inline-block";
    document.getElementById("actualiza").style.display = "none";
    this.n = true;
  }

  aggAcceso(){
    document.getElementById("divAcceso").style.display = "inline";
    this.usuario.accesos.url = "";
    this.usuario.accesos.user = "";
    this.usuario.accesos.pass = "";
    this.e = false;
  }
//Crea un nuevo acceso o actualiza uno existente
  registraAcceso(cliente){
    if (this.e === false) {
      this._myNewServiceService.agregaAcceso(this.usuario.accesos,cliente).subscribe(
      res=> {
        console.log(res.json());
        
        this.consulta(cliente.rif);
        this.div2();
        document.getElementById('tab2').click();
        document.getElementById("divAcceso").style.display = "none"
      }
      );
    }
    if (this.e === true) {
     this._myNewServiceService.editaAcceso(this.usuario.accesos.url, this.usuario.accesos.user,this.usuario.accesos.pass,cliente, this.acceso).subscribe(
      res=> {
        console.log(res.json());
        
        this.consulta(cliente.rif);
        this.div2();
        document.getElementById('tab2').click();
        document.getElementById("divAcceso").style.display = "none"
      }
      );
    }
  }

  updateAcceso(acceso){
    this.usuario.accesos.url = acceso.url;
    this.usuario.accesos.user = acceso.username;
    this.usuario.accesos.pass = acceso.password;
    document.getElementById("divAcceso").style.display = "inline";
    this.e = true;
    this.acceso = acceso._id;
  }
//Elimina un acceso
  eliminaAcceso(acceso, cliente){
    this._myNewServiceService.eliminaAcceso(acceso, cliente).subscribe(
      res=> {
        console.log(res.json());
        
        this.consulta(cliente.rif);
        this.div2();
        document.getElementById('tab2').click();
        document.getElementById("divAcceso").style.display = "none"
      }
      );
  }

}
