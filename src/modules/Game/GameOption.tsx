import React, {FC, useState} from "react";
import {AnswerType} from "../../components/Menu/types";
import classes from "./styles/game.module.scss";
import {OptionButton} from "../../components/OptionButton";
import {useStatusOfGame} from "../../providers/StatusOfGame/StatusOfGame";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {storageManager} from "../../tools/localStorage";
import {storageKeys} from "../../tools/const";
import {useLoadingProvider} from "../../providers/LoadingProvider/LoadingProvider";

type GameOptionType = {
    answer: AnswerType;
    index: number;
    setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
    isAnswered: boolean;
}

export const GameOption: FC<GameOptionType> = (
    {
        answer,
        index,
        setIsAnswered,
        isAnswered,
    }
) => {
    const [isWrong, setIsWrong] = useState(false);
    const { setStatus } = useStatusOfGame();
    const { setIsLoading } = useLoadingProvider();
    const db = getDatabase();

    const writeToDB = () => {
        let currentLevelId = storageManager.getItem<number>(storageKeys.currentLevelId) ?? 12;

        const levelRef = ref(db, 'levels/' + (currentLevelId) + '/price');
        onValue(levelRef, async (snapshot) => {
            const price = snapshot.val();
            if(answer.isAnswer){
                currentLevelId = currentLevelId - 1;
            }
            setIsAnswered(false);
            if(answer.isAnswer){
                await set(ref(db, 'games/' + storageManager.getItem(storageKeys.currentGameId)), {
                    currentLevelId,
                    present: price,
                });
            }
            if(answer.isAnswer && currentLevelId >= 0){
                storageManager.setItem(storageKeys.currentLevelId, currentLevelId);
            }
            else {
                setStatus('finish');
            }
            setIsLoading(false);
        });
    }

    const handleClick = () => {
        setIsLoading(true);
        if(!isAnswered){
            if(!answer.isAnswer){
                setIsWrong(true);
            }
            setTimeout(writeToDB, 1000);
            setIsAnswered(true);
        }
    }
    return (
        <div className={classes.answer}>
            <OptionButton
                option={String.fromCharCode(index + 65)}
                onClick={handleClick}
                isCorrect={isAnswered && answer.isAnswer}
                isWrong={isWrong}
            >
                {answer.answer}
            </OptionButton>
        </div>
    );
};