import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Boss } from '../boss';
import { BossService } from '../boss.service';

@Component({
  selector: 'app-boss-search',
  templateUrl: './boss-search.component.html',
  styleUrls: [ './boss-search.component.css' ]
})
export class BossSearchComponent implements OnInit {
  bosses$: Observable<Boss[]>;
  private searchTerms = new Subject<string>();

  constructor(private bossService: BossService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.bosses$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.bossService.searchBosses(term)),
    );
  }
}
