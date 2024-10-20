export class Starship {
    private crew: number;

    constructor(crew: string) {
        this.crew = parseFloat(crew);
    }

    public getCrew(): number {
        return this.crew;
    }
}
