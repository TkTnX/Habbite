let accessToken = null;

export const setAccessToken = (token: string) =>{
    accessToken = token;
} 

export const getAccessToken = () => accessToken;
