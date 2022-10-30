import React, {useEffect, useState} from 'react';
import {
    CardPacksType,
    changePageAC,
    changePageCountAC,
    getPacksTC,
} from './Packs-reducer';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, Button} from '@mui/material';
import s from './Packs.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../../common/routing/Route/Route';
import {Search} from './Search/Search';
import {MyPacksToggle} from './MyPacksToggle/MyPacksToggle';
import {Slider} from './Slider/Slider';
import {Reset} from './Reset/Reset';
import useDebounce from '../../common/hooks/useDebounce';
import {AddNewPackModal} from "../modal/AddNewPackModal";
import {RenderCellComponent} from "../modal/RenderCellComponent";

export const Packs = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const packs = useAppSelector(state => state.packs.cardPacks);
    // const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userId = useAppSelector(state => state.auth.data._id);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.packs.pageCount);
    const page = useAppSelector(state => state.packs.page);
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);
    const search = useAppSelector(state => state.packs.search);
    const min = useAppSelector(state => state.packs.min);
    const max = useAppSelector(state => state.packs.max);


    const debouncedSearch = useDebounce<string>(search, 1000);

    const [isAddPack, setIsAddPack] = useState(false)

    useEffect(() => {
        dispatch(getPacksTC());
    }, [page, pageCount, isMyPacks, debouncedSearch, min, max]);

    const onPageChangeHandle = (page: number) => {
        dispatch(changePageAC(page + 1));
    };
    const onPageSizeChangeHandle = (pageSize: number) => {
        dispatch(changePageCountAC(pageSize));
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'name',
            width: 150,
            renderCell: params => {
                let link;
                if (params.row.user_id === userId) {
                    link = PATH.MY_CARDS;
                    if (params.row.cardsCount === 0) {
                        link = PATH.ADD_NEW_CARD;
                    }
                } else {
                    link = PATH.CARDS;
                }
                return (
                    <div>
                        <NavLink to={`${link}/${params.id}`}>{params.row.name}</NavLink>
                    </div>
                );
            },
        },
        {field: 'cardsCount', headerName: 'Cards', width: 150},
        {field: 'updated', headerName: 'Last updated', width: 150},
        {field: 'user_name', headerName: 'Created by', width: 150},
        {
            field: '',
            headerName: 'Actions',
            width: 150,
            renderCell: params => {
                return <RenderCellComponent id={params.row._id} name={params.row.name}/>;
            },
        },
    ];

    const addPackHandler = () => {
        setIsAddPack(true)
    };

    if (!isLoggedIn) {
        navigate(`${PATH.LOGIN}`);
    }

    return (
        <div className={s.container}>
            <div className={s.packsHeader}>
                <h1>Packs list</h1>
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
                    onClick={addPackHandler}
                >
                    Add new pack
                </Button>
            </div>

            <div className={s.rowAboveTable}>
                <Search/>
                <MyPacksToggle/>
                <Slider/>
                <Reset/>
            </div>

            <Box sx={{height: 400, width: '100%'}}>
                <DataGrid
                    getRowId={(row: CardPacksType) => row._id}
                    rows={packs}
                    columns={columns}
                    paginationMode={'server'}
                    page={page - 1} // текущая страница
                    pageSize={pageCount} // кол-во колод на странице
                    rowsPerPageOptions={[5, 10, 15]} // варианты кол-ва колод на странице
                    rowCount={cardPacksTotalCount} // сколько всего колод
                    onPageChange={onPageChangeHandle} // переход на страницу
                    onPageSizeChange={onPageSizeChangeHandle} // изменение кол-ва колод на странице
                />
            </Box>
            {isAddPack && <AddNewPackModal isAddPack={isAddPack} setIsAddPack={setIsAddPack}/>}
        </div>
    );
};