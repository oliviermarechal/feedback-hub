export const getFeedbackPackageDomainUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Dont forget to set production URL');
        return 'http://raw.github...';
    }

    return 'http://localhost:8081';
}

export const getApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Dont forget to set production URL');
        return '';
    }

    return 'http://localhost:3005';
}

export const getHomepage = () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Dont forget to set production URL');
        return 'https://google.fr';
    }

    return 'http://localhost:5173';
}