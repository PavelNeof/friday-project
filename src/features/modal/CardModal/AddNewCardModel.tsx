import BasicModal from "../BasicModal/BasicModal";
import s from "../BasicModal/BasicModal.module.css";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../app/store";
import {addNewCardTC} from "../../cards/cards-reducer";
import {ChangeEvent, useState} from "react";
import {Button} from "@mui/material";


export const AddNewCardModel = (props: any) => {
    const dispatch = useAppDispatch();

    let [question, setQuestion] = useState('');
    let [answer, setAnswer] = useState('');

    let {cardPackId} = useParams();

    const addNewCardHandler = () => {
        dispatch(addNewCardTC(cardPackId));
        props.setIsAddCard(false)
    };


    const questionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
        console.log(question)
    }

    const answerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
        console.log(answer)
    }

    return (
        <BasicModal isOpen={props.isAddCard} setIsOpen={props.setIsAddCard}>
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
                        }} onClick={addNewCardHandler}>add card</Button>
                </div>
            </div>
        </BasicModal>
    )
}