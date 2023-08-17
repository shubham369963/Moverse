import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@mui/material";
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState,useDeferredValue, useTransition ,Suspense} from "react";
import axios from "axios";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Loading from "../../components/Loading/Loading";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const defferedContent = useDeferredValue(content);
  const [isPending, startTransition] = useTransition();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      startTransition(()=>{
        setContent(data.results);
        setNumOfPages(data.total_pages);
      })
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
          <p>{isPending? "Getting..." : ""}</p>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <Suspense fallback={<Loading/>}>
      <div className="trending">
        {defferedContent &&
          defferedContent.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !defferedContent &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      </Suspense>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;