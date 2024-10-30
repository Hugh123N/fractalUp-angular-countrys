import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url_base= 'https://countries.trevorblades.com/';
  //para imagenes
  private apiUrl = 'https://api.unsplash.com/search/photos';
  private apiKey = 'JpGL8oG-SAlzuE4bQneYxkSjxrf9Iid65b-CDK6WMes';

  constructor(private http: HttpClient) { }

  //Lista de tdos los paises
  findAllCountries():Observable<any>{
    const query=`
    {
        countries {
          code
          name
          capital
          continent {
            code
            name
          }
        }
      }`;

      return this.executeQuery(query);
  }
  // Obtener detalles de un país por su código
  getCountryByCode(code: string): Observable<any> {
    const query = `
        {
        country(code:"${code}") {
    name
    capital
    languages{name}
    currency
    continent {
        name
    }
    states{
      name
    }
 }
}`;

    return this.executeQuery(query);
  }
  //metodo para obtener lista de paises por continente
  getCountriesByContinent(continentCode: string): Observable<any> {
    const query = `
      {
        continent(code: "${continentCode}") {
          countries {
            code
            name
          }
        }
      }
    `;
    return this.executeQuery(query);
  }

  // Método para obtener la lista de continentes
  findAllContinents(): Observable<any> {
    const query = `
      {
        continents {
          code
          name
          countries {
            code
            name
          }
        }
      }
    `;
    return this.executeQuery(query);
  }
  // Método para ejecutar la consulta
  private executeQuery(query: string): Observable<any> {
    return this.http.post<any>(this.url_base, { query });
  }
  //**************metodo para obtener img************* */
  //por nombre de pais
  getCountryImage(countryName: string): Observable<any> {
    const url = `https://api.unsplash.com/search/photos?query=${countryName}&client_id=JpGL8oG-SAlzuE4bQneYxkSjxrf9Iid65b-CDK6WMes`;
    return this.http.get<any>(url);
  }
  // Método para obtener la bandera del país
  getCountryBandera(countryName: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Client-ID ${this.apiKey}`);
    const params = new HttpParams()
      .set('query', `flag of ${countryName}`)
      .set('per_page', '1'); // Limita a una sola imagen

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
