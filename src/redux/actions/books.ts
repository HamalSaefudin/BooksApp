import {createAction} from '@reduxjs/toolkit';
import {
  DELETE_BOOKS,
  GET_BOOKS,
  POST_BOOKS,
  SET_BOOKS,
  SET_POST_BOOKS_CALLBACK,
} from '@src/constants/actionList';
import {BooksPayload} from '@src/types/books';

export const getBooks = createAction(GET_BOOKS);
export const setBooks = createAction<any>(SET_BOOKS);

export const postBook = createAction<BooksPayload>(POST_BOOKS);
export const setPostBookCallback = createAction<{
  isSuccess?: boolean;
  isFailed?: boolean;
}>(SET_POST_BOOKS_CALLBACK);

export const deleteBooks = createAction<string>(DELETE_BOOKS);
