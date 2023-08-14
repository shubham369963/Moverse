import './App.css';
import Header from './components/Header/Header.js';
import MainNav from './components/MainNav.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Trending from "./Pages/Trending/Trending.js"
import Movies from "./Pages/Movies/Movies.js"
import Series from "./Pages/Series/Series.js"
import Search from "./Pages/Search/Search.js"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending/>} exact></Route>
            <Route path="/movies" element={<Movies/>} exact></Route>
            <Route path="/series" element={<Series/>} exact></Route>
            <Route path="/search" element={<Search/>} exact></Route>
          </Routes>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
