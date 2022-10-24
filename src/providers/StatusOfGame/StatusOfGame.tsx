import React, {createContext, FC, useContext, useState} from "react";
import {storageManager} from "../../tools/localStorage";
import {storageKeys} from "../../tools/const";

type StatusTypes = 'beforeStart' | 'gameInProgress' | 'finish';
type StatusProviderType = {
    status: StatusTypes;
    setStatus: React.Dispatch<React.SetStateAction<StatusTypes>>
}

// @ts-ignore
const Status = createContext<StatusProviderType>(undefined);

export const useStatusOfGame = () => {
    return useContext(Status)
}

export const StatusOfGame: FC<{children: React.ReactNode}> = (
    {
        children
    }
) => {
    const initialStatus: StatusTypes = !!storageManager.getItem(storageKeys.currentGameId) ? 'gameInProgress' : "beforeStart";
    const [status, setStatus] = useState<StatusTypes>(initialStatus);
    return (
        <Status.Provider value={{
            status,
            setStatus
        }}>
            {children}
        </Status.Provider>
    );
};