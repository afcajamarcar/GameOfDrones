import axios from 'axios';
import { useEffect, useState } from 'react';

const useMakeMoves = body => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if(body.playerOne && body.playerTwo && body.gameId) {
            console.log('body is', body);
            let isSubscribed = true;
            const fetchData = async () => {
                try {
                    let options = {
                        'Content-Type': 'application/json'
                    }
                    let payload = body;
                    const res = await axios.post(
                        'http://localhost:5000/api/make_move/',
                        payload,
                        options
                    );
                    const data = await res.data;
                    console.log('data from make moves is', data);
                    if (isSubscribed) setResponse(data)
                } catch (error) {
                    console.error('something happened', error);
                    setError(error);
                }
            }
            if (isSubscribed) fetchData().then();
            return () => (isSubscribed = false);
        }
    }, [body]);
    return { response, error };
}

export default useMakeMoves;