import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from 'src/model/Property';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'city/cities');
  }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map((propertiesArray) => {
        return propertiesArray.find((p) => p.Id === id);
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Property[] = [];
        const localProperties = JSON.parse(localStorage.getItem('newProperty'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (
                localProperties.hasOwnProperty(id) &&
                localProperties[id].SellRent === SellRent
              ) {
                propertiesArray.push(localProperties[id]);
              }
            } else {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );

    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProperty = [property];

    if (localStorage.getItem('newProperty')) {
      newProperty = [
        property,
        ...JSON.parse(localStorage.getItem('newProperty')),
      ];
    }

    localStorage.setItem('newProperty', JSON.stringify(newProperty));
  }

  newPropertyId() {
    if (localStorage.getItem('PID')) {
      return +localStorage.getItem('PID') + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
