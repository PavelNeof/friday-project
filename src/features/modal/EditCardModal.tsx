import BasicModal from "./BasicModal/BasicModal";
import s from "./BasicModal/BasicModal.module.css";
import {Button} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {updateCardTC} from "../cards/cards-reducer";
import {useAppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";


export const EditCardModal = (props: any) => {
    const dispatch = useAppDispatch();

    let [question, setQuestion] = useState(props.name);
    let [answer, setAnswer] = useState('');

    const questionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
        console.log(question)
    }

    const answerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
        console.log(answer)
    }

    const updateCardHandler = (cardId: string) => {
        dispatch(updateCardTC(cardId, question));
        props.setIsEdit(false)
    };

    return (
        <BasicModal isOpen={props.isEdit} setIsOpen={props.setIsEdit}>
            <div className={s.modalContainer}>
                <div className={s.text}>Add new card</div>

                <div>Question
                    <div>
                        <input onChange={questionChange}
                               value={question}
                               placeholder={'question'}
                               className={s.input}/>
                    </div>
                </div>
                <div>Answer
                    <div>
                        <input onChange={answerChange}
                               value={answer}
                               placeholder={'question'}
                               className={s.input}/>
                    </div>
                </div>
                <div className={s.button}>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#366EFF',
                            borderRadius: '30px',
                            height: '40px',
                            boxShadow:
                                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
                            fontSize: '16px',
                            textTransform: 'capitalize',
                            width: '60%',
                        }} onClick={()=>updateCardHandler(props.id)}>update card</Button>
                </div>
            </div>
        </BasicModal>
    )
}

