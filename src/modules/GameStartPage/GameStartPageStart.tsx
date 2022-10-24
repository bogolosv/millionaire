import {FC} from "react";
import classes from "./styles/index.module.scss";
import {Button} from "../../components/Button";

type GameStartPageStartType = {
    startHandler: () => void;
    isLoading: boolean;
}

export const GameStartPageStart: FC<GameStartPageStartType> = (
    {
        startHandler,
        isLoading
    }
) => {
    return (
        <>
            <h1 className={classes.h1}>Who wants to be a millionaire?</h1>
            <Button onClick={startHandler} isLoading={isLoading}>
                Start
            </Button>
        </>
    );
};