import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input() star?: Hero;
}
