import TeamsTable from '../tables/TeamsTable.tsx';
import {useEffect, useState} from "react";
import Team from "../../interfaces/Team";
import TeamModal from "../modals/TeamModal.tsx";
import AddButton from "../buttons/AddButton.tsx";
import {Box} from "@mui/material";
import {sendRequest} from "../../apiUtils.ts";
import {useAppContext} from "../../AppContext.tsx";


function TeamsPage() {
    const { updateTeams} = useAppContext();
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [initialTeam, setInitialTeam] = useState<Team | undefined>(undefined);

    const [refetchTeams, setRefetchTeams] = useState(false);


    //used to refetch team data after add/edit/delete
    useEffect(() => {
        if (refetchTeams) {
            const controller = new AbortController();
            sendRequest('http://localhost:8080/api/teams', 'GET', null, controller.signal)
                .then((teamData) => {
                    updateTeams(teamData as Team[]);
                    setTimeout(() => {
                        setRefetchTeams(false); // Reset refetchTeams to false after successful refetch
                    }, 0);
                })
                .catch(err => {
                    if (err.name !== 'CanceledError') {
                        console.error(err);
                    }
                });

            return () => {
                controller.abort();
                setRefetchTeams(false);
            }
        }
    }, [refetchTeams]);

    const handleEditTeamClick = (team: Team) => {
        setInitialTeam(team);
        setIsTeamModalOpen(true);
    };

    const handleAddTeamClick = () => {
        setIsTeamModalOpen(true);
    };

    const handleCloseTeamModal = () => {
        setIsTeamModalOpen(false);
        setInitialTeam(undefined);
        setRefetchTeams(true);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                mt: 12,
                mb: 12
            }}
        >
            <Box
                sx={{
                    width: 'calc(7/12 * 100vw)',
                }}
            >
                <TeamsTable
                    onEdit={handleEditTeamClick}
                    refetchTeams={() => setRefetchTeams(true)}

                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end', // Align items to the right

                }}>
                    <AddButton onClick={handleAddTeamClick} title="Team"/>
                </Box>
                <TeamModal
                    isOpen={isTeamModalOpen}
                    onClose={handleCloseTeamModal}
                    initialValues={initialTeam}
                />
            </Box>
        </Box>
    );
}

export default TeamsPage;