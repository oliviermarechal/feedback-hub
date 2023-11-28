import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default function initializeApp(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
        alert(`Container with id ${containerId} not found.`);
        console.error(`Container with id ${containerId} not found.`);
        return;
    }

    alert(`Container with id ${containerId} was FOUND.`);
    ReactDOM.render(<App />, container);
};
