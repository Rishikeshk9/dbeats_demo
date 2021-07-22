import React from 'react';
import { Card } from 'react-bootstrap';
import classes from '../Landing.module.css'

const Cards = (props) => {
  return (
    <>
<Card  className={classes.info_card} >
      <Card.Img  className="mx-auto img-shadow" id={classes.card_images} src={props.imgsrc} roundedCircle />
        <Card.Body>
          <Card.Title style={{color:'#00d3ff'}}>{props.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}

export default Cards;