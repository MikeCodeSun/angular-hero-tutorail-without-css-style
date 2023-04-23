import { Component } from '@angular/core';
import { HeroNew } from '../hero';

@Component({
  selector: 'app-newhero',
  templateUrl: './newhero.component.html',
  styleUrls: ['./newhero.component.css'],
})
export class NewheroComponent {
  powers = ['super speed', 'light strick', 'fire ball', 'freeze air'];
  model = new HeroNew(50, 'Joker', 'narcissism', this.powers[3]);
  submited = false;
  onSubmit() {
    this.submited = true;
  }
  newHero() {
    this.model = new HeroNew(50, '', '', '');
  }
}
