import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppInput from '@src/components/AppInput/AppInput';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {RootState} from '@src/redux/store';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IIonIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Books.styles';
import {BooksPayload} from '@src/types/books';
import {postBook, setPostBookCallback} from '@src/redux/actions/books';

type Props = NativeStackScreenProps<RootStackParamType, routesEnum.BOOKS_FORM>;

const BooksForm: React.FC<Props> = ({navigation, route}) => {
  const bookValue = route?.params?.editValue;
  const totalBook = route?.params?.totalBook || 0;

  const dispatch = useDispatch();
  const postBookCallback = useSelector(
    (state: RootState) => state?.books?.postBookCallback,
  );

  const [form, setForm] = useState<BooksPayload>({
    booksCode: '',
    booksTitle: '',
    publishYear: '',
    publisher: '',
    authorName: '',
  });

  useEffect(() => {
    if (postBookCallback?.isSuccess) {
      if (!bookValue) {
        navigation.goBack();
      } else {
        navigation.navigate(routesEnum.LIST_BOOKS);
      }
      dispatch(setPostBookCallback({isSuccess: false, isFailed: false}));
      return;
    }
  }, [bookValue, dispatch, navigation, postBookCallback]);

  useEffect(() => {
    setForm({
      booksCode: bookValue?.booksCode || '',
      booksTitle: bookValue?.booksTitle || '',
      publishYear: bookValue?.publishYear || '',
      publisher: bookValue?.publisher || '',
      authorName: bookValue?.authorName || '',
    });
  }, [bookValue]);

  const validateButton = useCallback((data: BooksPayload) => {
    const isYearValid =
      Number(data.publishYear) <= Number(new Date().getFullYear()) &&
      Number(data.publishYear) >= 2000;
    const isValid = Object.values(data).every(dt => dt) && isYearValid;
    return {
      style: {
        backgroundColor: isValid
          ? globalStyles.colors.common.green
          : globalStyles.colors.common.darkNavy02,
      },
      isValid,
    };
  }, []);

  const saveData = useCallback(
    (data: BooksPayload) => {
      const id = !bookValue ? `${totalBook + 1}` : bookValue?.id;
      dispatch(postBook({...data, id}));
    },
    [bookValue, dispatch, totalBook],
  );
  return (
    <SafeAreaView
      style={[
        globalStyles.layout.rootContainer,
        {paddingTop: moderateScale(10)},
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <IIonIcons
            name="arrow-back-circle-outline"
            size={moderateScale(36)}
            color={globalStyles.colors.common.darkNavy05}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.titleSection}>Add New Book </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          globalStyles.layout.scrollViewContainer,
          styles.spaceBetween,
        ]}>
        <View>
          <Text style={styles.titleSection}>Book Code</Text>
          <AppInput
            placeholder="-- Input Book Code --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, booksCode: text}));
            }}
            value={form.booksCode}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Book Title</Text>
          <AppInput
            placeholder="-- Input Book Title --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, booksTitle: text}));
            }}
            value={form.booksTitle}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Publish Year</Text>
          <AppInput
            placeholder="-- Input Publish Year --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, publishYear: text}));
            }}
            maxLength={4}
            inputMode="decimal"
            value={form.publishYear}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Publisher</Text>
          <AppInput
            placeholder="-- Input Car Name --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, publisher: text}));
            }}
            value={form.publisher}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Author Name</Text>
          <AppInput
            placeholder="-- Input Author Name --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, authorName: text}));
            }}
            value={form.authorName}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
        </View>
        <Spacer height={moderateScale(50)} />
        <TouchableOpacity
          disabled={!validateButton(form).isValid}
          style={[styles.btnSubmit, validateButton(form).style]}
          onPress={() => {
            saveData(form);
          }}>
          <Text style={styles.txtSubmit}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BooksForm;
