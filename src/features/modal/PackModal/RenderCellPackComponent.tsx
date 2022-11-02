import React, { useState } from 'react';
import { EditPackModal } from './EditPackModal';
import { IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Delete } from '@mui/icons-material';
import { DeletePackModal } from './DeletePackModal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../common/routing/Route/Route';
import { getCardsTC } from '../../cards/cards-reducer';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

type RenderCellComponentType = {
    id: string;
    name: string;
};

export const RenderCellPackComponent = (props: RenderCellComponentType) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status);

    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const learnPackHandler = () => {
        dispatch(getCardsTC(props.id));
        navigate(`${PATH.LEARN}/:${props.id}`);
    };

    return (
        <div>
            {isEdit && (
                <EditPackModal
                    id={props.id}
                    name={props.name}
                    setIsEdit={setIsEdit}
                    isEdit={isEdit}
                />
            )}
            {isDelete && (
                <DeletePackModal
                    id={props.id}
                    name={props.name}
                    setIsDelete={setIsDelete}
                    isDelete={isDelete}
                />
            )}
            <IconButton onClick={learnPackHandler} disabled={status === 'loading'}>
                <SchoolIcon />
            </IconButton>
            <IconButton onClick={() => setIsEdit(true)} disabled={status === 'loading'}>
                <BorderColorIcon />
            </IconButton>
            <IconButton onClick={() => setIsDelete(true)} disabled={status === 'loading'}>
                <Delete />
            </IconButton>
        </div>
    );
};
