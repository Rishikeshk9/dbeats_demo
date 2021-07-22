import React from 'react';
import Cards from './Card';
import Data from '../../../assests/Data';


const LandingBody = () => {
    return (
        <>
        <div className="my-3">
            <h1 className="text-center we-give">We give everyone the <br /><span className="freedom-text">Freedom to</span></h1>
        </div>
        <div className="container-fluid " align="center">
            <div classame="row ">
                <div className="col-10 mx-auto">
                    <div className="row" >
                        {Data.map((value,index)=>{
                            return(
                                <div className="col-12 col-sm-4">
                            <Cards key={index}
                            imgsrc={value.imgsrc}
                            title={value.title}/>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingBody;
