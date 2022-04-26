import React, { useRef, useEffect, useState } from 'react';
import useWindowDimensions from './useWindowDimensions'; //[REQUIRE]

let increment = 0; 

const Canvas = props => {
  const {width, height} = useWindowDimensions(); 
  
  const canvasRef = useRef(null);
  
  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = width; 
    canvas.height = height; 
    const context = canvas.getContext('2d');
    let animationFrameId;
    let y =  304; 
    let length = 0.01; 
    let amplitude = 100; 
    let frequency = 0.01; 
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      context.fillStyle = 'rgba(0, 0, 0, 0.01)'; 
      context.fillRect(0,0,width, height); 
      
      context.beginPath(); 
      context.moveTo(0, height); 

      for(let i = 0; i < width; ++i){
        context.lineTo(
          i, 
          y + Math.sin(i * length + increment) * amplitude * Math.sin(increment)
        );
      }

      context.strokeStyle = 'hsl(200, 50%, 50%)';
      context.stroke();
      increment += frequency;
    }

    animate();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [width,height]);
  
  return (
    <div>
       <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;