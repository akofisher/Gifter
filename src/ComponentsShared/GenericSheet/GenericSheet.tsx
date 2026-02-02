import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

type Props = {
  sheetName: string;
};

const GenericSheet = (sheetName: Props) => {
  return (
    <ActionSheet
      headerAlwaysVisible
      CustomHeaderComponent={
        <SafeAreaView>
          <TouchableOpacity
            onPress={() =>
              SheetManager.hide(`${sheetName}`)
            }></TouchableOpacity>
        </SafeAreaView>
      }>
      <View></View>
    </ActionSheet>
  );
};

export default GenericSheet;

const styles = StyleSheet.create({});
