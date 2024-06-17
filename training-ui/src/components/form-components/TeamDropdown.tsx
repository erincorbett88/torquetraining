import {MenuItem, Select, SelectChangeEvent, InputLabel, FormControl, Typography} from "@mui/material";
import React, { useState } from "react";
import {UseFormRegister} from "react-hook-form";
import {useAppContext} from "../../AppContext.tsx";

interface TeamDropdownProps {
    onSelectTeam: (teamId: string) => void;
    dropdownRegister: UseFormRegister<{ teamId: string }>
    formSubmitted: boolean
    initialValue?: string
}

const TeamDropdown: React.FC<TeamDropdownProps> = ({ onSelectTeam, dropdownRegister, formSubmitted, initialValue }) => {
    const {teams} = useAppContext();
    const [selectedTeam, setSelectedTeam] = useState<string>(initialValue || "");

    const handleTeamChange = (event: SelectChangeEvent<string>) => {
        const teamId = event.target.value as string;
        setSelectedTeam(teamId);
        onSelectTeam(teamId);
    };

    return  (
        <FormControl fullWidth>
            <InputLabel>Choose Team</InputLabel>
            <Select
                sx={{ mb: (formSubmitted && !selectedTeam ) ? 0 : 2 }}
                value={selectedTeam}
                label="Choose Team"
                onChange={handleTeamChange}
                inputProps={dropdownRegister('teamId')} // Pass register function directly here
            >
                {teams.map(team => (
                    <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                ))}
            </Select>
            {formSubmitted && !selectedTeam && (
                <Typography variant="body2" color="error" sx={{mb:2}}>Please select a team</Typography>
            )}
        </FormControl>
    );
}

export default TeamDropdown;
