import React, { useEffect } from 'react';
import { getPacksTC } from './Packs-reducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Slider, TableSortLabel } from '@mui/material';
import s from './Packs.module.css';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from 'react-router-dom';
import { PATH } from '../../common/routing/Route/Route';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function Packs() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
    function valuetext(value: number) {
        return `${value}`;
    }
    const [value, setValue] = React.useState<number[]>([0, 100]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

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

            <div className={s.rowAboveTable}>
                <div>
                    <div>Search</div>
                    <div>
                        <input className={s.input} placeholder={'Provide your text'} />
                    </div>
                </div>
                <div>
                    <div>Show packs cards</div>
                    <div>
                        <Button
                            style={{
                                boxSizing: 'border-box',
                                background: '#FFFFFF',
                                border: '1px solid #D9D9D9',
                                borderRadius: '2px',
                            }}
                        >
                            My
                        </Button>
                        <Button
                            style={{
                                boxSizing: 'border-box',
                                background: '#366EFF',
                                color: 'white',
                                border: '1px solid #D9D9D9',
                                borderRadius: '0px 2px 2px 0px',
                            }}
                        >
                            All
                        </Button>
                    </div>
                </div>
                <div>
                    <div>Number of cards</div>
                    <div className={s.slider}>
                        <div className={s.number}> 1 </div>
                        <Box sx={{ width: 200, padding: '0 10px' }}>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            />
                        </Box>
                        <div className={s.number}> 10 </div>
                    </div>
                </div>

                <div className={s.filter}>
                    <div className={s.filterBox}>
                        <FilterAltIcon />
                    </div>
                </div>
            </div>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row: any) => row._id}
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={params => navigate(`${PATH.CARDS}/${params.id}`)}
                />
            </Box>
        </div>
    );
}