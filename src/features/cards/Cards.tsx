import React, { useEffect } from 'react';
import stylePacks from '../packs/Packs.module.css';
import s from './Cards.module.css';
import { BackToPackList } from '../../common/components/BackToPackList';
import { Box, Button } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPacksTC } from '../packs/Packs-reducer';
import { getCardsTC } from './Cards-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';

export function Cards() {
    const dispatch = useAppDispatch();
    let { cardPackId } = useParams();
    //const data = useAppSelector(state => state.cards);

    let id = '63543eb13bdc0a000471f332';

    useEffect(() => {
        //dispatch(getCardsTC(cardPackId ?? ''));
        dispatch(getCardsTC(id));
    }, []);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'name', width: 150 },
        { field: 'cardsCount', headerName: 'Cards', width: 150 },
        { field: 'updated', headerName: 'Last updated', width: 150 },
        { field: 'user_name', headerName: 'Created by', width: 150 },
        {
            field: '',
            headerName: 'Actions',
            width: 150,
            renderCell: params => {
                console.log({ params });
                return (
                    <div>
                        <SchoolIcon /> <BorderColorIcon /> <DeleteIcon />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className={stylePacks.container}>
                <BackToPackList />
                <div className={stylePacks.packsHeader}>
                    <h1>Friend's Pack</h1>
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
                    {/*<DataGrid*/}
                    {/*    getRowId={(row: any) => row._id}*/}
                    {/*    rows={data}*/}
                    {/*    columns={columns}*/}
                    {/*    pageSize={5}*/}
                    {/*    rowsPerPageOptions={[5]}*/}
                    {/*    onRowClick={params => console.log(params.row.name)}*/}
                    {/*/>*/}
                </Box>
            </div>
        </div>
    );
}
