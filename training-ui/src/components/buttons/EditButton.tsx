import React from 'react';
import {IconButton, Tooltip} from "@mui/material";
import Team from "../../interfaces/Team.ts";
import Member from "../../interfaces/Member.ts";
import EditIcon from "@mui/icons-material/Edit";

export type Entity = Team | Member;

type EditButtonProps = {
    entity: Entity;
    onClick: (entity: Entity) => void;
    disabled?: boolean;
};

const EditButton: React.FC<EditButtonProps> = ({ entity, onClick, disabled }) => {
    const handleEdit = () => {
        onClick(entity);
    };

    return (
        <Tooltip title="Edit">
            <IconButton onClick={handleEdit} disabled={disabled}>
                <EditIcon />
            </IconButton>
        </Tooltip>
    );
};

export default EditButton;