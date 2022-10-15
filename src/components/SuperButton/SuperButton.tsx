import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean;
    isError?: boolean;
    isDisabled?: boolean;
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
    red,
    className,
    isError,
    isDisabled,
    ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
    // const finalClassName = `${red ? s.floatingButton : s.default} ${className}`

    const buttonClasses = isError ? s.errorButton : s.button5;

    return (
        <button
            disabled={isDisabled}
            className={buttonClasses}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    );
};

export default SuperButton;
