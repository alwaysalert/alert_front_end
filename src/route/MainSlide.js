import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import * as glob from '../global';
import axios from 'axios';

/**
 * function MainArticle
 * @param {*} props 
 * @returns 뉴스 한 개 해당하는 컴포넌트 
 */
function MainArticle(props){
    return (
        <div >
            <a href = {props.news.link} target="_blank" rel="noreferrer">
                <div className ="news-container">
                    <img className = 'news-img'alt ={props.news.id} src ={props.news.img} ></img>
                </div>
                <div className = 'news-titile'>{props.news.title}</div>
            </a>
            
        </div>
    )
}

function MainSlide(props) {
    console.log(props);
    
    let image_url1 = 'https://www.boannews.com/media/upFiles2/2022/11/01 utoimage_21724_sum.jpg';
    var settings = {
        dots: true,
        nextArrow:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode :true
      };
    // console.log(props.news[0]);
    // console.log("1",image_url1);
    useEffect(() => {
  
    },[])
    return (
        <div>
            <div className ='boannews'>실시간 보안 뉴스</div>
            <Slider {...settings}>
                <MainArticle news = {props.new3}></MainArticle> 
                <MainArticle news = {props.new2}></MainArticle> 
                <MainArticle news = {props.new1}></MainArticle>
            </Slider>
            
        </div>
        
      )
  
}

export default MainSlide