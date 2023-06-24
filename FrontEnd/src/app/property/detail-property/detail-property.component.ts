import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
        this.housingService.getProperty(this.propertyId).subscribe(property => this.property = property)

          }
        );
      }


  }



