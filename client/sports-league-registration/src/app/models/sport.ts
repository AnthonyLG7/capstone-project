import { Team } from "./team";

export interface Sport {
    sportId: number,
    sportName: string,
    teams: Array<Team>,
    sportDirectorsName: string,
    sportDirectorsPhone: string,
    sportDirectorsEmail: string,
    groupSize: number

}