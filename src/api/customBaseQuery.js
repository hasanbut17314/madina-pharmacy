import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from './baseURL';

const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(`${baseURL}/user/recreateAccessToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error('Unable to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.accessToken;
};

const customBaseQuery = fetchBaseQuery({ baseUrl: baseURL });

const customBaseQueryWithReauth = async (args, api, extraOptions) => {

    let modifiedArgs = typeof args === 'string'
        ? { url: args, headers: {} }
        : { ...args, headers: { ...args.headers } };

    const token = localStorage.getItem('accessToken');
    if (token) {
        modifiedArgs.headers = {
            ...modifiedArgs.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    let result = await customBaseQuery(modifiedArgs, api, extraOptions);

    if (result.error && result.error.status === 401) {
        try {
            const newToken = await refreshAuthToken();
            modifiedArgs.headers.Authorization = `Bearer ${newToken}`;
            result = await customBaseQuery(modifiedArgs, api, extraOptions);
        } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            localStorage.clear();
            window.location.href = '/login';
        }
    }

    return result;
};

export default customBaseQueryWithReauth;
