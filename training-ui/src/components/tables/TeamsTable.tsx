import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {Link} from "react-router-dom";
import EditButton from "../buttons/EditButton.tsx";
import Team from "../../interfaces/Team";
import {sendRequest} from "../../apiUtils.ts";
import DeleteButton from "../buttons/DeleteButton.tsx";
import dayjs from 'dayjs';
import {useAppContext} from "../../AppContext.tsx";

type TeamsTableProps = {
    onEdit: (team: Team) => void; // Function to handle edit event
    refetchTeams: () => void;
};

const TeamsTable: React.FC<TeamsTableProps> = ({onEdit, refetchTeams}) => {
    const { members, teams } = useAppContext();

    const deleteTeam = async (team: Team) => {
        const controller = new AbortController();
        sendRequest(`http://localhost:8080/api/teams/${team.id}`, 'DELETE', null, controller.signal)
            .then(() => console.log('Team deleted successfully'))
            .catch(err => {
                if (err.name !== 'CanceledError') {
                    console.error(err);
                }
            });
        refetchTeams();
        console.log("set refetch teams to true")
        return () => controller.abort();
    }

    const handleDeleteClick = async (team: Team) => {
        const teamMembers = members.filter(member => member.teamId === team.id);
        if (teamMembers.length === 0) {
            const shouldRemove = await confirmDelete(); // Asynchronous confirmation
            if (shouldRemove) {
                await deleteTeam(team);
            }
        } else {
            showMemberExistsMessage(); // Display a message within the UI
        }
    };

    const confirmDelete = async (): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            const shouldRemove = window.confirm("Are you sure you want to delete this team?");
            resolve(shouldRemove);
        });
    };

    const showMemberExistsMessage = (): void => {
        // Example implementation of showing a message within the UI
        alert("Only teams with no members can be deleted. Please reassign members to other teams before deleting.");
    };


    return (
        <TableContainer component={Paper}  sx={{mb: 2}}>
            <Table>
                <TableHead>
                    <TableRow sx={{bgcolor: 'background.default'}}>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Description</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Version</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Last Deployment Date</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team: Team) => (
                        <TableRow key={team.id}>
                            <TableCell sx={{textAlign: 'center'}}><Link to={`/teams/${team.name}`} state={team}>
                                {team.name}
                            </Link></TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{team.description}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{team.version}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{team.lastDeploymentDate ? dayjs(team.lastDeploymentDate).format('YYYY-MM-DD') : 'N/A'}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>
                                <EditButton entity={team} onClick={(entity) => onEdit(entity as Team)}/>
                                <DeleteButton onClick={() => handleDeleteClick(team)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default TeamsTable;