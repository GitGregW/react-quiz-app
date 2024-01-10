import { useState, useEffect } from 'react';

// Issue: remainingTime is set to the initial max value on clean up, not the new value.
export default function Progress({max}){
    const [remainingTime, setRemainingTime] = useState(max);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 10);
        }, 10);

        return () => {clearInterval(interval); setRemainingTime((prevTime) => prevTime = max); }
    }, [max]);

    return <progress value={remainingTime} max={max} />
}