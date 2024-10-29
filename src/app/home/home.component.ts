import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  paises = [
    {
      nombre: 'Argentina',
      subtitulo: 'Capital: Buenos Aires',
      imagen: 'assets/argentina.jpg', // Ruta de la imagen
      icono: 'assets/argentina-icon.png' // Ruta del icono
    },
    {
      nombre: 'Brasil',
      subtitulo: 'Capital: Brasilia',
      imagen: 'assets/brasil.jpg',
      icono: 'assets/brasil-icon.png'
    },
    {
      nombre: 'Chile',
      subtitulo: 'Capital: Santiago',
      imagen: 'assets/chile.jpg',
      icono: 'assets/chile-icon.png'
    },
    // Agrega más países según sea necesario
  ];
}
