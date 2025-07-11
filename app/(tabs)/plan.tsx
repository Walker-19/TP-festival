import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { LeafletView, MapMarker } from 'react-native-leaflet-view';

const ALBI_LOCATION = {
  latitude: 43.929,
  longitude: 2.146,
};

const Plan = () => {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require('../../assets/leaflet.html'); // Adapte le chemin si besoin
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert('Erreur de chargement HTML', JSON.stringify(error));
        console.error('Erreur :', error);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);
const markers:MapMarker[] = [
  {
    id: 'albi-marker',
    position: ALBI_LOCATION,
    size: [25, 41], // taille standard des icônes Leaflet
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	// icon: '📍', 	Test qui n'a pas marché
    title: 'Albi',
    
  },
];


  if (!webViewContent) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LeafletView
          source={{ html: webViewContent }}
          mapCenterPosition={{
            lat: ALBI_LOCATION.latitude,
            lng: ALBI_LOCATION.longitude,
          }}
          zoom={13}
          mapMarkers={markers}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 500,
    width: '100%',
  },
});

