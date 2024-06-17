import Member from "../../interfaces/Member.ts";
import React from "react";
import {useAppContext} from "../../AppContext.tsx";

type TableProps = {
    onEdit: (member: Member) => void; // Function to handle edit event
    refetchMembers: () => void;
    refetchTeams: () => void;
};

const Table: React.FC<TableProps> = ({onEdit, refetchTeams}) => {
    const {members, teams} = useAppContext();

    
}