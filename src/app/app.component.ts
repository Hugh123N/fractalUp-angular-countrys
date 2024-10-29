import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, //en linea 8 añadir nuevos componentes
  imports: [RouterOutlet,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',//renderiza
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fractalUp-Continentes-angular';
  hola='holaaaa';
}
