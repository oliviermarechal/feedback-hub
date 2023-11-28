"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const App_1 = require("./App");
function initializeApp(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        alert(`Container with id ${containerId} not found.`);
        console.error(`Container with id ${containerId} not found.`);
        return;
    }
    alert(`Container with id ${containerId} was FOUND.`);
    react_dom_1.default.render(react_1.default.createElement(App_1.default, null), container);
}
exports.default = initializeApp;
;
