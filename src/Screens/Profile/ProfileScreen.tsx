import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';
import Edit from '../../../assets/svg/Edit.svg';
import LeftArrow from '../../../assets/svg/LeftArrow.svg';
import Profile from '../../../assets/svg/User.svg';
import AddImage from '../../../assets/svg/addImage.svg';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericTextInput from '../../ComponentsShared/GenericInput/GenericInput';
import GenericText from '../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../Constants/Colors';
import { User } from '../../Data/Data';
import { NavigationParams } from '../../Navigation/Screens';

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .min(2, t('errors.firstNameMin'))
    .max(30, t('errors.firstNameMax'))
    .required(t('errors.firstNameRequired')),

  last_name: Yup.string()
    .trim()
    .min(2, t('errors.lastNameMin'))
    .max(30, t('errors.lastNameMax'))
    .required(t('errors.lastNameRequired')),

  phone: Yup.string()
    .trim()
    .matches(/^(\+?\d{9,9})$/, t('errors.phoneInvalid'))
    .required(t('errors.phoneRequired')),

  email: Yup.string()
    .trim()
    .email(t('errors.emailInvalid'))
    .required(t('errors.emailRequired')),

  password: Yup.string()
    .trim()
    .min(6, t('errors.passwordMin'))
    .max(100, t('errors.passwordMax'))
    .required(t('errors.passwordRequired')),
});

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);
  const [profileImage, setProfileImage] = React.useState<string | null>(
    User?.image ?? null,
  );
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const uploadProfileImage = async (image: Asset) => {
    try {
      setUploadingImage(true);

      // 🔜 future API-ready payload
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri!,
        type: image.type || 'image/jpeg',
        name: image.fileName || 'profile.jpg',
      });

      // ❗ Replace with real API later
      console.log('Uploading image...', formData);

      // fake delay
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      console.log('Image uploaded successfully');
    } catch (e) {
      console.log('Image upload failed', e);
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePickProfileImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel || !result.assets?.length) return;

    const image: Asset = result.assets[0];

    if (!image.uri) return;

    // instantly update UI
    setProfileImage(image.uri);

    // simulate auto submit (future API)
    uploadProfileImage(image);
  };

  const initialFormValues = {
    first_name: User?.first_name,
    last_name: User?.last_name,
    phone: User?.phone,
    email: User?.email,
    password: '',
  };

  const inputRefs = {
    first_name: useRef<any>(null),
    last_name: useRef<any>(null),
    phone: useRef<any>(null),
    email: useRef<any>(null),
    password: useRef<any>(null),
  };

  const scrollToInput = (ref: React.RefObject<any>) => {
    ref.current?.measureLayout(
      scrollRef.current?.getInnerViewNode(),
      (x: number, y: number) => {
        scrollRef.current?.scrollTo({ y: y - 20, animated: true });
      },
      () => {},
    );
  };

  return (
    <BackgroundContainer containerStyles={{ position: 'relative' }}>
      <View style={styles.goBackContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          activeOpacity={0.7}
        >
          <LeftArrow width={16} height={14} />
        </TouchableOpacity>
      </View>
      <View style={styles.ProfileMainContainer}>
        <TouchableOpacity style={{}} onPress={handlePickProfileImage}>
          <Image
            source={{ uri: profileImage ?? User?.image }}
            style={styles.profileimage}
          />
          <View style={styles.addImageButton}>
            <AddImage width={22} height={22} />
          </View>
        </TouchableOpacity>
        <GenericText
          textType={'Title'}
          text={`${User?.first_name} ${User?.last_name}`}
          textStyles={{ paddingTop: 15, paddingBottom: 40 }}
        />
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('joined')}
            textStyles={{}}
          />
          <GenericText
            textType={'SubTitle'}
            text={User?.is_created}
            textStyles={{}}
          />
        </View>
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('forms.dateofbirth')}
            textStyles={{}}
          />
          <GenericText
            textType={'SubTitle'}
            text={User?.dateOfBirth}
            textStyles={{}}
          />
        </View>
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('forms.email')}
            textStyles={{}}
          />
          <GenericText
            textType={'SubTitle'}
            text={User?.email}
            textStyles={{}}
          />
        </View>
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('forms.phone')}
            textStyles={{}}
          />
          <GenericText
            textType={'SubTitle'}
            text={User?.phone}
            textStyles={{}}
          />
        </View>
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('forms.givenGifts')}
            textStyles={{}}
          />
          <GenericText
            textType={'SubTitle'}
            text={User?.given_gifts}
            textStyles={{}}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'SubTitle'}
            text={t('forms.changeDetails')}
            textStyles={{ paddingVertical: 15 }}
          />
          <TouchableOpacity style={{ width: 20, height: 20 }}>
            <Edit width={20} height={20} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            enableReinitialize={true}
            onSubmit={values => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <>
                {Object.entries(initialFormValues).map(([key]) => {
                  const error =
                    touched[key as keyof typeof values] &&
                    errors[key as keyof typeof values];
                  const value = values[key as keyof typeof values];
                  const titleMap: any = {
                    first_name: t('forms.name'),
                    last_name: t('forms.lastName'),
                    phone: t('forms.phone'),
                    email: t('forms.email'),
                    password: t('forms.password'),
                  };

                  return (
                    <GenericTextInput
                      key={key}
                      inputType="formInput"
                      title={titleMap[key]}
                      required
                      placeHolder={`${t('forms.fill')} ${titleMap[
                        key
                      ].toLowerCase()}`}
                      value={value}
                      onChangeText={handleChange(key)}
                      onFocus={() => {
                        setFieldTouched(key);
                        scrollToInput(inputRefs[key as keyof typeof inputRefs]);
                      }}
                      errorText={error as string}
                      icon={Profile}
                      secureTextEntry={key === 'password'}
                      keyboardType={
                        key === 'email'
                          ? 'email-address'
                          : key === 'phone'
                          ? 'phone-pad'
                          : 'default'
                      }
                      inputPropedStyle={{ fontSize: 16 }}
                      textInputPropedContainerStyles={{
                        borderColor: error ? Colors.red : Colors.gray3,
                      }}
                      placeHolderColor={Colors.dark}
                      // @ts-ignore
                      ref={inputRefs[key]}
                    />
                  );
                })}

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitText}>{t('button.submit')}</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  formContainer: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  submitBtn: {
    width: '90%',
    backgroundColor: Colors.mein,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ProfileMainContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: Colors.gray2,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 20,
  },
  flexibleRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 5,
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    resizeMode: 'cover',
  },
  addImageButton: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: 50,
    position: 'absolute',
    bottom: -5,
    right: 0,
    backgroundColor: Colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  goBackButton: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: Colors.gray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
