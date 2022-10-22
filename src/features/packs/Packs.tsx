import React, { useEffect } from 'react';
import { getPacksTC } from './Packs-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TableSortLabel } from '@mui/material';
import s from './Packs.module.css';
import SchoolIcon from '@mui/icons-material/School';
import TableCell from '@mui/material/TableCell';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';

export function Packs() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.packs.data);

    console.log(data);

    useEffect(() => {
        dispatch(getPacksTC());
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
                >
                    <NavLink
                        to={PATH.ADD_NEW_PACK}
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                    >
                        Add new pack
                    </NavLink>
                </Button>
            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row: any) => row._id}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={params => console.log(params.row.name)}
                />
            </Box>
        </div>
    );
}
