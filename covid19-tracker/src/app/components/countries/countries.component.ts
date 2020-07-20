import { map } from 'rxjs/operators';
import { DateWiseData } from './../../models/date-wise-data';
import { DataServiceService } from './../../services/data-service.service';
import { GlobalData } from './../../models/global-data';
import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data:GlobalData[]
  countries:string[]=[]
   totalConfirmed=0
   totalRecovered=0
   totalActive=0
   loading=true
   totalDeath=0
   datewisedata
   dataTable=[]
   selectedCountryData:DateWiseData[];
   
   chart={
      LineChart:'LineChart',
      height: 500,
      columnNames:['Cases','Countries'], 
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        }
      }  

   }

  constructor(private service:DataServiceService) { 
    
  }

  ngOnInit(): void {
    merge(
        this.service.getGlobalData().pipe(map(result=>{
          this.data=result
          this.data.forEach(cs=>{
          this.countries.push(cs.country)
      })
        })),
        this.service.getDateWiseData().pipe(map(result=>{
          this.datewisedata=result
        }))
    ).subscribe(
      {
        complete:()=>{
          /*this.selectedCountryData=this.datewisedata['US']
          //console.log(this.selectedCountryData)
          this.updateChart()*/
          this.update('US')
          this.loading=false
        }
      }
    )
  }

  updateChart(){
    this.dataTable=[]
    this.selectedCountryData.forEach(cs=>{
      this.dataTable.push([cs.date , cs.cases]);
    })
    console.log(this.dataTable)
  }

  update(country:string){
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalConfirmed=cs.confirmed;
        this.totalRecovered=cs.recovered
        this.totalActive=cs.active
        this.totalDeath=cs.death
      }
    })
    this.selectedCountryData=this.datewisedata[country]
    //console.log(this.selectedCountryData)
    this.updateChart()
  }

}
