import { getFeedbackPackageDomainUrl } from '../../../../../../../global-config';

const packageUrl = getFeedbackPackageDomainUrl(process.env.NODE_ENV ? process.env.NODE_ENV : 'production');
export const getCodeBlockConfigurationContent = (apiKey: string) =>  `
<link rel="stylesheet" type="text/css" href="${packageUrl}/bundle.css">
<script src="${packageUrl}/bundle.js"></script>
<script>
    async function init() {
        await InsightHunt.init({projectApiKey: "${apiKey}"});
        InsightHunt.setUpFeedbackContainer();
    }

    init();
</script>`
