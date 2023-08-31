import {call, put, select, takeLatest} from 'redux-saga/effects';
import {hideLoading, showLoading} from '../actions/spinner';
import {
  deleteBooks,
  getBooks,
  postBook,
  setBooks,
  setPostBookCallback,
} from '../actions/books';
import {BooksPayload} from '@src/types/books';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {goBack} from '@src/routes/indexRoutes';
import {RootState} from '../store';

export function* fetchBooks() {
  yield put(showLoading());
  const prevBooks: BooksPayload[] = yield select(
    (state: RootState) => state.books.books,
  );
  try {
    const collectionRef = firestore().collection('books_collection');
    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot = yield call([
      collectionRef,
      collectionRef.get,
    ]);

    const documents: BooksPayload[] = [];
    querySnapshot.forEach((doc: any) => {
      documents.push({id: doc.id, ...doc.data()});
    });
    yield put(setBooks(documents));
  } catch (error: any) {
    yield put(setBooks(prevBooks));
  } finally {
    yield put(hideLoading());
  }
}

export function* fetchPostBook({payload}: {payload: BooksPayload}) {
  yield put(showLoading());
  try {
    const py = {...payload};
    const documentRef = firestore()
      .collection('books_collection')
      .doc(payload.id);
    yield documentRef.set(py);

    yield put(getBooks());
    yield put(setPostBookCallback({isSuccess: true, isFailed: false}));
  } catch (error: any) {
    yield put(setPostBookCallback({isFailed: true, isSuccess: false}));
  } finally {
    yield put(hideLoading());
  }
}

export function* fetchDeleteBooks({payload}: {payload: string}) {
  yield put(showLoading());
  try {
    const collectionRef = firestore().collection('books_collection');
    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot = yield call([
      collectionRef,
      collectionRef.where('id', '==', payload).get,
    ]);
    querySnapshot.docs[0]?.ref?.delete();
    yield put(getBooks());
    goBack();

    yield put(getBooks());
  } catch (error: any) {
    console.log(error);
  } finally {
    yield put(hideLoading());
  }
}

export default function* authSaga() {
  yield takeLatest(postBook, fetchPostBook);
  yield takeLatest(getBooks, fetchBooks);
  yield takeLatest(deleteBooks, fetchDeleteBooks);
}
