import { getFeedbackPackageDomainUrl } from '../../../../../../../global-config';

// TODO manage node env
const packageUrl = getFeedbackPackageDomainUrl();
export const getCodeBlockConfigurationContent = (projectId: string) =>  `<link rel="stylesheet" type="text/css" href="${packageUrl}/bundle.css">\n<script src="${packageUrl}/bundle.js"></script>\n<script type='module'>\n    feedbackHubSDK.setUpFeedbackContainer({project: "${projectId}"});\n</script>`
