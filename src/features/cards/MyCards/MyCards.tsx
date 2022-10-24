import React, { useEffect } from 'react';
import stylePacks from '../../packs/Packs.module.css';
import s from './../Cards.module.css';
import { BackToPackList } from '../../../common/components/BackToPackList';
import { Box, Button, IconButton } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addNewCardTC, deleteCardTC, getCardsTC, updateCardTC } from '../cards-reducer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PATH } from '../../../common/routing/Route/Route';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';
import { Delete } from '@mui/icons-material';

export function MyCards() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { cardPackId } = useParams();
    const cards = useAppSelector(state => state.cards.cards);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
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
        {
            field: '',
            headerName: '',
            width: 150,
            renderCell: params => {
                console.log({ params });
                return (
                    <div>
                        <IconButton disabled={status === 'loading'}>
                            <SchoolIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => updateCardHandler(params.row._id)}
                            disabled={status === 'loading'}
                        >
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => deleteCardHandler(params.row._id)}
                            disabled={status === 'loading'}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                );
            },
        },
    ];

    // if (packUserId === userId) {
    //     alert('my');
    // } else {
    //     alert('friend');
    // }

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

    if (!isLoggedIn) {
        navigate(`${PATH.LOGIN}`);
    }

    return (
        <div>
            <div className={stylePacks.container}>
                <BackToPackList />
                <div className={stylePacks.packsHeader}>
                    <div className={stylePacks.packsHeaderIcon}>
                        <h1>My Pack</h1>
                        <div>
                            <BorderColorIcon />
                        </div>
                        <div>
                            <Delete />
                        </div>
                        <div>
                            <SchoolIcon />
                        </div>
                    </div>
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
                        onClick={addNewCardHandler}
                    >
                        Add new card
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