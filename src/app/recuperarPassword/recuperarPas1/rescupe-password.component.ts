import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/_services/empresa.service';

@Component({
  selector: 'app-rescupe-password',
  templateUrl: './rescupe-password.component.html',
  styleUrls: ['./rescupe-password.component.css']
})
export class RescupePasswordComponent implements OnInit {
  Email:string;
  loading:boolean;
  constructor( public router: Router,
    public services: EmpresaService,) { }

  ngOnInit(): void {
  }

  crearCodigo(){
    this.loading=true;
    if(this.Email!=null){
      this.services.RestaurarPassword(this.Email).pipe().subscribe((e)=>{
        this.loading=false;
        this.router.navigateByUrl('/recuPas2');
      })
    }else{
      this.loading=false;
      window.alert("El campo email esta en blanco");
    }
   
  }

}
