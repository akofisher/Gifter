import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Profile from '../../../../assets/svg/User.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericTextInput from '../../../ComponentsShared/GenericInput/GenericInput';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import Screens, { NavigationParams } from '../../../Navigation/Screens';
import { authService } from '../../../Services/api/auth/auth.service';
import { getDeviceId } from '../../../Services/device/deviceId';
import { setSession } from '../../../Store/Slices/AuthSlice';
import {
  calcAge,
  formatDDMMYYYY,
  toISODateOnly,
} from '../../../Utils/timestamp.util';

const Register = () => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);
  const [dobOpen, setDobOpen] = React.useState(false);
  const dispatch = useDispatch();

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
      .matches(/^(\+?\d{8,15})$/, t('errors.phoneInvalid'))
      .required(t('errors.phoneRequired')),

    email: Yup.string()
      .trim()
      .email(t('errors.emailInvalid'))
      .required(t('errors.emailRequired')),

    dateOfBirth: Yup.string()
      .required(t('errors.dateOfbirthRequired'))
      .test(
        'age',
        t('errors.ageInvalid') || 'You must be at least 16 years old',
        value => {
          if (!value) return false;
          const age = calcAge(value);
          return Number.isFinite(age) && age >= 16;
        },
      ),

    password: Yup.string()
      .trim()
      .min(6, t('errors.passwordMin'))
      .max(100, t('errors.passwordMax'))
      .required(t('errors.passwordRequired')),

    confirm_password: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], t('errors.passwordsMustMatch'))
      .required(t('errors.confirmPasswordRequired')),
  });

  const initialFormValues = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    dateOfBirth: '',
  };

  const inputRefs = {
    first_name: useRef<any>(null),
    last_name: useRef<any>(null),
    phone: useRef<any>(null),
    email: useRef<any>(null),
    password: useRef<any>(null),
    confirm_password: useRef<any>(null),
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

  return (
    <BackgroundContainer containerStyles={{ position: 'relative' }}>
      {/* <View style={styles.goBackContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
          activeOpacity={0.7}
        >
          <LeftArrow width={16} height={14} />
        </TouchableOpacity>
      </View> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.headerContainer}>
          <GenericText
            textType={'Title'}
            text={t('auth.registrationTitle')}
            textStyles={{ paddingTop: 30, paddingBottom: 10, fontSize: 30 }}
          />
          <GenericText
            textType={'SubTitle'}
            text={
              t('auth.registrationSubTitle') ||
              'Fill the fields below to create your account'
            }
            textStyles={{ opacity: 0.8 }}
          />
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            onSubmit={async values => {
              try {
                const deviceId = await getDeviceId();

                const payload: any = { ...values };
                delete payload.confirm_password;

                const res = await authService.register({
                  ...payload,
                  deviceId,
                });

                dispatch(
                  setSession({ accessToken: res.accessToken, user: res.user }),
                );

                const me = await authService.me();
                console.log('me:', me.user);
              } catch (e) {
                console.log('register error:', e);
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
              setFieldValue,
              validateField,
            }) => (
              <>
                {(
                  [
                    'first_name',
                    'last_name',
                    'phone',
                    'email',
                    'password',
                    'confirm_password',
                  ] as const
                ).map(key => {
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
                    confirm_password: t('forms.confirmPassword'),
                  };

                  const isPasswordField =
                    key === 'password' || key === 'confirm_password';

                  return (
                    <GenericTextInput
                      key={key}
                      inputType="formInput"
                      title={titleMap[key]}
                      required
                      placeHolder={
                        key === 'confirm_password'
                          ? String(titleMap[key])
                          : `${t('forms.fill')} ${String(
                              titleMap[key],
                            ).toLowerCase()}`
                      }
                      value={value}
                      onChangeText={handleChange(key)}
                      onFocus={() => {
                        setFieldTouched(key);
                        scrollToInput(inputRefs[key as keyof typeof inputRefs]);
                      }}
                      errorText={error as string}
                      icon={Profile}
                      secureTextEntry={isPasswordField}
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
                {/* ✅ Date of birth field (PRESS ONLY, no focus/keyboard) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    // Don’t validate here — user hasn’t chosen yet.
                    // Just open picker.
                    setDobOpen(true);
                  }}
                >
                  <View pointerEvents="none">
                    <GenericTextInput
                      inputType="formInput"
                      title={t('forms.dateofbirth')}
                      required
                      placeHolder={t('forms.chooseDate')}
                      value={
                        values.dateOfBirth
                          ? formatDDMMYYYY(values.dateOfBirth)
                          : ''
                      }
                      onChangeText={() => {}}
                      errorText={
                        (touched.dateOfBirth && errors.dateOfBirth) as any
                      }
                      icon={Profile}
                      // @ts-ignore
                      editable={false}
                      inputPropedStyle={{ fontSize: 16 }}
                      textInputPropedContainerStyles={{
                        borderColor:
                          touched.dateOfBirth && errors.dateOfBirth
                            ? Colors.red
                            : Colors.gray3,
                      }}
                      placeHolderColor={Colors.dark}
                    />
                  </View>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={dobOpen}
                  mode="date"
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  date={
                    values.dateOfBirth
                      ? new Date(values.dateOfBirth + 'T00:00:00')
                      : new Date(2000, 0, 1)
                  }
                  onConfirm={async date => {
                    const iso = toISODateOnly(date);

                    setDobOpen(false);

                    // ✅ 1) Set the value (Formik updates are async)
                    setFieldValue('dateOfBirth', iso);

                    // ✅ 2) Mark as touched so error state updates immediately
                    setFieldTouched('dateOfBirth', true, false);

                    // ✅ 3) Validate AFTER state has updated (next tick)
                    setTimeout(() => {
                      validateField('dateOfBirth');
                    }, 0);
                  }}
                  onCancel={() => {
                    setDobOpen(false);

                    // ✅ If user cancels without choosing, then show "required"
                    setFieldTouched('dateOfBirth', true, false);

                    // validate next tick for consistent behavior
                    setTimeout(() => {
                      validateField('dateOfBirth');
                    }, 0);
                  }}
                />

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>
                    {t('button.submitRegistration')}
                  </Text>
                </TouchableOpacity>

                <View style={styles.footerRow}>
                  <GenericText
                    textType={'SubTitle'}
                    text={t('auth.haveAccount')}
                    textStyles={{}}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      // @ts-ignore
                      navigation.navigate(Screens.Login)
                    }
                    activeOpacity={0.7}
                  >
                    <GenericText
                      textType={'SubTitle'}
                      text={t('auth.loginTitle')}
                      textStyles={{ color: Colors.mein }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  formContainer: {
    paddingBottom: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
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
  footerRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 18,
    gap: 8,
  },
});
