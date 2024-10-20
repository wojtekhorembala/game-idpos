import { IPlayer } from "./player.interface";

export interface IHistory {
    winnerName: string;
    playerFirst: IPlayer;
    playerSecond: IPlayer;
}
