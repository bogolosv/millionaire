import React, {FC, useEffect, useState} from "react";
import classes from "./styles/index.module.scss";
import {Button} from "../../components/Button";
import {getDatabase, onValue, ref} from "firebase/database";
import {storageManager} from "../../tools/localStorage";
import {storageKeys} from "../../tools/const";
import {getFormattedCurrency} from "../../tools/currencyTools";

type GameStartPageFinishType = {
    startHandler: () => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean
}

export const GameStartPageFinish: FC<GameStartPageFinishType> = (
    {
        startHandler,
        setIsLoading,
        isLoading,
    }
) => {
    const [currentGameId] = useState(storageManager.getItem(storageKeys.currentGameId));
    const [result, setResult] = useState('');
    useEffect(() => {
        setIsLoading(true);
        const db = getDatabase();
        const gameRef = ref(db, 'games/' + currentGameId + '/present');
        onValue(gameRef, (snapshot) => {
            storageManager.removeItem(storageKeys.currentGameId)
            const present = snapshot?.val();
            setResult(getFormattedCurrency(present));
            setIsLoading(false);
        });

    }, []);

    return (
        <>
            <h2 className={classes.h2}>Total score:</h2>
            <h1 className={classes.h1}>{result}</h1>
            <Button onClick={startHandler} isLoading={isLoading}>
                Try again
            </Button>
        </>
    );
};