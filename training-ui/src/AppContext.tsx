import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Member from "./interfaces/Member.ts";
import Team from "./interfaces/Team.ts";
import {sendRequest} from "./apiUtils.ts";
import * as React from 'react';



type AppContextType = {
    members: Member[];
    updateMembers: (newMembers: Member[]) => void;
    teams: Team[];
    updateTeams: (newTeams: Team[]) => void;
};

interface AppProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextType>({
    members: [],
    updateMembers: () => {},
    teams: [],
    updateTeams: () => {}, // Initial value of updateTeams function
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

    const [members, setMembers] = useState< Member[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const updateTeams = (newTeams: Team[]) => {
        setTeams(newTeams);
    };

    const updateMembers = (newMembers: Member[]) => {
        setMembers(newMembers);
    };

//load initial members and teams
    useEffect(() => {
        const controller = new AbortController();

        Promise.all([
            sendRequest('http://localhost:8080/api/teams', 'GET', null, controller.signal),
            sendRequest('http://localhost:8080/api/members', 'GET', null, controller.signal)
        ])
            .then(([teamData, memberData]) => {
                setTeams(teamData as Team[]);
                setMembers(memberData as Member[]);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error(err);
                }
            });

        return () => {

            controller.abort();
        };

    }, []);

    return (
        <AppContext.Provider value={{ teams, updateTeams, members, updateMembers }}>
            {children}
        </AppContext.Provider>
    );

}

export const useAppContext = () => useContext(AppContext);