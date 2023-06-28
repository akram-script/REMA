import { inject } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn} from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { property } from '../Model/property';


export const PropertyDetailResolverService : ResolveFn<property> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ,
   hs : HousingService = inject(HousingService) ) =>{
    const propId = route.params['id'];
    return hs.getProperty(+propId)
}
