import { FiSearch } from 'react-icons/fi';
import FilterTodos from '../FilterTodos/FilterTodos';
import { useState } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import style from './Form.module.css';

const validationSchema = Yup.object().shape({
  text: Yup.string().trim().required('Write the TODO text'),
  search: Yup.string().trim(),
});

export const Form = ({ onSubmit, setFilter }) => {
  const [isFiltering, setIsFiltering] = useState(false);

  const toggleFilter = (resetForm, setErrors) => {
    setIsFiltering(prev => !prev);
    if (!isFiltering) {
      setFilter('');
      setErrors({ text: '', search: '' });
    }
  };

  return (
    <Formik
      initialValues={{ text: '', search: '' }}
      onSubmit={(values, actions) => {
        if (isFiltering) {
          setFilter(values.search);
        } else {
          onSubmit(values.text);
          actions.resetForm();
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, setErrors, resetForm }) => (
        <FormikForm className={style.form}>
          <button
            className={`${style.button} ${isFiltering ? style.buttonActive : ''}`}
            type="button"
            onClick={() => toggleFilter(resetForm, setErrors)}
          >
            <FiSearch size="16px" />
          </button>
          {isFiltering ? (
            <FilterTodos setFilter={setFilter} setFieldValue={setFieldValue} />
          ) : (
            <Field
              className={style.input}
              placeholder="What do you want to write?"
              name="text"
              type="text"
              required
              autoFocus
              autoComplete="off"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          )}

          <ErrorMessage name={isFiltering ? 'search' : 'text'}>
            {msg => <span className={style.msg}>{msg}</span>}
          </ErrorMessage>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
