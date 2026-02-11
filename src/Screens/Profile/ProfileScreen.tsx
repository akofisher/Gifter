import CookieManager from '@react-native-cookies/cookies';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Alert,
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
import { NavigationParams } from '../../Navigation/Screens';
import { userService } from '../../Services/api/user/user.service';
import { uploadToCloudinary } from '../../Services/cloudinary/cloudinaryUpload';
import { clearSession, setUser } from '../../Store/Slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { prepareAvatar } from '../../Utils/imageResizer';
import { formatDateDDMMYYYY } from '../../Utils/timestamp.util';

type ProfileFormValues = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string; // current password confirmation
};

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
    .matches(/^(\+?\d{9,15})$/, t('errors.phoneInvalid'))
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

// cache buster for remote urls
const bustUrl = (url?: string | null) =>
  url ? `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}` : null;

const ProfileScreen = () => {
  const User = useAppSelector((s: any) => s?.auth?.user);
  console.log(User);
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const dispatch = useAppDispatch();

  const scrollRef = useRef<ScrollView>(null);

  const [profileImage, setProfileImage] = useState<string | null>(
    User?.avatar?.url ?? null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const initialFormValues: ProfileFormValues = useMemo(
    () => ({
      first_name: User?.firstName ?? '',
      last_name: User?.lastName ?? '',
      phone: User?.phone ?? '',
      email: User?.email ?? '',
      password: '',
    }),
    [User?.firstName, User?.lastName, User?.phone, User?.email],
  );

  const inputRefs: Record<keyof ProfileFormValues, any> = {
    first_name: useRef<any>(null),
    last_name: useRef<any>(null),
    phone: useRef<any>(null),
    email: useRef<any>(null),
    password: useRef<any>(null),
  };

  const scrollToInput = (ref: React.RefObject<any>) => {
    ref.current?.measureLayout(
      // @ts-ignore
      scrollRef.current?.getInnerViewNode(),
      (_x: number, y: number) => {
        scrollRef.current?.scrollTo({ y: y - 20, animated: true });
      },
      () => {},
    );
  };

  const uploadProfileImage = useCallback(
    async (image: Asset) => {
      try {
        if (!image.uri) return;

        setUploadingImage(true);

        // ✅ 1) resize locally (fast load + smaller upload)
        const prepared = await prepareAvatar(image.uri);

        // ✅ 2) upload to Cloudinary
        const uploaded = await uploadToCloudinary(prepared);

        // ✅ 3) save URL in your backend user profile
        const res = await userService.updateAvatar({
          avatarUrl: uploaded.secure_url,
          avatarPublicId: uploaded.public_id,
        });

        // ✅ 4) update redux + refresh image
        if (res?.user) {
          dispatch(setUser(res.user));
          setProfileImage(bustUrl(res.user.avatar?.url ?? uploaded.secure_url));
        } else {
          // fallback if backend doesn't return user
          setProfileImage(bustUrl(uploaded.secure_url));
        }
      } catch (e: any) {
        console.log('Avatar upload error:', e?.message || e);
        Alert.alert('Upload error', e?.message || 'Failed to upload avatar');
      } finally {
        setUploadingImage(false);
      }
    },
    [dispatch],
  );

  const handlePickProfileImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel || !result.assets?.length) return;

    const image: Asset = result.assets[0];
    if (!image.uri) return;

    // show instantly
    setProfileImage(image.uri);

    // upload
    uploadProfileImage(image);
  }, [uploadProfileImage]);

  const avatarUri = useMemo(() => {
    const uri =
      profileImage ??
      (User?.avatar?.url ? bustUrl(User.avatar.url) : null) ??
      null;

    return uri ? { uri } : undefined;
  }, [profileImage, User?.avatar?.url]);

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
        <TouchableOpacity onPress={handlePickProfileImage} activeOpacity={0.85}>
          <Image source={avatarUri} style={styles.profileimage} />
          <View style={styles.addImageButton}>
            <AddImage width={22} height={22} />
          </View>
          {uploadingImage ? (
            <Text style={{ marginTop: 8, opacity: 0.7 }}>Uploading...</Text>
          ) : null}
        </TouchableOpacity>

        <GenericText
          textType={'Title'}
          text={`${User?.firstName ?? ''} ${User?.lastName ?? ''}`}
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
            text={User?.createdAt ? formatDateDDMMYYYY(User.createdAt) : '-'}
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
            text={
              User?.dateOfBirth ? formatDateDDMMYYYY(User.dateOfBirth) : '-'
            }
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
            text={User?.email ?? '-'}
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
            text={User?.phone ?? '-'}
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
            text={String(User?.stats?.given ?? 0)}
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
          <TouchableOpacity
            style={{ width: 20, height: 20 }}
            activeOpacity={0.7}
          >
            <Edit width={20} height={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik<ProfileFormValues>
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            enableReinitialize
            validateOnBlur
            validateOnChange={false}
            onSubmit={async values => {
              try {
                setSaving(true);

                const payload = {
                  firstName: values.first_name.trim(),
                  lastName: values.last_name.trim(),
                  phone: values.phone.trim(),
                  email: values.email.trim().toLowerCase(),
                  currentPassword: values.password,
                };

                const res = await userService.updateMe(payload);

                if (res?.user) {
                  dispatch(setUser(res.user));
                }

                Alert.alert('Success', 'Profile updated');
              } catch (e: any) {
                Alert.alert(
                  'Update error',
                  e?.response?.data?.message ||
                    e?.message ||
                    'Failed to update profile',
                );
              } finally {
                setSaving(false);
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
              submitCount,
            }) => {
              const showError = (key: keyof ProfileFormValues) =>
                touched[key] || submitCount > 0
                  ? (errors[key] as string | undefined)
                  : undefined;

              const titleMap: Record<keyof ProfileFormValues, string> = {
                first_name: t('forms.name'),
                last_name: t('forms.lastName'),
                phone: t('forms.phone'),
                email: t('forms.email'),
                password: t('forms.password'),
              };

              return (
                <>
                  {(
                    Object.keys(
                      initialFormValues,
                    ) as (keyof ProfileFormValues)[]
                  ).map(key => {
                    const err = showError(key);

                    return (
                      <GenericTextInput
                        key={key}
                        inputType="formInput"
                        title={titleMap[key]}
                        required
                        placeHolder={`${t('forms.fill')} ${String(
                          titleMap[key],
                        ).toLowerCase()}`}
                        value={values[key]}
                        onChangeText={handleChange(key)}
                        onFocus={() => {
                          setFieldTouched(key, true);
                          scrollToInput(inputRefs[key]);
                        }}
                        errorText={err}
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
                          borderColor: err ? Colors.red : Colors.gray3,
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
                    disabled={saving}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.submitText}>
                      {saving ? '...' : t('button.submit')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: Colors.red }]}
                    disabled={deleting}
                    activeOpacity={0.85}
                    onPress={() => {
                      Alert.alert(
                        'Delete account?',
                        'This will permanently delete your account.',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: async () => {
                              if (!values.password) {
                                Alert.alert(
                                  'Password required',
                                  'Enter your password to delete account',
                                );
                                return;
                              }

                              try {
                                setDeleting(true);

                                await userService.deleteMe({
                                  currentPassword: values.password,
                                });

                                await CookieManager.clearAll(true);
                                dispatch(clearSession());

                                Alert.alert('Done', 'Account deleted');
                              } catch (e: any) {
                                Alert.alert(
                                  'Delete error',
                                  e?.response?.data?.message ||
                                    e?.message ||
                                    'Failed to delete account',
                                );
                              } finally {
                                setDeleting(false);
                              }
                            },
                          },
                        ],
                      );
                    }}
                  >
                    <Text style={styles.submitText}>
                      {deleting ? '...' : t('button.deleteAccount')}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
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
    backgroundColor: '#eee',
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
