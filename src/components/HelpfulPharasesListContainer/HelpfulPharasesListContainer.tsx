import React, { useEffect, useState } from "react";
import LeftIcon from "../../assets/icons/arrow-left-black.svg";
import SearchIcon from "../../assets/icons/search-black.svg";
import StatusBarComp from "../StatusBarComp/StatusBarComp";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import CustomSvgImageComponent from "../CustomComponents/Image";
import HelphulPharasesComp from "../HelphulPharasesComp/HelphulPharasesComp";
import { useLazyGetPharasesQuery } from "../../../redux/services/helpfulPharases";

interface HelpfulPharasesListContainerProps {
  navigation: any;
}

interface pharsesInterface {
  created_at: string;
  id: number;
  mission_id: number;
  text: string;
  text_language: string;
  training_id: number;
  updated_at: string;
  user_id: number;
}

const HelpfulPharasesListContainer: React.FC<
  HelpfulPharasesListContainerProps
> = ({ navigation }): React.JSX.Element => {
  const [inputText, setInputText] = useState<string>("");
  const [pharasesList, setPharasesList] = useState<pharsesInterface[]>([]);

  const [fetchPharases, { data: pharases }] = useLazyGetPharasesQuery();

  useEffect(() => {
    if (!pharases) fetchPharases(1);
    if (pharases) setPharasesList(pharases);
  }, [pharases]);

  const renderHelpfulPharases = ({
    item,
  }: {
    item: pharsesInterface;
    index: number;
  }) => {
    return (
      <HelphulPharasesComp
        title={item.text}
        text_language={item?.text_language}
      />
    );
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    const filterdPharases = pharases.filter((pharase: pharsesInterface) =>
      pharase?.text?.toLowerCase().includes(text?.toLowerCase())
    );
    setPharasesList([...filterdPharases]);
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.navigate("MissionStart")}
          >
            <CustomSvgImageComponent
              width={20}
              height={20}
              Component={LeftIcon}
            />
          </TouchableOpacity>

          <View style={styles.pharasesTxtContainer}>
            <Text style={[styles.defaultFontFamilyBold, styles.pharasesTitle]}>
              Helpful Phrases
            </Text>
            <Text style={[styles.defaultFontFamily, styles.pharasesSubTitle]}>
              Phrases you can use in this mission to help you achieve your
              goals.{" "}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <CustomSvgImageComponent
              width={20}
              height={20}
              Component={SearchIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Search for keywords and phrases"
              placeholderTextColor="#D4D4D4"
              onChangeText={(text) => handleInputChange(text)}
              value={inputText}
            />
          </View>
          <ScrollView style={styles.helpfulPharasesListContainer}>
            <FlatList data={pharasesList} renderItem={renderHelpfulPharases} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HelpfulPharasesListContainer;
