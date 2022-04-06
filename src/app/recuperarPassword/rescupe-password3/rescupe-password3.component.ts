import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/_services/empresa.service';


@Component({
  selector: 'app-rescupe-password3',
  templateUrl: './rescupe-password3.component.html',
  styleUrls: ['./rescupe-password3.component.css']
})
export class RescupePassword3Component implements OnInit {
  Password:string;
  Password2:string;
  loading:boolean;
  constructor(public router: Router,
    public services: EmpresaService,
   
    ) { }

  ngOnInit(): void {
  }

  cambiarPassword(){
    this.loading=true;
  let email= this.services.getCorreo();
   if(this.Password!=null && this.Password2!=null && email!=null){
     if(this.Password==this.Password2){
       this.services.updatePassword(email,this.Password).pipe().subscribe((e)=>{
        this.loading=false;
        window.alert("La contraseña ha sido cambiada con exito");
        localStorage.removeItem('correo');
        this.router.navigateByUrl("/Login");
      })
     }else{
      this.loading=false;
      window.alert("La contraseñas contraseñas no coinciden");
     }

  }else{
    this.loading=false;
    window.alert("algun campo esta vacio");
  }
}
}
