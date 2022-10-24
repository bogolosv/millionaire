import React, {createContext, FC, useContext, useState} from "react";
import classes from './styles/loading.module.scss'

type LoadingProviderType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// @ts-ignore
const Loading = createContext<LoadingProviderType>(undefined);

export const useLoadingProvider = () => {
    return useContext(Loading)
}

export const LoadingProvider: FC<{children: React.ReactNode}> = (
    {
        children
    }
) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            {isLoading && (
                <div className={classes.loadingContainer}>
                    <span className={classes.loading}/>
                </div>
            )}
            <Loading.Provider value={{
                isLoading,
                setIsLoading
            }}>
                {children}
            </Loading.Provider>
        </>
    );
};