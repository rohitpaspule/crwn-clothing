import './button.styles.scss'
// we have inverted , default, and google sign up buttons
const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
const Button = ({ children, buttonType, ...buttonProps }) => {
    return (<>
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...buttonProps}>
            {children}
        </button>
    </>)
}
export default Button