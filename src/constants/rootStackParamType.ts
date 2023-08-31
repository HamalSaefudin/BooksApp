import {BooksPayload} from '@src/types/books';

export enum routesEnum {
  LIST_BOOKS = 'LIST_BOOKS',
  BOOKS_FORM = 'BOOKS_FORM',
  DETAIL_BOOK = 'DETAIL_BOOK',
}

export type RootStackParamType = {
  [routesEnum.LIST_BOOKS]: undefined;
  [routesEnum.BOOKS_FORM]?: {
    editValue?: BooksPayload;
    totalBook?: 0;
  };
  [routesEnum.DETAIL_BOOK]: BooksPayload;
};
