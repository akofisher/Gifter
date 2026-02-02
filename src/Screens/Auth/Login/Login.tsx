import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import Profile from '../../../../assets/svg/User.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericTextInput from '../../../ComponentsShared/GenericInput/GenericInput';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import Screens, { NavigationParams } from '../../../Navigation/Screens';

const Login = () => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);
  const { t, i18n } = useTranslation();

  const initialFormValues = {
    email: '',
    password: '',
  };

  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .trim()
          .email(t('errors.emailInvalid'))
          .required(t('errors.emailRequired')),

        password: Yup.string()
          .trim()
          .min(6, t('errors.passwordMin'))
          .max(100, t('errors.passwordMax'))
          .required(t('errors.passwordRequired')),
      }),
    [i18n.language],
  );

  const inputRefs = {
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
            text={t('auth.loginTitle')}
            textStyles={{ paddingTop: 20, paddingBottom: 40, fontSize: 30 }}
          />
          {/* <GenericText
            textType={'SubTitle'}
            text={t('auth.loginSubtitle')}
            textStyles={{ opacity: 0.8 }}
          /> */}
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            validationSchema={validationSchema}
            initialValues={initialFormValues}
            onSubmit={values => {
              console.log('login payload:', values);
            }}
          >
            {({
              handleChange,
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
                    email: t('forms.email'),
                    password: t('forms.password'),
                  };

                  return (
                    <GenericTextInput
                      key={key}
                      inputType="formInput"
                      title={titleMap[key]}
                      required
                      placeHolder={`${t('forms.fill')} ${String(
                        titleMap[key],
                      ).toLowerCase()}`}
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
                        key === 'email' ? 'email-address' : 'default'
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
                  onPress={() =>
                    // @ts-ignore
                    navigation.navigate(Screens.Recover)
                  }
                  style={styles.forgotBtn}
                  activeOpacity={0.7}
                >
                  <GenericText
                    textType={'SubTitle'}
                    text={t('auth.forgetPassword')}
                    textStyles={{ color: Colors.mein }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitText}>{t('auth.signIn')}</Text>
                </TouchableOpacity>

                <View style={styles.footerRow}>
                  <GenericText
                    textType={'SubTitle'}
                    text={t('auth.noAccount')}
                    textStyles={{}}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      // @ts-ignore
                      navigation.navigate(Screens.Register)
                    }
                    activeOpacity={0.7}
                  >
                    <GenericText
                      textType={'SubTitle'}
                      text={t('auth.registrationTitle')}
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

export default Login;

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
  forgotBtn: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingBottom: 30,
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
