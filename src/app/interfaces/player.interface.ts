export interface IPlayer {
    mass: number;
    height: number;
    name: string;
    starship: IStarship;
}

export interface IStarship {
    crew: string;
}
