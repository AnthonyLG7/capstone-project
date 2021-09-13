import { Player } from "./player";

export class Team {
    OrganizationName: string;
    OrganizationId: string;
    CoachName: string;
    CoachPhoneNumber: string;
    Members: Array<Player>;
}