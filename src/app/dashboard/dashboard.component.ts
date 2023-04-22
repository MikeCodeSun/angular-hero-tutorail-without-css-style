import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private heroService: HeroService) {}
  heroes?: Hero[];
  getHero() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  ngOnInit() {
    this.getHero();
  }
  add(name: string) {
    this.heroService
      .addHeroFromHttp({ name } as Hero)
      .subscribe((h) => this.heroes?.push(h));
  }
  delete(id: number) {
    this.heroService
      .deleteHeroFromHttp(id)
      .subscribe(
        () => (this.heroes = this.heroes?.filter((hero) => hero.id != id))
      );
  }
}
