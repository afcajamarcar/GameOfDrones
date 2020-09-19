import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeCurrentGame } from '../app/store/actions/gameActions';

const useMakeMoves = body => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
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
                    if (isSubscribed) {
                        setResponse(data);
                        dispatch(storeCurrentGame(data));
                    }
                } catch (error) {
                    console.error('something happened', error);
                    setError(error);
                }
            }
            if (isSubscribed) fetchData().then();
            return () => (isSubscribed = false);
        }
    }, [body, dispatch]);
    return { response, error };
}

export default useMakeMoves;