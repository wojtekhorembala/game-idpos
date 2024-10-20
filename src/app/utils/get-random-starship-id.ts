import { IStarshipsListItem } from "../interfaces/player-attr-response.interface";

export function getRandomStarshipItem(items: IStarshipsListItem[]): IStarshipsListItem {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
};
