import React from 'react';
import useGetAllGames from '../api/useGetAllGames';

function HistoricResults() {
    const allGames = useGetAllGames();
    return(
        <div>
            <div>All Games</div>
            <div>
                {allGames.response && allGames.response.games &&
                    allGames.response.games.map(game => 
                        <div>game</div>
                    )
                }
            </div>
        </div>
    );
}