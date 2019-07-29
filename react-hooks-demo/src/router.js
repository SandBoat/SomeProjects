import React, { useState } from 'react';

import Example from './hooks/example';
import Reuse from './hooks/reuse';

export default function Router() {
    const routes = [{
        name: 'example',
        component: Example
    }, {
        name: 'reuse',
        component: Reuse
    }];

    // Declare a new state variable, which we'll call "count"
    const [cuttentRoute, setRoute] = useState('index');
    const route = routes.find(route => route.name === cuttentRoute);

    return (
        <div style={{
            display: 'flex',
        }}>
            <div className="menu" style={{
                width: '200px',
                borderRight: '1px solid #000',
            }}>
                <ul>
                    {routes.map(route => (
                        <li key={route.name}
                            onClick={() => setRoute(route.name)}
                            style={{
                                color: route.name === cuttentRoute ? 'red' : 'black'
                            }}
                        >{route.name}</li>
                    ))}
                </ul>
            </div>
            <div className="body" style={{
                padding: '20px',
            }}>
                {
                    route &&
                    <route.component />
                }
            </div>
        </div>
    );
}