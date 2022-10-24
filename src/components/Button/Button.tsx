import React, {FC} from "react";
import classes from './styles/button.module.scss'
import classNames from "classnames";

type ButtonType = {
    children: React.ReactNode;
    onClick: () => void;
    isLoading?: boolean;
}

export const Button: FC<ButtonType> = (
    {
        children,
        onClick,
        isLoading
    }
) => {
    const buttonClasses = classNames({
        [classes.button]: true,
        [classes.button_loading]: isLoading,
    })

    const buttonHandler = () => {
        if(!isLoading){
            onClick();
        }
    }

    return (
        <button className={buttonClasses} onClick={buttonHandler}>
            {children}
        </button>
    );
};