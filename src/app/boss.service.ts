import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Boss } from './boss';
import { BOSSES } from './mock-bosses';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root'})
export class BossService {
  
  private bossesUrl = 'api/bosses'; //URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  private log(message: string){
    this.messageService.add(`BossService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getBosses(): Observable<Boss[]> {
    return this.http.get<Boss[]>(this.bossesUrl)
      .pipe(
        tap(_ => this.log('fetched bosses')),
        catchError(this.handleError<Boss[]>('getBosses', []))
      );
  }

  getBoss(id: number): Observable<Boss> {
    const url = `${this.bossesUrl}/${id}`;
    return this.http.get<Boss>(url).pipe(
      tap(_ => this.log(`fetched boss id=${id}`)),
      catchError(this.handleError<Boss>(`getBoss id=${id}`))
    );
  }

  updateBoss (boss: Boss): Observable<any> {
    return this.http.put(this.bossesUrl, boss, this.httpOptions).pipe(
      tap(_ => this.log(`updated boss id=${boss.id}`)),
      catchError(this.handleError<any>('updateBoss'))
    );
  }
  
  addBoss (boss: Boss): Observable<Boss> {
    return this.http.post<Boss>(this.bossesUrl, boss, this.httpOptions).pipe(
      tap((newBoss: Boss) => this.log(`added boss w/ id=${newBoss.id}`)),
      catchError(this.handleError<Boss>('addBoss'))
    );
  }

  deleteBoss (boss: Boss | number): Observable<Boss> {
    const id = typeof boss === 'number' ? boss : boss.id;
    const url = `${this.bossesUrl}/${id}`;
    
    return this.http.delete<Boss>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Boss>('deleteBoss'))
    );
  }

  searchBosses(term: string): Observable<Boss[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Boss[]>(`${this.bossesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found bosses matching "${term}"`)),
      catchError(this.handleError<Boss[]>('searchBosses', []))
    );
  }
}
