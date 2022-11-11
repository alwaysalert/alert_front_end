import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import * as glob from '../global';
import axios from 'axios';


function MainArticle(props){
    return (
        <div>
            
        </div>

    )
}

function MainSlide(props) {

    
    let image_url1 = 'https://www.boannews.com/media/upFiles2/2022/11/01 utoimage_21724_sum.jpg';
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    // console.log(props.article[0].img);
    // console.log("1",image_url1);

  return (
    <div>
        <Slider {...settings}>
            <div>
                <img alt ='0' src ={image_url1}></img>
                
            </div> 
            <div>
                2
            </div>  
            {/* <MainArticle a = {props.article[0]}></MainArticle>  */}
        </Slider>
    </div>
  )
}

export default MainSlide