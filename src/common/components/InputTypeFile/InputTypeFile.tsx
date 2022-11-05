import React, { ChangeEvent } from 'react';
import {updateAvatar} from "../../../features/auth/auth-reducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const InputTypeFile = (props:any) => {
    // const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            console.log('file: ', file)

            if (file.size < 1000000) {
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
                const reader = new FileReader();

                reader.onloadend = () => {
                    const file64 = reader.result as string
                    props.save(file64)
                }
                // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
                reader.readAsDataURL(file)


            } else {
                console.error('Error: ', 'Файл слишком большого размера')

            }

        }
    }

    return (
        <label>
            <input type="file"
                   onChange={uploadHandler}
                   style={{display: 'none'}}
                   accept="image/*"
            />
            {props.children}
        </label>
    )
}
