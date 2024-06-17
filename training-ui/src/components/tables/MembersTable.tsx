import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {sendRequest} from "../../apiUtils.ts";
import Member from "../../interfaces/Member.ts";
import EditButton from "../buttons/EditButton.tsx";
import DeleteButton from "../buttons/DeleteButton.tsx";
import {Link} from "react-router-dom";
import {useAppContext} from "../../AppContext.tsx";

type MembersTableProps = {
    onEdit: (member: Member) => void; // Function to handle edit event
    refetchMembers: () => void;
};

const MembersTable: React.FC<MembersTableProps> = ({onEdit, refetchMembers}) => {
    const {members, teams} = useAppContext();


    const deleteMember = async (member: Member) => {
        const controller = new AbortController();
        sendRequest(`http://localhost:8080/api/members/${member.id}`, 'DELETE', null, controller.signal)
            .then(() => console.log('Member deleted successfully'))
            .catch(err => {
                if (err.name !== 'CanceledError') {
                    console.error(err);
                }
            });
        refetchMembers();
        return () => controller.abort();
    }
    const handleDeleteClick = async (member: Member) => {
        const shouldRemove = await confirmDelete();
        if (shouldRemove) {
            await deleteMember(member);
        }
    }

    const confirmDelete = async (): Promise<boolean> => {
        return new Promise<boolean>((resolve) => {
            const shouldRemove = window.confirm("Are you sure you want to delete this member?");
            resolve(shouldRemove);
        });
    };

    return (
        <TableContainer component={Paper}  sx={{mb: 2}}>
            <Table>
                <TableHead>
                    <TableRow sx={{bgcolor: 'background.default'}}>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Team</TableCell>
                        <TableCell sx={{textAlign: 'center', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member: Member) => (
                        <TableRow key={member.id}>
                            <TableCell sx={{textAlign: 'center'}}>
                                <Link to={`/members/${member.lastName}`} state={{ ...member,  ...member,
                                    team: teams.find(team => team.id === member.teamId) || {}  }}>
                                {member.lastName}, {member.firstName}
                                    </Link>
                            </TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{member.email}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>
                                {/*{teams.find(team => team.id === member.teamId)?.name}*/}
                                <Link to={`/teams/${teams.find(team => team.id === member.teamId)?.name}`} state={teams.find(team => team.id === member.teamId)}>
                                    {teams.find(team => team.id === member.teamId)?.name}
                                </Link>
                            </TableCell>
                            <TableCell sx={{textAlign: 'center'}}>
                                    <EditButton entity={member} onClick={(entity) => onEdit(entity as Member)}/>
                                    <DeleteButton onClick={() => handleDeleteClick(member)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MembersTable;