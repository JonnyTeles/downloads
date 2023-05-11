import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { iCard } from '@/interfaces/card.interface';
import { Tweet } from 'react-twitter-widgets';
import YouTube from "react-youtube";
import Button from './Button';

export default function ImgMediaCard(props: iCard) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        {props.youtube && <YouTube videoId={props.image} opts={{height: "200px", width: "345px"}} />}
        {props.twitter && <Tweet tweetId={props.image} />}

        {!props.youtube && !props.twitter && (
          <CardMedia
            component="img"
            alt={props.alt}
            height={props.height}
            image={props.image}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color='purple' className='hover:bg-purple-500'>{props.buttonText}</Button>
        </CardActions>
      </Card>
    );
  }