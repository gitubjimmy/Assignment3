import { Component, OnInit, Input } from '@angular/core';
import { Boss } from '../boss';
import { BossService } from '../boss.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boss-detail',
  templateUrl: './boss-detail.component.html',
  styleUrls: ['./boss-detail.component.css']
})
export class BossDetailComponent implements OnInit {
  boss: Boss;

  constructor(
    private route: ActivatedRoute,
    private bossService: BossService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBoss();
  }

  getBoss(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bossService.getBoss(id)
	.subscribe(boss => this.boss = boss);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.bossService.updateBoss(this.boss)
      .subscribe(() => this.goBack());
  }
}
