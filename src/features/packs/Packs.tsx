import React, { useEffect } from 'react';
import {
    addNewPackTC,
    CardPacksType,
    changePageAC,
    changePageCountAC,
    deletePackTC,
    getPacksTC,
    updateNamePackTC,
} from './Packs-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton } from '@mui/material';
import s from './Packs.module.css';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';
import { Delete } from '@mui/icons-material';
import { Search } from './Search/Search';
import { MyPacksToggle } from './MyPacksToggle/MyPacksToggle';
import { Slider } from './Slider/Slider';
import { Reset } from './Reset/Reset';

export const Packs = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const packs = useAppSelector(state => state.packs.cardPacks);
    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const userId = useAppSelector(state => state.auth.data._id);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.packs.pageCount);
    const page = useAppSelector(state => state.packs.page);
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks);

    useEffect(() => {
        dispatch(getPacksTC());
    }, [page, pageCount, isMyPacks]);

    const onPageChangeHandle = (page: number) => {
        dispatch(changePageAC(page + 1));
    };
    const onPageSizeChangeHandle = (pageSize: number) => {
        dispatch(changePageCountAC(pageSize));
    };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} />;
    }

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
        { field: 'cardsCount', headerName: 'Cards', width: 150 },
        { field: 'updated', headerName: 'Last updated', width: 150 },
        { field: 'user_name', headerName: 'Created by', width: 150 },
        {
            field: '',
            headerName: 'Actions',
            width: 150,
            renderCell: params => {
                return (
                    <div>
                        <IconButton disabled={status === 'loading'}>
                            <SchoolIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => updateNamePackHandler(params.row._id)}
                            disabled={status === 'loading'}
                        >
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => deletePackHandler(params.row._id)}
                            disabled={status === 'loading'}
                        >
                            <Delete />
                        </IconButton>
                    </div>
                );
            },
        },
    ];

    const addPackHandler = () => {
        dispatch(addNewPackTC('Pack name'));
    };
    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id));
    };
    const updateNamePackHandler = (id: string) => {
        dispatch(updateNamePackTC(id, 'New name'));
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
                <Search />
                <MyPacksToggle />
                <Slider />
                <Reset />
            </div>

            <Box sx={{ height: 400, width: '100%' }}>
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
        </div>
    );
};
