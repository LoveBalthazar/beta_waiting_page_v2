import {useEffect, useState} from 'react'; 
import './Jumbotron.css'; 

const Jumbotron = () => {
    const [colors, setColors] = useState(["black_", "red_", "green_", "blue_"]); 

    const update = () => {
        setColors((previousState, currProps) => {
            let next_1 = previousState[1];
            let next_2 = previousState[2];
            let next_3 = previousState[3];
            let next_4 = previousState[0]; 

            let next = [next_1, next_2, next_3, next_4];
            return next;  
        });
    }

    useEffect( () => {
        
        setInterval(() => {
            update(); 
        }, 100); 
    }, []);

    return (
        <div className="Jumbotron">
            <div id="element-1" className={colors[0]}>OPENTABS+</div>
            <div id="element-2" className={colors[1]}>OPENTABS+</div>
            <div id="element-3" className={colors[2]}>OPENTABS+</div>
            <div id="element-4" className={colors[3]}>OPENTABS+</div>
        </div>
    );
}

export default Jumbotron; 