export interface BaseBooksState {
  books: any[];
  postBookCallback: {
    isSuccess?: boolean;
    isFailed?: boolean;
  };
}

export interface BooksPayload {
  booksCode: string;
  booksTitle: string;
  publishYear: string;
  publisher: string;
  authorName: string;
  id?: string;
}
