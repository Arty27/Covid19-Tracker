import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalData } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed=0;
  totalRecovered=0;
  totalDeath=0;
  totalActive=0;
  datatable=[]
  loading=true
  globalData:GlobalData[];

  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
    LineChart : "LineChart", 
    height: 500,
    columnNames:['Cases','Countries'], 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  
  constructor(private dataservice:DataServiceService){ }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe(
      {
        next:(result)=>{
        //console.log(result)
        this.globalData=result;
        result.forEach(cs=>{
          if(!Number.isNaN(cs.confirmed)){
            this.totalActive+=cs.active
            this.totalConfirmed+=cs.confirmed
            this.totalDeath+=cs.death
            this.totalRecovered+=cs.recovered
          }
        })
        this.initChart('c')
    },
    complete:()=>{
      this.loading=false
    }
  })
  
}


  initChart(caseType: string) {

    this.datatable = [];
    this.datatable.push(["Country", "Cases"])
    
    this.globalData.forEach(cs => {
      let value :number ;
      if (caseType == 'c')
        //if (cs.confirmed > 200000)
          value = cs.confirmed
          
      if (caseType == 'a')
        //if (cs.active > 20000)
          value = cs.active
      if (caseType == 'd')
        //if (cs.death > 2000)
          value = cs.death
          
      if (caseType == 'r')
        //if (cs.recovered > 20000)
            value = cs.recovered
        

        this.datatable.push([
            cs.country, value
          ])
    })
    this.datatable=this.datatable.sort(function(a,b){
      return a[1]-b[1]
    })
    this.datatable.reverse()
    this.datatable=this.datatable.slice(0,15)
    console.log(this.datatable);

  }

  updateChart(input:string){
    console.log(input)
    this.initChart(input)
  }
}
