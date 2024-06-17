import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1] || 'teams';


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentPath} aria-label="basic tabs example">
                    <Tab label="Teams" value="teams" component={Link} to="/teams"/>
                    <Tab label="Members" value="members"  component={Link} to="/members" />
                </Tabs>
            </Box>
        </Box>
    );
}