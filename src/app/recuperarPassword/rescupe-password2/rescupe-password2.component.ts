import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
  selector: 'app-rescupe-password2',
  templateUrl: './rescupe-password2.component.html',
  styleUrls: ['./rescupe-password2.component.css']
})
export class RescupePassword2Component implements OnInit {
Email:string;
Codigo:number;
loading:boolean;
  constructor(public router: Router,
    public services: EmpresaService,) { }

  ngOnInit(): void {

  }

  verificarCodigo(){
    this.loading=true;
    if(this.Email!=null && this.Codigo!=null){
      this.services.ValidarCodigo(this.Email,this.Codigo).pipe().subscribe((e)=>{
        if(e==true){
          this.loading=false;
          window.alert("Has pasado con exito");
          this.services.setCorreo(this.Email);
          
          this.router.navigateByUrl('/recuPas3');
        }else{
          this.loading=false;
          window.alert("El campo email o codigo no es correcto");
        }
       
      });

      
    }else{
      this.loading=false;
      window.alert("El campo email o codigo esta vacio");
    }
  }

}
