import globalStyles from '@src/constants/globalStyles';
import {generateShadow} from '@src/utils/generateShadow';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  itemContainer: {
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    borderWidth: 1,
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    borderColor: globalStyles.colors.common.darkNavy,
    backgroundColor: globalStyles.colors.common.white095,
    ...generateShadow(8, globalStyles.colors.common.darkNavy as string),
  },
  flex1: {
    flex: 1,
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.common.white,
  },
  title: {
    color: globalStyles.colors.common.darkNavy,
    fontWeight: 'bold',
    fontSize: moderateScale(22),
  },
  containerNoItem: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: globalStyles.layout.screen.height / 4,
  },
  txtNoItem: {
    fontWeight: 'bold',
    color: globalStyles.colors.common.darkNavy05,
    marginTop: moderateScale(10),
  },
});
