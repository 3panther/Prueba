
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-fail',
  templateUrl: './fail.html',

})
export class FailComponent implements OnInit {
  

  constructor(
    public router: Router,
  
  ) {}

  ngOnInit(): void {}
   

  

  
  cerrar() {
   window.close();
  }
}