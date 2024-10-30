import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
      this.filteredCountries = this.paises.map((country) => ({
        ...country,
        imageUrl: '', // Campo para almacenar la URL de la imagen
        flagUrl : ''   // URL para la bandera del país
      }));
      this.imagesForCountry();
      
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
      //imagen para detalle pais
      this.service.getCountryImage(this.seleccionaPais.name).subscribe((response) => {
        if (response.results && response.results.length > 0) {
          this.seleccionaPais.imageUrl = response.results[0].urls.small; // URL de la imagen pequeña
        } else {
          this.seleccionaPais.imageUrl = 'assets/image.png'; // Imagen por defecto si no se encuentra
        }
      });
      //imagen bandera
      this.service.getCountryBandera(this.seleccionaPais.name).subscribe((response) => {
        this.seleccionaPais.flagUrl = response.results[0]?.urls.small || 'assets/image.png';
      });
    });
  }

  // Método para obtener países de un continente específico
  getCountriesByContinent(continentCode: string): void {
    this.service.getCountriesByContinent(continentCode).subscribe((response) => {
      this.selectedContinent = response.data.continent.countries;
    });
  }

/********************metodos aadicioanles*****************************/
  // Cargar imágenes para cada país
  imagesForCountry(): void {
    this.filteredCountries.forEach((country) => {
      this.service.getCountryImage(country.name).subscribe((response) => {
        if (response.results && response.results.length > 0) {
          country.imageUrl = response.results[0].urls.small; // URL de la imagen pequeña
        } else {
          country.imageUrl = 'assets/image.png'; // Imagen por defecto si no se encuentra
        }
      });
      // Cargar bandera del país
      this.service.getCountryBandera(country.name).subscribe((response) => {
        country.flagUrl = response.results[0]?.urls.small || 'assets/image.png';
      });
    });
  }

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
    this.imagesForCountry();
  }

}
