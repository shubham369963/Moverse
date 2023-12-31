import {React, useState,useEffect,useDeferredValue, useTransition,Suspense} from 'react'
import axios from "axios"
import SingleContent from "../../components/SingleContent/SingleContent.js"
import CustomPagination from "../../components/CustomPagination/CustomPagination.js"
import Genres from "../../components/Genres/Genres.js"
import useGenre from "../../hooks/useGenre";
import Loading from "../../components/Loading/Loading";

const Movies = () => {
  const [page, setPage] = useState(1)
  const [contents, setContents] = useState([]);
  const [numOfPages, setNumOfPages] = useState()

  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])
  const genreforURL = useGenre(selectedGenres);

  const defferedContent = useDeferredValue(contents);
  const [isPending, startTransition] = useTransition();

  const fetchMovies = async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    
    startTransition(()=>{
      setContents(data.results)
      setNumOfPages(data.total_pages)
    })

  }

  useEffect(() => {
  fetchMovies();
  // eslint-disable-next-line
  }, [page, genreforURL])
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <p>{isPending? "Getting..." : ""}</p>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <Suspense fallback={<Loading/>}>
      <div className="trending">
        {
          defferedContent && defferedContent.map((c)=> (
          <SingleContent 
          key={c.id}  
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type="movie"
          vote_average={c.vote_average}
          />
          ))
        }
      </div>
      </Suspense>
      {
        numOfPages>1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        ) 
      }
    </div>
  )
}

export default Movies