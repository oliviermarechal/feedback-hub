import { PUBLIC_PACKAGE_URL } from '$env/static/public'

export const getCodeBlockConfigurationContent = (apiKey: string) =>  `
<link rel="stylesheet" type="text/css" href="${PUBLIC_PACKAGE_URL}/bundle.css">
<script src="${PUBLIC_PACKAGE_URL}/bundle.js"></script>
<script>
    async function init() {
        await InsightHunt.init({projectApiKey: "${apiKey}"});
        InsightHunt.setUpFeedbackContainer();
    }

    init();
</script>`
