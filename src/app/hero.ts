export interface Hero {
  id: number;
  name: string;
}

export class HeroNew {
  // id: number;
  // name: string;
  // ego: string;
  // power: string;
  constructor(
    public id: number,
    public name: string,
    public ego: string,
    public power: string
  ) {
    // this.id = id;
    // this.name = name;
    // this.ego = ego;
    // this.power = power;
  }
}
