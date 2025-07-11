import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, ActivityIndicator, TouchableHighlight } from "react-native";
import StageApiService from "../../services/stage_api_service";
import StageArtistParam from "../../models/params/stage_artist_param";
import { useLocalSearchParams, useRouter } from "expo-router";
import ArtistApiService from "../../services/artist_api_service";
import Stage from "../../models/stage";
import Artist from "../../models/artist";
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { BASE_URL } from "../../constants/config";
import { colors, fonts } from "../../constants/design_constants";
import DayApiService from "../../services/day_api_service";
import Programme from "../../models/programme";
import Day from "../../models/day";
import DateUtilsService from "../../services/date_utils_service";
import { Feather } from '@expo/vector-icons';


type stageMartist = {
    artist: Artist,
    day: Day
}


const StageArtist = () => {
    const { stageId } = useLocalSearchParams();
  const [stageListArtist, setStageArtist] = useState<stageMartist[]>();
  const [saveListArtist, setSave] = useState<stageMartist[]>();
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
    


  const handlerSearch = (artisteName: string) => {
    setSearch(artisteName);

  if (!stageListArtist || stageListArtist.length === 0) return;

  const filtered = stageListArtist.filter((item) =>
    item.artist.name.toLowerCase().includes(artisteName.toLowerCase())
  );

  if (artisteName.trim() === "") {
    // si champ vide → on remet la liste initiale
    setStageArtist(saveListArtist);
  } else {
    setStageArtist(filtered);
  }

  }


    
    useEffect(() => {
        setLoading(true);
        if (!Array.isArray(stageId)) {
            const id = Number(stageId)
            const artistList: stageMartist[] = [];
            const fetchArtistByStage = async () => {
                const data: Programme[] = await new StageApiService().getListArtistByStage(id);
                for (let stage of data) {
                    const artist = await new ArtistApiService().getArtistById(stage.artistId);
                    const day = await new DayApiService().getDayById(stage.dayId);
                    if (artist && day) {
                        const item = {
                            artist: artist,
                            day: day 
                        }
                        artistList.push(item);
                    }
                }
              setStageArtist(artistList);
              setSave(artistList);
                setLoading(false);
            }
            fetchArtistByStage();
        }


    
    }, [stageId])
    


      if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

    
    
    
	return (
        <GestureHandlerRootView>
            <ScrollView style={{ backgroundColor: colors.quaternary }}>
        <View style={{ gap: 20, padding: 10 }}>
          <View style={styles.searchContent}>
             <TextInput
          style={styles.input}
          onChangeText={handlerSearch}
          value={search}
          placeholder="Rechercher"
          keyboardType="web-search"
            />
            <Feather name="search" size={20}/>
          </View>
                 {Array.isArray(stageListArtist) && stageListArtist.length === 0 && (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get('screen').height }}>
              <Text>Aucun artiste pour cette scène.</Text>
            </View>
          )}

          {Array.isArray(stageListArtist) &&
            stageListArtist.map((stMar) => (
              <TouchableHighlight  key={stMar.artist.id} onPress={() => route.navigate(`/artist/${stMar.artist.slug}`)} >

              <View  style={styles.contentArtist}>
                <Image
                  style={styles.poster}
                  contentFit="cover"
                  source={{
                    uri: `${BASE_URL}/images/artists/${stMar.artist?.poster}`,
                  }}
                  />
                <View>
                  <Text style={{ fontSize: 18, fontWeight: "900", fontFamily: fonts.title }}>
                    {stMar.artist.name}
                  </Text>
                  <Text>{new DateUtilsService().formatDate(stMar.day.date)}</Text>
                </View>
              </View>
                  </TouchableHighlight>
            ))}

         
        </View>
      </ScrollView>
    </GestureHandlerRootView>
	);
};

export default StageArtist;


const styles = StyleSheet.create({
    contentArtist : {
        height: 85,
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    poster: {
        width: 45,
        height: 45,
        borderRadius: 50
  },
  searchContent: {
    flex: 1,
    // width: Dimensions.get('screen').width * 0.8,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"#fff",
    paddingInline: 10,
    borderRadius: 5,
    margin: 10,
    },
  input: {
    width: Dimensions.get('screen').width * 0.70,
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
});
