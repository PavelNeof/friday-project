import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import stylePacks from '../../packs/Packs.module.css';
import s from './MyCards.module.css';
import {BackToPackList} from '../../../common/components/BackToPackList/BackToPackList';
import {Box, Button} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {
    CardType,
    changeCardsPageAC,
    changeCardsPageCountAC,
    getCardsTC,
} from '../cards-reducer';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {PATH} from '../../../common/routing/Route/Route';
import {AddNewCardModel} from '../../modal/CardModal/AddNewCardModel';
import {RenderCellCardComponent} from '../../modal/CardModal/RenderCellCardComponent';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import BasicPopover from "../../../common/components/Popover/PopoverMyPack";
import {updateNamePackTC} from "../../packs/Packs-reducer";


export const MyCards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let {cardPackId} = useParams();
    const cards = useAppSelector(state => state.cards.cards);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const packName = useAppSelector(state => state.cards.packName);
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cards.pageCount);
    const page = useAppSelector(state => state.cards.page);
    //const cardPackId = cardPackIdParam?.substring(1, cardPackIdParam?.length);
    // const { cards } = data || {};
    //console.log(cards);
    console.log(cardsTotalCount);

    const [isAddCard, setIsAddCard] = useState(false);
    let [isEdit, setIsEdit] = useState(false);
    let [currentName, setCurrentName] = useState(packName);

    useEffect(() => {
        dispatch(getCardsTC(cardPackId));
    }, [page, pageCount]);

    useEffect(() => {
        setCurrentName(packName)
    }, [packName]);

    const columns: GridColDef[] = [
        {field: 'question', headerName: 'Question', width: 150},
        {field: 'answer', headerName: 'Answer', width: 150},
        {field: 'updated', headerName: 'Last updated', width: 150},
        {field: 'grade', headerName: 'Grade', width: 150},
        {
            field: '',
            headerName: '',
            width: 150,
            renderCell: params => {
                console.log({params});
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

    const addNewCardHandler = () => {
        setIsAddCard(true);
    };

    const onPageChangeHandle = (page: number) => {
        dispatch(changeCardsPageAC(page + 1));
    };

    const onPageSizeChangeHandle = (pageSize: number) => {
        dispatch(changeCardsPageCountAC(pageSize));
    };

    const inputEl = useRef<HTMLInputElement>(null);

    const onEditChange = () => {
        setIsEdit(true)
    }

    useEffect(() => {
        isEdit && inputEl.current?.focus();
    }, [isEdit])

    if (!isLoggedIn) {
        navigate(`${PATH.LOGIN}`);
    }

    const updateNamePackHandler = (id: string | undefined) => {
        id && dispatch(updateNamePackTC(id, currentName))
        //setIsEdit(false);

    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            updateNamePackHandler(cardPackId)
            setIsEdit(false)
        }
    }
    const onClickHandler = () => {
        updateNamePackHandler(cardPackId)
        setIsEdit(false)

    }

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
        setCurrentName(e.currentTarget.value);
    };

    return (
        <div>
            <div className={stylePacks.container}>
                <div className={stylePacks.backToPackList}>
                    <BackToPackList/>
                </div>
                <div className={stylePacks.packsHeader}>
                    <div className={stylePacks.packsHeaderIcon}>
                        {isEdit ? <div><input onChange={onNameChange}
                                              value={currentName}
                                              autoFocus={true}
                                              ref={inputEl}
                                              className={stylePacks.input}
                                              onKeyPress={onKeyPressHandler}/>
                                <button onClick={onClickHandler} className={stylePacks.button}>save</button>
                            </div> :
                            <h1>{currentName}</h1>}
                        <BasicPopover isEdit={isEdit} setIsEdit={onEditChange} cardPackId={cardPackId}/>
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
                            margin: '7px 10px 0px 0px',
                        }}
                        onClick={addNewCardHandler}
                    >
                        Add new card
                    </Button>
                </div>
                <div>
                    <div>Search</div>
                    <div>
                        <input className={s.input} placeholder={'Provide your text'}/>
                    </div>
                </div>
                <Box sx={{height: 400, width: '100%'}}>
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
                <AddNewCardModel isAddCard={isAddCard} setIsAddCard={setIsAddCard}/>
            )}
        </div>
    );
};
