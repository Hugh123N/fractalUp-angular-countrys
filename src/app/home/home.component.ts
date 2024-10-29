import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  hola=[
    {id:1, nombre:"Juan"},
    {id:2,nombre:"Hugo"},
    {id:3,nombre:"Pedro"}
  ];

  paises:any[]=[]
  continentes:any[]=[]

   constructor(private service:ServiceService) { }

 ngOnInit():void{
    //obtener todos los paises
    this.service.findAllCountries().subscribe((response)=>{
      this.paises=response.data.countries;
    });
  }


}
