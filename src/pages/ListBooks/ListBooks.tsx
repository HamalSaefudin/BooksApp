import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FloatingButton from '@src/components/FloatingButton/FloatingButton';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {getBooks} from '@src/redux/actions/books';
import {RootState} from '@src/redux/store';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import IIonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ListBooks.styles';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

type Props = NativeStackScreenProps<RootStackParamType, routesEnum.LIST_BOOKS>;

const ListBooks: React.FC<Props> = ({navigation}) => {
  const books = useSelector((state: RootState) => state?.books?.books);
  const [isRefresh, setIsRefresh] = useState(false);
  const dispatch = useDispatch();

  const fetchBooks = useCallback(() => {
    dispatch(getBooks());
    setIsRefresh(false);
  }, [dispatch]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const renderSpacer = useCallback(
    () => <Spacer height={moderateScale(10)} />,
    [],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>List Books</Text>
      </View>
    ),
    [],
  );
  const renderNoItem = useCallback(
    () => (
      <View style={styles.containerNoItem}>
        <IIonIcon
          name="book-outline"
          size={moderateScale(80)}
          color={globalStyles.colors.common.darkNavy05}
        />
        <Text style={styles.txtNoItem}>No Books</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <FlatList
        data={books}
        ItemSeparatorComponent={renderSpacer}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderNoItem}
        onRefresh={() => {
          setIsRefresh(true);
          fetchBooks();
        }}
        refreshing={isRefresh}
        renderItem={({item, index}) => {
          return (
            <AnimatedTouchableOpacity
              onPress={() => {
                navigation.navigate(routesEnum.DETAIL_BOOK, item);
              }}
              entering={SlideInDown.delay(index * 360)}
              style={styles.itemContainer}>
              <View style={styles.flex1}>
                <View style={styles.rowSpaceBetween}>
                  <Text>Author Name: </Text>
                  <Text>{item.authorName}</Text>
                </View>
                <View style={styles.rowSpaceBetween}>
                  <Text>Title</Text>
                  <Text>{item.booksTitle}</Text>
                </View>
              </View>
            </AnimatedTouchableOpacity>
          );
        }}
      />
      <FloatingButton
        size={moderateScale(40)}
        onPress={() => {
          navigation.navigate(routesEnum.BOOKS_FORM);
        }}
      />
    </SafeAreaView>
  );
};

export default ListBooks;
