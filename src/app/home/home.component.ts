import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  paises:any[]=[]
  continentes:any[]=[]
  seleccionaPais: any = null;
  selectedContinent: any[] = [];

  searchQuery: string = ''; // Nueva propiedad para el texto de búsqueda
  filteredCountries: any[] = []; // Lista de países filtrados

  //para estilos
  selectedCountryCode: string | null = null;

  constructor(private service:ServiceService) { }

 ngOnInit():void{
    //obtener todos los paises
    this.service.findAllCountries().subscribe((response)=>{
      this.paises=response.data.countries;
      this.filteredCountries = [...this.paises];//se lista todo al inicio
    });
    //obtener todos los continentes
    this.service.findAllContinents().subscribe((response)=>{
      this.continentes=response.data.continents;
    });
  }

  // Método para obtener el detalle de un país por su código
  getCountryDetails(code: string): void {
    this.selectedCountryCode = code;
    this.service.getCountryByCode(code).subscribe((response) => {
      this.seleccionaPais = response.data.country;
    });
  }

  // Método para obtener países de un continente específico
  getCountriesByContinent(continentCode: string): void {
    this.service.getCountriesByContinent(continentCode).subscribe((response) => {
      this.selectedContinent = response.data.continent.countries;
    });
  }

/********************metodos aadicioanles*****************************/
  clearSelection(): void {
    this.selectedCountryCode = null; // Limpia el país seleccionado
    this.seleccionaPais = null; // Limpia los detalles del país
  }
// Método para filtrar países según la búsqueda
  filterCountries(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredCountries = this.paises.filter((country) =>
      country.name.toLowerCase().includes(query)
    );
  }

}
