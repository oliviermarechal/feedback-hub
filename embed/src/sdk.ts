export class FeedbackHubSDK {
    constructor(config: any) {
        console.log(config);
    }


    setUpFeedbackContainer(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            alert(`Container with id ${containerId} not found.`);
            console.error(`Container with id ${containerId} not found.`);
            return;
        }

        alert(`Container with id ${containerId} was FOUND.`);
        // ReactDOM.render(<App />, container);
    };
}