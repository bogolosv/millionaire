import React, {FC, useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {GameConfigType, MenuItemType} from "./types";
import {OptionButton} from "../OptionButton";
import {getFormattedCurrency} from "../../tools/currencyTools";
import {storageManager} from "../../tools/localStorage";
import {storageKeys} from "../../tools/const";

type MenuItemsType = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuItems: FC<MenuItemsType> = (
    {
        setIsLoading,
    }
) => {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [currentItemId, setCurrentItemId] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const db = getDatabase();
        const levelsRef = ref(db, 'levels');
        const gamesRef = ref(db, 'games/' + storageManager.getItem(storageKeys.currentGameId));
        onValue(levelsRef, (snapshot) => {
            const data = snapshot.val();
            setMenuItems(data);
            // setIsLoading(false);
            onValue(gamesRef, (snapshot) => {
                const data: GameConfigType = snapshot.val();
                setCurrentItemId(data.currentLevelId);
                storageManager.setItem(storageKeys.currentLevelId, data.currentLevelId)
                setIsLoading(false);
            });
        });

    }, []);
    return (
        <>
            {menuItems.map((item, index) => {
                return (
                    <OptionButton key={`key${index}`} center size='small' isActive={index === currentItemId} disabled={index > currentItemId}>
                        {getFormattedCurrency(item.price)}
                    </OptionButton>
                );
            })}
        </>
    );
};