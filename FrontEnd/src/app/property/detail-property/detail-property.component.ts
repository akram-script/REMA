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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.images = [
      new ImageItem({ src: 'assets/images/inside-1.jpg', thumb: 'assets/images/inside-1.jpg' }),
      new ImageItem({ src: 'assets/images/inside-2.jpg', thumb: 'assets/images/inside-2.jpg' }),
      new ImageItem({ src: 'assets/images/inside-3.jpg', thumb: 'assets/images/inside-3.jpg' }),
      new ImageItem({ src: 'assets/images/inside-4.jpg', thumb: 'assets/images/inside-4.jpg' }),
      new ImageItem({ src: 'assets/images/inside-5.jpg', thumb: 'assets/images/inside-5.jpg' }),
      // ... more items
    ];

    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: property) => {
        this.property = data['pdr'];
      }
    );


  }


}
