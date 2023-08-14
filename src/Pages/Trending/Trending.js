import {React, useState, useEffect} from 'react'
import axios from "axios"
import SingleContent from "../../components/SingleContent/SingleContent.js"
import "./Trending.css"
import CustomPagination from "../../components/CustomPagination/CustomPagination.js"
const Trending = () => {
  const [page, setPage] = useState(1)
  const [contents, setContents] = useState([])
  const fetchTrending = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    console.log(data.results);
    setContents(data.results)
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  
  return (
    <div>
      <span className="pageTitle">trending</span>
      <div className="trending">
        {
          contents && contents.map((c)=> (
          <SingleContent 
          key={c.id}  
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
          />
          ))
        }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending