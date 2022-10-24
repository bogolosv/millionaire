import {FC, useEffect, useState} from "react";
import classes from './styles/game.module.scss'
import {Menu} from "../../components/Menu";
import {getDatabase, onValue, ref} from "firebase/database";
import {storageManager} from "../../tools/localStorage";
import {storageKeys} from "../../tools/const";
import {GameConfigType, QuestionType} from "../../components/Menu/types";
import {getRandomNumber} from "../../tools/getRandomNumber";
import {useLoadingProvider} from "../../providers/LoadingProvider/LoadingProvider";
import {shuffleArray} from "../../tools/shuffleArray";
import {GameOption} from "./GameOption";

export const Game: FC = () => {
    const [question, setQuestion] = useState<QuestionType>();
    const [isAnswered, setIsAnswered] = useState(false);
    const { setIsLoading } = useLoadingProvider();

    useEffect(() => {
        const db = getDatabase();
        const gamesRef = ref(db, 'games/' + storageManager.getItem(storageKeys.currentGameId));
        setIsLoading(true);
        onValue(gamesRef, snapshot => {
            const data: GameConfigType = snapshot.val();
            const questionsRef = ref(db, 'levels/' + (data.currentLevelId < 0 ? 0 : data.currentLevelId) + '/questions');
            onValue(questionsRef, snapshot => {
                const data: QuestionType[] = snapshot.val();
                const randomQuestionId = getRandomNumber(0, data?.length);
                const randomQuestion = {...data[randomQuestionId], answers: shuffleArray(data[randomQuestionId]?.answers)}
                setQuestion(randomQuestion);
                setIsLoading(false);
            });
        });

    }, []);
    return (
        <div className={classes.gameContainer}>
            <main className={classes.game}>
                {!!question && (
                    <>
                        <div className={classes.question}>
                            <h1>
                                {question.question}
                            </h1>
                        </div>
                        <div className={classes.answers}>
                            {question.answers.map((answer, index) => (
                                <GameOption
                                    key={answer.answer}
                                    answer={answer}
                                    index={index}
                                    isAnswered={isAnswered}
                                    setIsAnswered={setIsAnswered}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
            <Menu/>
        </div>
    );
};