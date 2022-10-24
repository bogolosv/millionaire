import React, {FC, useState} from "react";
import classes from './styles/menu.module.scss';
import {MenuPlaceholder} from "./MenuPlaceholder";
import {MenuItems} from "./MenuItems";
import {MenuBurgerSVG} from "./MenuBurgerSVG";
import {MenuCloseSVG} from "./MenuCloseSVG";
import classNames from "classnames";

export const Menu: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const menuContainerClasses = classNames({
        [classes.menuContainer]: true,
        [classes.menuContainer_opened]: menuIsOpen,
    })

    const burgerClick = () => {
        setMenuIsOpen(true);
    }
    const closeClick = () => {
        setMenuIsOpen(false);
    }

    return (
        <>
            <div className={classes.burger} onClick={burgerClick}>
                <MenuBurgerSVG/>
            </div>
            <div className={menuContainerClasses}>
                <div className={classes.close} onClick={closeClick}>
                    <MenuCloseSVG/>
                </div>
                <div className={classes.menu}>
                    {isLoading ? (
                        <MenuPlaceholder/>
                    ) : (
                        <MenuItems setIsLoading={setIsLoading}/>
                    )}
                </div>
            </div>
        </>
    );
};