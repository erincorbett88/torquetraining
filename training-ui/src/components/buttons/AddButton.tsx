import React from 'react';
import {Button, Tooltip} from "@mui/material";

type AddButtonProps = {
    onClick: () => void; // Function to handle the click event (open the modal)
    disabled?: boolean; // Optional prop to disable the button
    title: string;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick, title }) => {

    return (
        <Tooltip title={`Add`}>
            <Button onClick={onClick} variant="contained" color="primary" >Add {title}</Button>
        </Tooltip>
    );
};

export default AddButton;