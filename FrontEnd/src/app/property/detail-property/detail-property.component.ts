import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { property } from 'src/app/Model/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './detail-property.component.html',
  styleUrls: ['./detail-property.component.css']
})
export class PropertyDetailComponent implements OnInit {
public propertyId: number;
property = new property();

images: GalleryItem[];
public mainPhotoUrl: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: property) => {
        this.property = data['pdr'];
        console.log(this.property.photos);
      }
    );
    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);
    this.images = this.getPropertyPhotos();

  }
  changePrimaryPhoto(mainPhotoUrl: string) {
    this.mainPhotoUrl = mainPhotoUrl;
}

  getPropertyPhotos(): GalleryItem[] {
    const photoUrls: GalleryItem[] = [];
    for (const photo of this.property.photos) {
        if(photo.isPrimary)
        {
            this.mainPhotoUrl = photo.imageUrl;
        }
        else{
            photoUrls.push(
              new ImageItem({ src: photo.imageUrl, thumb: photo.imageUrl }),
            );}
        }
    return photoUrls;
}


}
