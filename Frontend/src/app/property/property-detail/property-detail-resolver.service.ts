import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HousingService } from 'src/app/services/housing.service';
import { catchError } from 'rxjs/operators';
import { Property } from 'src/model/Property';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailResolverService implements Resolve<Property> {
  constructor(private router: Router, private housingService: HousingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property> | Property {
    const propertyId = route.params['id'];
    return this.housingService.getProperty(+propertyId).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
