import '../App.css';
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  // height: 100vh;
  display: flex;
  justify-content: center;
  align-items: top;
  background-color: #fffff;
`;
export default function CarouselContainer() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  const images = ["../images/Yasi-1.jpg", "../images/Yasi-2.jpg", "../images/Yasi-3.jpg", "../images/Yasi-4.jpg"]
  const handleClickPrev = () => { 
      if (index === 0) return;
      setIndex(index - 1);
      setXPosition(xPosition + width);
    };
  const handleClicknext = () => {
      if (index === images.length - 1) {
        setIndex(0);
        setXPosition(0);
      } else {
        setIndex(index + 1);
        setXPosition(xPosition - width);
      }
    };
  useEffect(() => {
    const handleAutoplay = setInterval(handleClicknext, 4000);
    return () => clearInterval(handleAutoplay);
  }, [handleClicknext]);

return (
    <Wrapper>
      <Carousel
        images={images}
        setWidth={setWidth}
        xPosition={xPosition}
        handleClickPrev={handleClickPrev}
        handleClicknext={handleClicknext}
      />
    </Wrapper>
  );
}

