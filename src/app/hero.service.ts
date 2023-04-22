import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { heroes } from './mock-hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  // getHeroes(): Observable<Hero[]> {
  //   this.messageService.add('fetch all heroes');
  //   return of(heroes);
  // }

  // http in memory db
  baseUrl = 'api/heroes';
  getHeroes(): Observable<Hero[]> {
    const heroes = this.http
      .get<Hero[]>(this.baseUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
    this.messageService.add('fetch all heroes');
    return heroes;
  }
  // log
  log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }
  // handle error
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero | undefined> {
    const hero = heroes.find((hero) => (hero.id = id));
    this.messageService.add(`fetch hero id: ${id}`);
    return of(hero);
  }
  getHeroFromHttp(id: number): Observable<Hero> {
    this.log('update service');
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((h) => this.log(`fetch hero id:${h.id}`)),
      catchError(this.handleError<Hero>('get hero id'))
    );
  }
  opt = {
    headers: new HttpHeaders({ 'content-type': 'application/jaon' }),
  };
  updateHeroFromHttp(id: number, hero: Hero): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, hero, this.opt).pipe(
      tap(() => this.log(`update hero id ${id}`)),
      catchError(this.handleError('update hero'))
    );
  }
  addHeroFromHttp(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero, this.opt).pipe(
      tap((h) => this.log(`add new hero id ${h.id}`)),
      catchError(this.handleError<Hero>('add hero'))
    );
  }
  deleteHeroFromHttp(id: number): Observable<Hero> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Hero>(url, this.opt).pipe(
      tap((_) => this.log(`delete hero id ${id}`)),
      catchError(this.handleError<Hero>('delte hero'))
    );
  }
  searcHeroFromHttp(term: string): Observable<Hero[]> {
    if (!term) return of([]);
    const url = `${this.baseUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap((x) => {
        if (x.length === 0) {
          this.log(`no result for ${term}`);
        } else {
          this.log(`search ${term}`);
        }
      }),
      catchError(this.handleError<Hero[]>('serach', []))
    );
  }
}
