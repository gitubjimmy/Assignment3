import { Component, OnInit } from '@angular/core';
import { Boss } from '../boss';
import  { BossService } from '../boss.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  bosses: Boss[] = [];
  
  constructor(private bossService: BossService) { }

  ngOnInit() {
    this.getBosses();
  }

  getBosses(): void {
    this.bossService.getBosses()
	.subscribe(bosses => this.bosses = bosses.slice(0, 4));
  }
}
