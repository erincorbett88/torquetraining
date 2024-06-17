import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Team from "../../interfaces/Team.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {useAppContext} from "../../AppContext.tsx";
import Member from "../../interfaces/Member.ts";

function TeamPage() {
    const {members, teams} = useAppContext();
    const location = useLocation();
    const team = location.state as Team;

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Box sx={{mt: 2, ml: 3}}>
            <Card variant="outlined"
                  sx={{cornerRadius: "3", width: 300}}>
                <CardContent sx={{padding: 2}}>
                    <Typography sx={{mb: 3}} variant="h5" component="div">
                        {team.name}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "flex-end"}}>
                        <Typography sx={{fontSize: 14, color: "text.secondary", marginRight: 'auto'}} gutterBottom>
                            Version
                        </Typography>
                        <Typography sx={{fontSize: 14, color: "text.secondary", marginLeft: 'auto'}} gutterBottom>
                            Last Deployment
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: "flex-end", mb: 3}}>
                        <Typography sx={{fontSize: 16, marginRight: 'auto'}} gutterBottom>
                            {team.version}
                        </Typography>
                        <Typography sx={{fontSize: 16, marginLeft: 'auto'}} gutterBottom>
                            {dayjs(team.lastDeploymentDate).format('YYYY-MM-DD')}
                        </Typography>
                    </Box>
                    <Typography sx={{fontSize: 14, color: "text.secondary"}}>
                        Description
                    </Typography>

                    <Typography sx={{mb: 3, fontSize: 16}}>
                        {team.description}
                    </Typography>

                    <Typography sx={{fontSize: 14, color: "text.secondary"}}>
                        Members:
                    </Typography>
                    <Typography sx={{fontSize: 16}}>
                        {members
                            .filter((member) => member.teamId === team.id)
                            .sort((a, b) => {
                                if (a.lastName < b.lastName) return -1;
                                if (a.lastName > b.lastName) return 1;
                                return 0;
                            })
                            .map((member: Member) => (
                                <Typography>
                                    <Link to={`/members/${member.lastName}`} state={{
                                        ...member, ...member,
                                        team: teams.find(team => team.id === member.teamId) || {}
                                    }}>
                                        {member.lastName}, {member.firstName}
                                    </Link>
                                </Typography>
                        ))}
                    </Typography>
                </CardContent>
            </Card>
            <Button onClick={goBack}>Go Back</Button>
        </Box>
    );
}

export default TeamPage;