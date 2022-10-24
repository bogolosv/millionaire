import React, {FC} from "react";
import classes from './styles/optionButton.module.scss';
import classNames from "classnames";

type OptionButtonType = {
    children?: React.ReactNode;
    option?: string;
    selected?: boolean;
    isCorrect?: boolean;
    isWrong?: boolean;
    onClick?: () => void;
    center?: boolean;
    disabled?: boolean;
    isActive?: boolean;
    size?: "small" | "big";
    isLoading?: boolean;
}

export const OptionButton: FC<OptionButtonType> = (
    {
        children,
        option,
        selected,
        isCorrect,
        isWrong,
        onClick,
        center,
        disabled,
        isActive,
        size= "big",
        isLoading
    }
) => {
    const optionButtonContainerClasses = classNames({
        [classes.optionButtonContainer]: true,
        [classes.optionButtonContainer_small]: size === 'small',
    });
    const optionButtonClasses = classNames({
        [classes.optionButton]: true,
        [classes.optionButton_pointer]: !!onClick,
        [classes.optionButton_selected]: selected,
        [classes.optionButton_correct]: isCorrect,
        [classes.optionButton_wrong]: isWrong,
        [classes.optionButton_active]: isActive,
        [classes.optionButton_loading]: isLoading,
    });
    const optionButtonTextClasses = classNames({
        [classes.buttonText]: true,
        [classes.buttonText_pointer]: !!onClick,
        [classes.buttonText_center]: center,
        [classes.buttonText_disabled]: disabled,
        [classes.buttonText_active]: isActive,
    });

    return (
        <div className={optionButtonContainerClasses}>
            <div className={optionButtonTextClasses} onClick={onClick}>
                {option && (
                    <span className={classes.buttonText_option}>
                        {option}
                    </span>
                )}
                <span>{children}</span>
            </div>
            <svg onClick={onClick} className={classes.optionButtonSVG} width="100%" height="100%" viewBox="0 0 413 72" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <g className={optionButtonClasses}>
                    {isLoading && (
                        <defs>
                            <linearGradient id="myGradient" x1="0%" y1="50%" x2="100%" y2="50%" >
                                <stop offset="8%" stopColor="#ececec">
                                    <animate attributeName="stop-color" values="#ececec; #fff; #ececec" dur="4s" repeatCount="indefinite"/>
                                </stop>
                                <stop offset="18%" stopColor="#f5f5f5">
                                    <animate attributeName="stop-color" values="#ececec; #fff; #ececec" dur="4s" repeatCount="indefinite"/>
                                </stop>
                                <stop offset="33%" stopColor="#ececec">
                                    <animate attributeName="stop-color" values="#ececec; #fff; #ececec" dur="4s" repeatCount="indefinite"/>
                                </stop>
                            </linearGradient>
                        </defs>
                    )}
                    <path fill={isLoading ? "url(#myGradient)" : undefined} d="M 42.7172 5.2834 C 44.8781 2.2802 48.3521 0.5 52.052 0.5 H 360.948 C 364.648 0.5 368.122 2.2802 370.283 5.2834 L 392.384 36 H 412.384 H 392.384 L 370.283 66.7166 C 368.122 69.7198 364.648 71.5 360.948 71.5 H 52.052 C 48.3521 71.5 44.8781 69.7198 42.7172 66.7166 L 20 36 H 0 H 20 L 42.7172 5.2834 Z"/>
                </g>
            </svg>
        </div>
    );
};