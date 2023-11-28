"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackHubSDK = void 0;
class FeedbackHubSDK {
    constructor(config) {
        console.log(config);
    }
    setUpFeedbackContainer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            alert(`Container with id ${containerId} not found.`);
            console.error(`Container with id ${containerId} not found.`);
            return;
        }
        alert(`Container with id ${containerId} was FOUND.`);
    }
    ;
}
exports.FeedbackHubSDK = FeedbackHubSDK;
