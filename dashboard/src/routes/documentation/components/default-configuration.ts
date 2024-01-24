export const getDefaultConfiguration = (apiKey?: string) =>  `<script>
    async function init() {
        // Language is optional, default is 'en'. Available values are 'en' and 'fr'.
        await InsightHunt.init({projectApiKey: '${apiKey || 'YourProjectApiKey'}', language: 'en'});
        InsightHunt.setUpFeedbackContainer();
    }

    init();
</script>
`
