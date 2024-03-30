import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx';

/* 
default Button
Inverted Button
Google Sign-in
*/

const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google:"google",
    inverted: 'inverted'
}

const getButton = (className = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[className]
);

const Button = ({buttonText, buttonType, className, ...otherProps}) => {
    console.log("className", className);
    const CustomButton = className ? getButton(className) : getButton();
    console.log("button", CustomButton);
    return (<CustomButton type={buttonType} {...otherProps}>{buttonText}</CustomButton>);
}

export default Button;