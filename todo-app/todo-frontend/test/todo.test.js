import { getByTestId, render, screen, within } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import SingleToDo from '../src/Todos/SingleTodo'

test('Renders a single todo', () => {
  const todo = { "id": "3498570934", "text": "this is test", "done": false };
  function onClickDelete() {
    console.log('delete');

  }
  function onClickComplete() {
    console.log('delete');

  }
  render(<SingleToDo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />);
  expect(screen.getByTestId('test-span')).toHaveTextContent('this is test');
}) 