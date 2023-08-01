import PropTypes from 'prop-types';
import css from './TweetsItem.module.css'
import logo from '../../img/logo.svg'
import bubbles from '../../img/img-1.png'

const TweetsItem = ({ user, onClick, isLoading }) => {
    const { id, user: name, followers, avatar, tweets, isFollow = false } = user;

    return (
        <li className={css.userCard} key={id}>
            <img src={logo} className={css.logo} alt='GoIT Logo' />
            <img src={bubbles} className={css.bubbles} width="308" height="168" alt="speech-bubbles"></img>
            <div className={css.round}>
                <div className={css.line}></div>
                <img className={css.avatar} src={avatar} alt={name} width="76" />
            </div>

            <p className={css.tweets}>{tweets.toLocaleString('en-US')} tweets</p>
            <p className={css.followers}>{followers.toLocaleString('en-US')} followers</p>

            {
                isFollow ? (
                    <button type="button" onClick={() => onClick(id)} className={css.buttonFollowing} data-follow={isFollow} disabled={isLoading}>
                        Following
                    </button>
                ) : (
                    <button type="button" onClick={() => onClick(id)} className={css.followBtn} data-follow={isFollow} disabled={isLoading}>
                        Follow
                    </button>
                )
            }
        </li >
    );
};

TweetsItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        followers: PropTypes.number.isRequired,
        tweets: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        isFollow: PropTypes.bool,
    }).isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default TweetsItem;
