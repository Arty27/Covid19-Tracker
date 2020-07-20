import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('totalConfirmed') totalConfirmed=0;
  @Input('totalRecovered') totalRecovered=0;
  @Input('totalActive') totalActive=0;
  @Input('totalDeath') totalDeath=0;
  constructor() { }

  ngOnInit(): void {
  }

}
