import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllGames = (page, limit = 10) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            try {
                let options = {
                    'Content-Type': 'application/json',
                    params: {
                        page: page,
                        limit: limit
                    }
                }
                const res = await axios.get(
                    `http://localhost:5000/api/games_list/?{}`,
                    options
                );
                const data = await res.data;
                if (isSubscribed) setResponse(data);
            } catch (error) {
                console.error('something happened', error);
                setError(error);
            }
        }
        if (isSubscribed) fetchData().then();
        return () => (isSubscribed = false);
    }, [page, limit]);
    return { response, error };
}

export default useGetAllGames;