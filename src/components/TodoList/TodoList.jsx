import TodoListItem from '../TodoListItem/TodoListItem';
import GridItem from '../GridItem/GridItem';
import Grid from '../Grid/Grid';

const TodoList = ({ array, onDelete, onEdit }) => {
  return (
    <Grid>
      {array.map(todo => (
        <GridItem key={todo.id}>
          <TodoListItem todo={todo} onDelete={onDelete} onEdit={onEdit} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
