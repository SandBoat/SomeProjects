import React from 'react';
import GetStayTime from './getStayTime'

function StayTime01() {
    const time = GetStayTime();
    return (
        <div>
            <p>You Stay Here {time}s</p>
        </div>
    );
}

function StayTime02() {
    const time = GetStayTime();
    const stayMsg = time % 2  === 0 ? 'You Stay Even' : 'You Stay Odd';
    return (
        <div>
            <p>{stayMsg}</p>
        </div>
    );
}


export default function Reuse() {
    return (
        <div>
            <StayTime01 />
            <StayTime02 />
        </div>
    );
}