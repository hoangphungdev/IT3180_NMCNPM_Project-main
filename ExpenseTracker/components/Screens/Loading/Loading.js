import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import COLORS from '../../../contains/color';

const Loading = ({ state }) => {
  if (state === true) {
    const styles = StyleSheet.create({
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={COLORS.appBar} 
        />
      </View>
    );
  }

  return null;
};

export default Loading;