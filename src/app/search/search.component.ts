import { Component, OnInit } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  Observable,
} from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  heroes$!: Observable<Hero[]>;
  searchTerm = new Subject<string>();
  search(term: string) {
    this.searchTerm.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.heroService.searcHeroFromHttp(term))
    );
  }
}
