import React, { useEffect } from 'react';
import stylePacks from '../packs/Packs.module.css';
import s from './Cards.module.css';
import { BackToPackList } from '../../common/components/BackToPackList/BackToPackList';
import { Box, Button } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getCardsTC } from './cards-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';

export function Cards() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { cardPackId } = useParams();
    const cards = useAppSelector(state => state.cards.cards);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userId = useAppSelector(state => state.auth.data._id);
    const packUserId = useAppSelector(state => state.cards.packUserId);
    const packName = useAppSelector(state => state.cards.packName);
    // const { cards } = data || {};
    // console.log(data);

    useEffect(() => {
        dispatch(getCardsTC(cardPackId));
    }, []);

    const columns: GridColDef[] = [
        { field: 'question', headerName: 'Question', width: 150 },
        { field: 'answer', headerName: 'Answer', width: 150 },
        { field: 'updated', headerName: 'Last updated', width: 150 },
        { field: 'grade', headerName: 'Grade', width: 150 },
    ];

    /*
        const addNewCardHandler = () => {
            dispatch(addNewCardTC(cardPackId));
        };

        const deleteCardHandler = (cardId: string) => {
            dispatch(deleteCardTC(cardId));
        };
        const updateCardHandler = (cardId: string) => {
            dispatch(updateCardTC(cardId, 'New question is cool! Before it was too boring'));
        };
        if (!cards) {
            navigate(`${PATH.ADD_NEW_CARD}`);
        }
        */

    if (!isLoggedIn) {
        navigate(`${PATH.LOGIN}`);
    }

    return (
        <div>
            <div className={stylePacks.container}>
                <BackToPackList />
                <div className={stylePacks.packsHeader}>
                    <h1>{packName}</h1>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#366EFF',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            borderRadius: '30px',
                            padding: '5px 25px 5px 25px',
                            fontFamily: 'Montserrat',
                            textTransform: 'capitalize',
                            height: '40px',
                            margin: '25px 10px 0px 0px',
                        }}
                    >
                        <NavLink
                            to={PATH.CARDS}
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                            }}
                        >
                            Learn to pack
                        </NavLink>
                    </Button>
                </div>
                <div>
                    <div>Search</div>
                    <div>
                        <input className={s.input} placeholder={'Provide your text'} />
                    </div>
                </div>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row: any) => row._id}
                        rows={cards || []}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={params => console.log(params.row.name)}
                    />
                </Box>
            </div>
        </div>
    );
}
