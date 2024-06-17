import {Dayjs} from "dayjs";

export default interface Team {
    id?: string;
    name: string;
    description: string;
    version: string;
    lastDeploymentDate: Dayjs | null; // Add the lastDeploymentDate property
}