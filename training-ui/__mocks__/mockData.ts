
import Member from "../src/interfaces/Member.ts";
import Team from "../src/interfaces/Team.ts";

export const mockTeams: Team[] = [
    { id: 1, name: 'Team 1', description: 'Description 1', version: '1.0', lastDeploymentDate: '2022-01-01' },
    { id: 2, name: 'Team 2', description: 'Description 2', version: '1.1', lastDeploymentDate: '2022-02-01' }
];

export const mockMembers: Member[] = [
    { id: 1, name: 'Member 1', teamId: 1 },
    { id: 2, name: 'Member 2', teamId: 2 }
];