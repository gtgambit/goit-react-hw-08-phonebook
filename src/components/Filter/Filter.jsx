import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { filterContact } from 'redux/Filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.filterContact);

  return (
    <div className={css.inputContainer}>
      <label className={css.label}>
        Search:
        <input
          type="text"
          name="filter"
          value={value}
          onChange={event => {
            dispatch(filterContact(event.target.value));
          }}
          className={css.input}
          placeholder=" "
        />
      </label>
    </div>
  );
};
export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
