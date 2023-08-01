import { useState } from 'react';
import PropTypes from 'prop-types';
import { statusFilters } from '../../refs/constants';
import css from './Filter.module.css';

const Filter = ({ value = 'Show all', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(value);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        onChange(item);
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div>
            <button
                id="filter-button"
                aria-controls={isOpen ? 'filter-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={handleClick}
                className={css.filter_but}
            >
                <span>{value}</span>
            </button>

            {isOpen && (
                <ul id="filter-menu" className={css.filter_menu} aria-labelledby="filter-button">
                    {statusFilters.map((item) => (
                        <li
                            key={item}
                            className={`${css.filter_menu_item} ${item === selectedItem ? css.selected : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default Filter;
