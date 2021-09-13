import { Player } from "./player";

export class Team {
    teamName: string;
    teamId: string;
    coachName: string;
    coachPhone: string;
    players: Array<Player>;
}