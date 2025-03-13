import { Field } from 'formik';
import style from '../Form/Form.module.css';

const FilterTodos = ({ setFilter, setFieldValue }) => {
  return (
    <>
      <Field
        className={style.input}
        type="text"
        placeholder="What do you want to find?"
        autoFocus
        name="search"
        onChange={e => {
          setFieldValue('search', e.target.value);
          setFilter(e.target.value);
        }}
      />
      <p className={style.searchMode}>Search mode is active...</p>
    </>
  );
};

export default FilterTodos;
