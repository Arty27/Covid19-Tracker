import { DateWiseData } from './../models/date-wise-data';
import { GlobalData } from './../models/global-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";
  
  private datewiseurl="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";  
  
  geturl()
  {
    var usaTime = new Date().toLocaleString("en-US", {timeZone:"America/New_York"});
    var c=new Date(usaTime)
    var date=c.getDate()-1
    var mon=c.getMonth()+1 
    var month=(mon<10?'0'+mon:mon).toLocaleString()
    console.log(month);
    var year=c.getFullYear()
    if((c.getHours())<3)
    {
      date=date-1
    }
    var dat=""
    dat=(date<10?'0'+date:date).toLocaleString()
    dat=month+"-"+dat+"-"+year
    console.log(dat);
    
    this.url=this.url+dat+".csv";
  }
  constructor(private http:HttpClient) { }

  getDateWiseData(){
    return this.http.get(this.datewiseurl,{responseType:'text'}).pipe(map(result=>{
      let rows=result.split('\n');
      let header=rows[0]
      let mainData={}
      let dates=header.split(/,(?=\S)/)
      dates.splice(0,4)
      rows.splice(0,1)
      //console.log(dates,rows)
      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/)
        let con=cols[1]
        cols.splice(0,4)
        //console.log(con,cols)
        mainData[con]=[]
        cols.forEach((value,index)=>{
          let dw:DateWiseData={
            cases:+value,
            country:con,
            date:new Date(Date.parse(dates[index]))
          }
          mainData[con].push(dw)
        })
      })
      //console.log(mainData)
      return mainData
    }))
  }

  getGlobalData(){
    this.geturl()
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
