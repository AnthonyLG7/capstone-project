import { Team } from "./team";

export interface Sport {
    GroupId: number,
    GroupName: string,
    Organizations: Array<Team>,
    SponsorName: string,
    SponsorPhone: string,
    SponsorEmail: string,
    MaxGroupSize: number

}