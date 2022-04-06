
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-funciono',
  templateUrl: './funciono.html',

})
export class FuncionoComponent implements OnInit {
  

  constructor(
    public router: Router,
  
  ) {}

  ngOnInit(): void {}
   

  

  
  cerrar() {
    window.close();
   }
}