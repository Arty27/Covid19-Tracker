import { GlobalData } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  globalData:GlobalData[];
  totalConfirmed=0;
  totalRecovered=0;
  totalDeath=0;
  totalActive=0;
  constructor(private dataservice:DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe(result=>{
      console.log(result)
      this.globalData=result
      result.forEach(cs=>{
        if(!Number.isNaN(cs.confirmed)){
          this.totalActive+=cs.active
          this.totalConfirmed+=cs.confirmed
          this.totalDeath+=cs.death
          this.totalRecovered+=cs.recovered
        }
      })
    })

  }

}
