import { DataServiceService } from './../../services/data-service.service';
import { GlobalData } from './../../models/global-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data:GlobalData[]
  countries:string[]=[]
  constructor(private service:DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data=result
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })

    })
  }

}
