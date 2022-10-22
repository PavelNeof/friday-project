import React, { useEffect } from 'react';
import { getPacksTC } from './Packs-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

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
        { field: '', headerName: 'Actions', width: 150 },
        // { field: 'firstName', headerName: 'First name', width: 130 },
        // { field: 'lastName', headerName: 'Last name', width: 130 },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params: GridValueGetterParams) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    return (
        <div>
            packs
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row: any) => row._id}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </div>
    );
}
