import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, delTodo, postTodo, putTodo} from './todoServicejsx';

// GET ALL TODOS
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    });
};

// ADD TODO
export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInputState) => postTodo({"title": userInputState}),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      console.log('Successfully added new card')
    },
    onError: (err) => {
      console.error(`Error: ${err.message}`);
    },
  });
};

// UPDATE TODO
export const useUpdTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoItem) => putTodo(todoItem),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['todos']);
        console.log('Successfully updated todo card');
      }, 10000);
    },
    onError: (err) => {
      console.error(`Error: ${err.message}`);
    },
  });
};

// DELETE TODO
export const useDelTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoItem) => delTodo(todoItem),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      console.error('Successfully deleted a card')
    },
  });
};