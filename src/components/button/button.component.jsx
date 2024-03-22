import './button.styles.scss';

/* 
default Button
Inverted Button
Google Sign-in
*/

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',
    inverted: 'inverted'
}

const Button = ({buttonText, buttonType, className, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[className]}`} type={buttonType}>{buttonText}</button>
    )
}

export default Button;