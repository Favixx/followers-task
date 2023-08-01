import PropTypes from 'prop-types';
import TweetsItem from '../TweetsItem/TweetsItem';
import css from './TweetsList.module.css'

const TweetsList = ({ users, onClick, isLoading }) => {
    return (
        <ul className={css.tweetslist}>
            {users.map(user => {
                return <TweetsItem key={user.id} user={user} onClick={onClick} isLoading={isLoading} />;
            })}
        </ul>
    );
};

TweetsList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default TweetsList;
