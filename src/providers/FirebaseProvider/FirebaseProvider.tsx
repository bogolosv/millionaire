import React, {createContext, FC} from "react";
import {db} from "../../firebase.config";

const Firebase = createContext({db});

export const FirebaseProvider: FC<{children: React.ReactNode}> = (
    {
        children
    }
) => {
    return (
        <Firebase.Provider value={{
            db
        }}>
            {children}
        </Firebase.Provider>
    );
};