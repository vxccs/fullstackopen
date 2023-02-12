import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const style = { marginBottom: 10 };

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value.toLowerCase().trim()));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
