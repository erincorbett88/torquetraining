import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Member from "../../interfaces/Member.ts";


function MemberPage() {
    const location = useLocation();
    const member = location.state as Member;
    const teamName = location.state.team.name;
    const team = location.state.team;

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }


    return (
        <Box sx={{mt: 2, ml: 3}}>
            <Card variant="outlined"
                  sx={{cornerRadius: "3", width: 224}}>
                <CardContent sx={{padding: 2}}>
                    <Typography sx={{mb: 3}} variant="h5" component="div">
                        {member.firstName} {member.lastName}
                    </Typography>
                    <Typography sx={{mb: 3, fontSize: 14}} color="text.secondary">
                        Team: {
                        <Link to={`/teams/${teamName}`} state={team}>
                            {teamName}
                        </Link>}
                    </Typography>
                    <Typography variant="body2">
                        {member.email}
                        <br/>
                    </Typography>
                </CardContent>
            </Card>
            <Button onClick={goBack}>Go Back</Button>
        </Box>
    );
}

export default MemberPage;