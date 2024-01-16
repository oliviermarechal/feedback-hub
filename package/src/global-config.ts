export const getApiUrl = (env: string) => {
    if (env === 'production') {
        return 'https://api.insight-hunt.com';
    }

    return 'http://localhost:3005';
}

export const getHomepage = (env: string) => {
    if (env === 'production') {
        return 'https://insight-hunt.com';
    }

    return 'http://localhost:5173';
}