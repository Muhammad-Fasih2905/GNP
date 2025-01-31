import React, {useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppHeader from '../../components/app-header/app-header';
import {AppColors} from '../../theme';
import AppLayout from '../../layouts/AppLayout';
import {hp, wp} from '../../const';
import AppStyles from '../../styles/AppStyles';
import {AppImages} from '../../utils/AppImages';
import Button from '../../components/AppButton';
import {useRoute} from '@react-navigation/native';
import reactnativeblobutil from 'react-native-blob-util';

const BookTrending = () => {
  const active = useRoute()?.params?.active;
  const [downloading, setDownloading] = useState(false);

  const requestStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to download files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('permission:', granted);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    requestStoragePermission();
  }, []);

  const book = useRoute()?.params?.book;

  const downloadPdf = async (book: {pdf_url: string; pdfTitle: string}) => {
    const {config, fs, fetch} = reactnativeblobutil;

    const fileName = book.pdfTitle;
    const downloadsPath = fs.dirs.DownloadDir;

    try {
      setDownloading(true);
      const res = await config({
        path: `${downloadsPath}/${fileName}`,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: 'Downloading PDF file',
          mime: 'application/pdf',
          path: `${downloadsPath}/${fileName}`,
        },
      }).fetch('GET', book.pdf_url);

      console.log('File downloaded to:', res.path());
      return res.path();
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  const downloadPdfFile = async () => {
    try {
      const filePath = await downloadPdf({
        pdf_url: book.pdf_url,
        pdfTitle: active === 0 ? book?.name : book?.title,
      });
      console.log('File downloaded to:', filePath);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  return (
    <AppLayout>
      <AppHeader
        headerTitle={
          active == 0 ? (
            <Text>
              <Text style={styles.secondaryText}>Bro</Text>wse{' '}
              <Text style={styles.secondaryText}>Ge</Text>nres
            </Text>
          ) : (
            <Text>
              <Text style={styles.secondaryText}>Tren</Text>ding{' '}
              <Text style={styles.secondaryText}>B</Text>ooks
            </Text>
          )
        }
        isHome={false}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <View style={AppStyles.rowBetween}>
                        <Text style={AppStyles.bookstitle}>Web Commics</Text>
                        <GlobalIcon color={AppColors.black} size={hp(2.5)} name={'long-arrow-alt-right'} library={'FontAwesome5'} />
                    </View> */}
          <View style={{paddingVertical: hp(0), paddingHorizontal: wp(10)}}>
            <Image
              style={AppStyles.bookImage}
              source={book.image ? {uri: book?.image} : AppImages.guards}
            />
          </View>
          <Text style={AppStyles.bookstitle}>
            {active === 0 ? book?.name : book?.title}
          </Text>
          <Text style={AppStyles.bookstitleSmall}>
            {active === 0 ? book.long_description : book?.description} {'\n'}
          </Text>

          {active !== 0 && (
            <>
              <Text
                style={[
                  AppStyles.bookstitleSmall,
                  {fontSize: hp(2), paddingTop: hp(2)},
                ]}>
                DOWNLOAD NOW TO READ THE BOOK
              </Text>
              <Button
                style={{marginTop: hp(3), width: hp(25)}}
                onPress={() => downloadPdfFile()}
                disabled={downloading}
                title={downloading ? 'DOWNLOADING...' : 'DOWNLOAD PDF'}
                variant="primary"
              />
            </>
          )}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default BookTrending;

const styles = StyleSheet.create({
  secondaryText: {
    color: AppColors.secondary,
  },
  container: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(5),
  },
});
