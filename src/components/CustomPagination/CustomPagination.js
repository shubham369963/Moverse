import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./CustomPagination.css"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
  });

const CustomPagination = ({setPage, numOfPages = 500}) => {

    const handlePageChange = (page)=>{
        setPage(page);
        window.scroll(0,0)
    }
  return (
    <div className="pagination">
    <ThemeProvider theme={darkTheme}>
        <Pagination count={numOfPages} color="primary" onChange={(e)=> handlePageChange(e.target.textContent)} 
        hideNextButton
        hidePrevButton
        />
    </ThemeProvider>
    </div>
  )
}

export default CustomPagination