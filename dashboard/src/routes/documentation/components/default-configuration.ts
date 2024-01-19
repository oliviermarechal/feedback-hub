export const getDefaultConfiguration = (apiKey?: string) =>  `<script>
    async function init() {
        await InsightHunt.init({projectApiKey: '${apiKey || 'YourProjectApiKey'}'});
        InsightHunt.setUpFeedbackContainer();
    }

    init();
</script>
`
