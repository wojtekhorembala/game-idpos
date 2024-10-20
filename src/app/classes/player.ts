import { IPeopleAttrResponse } from "../interfaces/player-attr-response.interface";
import { IPlayer, IStarship } from "../interfaces/player.interface";
import { Starship } from "./starship";

export class Player {
    public readonly name!: string;

    private mass!: number;
    private height!: number;
    private starship?: Starship;

    constructor({mass, height, name}: IPeopleAttrResponse) {
        this.mass = Number(mass);
        this.height = Number(height);
        this.name = name;
    }

    public assignStarship(data: IStarship): void {
        this.starship = new Starship(data.crew);
    }

    public calculateScore(): number {
        const massHeightScore = (this.mass || 0) * this.height;
        const starshipScore = this.starship ? this.starship.getCrew() : 0;
        return massHeightScore + starshipScore;
    }

    public getProperties(): IPlayer {
        return {
            mass: this.mass,
            name: this.name,
            height: this.height,
            starship: {
                crew: this.starship!.getCrew().toString(),
            }
        }
    }

}
