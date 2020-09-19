import React from 'react';
import useGetAllGames from '../api/useGetAllGames';
import {
    TableBody, TableContainer, Table,
    TableRow, TableCell, TablePagination, TableHead
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function HistoricResults() {
    const page = 1;
    const allGames = useGetAllGames(page);
    const history = useHistory();

    const handleChangePage = () => {
        //TODO implement front-side pagination
    };

    const handleChangeRowsPerPage = () => {
        //TODO implement front-side pagination
    };

    const goToHome = () => {
        history.push('/');
    };

    return (
        <div className="center">
            <h1>Historic results</h1>
            <div className="results">
                <button className="link" onClick={() => goToHome()}>Home</button>
            </div>
            {
                allGames.response &&
                <div>
                    <TableContainer>
                        <Table
                            className="table-style"
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Game Id</TableCell>
                                    <TableCell align="right">Rounds</TableCell>
                                    <TableCell align="right">Winner</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allGames.response && allGames.response.docs &&
                                    allGames.response.docs.map(game => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={game._id}
                                            >
                                                <TableCell >
                                                    {game._id}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {game.rounds.length}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {game.winner}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        className="table-style"
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={1}
                        rowsPerPage={10}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            }
        </div>
    );
}

export default HistoricResults;