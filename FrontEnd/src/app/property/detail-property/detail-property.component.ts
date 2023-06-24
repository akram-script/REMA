import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-property',
  templateUrl: './detail-property.component.html',
  styleUrls: ['./detail-property.component.css']
})
export class DetailPropertyComponent implements OnInit {

  propertyId : number  ;

  constructor(private route : ActivatedRoute , private router : Router) { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'] ;
      }
    ) ;
  }
  onSelectNext(){
    this.propertyId +=1 ;
    this.router.navigate(['detail-property' , this.propertyId]) ;

  }

}
