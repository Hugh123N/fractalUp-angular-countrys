import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url_base= 'https://countries.trevorblades.com/';

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
  getAllContinents(): Observable<any> {
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

}
