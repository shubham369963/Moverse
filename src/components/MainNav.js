import { React, useEffect ,useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function MainNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (value === 0) {
      navigate('/');
    }else if(value === 1){
        navigate("/movies");
    }else if(value === 2){
        navigate("/series");
    }else{
        navigate("/search");
    }
  }, [value, navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ pb: 7 }}>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              style={{ color: 'white' }}
              label="Trending"
              icon={<WhatshotIcon />}
            />
            <BottomNavigationAction
              style={{ color: 'white' }}
              label="Movies"
              icon={<MovieIcon />}
            />
            <BottomNavigationAction
              style={{ color: 'white' }}
              label="TV Series"
              icon={<TvIcon />}
            />
            <BottomNavigationAction
              style={{ color: 'white' }}
              label="Search"
              icon={<SearchIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
