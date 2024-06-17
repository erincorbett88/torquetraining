import MembersTable from "../tables/MembersTable.tsx";
import {Box} from "@mui/material";
import MemberModal from "../modals/MemberModal.tsx";
import {useEffect, useState} from "react";
import AddButton from "../buttons/AddButton.tsx";
import Member from "../../interfaces/Member.ts";
import {sendRequest} from "../../apiUtils.ts";
import {useAppContext} from "../../AppContext.tsx";

function MembersPage() {

    const {updateMembers} = useAppContext();

    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
    const [initialMember, setInitialMember] = useState<Member | undefined>(undefined);

    const [refetchMembers, setRefetchMembers] = useState(false);


    //used to refetch member data after add/edit/delete
    useEffect(() => {
        if (refetchMembers) {
            const controller = new AbortController();

            sendRequest('http://localhost:8080/api/members', 'GET', null, controller.signal)
                .then((membersData) => {
                    updateMembers(membersData as Member[])
                    setTimeout(() => {
                        setRefetchMembers(false); // Reset refetch
                    }, 0);
                })
                .catch(err => {
                    if (err.name !== 'CanceledError') {
                        console.error(err);
                    }
                });

            return () => {
                controller.abort();
                setRefetchMembers(false);
            }
        }
    }, [refetchMembers]);

    const handleEditMemberClick = (member: Member) => {
        setInitialMember(member);
        setIsMembersModalOpen(true);
    };


    const handleAddMemberClick = () => {
        setIsMembersModalOpen(true);
    };

    const handleCloseMemberModal = () => {
        setIsMembersModalOpen(false);
        setInitialMember(undefined);
        setRefetchMembers(true);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%', // Ensure the container takes up the full width
                mt: 12,
                mb: 12
            }}
        >
            <Box
                sx={{
                    width: 'calc(7/12 * 100vw)', // Set the desired width for the content
                }}
            >
                <MembersTable
                    onEdit={handleEditMemberClick}
                    refetchMembers={() => setRefetchMembers(true)}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end', // Align items to the right
                    // width: '100%'
                }}>
                    <AddButton onClick={handleAddMemberClick} title="Member"/>
                </Box>
                <MemberModal isOpen={isMembersModalOpen} onClose={handleCloseMemberModal}
                             initialValues={initialMember}/>
            </Box>
        </Box>
    );
}

export default MembersPage;