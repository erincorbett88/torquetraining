import React from 'react';
import { IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Team from "../../interfaces/Team.ts";
import Member from "../../interfaces/Member.ts";

type DeleteButtonProps = {
    onClick: (entity: Member | Team) => void; // Function to handle the click event (delete the entity)
    disabled?: boolean; // Optional prop to disable the button
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, disabled }) => {

    return (
        <Tooltip title={`Delete`}>
            <IconButton onClick={() => onClick({} as Member | Team)} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </Tooltip>
    );
};

export default DeleteButton;