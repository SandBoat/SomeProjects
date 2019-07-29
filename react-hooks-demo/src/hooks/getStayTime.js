import { useState, useEffect } from 'react';

// 逻辑复用
export default function GetStayTime() {
    const [stayTime, setStayTime] = useState(0);

    useEffect(() => {
        const timeHandler = setInterval(() => {
            console.log(stayTime);
            setStayTime(stayTime + 1);
        }, 1000);

        // Effects may also optionally specify how to “clean up” after them by returning a function. 
        return () => {
            clearInterval(timeHandler);
        };
    })

    return stayTime;
}