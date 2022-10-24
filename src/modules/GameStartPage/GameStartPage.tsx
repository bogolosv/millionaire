import {FC} from "react";
import classes from './styles/index.module.scss';
import {GameStartPageSVG} from "./GameStartPageSVG";
import { getDatabase, ref, set} from "firebase/database";
import {storageManager} from "../../tools/localStorage";
import {useStatusOfGame} from "../../providers/StatusOfGame/StatusOfGame";
import {storageKeys} from "../../tools/const";
import {useLoadingProvider} from "../../providers/LoadingProvider/LoadingProvider";
import {GameStartPageStart} from "./GameStartPageStart";
import {GameStartPageFinish} from "./GameStartPageFinish";

export const GameStartPage: FC = () => {
    const { setStatus, status } = useStatusOfGame();
    const { isLoading, setIsLoading } = useLoadingProvider();

    const startHandler = () => {
        const db = getDatabase();
        const id = new Date();
        setIsLoading(true);
        set(ref(db, 'games/' + Date.parse(id.toString())), {
            id,
            currentLevelId: 11,
            present: 0,
        }).then(() => {
            storageManager.setItem(storageKeys.currentGameId, Date.parse(id.toString()));
            setStatus('gameInProgress');
            setIsLoading(false)
        });
    }

    return (
        <div className={classes.container}>
            <svg className={classes.background} viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1440 0V900H0L1440 0Z"/>
            </svg>
            <main className={classes.main}>
                <div className={classes.image}>
                    <GameStartPageSVG/>
                </div>
                <div className={classes.startGameContainer}>
                    {status === 'beforeStart' && (
                        <GameStartPageStart startHandler={startHandler} isLoading={isLoading}/>
                    )}
                    {status === 'finish' && (
                        <GameStartPageFinish startHandler={startHandler} setIsLoading={setIsLoading} isLoading={isLoading}/>
                    )}
                </div>
            </main>
        </div>
    );
};