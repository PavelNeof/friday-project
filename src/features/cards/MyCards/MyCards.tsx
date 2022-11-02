import React, { useEffect, useState } from 'react';
import stylePacks from '../../packs/Packs.module.css';
import s from './../Cards.module.css';
import { BackToPackList } from '../../../common/components/BackToPackList/BackToPackList';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
    CardType,
    changeCardsPageAC,
    changeCardsPageCountAC,
    getCardsTC,
} from '../cards-reducer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PATH } from '../../../common/routing/Route/Route';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SchoolIcon from '@mui/icons-material/School';
import { Delete } from '@mui/icons-material';
import { AddNewCardModel } from '../../modal/CardModal/AddNewCardModel';
import { RenderCellCardComponent } from '../../modal/CardModal/RenderCellCardComponent';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

export const MyCards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { cardPackId } = useParams();
    const cards = useAppSelector(state => state.cards.cards);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const status = useAppSelector(state => state.app.status);
    const packName = useAppSelector(state => state.cards.packName);
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cards.pageCount);
    const page = useAppSelector(state => state.cards.page);
    //const cardPackId = cardPackIdParam?.substring(1, cardPackIdParam?.length);
    // const { cards } = data || {};
    //console.log(cards);
    console.log(cardsTotalCount);
    const [isAddCard, setIsAddCard] = useState(false);

    //console.log(cards);
    // console.log(cardPackId);
    useEffect(() => {
        dispatch(getCardsTC(cardPackId));
    }, [page, pageCount]);

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
                    <RenderCellCardComponent
                        id={params.row._id}
                        name={params.row.question}
                        answer={params.row.answer}
                        cardPackId={cardPackId}
                    />
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
        //dispatch(addNewCardTC(cardPackId));
        setIsAddCard(true);
    };

    const onPageChangeHandle = (page: number) => {
        dispatch(changeCardsPageAC(page + 1));
    };

    const onPageSizeChangeHandle = (pageSize: number) => {
        dispatch(changeCardsPageCountAC(pageSize));
    };

    // const deleteCardHandler = (cardId: string) => {
    //     dispatch(deleteCardTC(cardId));
    // };
    // const updateCardHandler = (cardId: string) => {
    //     dispatch(updateCardTC(cardId, 'New question is cool! Before it was too boring'));
    // };
    //
    // const updateNamePackHandler = (id: string) => {
    //     dispatch(updateNamePackTC(id, 'New name'));
    // };

    if (!isLoggedIn) {
        navigate(`${PATH.LOGIN}`);
    }

    return (
        <div>
            <div className={stylePacks.container}>
                <BackToPackList />
                <div className={stylePacks.packsHeader}>
                    <div className={stylePacks.packsHeaderIcon}>
                        <h1>{packName}</h1>
                        <div style={{ color: '#757575' }}>
                            <BorderColorIcon />
                        </div>
                        <div style={{ color: '#757575' }}>
                            <Delete />
                        </div>
                        <div style={{ color: '#757575' }}>
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
                        getRowId={(row: CardType) => row._id}
                        rows={cards}
                        columns={columns}
                        paginationMode={'server'}
                        page={page - 1} // current page
                        pageSize={pageCount} // number of decks per page
                        rowsPerPageOptions={[5, 10, 15]} // options for the number of decks per page
                        rowCount={cardsTotalCount} // how many decks
                        onPageChange={onPageChangeHandle} // go to page
                        onPageSizeChange={onPageSizeChangeHandle} // changing the number of decks per page
                    />
                </Box>
            </div>
            {isAddCard && (
                <AddNewCardModel isAddCard={isAddCard} setIsAddCard={setIsAddCard} />
            )}
        </div>
    );
};
