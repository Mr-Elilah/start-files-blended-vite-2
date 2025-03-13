import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import { useState } from 'react';
import style from './EditForm.module.css';

const EditForm = ({ currentTodo, onSave, onCancel }) => {
  const [editedText, setEditedText] = useState(currentTodo.text);

  const handleChange = event => {
    setEditedText(event.target.value);
  };

  return (
    <form
      className={style.form}
      onSubmit={e => {
        e.preventDefault();
        onSave(editedText);
      }}
    >
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={onCancel}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        value={editedText}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
