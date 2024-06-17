import * as React from 'react';
import {CssBaseline, IconButton} from "@mui/material";
import { Typography, useMediaQuery } from "@mui/material";
import { Box } from '@mui/material';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';

interface AppHeaderProps {
    toggleTheme: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ toggleTheme }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: "space-between",
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            <Typography sx={{fontSize: 30}}>Torque Practice</Typography>
            <IconButton onClick={toggleTheme} >
                <BrightnessMediumIcon />
            </IconButton>
        </Box>
    );
}

interface Props {
    children: React.ReactNode;
}

export default function ToggleColorMode({children}: Props) {
    const [mode, setMode] = React.useState<'light' | 'dark' | 'auto'>('light');

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeMode = mode === 'auto' ? (prefersDarkMode ? 'dark' : 'light') : mode;

    const toggleTheme = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    React.useEffect(() => {
        document.body.classList.remove('light-theme', 'dark-theme', 'auto-theme');
        document.body.classList.add(`${themeMode}-theme`);
    }, [themeMode]);

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                },
            }),
        [themeMode],
    );


    return (
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AppHeader toggleTheme={toggleTheme}/>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
    );
}