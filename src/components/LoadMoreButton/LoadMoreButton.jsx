import PropTypes from 'prop-types';
import css from './LoadMoreButton.module.css'

const LoadMoreButton = ({ onClick, loading }) => {
    return (
        <button
            disabled={loading}
            className={css.loadMore}
            onClick={onClick}
        >
            {loading ? 'Loading...' : 'Load more'}
        </button>
    );
};

LoadMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

LoadMoreButton.defaultProps = {
    loading: false,
}
export default LoadMoreButton;
