import React from 'react';
import { Card } from 'react-bootstrap';

const Cards = (props) => {
  return (
    <>
      <Card  className="card" >
      <Card.Img  className="m-3 img-shadow" src={props.imgsrc} roundedCircle style={{borderRadius:'50%', height:'5rem', width:'5rem' }} />
        <Card.Body>
          <Card.Title style={{color:'#00d3ff'}}>{props.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}

export default Cards;