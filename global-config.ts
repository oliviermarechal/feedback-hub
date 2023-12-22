export const getFeedbackPackageDomainUrl = (env: string) => {
    if (env === 'production') {
        throw new Error('Dont forget to set production URL');
        return 'https://raw.githubusercontent.com/oliviermarechal/feedback-hub/main/package/dist';
    }

    return 'http://localhost:8081';
}

export const getApiUrl = (env: string) => {
    if (env === 'production') {
        throw new Error('Dont forget to set production URL');
        return '';
    }

    return 'http://localhost:3005';
}

export const getHomepage = (env: string) => {
    if (env === 'production') {
        throw new Error('Dont forget to set production URL');
        return 'https://google.fr';
    }

    return 'http://localhost:5173';
}