import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {deleteBooks} from '@src/redux/actions/books';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IIonIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import styles from './DetailBook.styles';

type Props = NativeStackScreenProps<RootStackParamType, routesEnum.DETAIL_BOOK>;

const DetailBook: React.FC<Props> = ({navigation, route}) => {
  const book = route.params;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              navigation.goBack();
            }}>
            <IIonIcons
              name="arrow-back-circle-outline"
              size={moderateScale(36)}
              color={globalStyles.colors.common.white}
            />
          </TouchableOpacity>
          <Image
            source={imagePath.DEFAULT_BOOKS_ILLUSTRATION}
            style={styles.image}
          />
          <View style={styles.overlay} />
        </View>

        <View style={[styles.row, styles.contentContainerStyle]}>
          <View>
            <Text
              style={
                styles.title
              }>{`${book.booksCode} - ${book.booksTitle}`}</Text>
            <Text style={styles.subTitle}>
              Publish Year: {book.publishYear}
            </Text>
          </View>
          <View>
            <Text style={styles.priceText}>{`Author: ${book.authorName}`}</Text>
            <Text
              style={styles.priceText}>{`Publisher: ${book.publisher}`}</Text>
          </View>
        </View>
        <View style={styles.contentContainerStyle}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum iste
            alias cupiditate sed. Tenetur aliquid molestias ipsa voluptas non
            possimus doloribus provident. Animi placeat cum reprehenderit.
            Asperiores nostrum tempora at. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Earum iste alias cupiditate sed.
            Tenetur aliquid molestias ipsa voluptas non possimus doloribus
            provident. Animi placeat cum reprehenderit. Asperiores nostrum
            tempora at. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Earum iste alias cupiditate sed. Tenetur aliquid molestias
            ipsa voluptas non possimus doloribus provident. Animi placeat cum
            reprehenderit. Asperiores nostrum tempora at. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Earum iste alias cupiditate sed.
            Tenetur aliquid molestias ipsa voluptas non possimus doloribus
            provident. Animi placeat cum reprehenderit. Asperiores nostrum
            tempora at. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Earum iste alias cupiditate sed. Tenetur aliquid molestias
            ipsa voluptas non possimus doloribus provident. Animi placeat cum
            reprehenderit. Asperiores nostrum tempora at. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Earum iste alias cupiditate sed.
            Tenetur aliquid molestias ipsa voluptas non possimus doloribus
            provident. Animi placeat cum reprehenderit. Asperiores nostrum
            tempora at. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Earum iste alias cupiditate sed.
          </Text>
        </View>
        <Spacer height={moderateScale(50)} />
        <View style={styles.footer}>
          <View style={styles.flex1}>
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => {
                navigation.navigate(routesEnum.BOOKS_FORM, {
                  editValue: book,
                });
              }}>
              <Text style={styles.txtEdit}>Edit</Text>
            </TouchableOpacity>
            <Spacer height={moderateScale(10)} />

            <Spacer width={moderateScale(20)} />
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => {
                dispatch(deleteBooks(book.id as string));
              }}>
              <Text style={styles.txtDelete}>Delete</Text>
            </TouchableOpacity>
            <Spacer height={moderateScale(10)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBook;
