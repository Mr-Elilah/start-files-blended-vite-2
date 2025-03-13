import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import css from './TodoListItem.module.css';

const TodoListItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div className={css.box}>
      <h3>TODO #{todo.id}</h3>
      <p>{todo.text}</p>
      <button className={css.deleteButton} onClick={() => onDelete(todo.id)}>
        <RiDeleteBinLine size={24} />
      </button>
      <button className={css.editButton} onClick={() => onEdit(todo)}>
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};

export default TodoListItem;
