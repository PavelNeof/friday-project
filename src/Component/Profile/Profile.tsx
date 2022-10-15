import {ChangeEvent, useEffect, useState} from "react";
import React from "react";
import { useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStateType, useAppDispatch} from "../../store/store";
import {updateName} from "../../store/auth-reducer";


export const Profile = () => {
    const isLoggedIn = useSelector<AppStateType ,boolean>((state)=>state.auth.isLoggedIn)
    const name = useSelector<AppStateType ,string>(state => state.auth.data.name)
    const email = useSelector<AppStateType ,string>(state => state.auth.data.email)

    const dispatch = useAppDispatch()


    // useEffect(() => {
    //     if ( !isLoggedIn) {
    //         return;
    //     }
    //     const thunk = fetchTodolistsTC()
    //     dispatch(thunk)
    // }, [])


    let [editMode, setEditMode] = useState(false)
    let [currentName, setCurrentName] = useState(name)

    // useEffect(()=>{
    //     setCurrentName(currentName)
    // },[currentName])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateName(currentName))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentName(e.currentTarget.value)
    }


    // if(!isLoggedIn){
    //     return <Navigate to={'/login'}/>
    // }

    return <>
        avatar
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>name:{currentName || email || '---'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onChange={onStatusChange} onBlur={deactivateEditMode}
                           value={name}/>
                </div>}

        </div>
        <button>LogOut</button>
    </>


}