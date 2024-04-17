import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
        centerMode={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        renderDotsOutside={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={100}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-1.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-2.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-3.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div >
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-1.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-2.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-3.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div >
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-1.jpg" alt="Yasmin Mostoller"></img>
        </div>
        <div>
            <img style={{height: "600px", padding:"10px"}} src="/images/Yasi-2.jpg" alt="Yasmin Mostoller"></img>
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
