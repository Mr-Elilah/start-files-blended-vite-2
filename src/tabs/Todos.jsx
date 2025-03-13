import { useEffect, useState, useCallback } from 'react';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import Text from '../components/Text/Text';
import EditForm from '../components/EditForm/EditForm';

const initialTodos = [
  { id: '1', text: 'Practice more' },
  { id: '2', text: 'Get all tasks done on time' },
];
const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    return storedTodos || initialTodos;
  });

  const [filter, setFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = useCallback(
    text => {
      const newId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
      const newTodo = { id: newId, text };
      setTodos([...todos, newTodo]);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    id => {
      const newTodos = todos.filter(todo => todo.id !== id);
      const updatedTodos = newTodos.map((todo, index) => ({
        ...todo,
        id: index + 1,
      }));
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleEditTodo = todo => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleSaveEdit = editedText => {
    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({});
  };

  const filteredTodos = filter
    ? todos.filter(todo =>
        todo.text.toLowerCase().includes(filter.toLowerCase())
      )
    : todos;

  return (
    <>
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Form onSubmit={addNewTodo} setFilter={setFilter} />
      )}

      {filteredTodos.length > 0 ? (
        <TodoList
          array={filteredTodos}
          onDelete={deleteTodo}
          onEdit={handleEditTodo}
        />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
