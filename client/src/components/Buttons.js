import React from 'react';
import styled from 'styled-components';

const Button = styled.img`
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 15px;
  transform: translateY(-50%);
  left: ${props => props.side === 'prev' && 5}px;
  right: ${props => props.side === 'next' && 5}px;
`;
function Buttons({ handleClickPrev, handleClicknext }) {
  return (
    <>
      <Button src="../icons/left.svg" side="prev" onClick={handleClickPrev} />
      <Button src="../icons/right.svg" side="next" onClick={handleClicknext} />
    </>
  );
}
export default Buttons;