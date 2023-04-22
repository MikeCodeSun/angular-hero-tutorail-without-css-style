import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  hero?: Hero;
  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
    this.heroService.getHeroFromHttp(id).subscribe((h) => (this.hero = h));
  }
  ngOnInit() {
    this.getHero();
  }
  goback() {
    this.location.back();
  }
  updateHero() {
    console.log('update detail');

    if (!this.hero?.name) return;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .updateHeroFromHttp(id, this.hero)
      .subscribe(() => this.goback());
  }
}
