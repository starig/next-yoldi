import axios from "axios";

export const getFetcher = async (url: string, config: any) => {
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (e: any) {
        throw e.response.data.message;
    }
};

export const postFetcher = async (url: string, data: any) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (e: any) {
        throw e.response.data.message;
    }

}

export const patchFetcher = async (url: string, data: any) => {
    try {
        const response = await axios.patch(url, data.userInfo, {
            headers: {
                "X-API-KEY": data.token
            }
        });
        return response.data;
    } catch (e: any) {
        throw e.response.data.message;
    }

}

export const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then(res => res.json());
