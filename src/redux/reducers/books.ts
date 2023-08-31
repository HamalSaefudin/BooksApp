import {createReducer} from '@reduxjs/toolkit';
import {BaseBooksState} from '@src/types/books';
import {setBooks, setPostBookCallback} from '../actions/books';

const baseBooksReducer: BaseBooksState = {
  books: [],
  postBookCallback: {
    isSuccess: false,
    isFailed: false,
  },
};

const booksReducer = createReducer(baseBooksReducer, builder => {
  builder.addCase(setBooks, (state, {payload}) => ({
    ...state,
    books: payload,
  }));
  builder.addCase(setPostBookCallback, (state, {payload}) => ({
    ...state,
    postBookCallback: payload,
  }));
});

export default booksReducer;
