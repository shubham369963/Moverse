import React from 'react'
import {img_300, unavailable} from "../../config/config.js"
import "./SingleContent.css" 
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ContentModal from "../ContentModel/ContentModel";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const SingleContent = ({id, poster, title, date, media_type, vote_average}) => {
  return (
    <StyledBadge style={{zIndex: 0}} badgeContent={vote_average} color={vote_average>7 ? "primary": "secondary"}>
    <ContentModal media_type={media_type} id={id}>
        <img className="poster" src={poster? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className="subTitle" >
            {media_type === "tv"? "TV Series" : "Movie"}
            <span className="subTitle">
        {date}
        </span>
        </span>
    </ContentModal>
    </StyledBadge>
  )
}

export default SingleContent