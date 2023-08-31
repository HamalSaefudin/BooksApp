import {fork} from 'redux-saga/effects';
import booksSaga from './books';

export default function* () {
  yield fork(booksSaga);
}
