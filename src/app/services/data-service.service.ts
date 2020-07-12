import { GlobalData } from './../models/global-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-11-2020.csv"
  constructor(private http:HttpClient) { }

  getGlobalData(){
    return this.http.get(this.url,{responseType:'text'}).pipe(map(result=>{
      let raw={}
      let rows=result.split('\n');
      rows.splice(0,1)
      //console.log(rows)
      let data:GlobalData[]=[];

      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/)
        let cs={
          country:cols[3],
          confirmed:+cols[7],
          active:+cols[10],
          death:+cols[8],
          recovered:+cols[9]
        }

        let temp:GlobalData=raw[cs.country]
        if(temp){
          temp.active+=cs.active
          temp.confirmed+=cs.confirmed
          temp.death+=cs.death
          temp.recovered+=cs.recovered
          raw[cs.country]=temp
        }
        else{
          raw[cs.country]=cs
        }
      })
      
      return <GlobalData[]>Object.values(raw)
    }))

  }
}
