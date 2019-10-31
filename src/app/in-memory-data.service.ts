import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Boss } from './boss';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const bosses = [
      { id: 1, name: 'Normal Papulatus', HP: '12,450,000,000', Cost: '2,664,500' },
      { id: 2, name: 'Akairum', HP: '12,600,000,000', Cost: '2,520,500'  },
      { id: 3, name: 'Hard Van leon', HP: '10,500,000,000', Cost: '2,450,000' },
      { id: 4, name: 'Normal Magnus', HP: '6,000,000,000', Cost: '2,592,000' },
    ];
    return {bosses};
  }
  genId(bosses: Boss[]): number {
    return bosses.length > 0 ? Math.max(...bosses.map(boss => boss.id)) + 1 : 1;
  }  
}
