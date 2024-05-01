import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import slider1 from "../assets/slider/slider-1.jpg"
import slider2 from "../assets/slider/slider-2.jpg"
import slider3 from "../assets/slider/slider-3.jpg"
import slider4 from "../assets/slider/slider-4.jpg"



export default function Slider () {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
      return (
        <div className="ui container">
      <Carousel
        centerMode={false}
        swipeable={true}
        draggable={true}
        showDots={false}
        renderDotsOutside={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={3000}
        autoPlay={true}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
            <img style={{height: "600px"}} src={slider1} alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px"}} src={slider2} alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px"}} src={slider3} alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px"}} src={slider4} alt="Yasmin Mostoller"></img>
        </div>
      </Carousel>
      </div>
      );
    // return ( 
    //     <div className="ui three column grid" style={{marginBottom: "5px"}}> 
    //         <div className="column">
    //             <div className="ui fluid card">
    //                 <div className="image">
    //                     <img src="/images/Yasi-1.jpg" alt="Yasmin Mostoller"></img>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="column">
    //             <div className="ui fluid card">
    //                 <div className="image">
    //                     <img src="/images/Yasi-2.jpg" alt="Yasmin Mostoller"></img>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="column">
    //             <div className="ui fluid card">
    //                 <div className="image">
    //                     <img src="/images/Yasi-4.jpg" alt="Yasmin Mostoller"></img>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
