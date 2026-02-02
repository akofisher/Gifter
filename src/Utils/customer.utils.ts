import {Linking} from 'react-native';

export const goToLink = (url?: string) => {
  if (!url) {
    return;
  }
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};
