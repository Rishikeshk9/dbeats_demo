import React,{useEffect} from 'react';
import { Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import classes from '../Landing.module.css'

const Cards = (props) => {

  useEffect(()=>{
    AOS.init({
      offset:370,
      duration:1500
    })
  },[]);

  return (
    <>
<Card  className={[classes.info_card, classes.card].join(' ')} data-aos="zoom-in-up" data-aos-delay={props.delay}>
      <Card.Img  className="mx-auto" id={classes.card_images} src={props.imgsrc} roundedCircle />
        <Card.Body>
          <Card.Title style={{color:'#00d3ff'}}>{props.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}

export default Cards;