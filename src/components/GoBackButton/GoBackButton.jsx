import { useLocation, Link } from 'react-router-dom';
import css from './GoBackButton.module.css'
export const GoBackButton = () => {
    const location = useLocation();

    const backLink = location.state?.from ?? '/';

    return (
        <Link to={backLink} aria-label="Go back to previous page" className={css.gobackbut}>
            Go Back
        </Link>
    );
};