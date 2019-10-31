import { Component, OnInit } from '@angular/core';
import { Boss } from '../boss';
import { BossService } from '../boss.service';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.css']
})
export class BossComponent implements OnInit {
  bosses: Boss[];
  
  constructor(private bossService: BossService) { }

  ngOnInit() {
    this.getBosses();
  }
  
  getBosses(): void {
    this.bossService.getBosses()
	.subscribe(bosses => this.bosses = bosses);
  }
  add(name: string, HP: string, Cost: string): void {
    name = name.trim();
    HP = HP.trim();
    Cost = Cost.trim();
    if(!name) { return; }
    this.bossService.addBoss({ name, HP, Cost } as Boss)
      .subscribe(boss => {
        this.bosses.push(boss);
    });
  }

  delete(boss: Boss): void{
    this.bosses = this.bosses.filter(b => b !== boss);
    this.bossService.deleteBoss(boss).subscribe();
  }
}
