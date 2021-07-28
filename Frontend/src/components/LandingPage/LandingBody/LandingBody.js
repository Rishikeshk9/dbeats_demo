import React from 'react';
import Cards from './Card';
import Data from '../../../assests/Data';



const LandingBody = () => {
    return (
        <>
        <div style={{paddingTop:"50px"}}>
            <div className="my-3">
                <h1 className="text-center we-give">We give everyone the <br /><span className="freedom-text">Freedom to</span></h1>
            </div>
            <div className="container-fluid" align="center">
                <div classame="row ">
                    <div className="col-10 mx-auto">
                        <div className="row" >
                            {Data.map((value,index)=>{
                                return(
                                    <div className="col-12 col-sm-4">
                                <Cards key={index}
                                imgsrc={value.imgsrc}
                                title={value.title}
                                delay={value.delay}/>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="wavy">
        <div id="example1">
        <svg id="wave1" viewBox="0 0 600 20">
          <path id="curve" d="M.35,56.81c53.28,0,53.28,22,106.57,22s53.28-22,106.57-22,53.28,22,106.57,22,53.28-22,106.56-22,53.29,22,106.58,22,53.28-22,106.57-22,53.29,22,106.58,22" transform="translate(0 -56)" />
          
          <text x="10%" className="desktop" text-anchor="middle" transform="translate(0,-20)">
            <textPath xlinkHref="#curve">
              Inception
            </textPath>
          </text>
          <text x="10%" className="desktop" text-anchor="middle" transform="translate(0, 25)">
            <textPath xlinkHref="#curve">
             Q2 2021
            </textPath>
          </text>

          <text x="30%" className="desktop" text-anchor="middle" transform="translate(0,-20)">
            <textPath xlinkHref="#curve">
              Website Launch
            </textPath>
          </text>
          <text x="30%" className="desktop" text-anchor="middle" transform="translate(0, 25)">
            <textPath xlinkHref="#curve">
              Q2 2021
            </textPath>
          </text>

          <text x="60%" className="desktop" text-anchor="middle" transform="translate(0,-20)">
            <textPath xlinkHref="#curve">
              Litepaper Release
            </textPath>
          </text>
          <text x="60%" className="desktop" text-anchor="middle" transform="translate(0, 25)">
            <textPath xlinkHref="#curve">
              Q3 2021
            </textPath>
          </text>

          <text x="90%" className="desktop" text-anchor="middle" transform="translate(0,-20)">
            <textPath xlinkHref="#curve">
              Livestream Launch
            </textPath>
          </text>
          <text x="90%" className="desktop" text-anchor="middle" transform="translate(0, 25)">
            <textPath xlinkHref="#curve">
              Q3 2021
            </textPath>
          </text>      
    </svg>
    </div>
    </div>
    </>
        
    )
}

export default LandingBody;
