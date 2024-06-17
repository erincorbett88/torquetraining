import axios, { AxiosResponse } from 'axios';
import Team from './interfaces/Team';
import Member from './interfaces/Member';

type RequestData = Team | Member | Team[] | Member[] | null;

const sendRequest = async (url: string, method: string, data: RequestData = null, signal?: AbortSignal): Promise<Team | Member | Team[] | Member[]> => {
    try {
        let response: AxiosResponse<Team | Member>;

        if (method === 'GET' || method === 'DELETE') {
            response = await axios({
                method: method,
                url: url,
                signal: signal
            });
        } else {
            response = await axios({
                method: method,
                url: url,
                data: data,
                signal: signal
            });
        }

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export { sendRequest };