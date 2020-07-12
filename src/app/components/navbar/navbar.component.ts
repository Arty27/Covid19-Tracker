import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('sidenav') sidenav:MatSidenav;

  constructor() { }

  ngOnInit(): void {
  }
  
  close(){
    this.sidenav.close()
  }

}
