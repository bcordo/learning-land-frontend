import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import StatusBarComp from "../StatusBarComp/StatusBarComp";
import RunIcon from "../../assets/icons/run.svg";
// import ArrowUp from "../../assets/icons/arrow-up-circle-gray.svg";
import CrossIcon from "../../assets/icons/crossIcon.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
import {
  ContentType,
  InteractionType,
  MessageType,
} from "../../assets/constant";
import { AddActionProps } from "../../intefaces/componentsInterfaces";
import {
  ActionList,
  RenderActionListItem,
  StringInterface,
} from "../../intefaces/variablesInterfaces";

const AddAction: React.FC<AddActionProps> = ({
  closeDrawer,
  sendMessage,
  setChatMessages,
}): React.JSX.Element => {
  const [inputText, setInputText] = useState<StringInterface>("");
  const [selectedAction, setSelectedAction] = useState<StringInterface>("");
  const actionsList: ActionList[] = [
    { title: "Ask for her number", value: "Ask for her number", custom: false },
    { title: "Smile", value: "Smile", custom: false },
    { title: "Shake hands", value: "Shake hands", custom: false },
    { title: "Custom Action", value: "Custom Action", custom: true },
  ];
  let customCheck = selectedAction === "Custom Action";
  const inputCheck = inputText.length > 0;
  const canAddAction = inputCheck || (selectedAction && !customCheck);
  const renderActionList = ({ item }: { item: RenderActionListItem }) => {
    return (
      <View
        style={[
          styles.addActionContainer,
          {
            paddingVertical: 15,
            flexDirection: "column",
            alignItems: "flex-start",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedAction(item.value);
            setInputText("");
          }}
        >
          <Text
            style={[
              item?.title === selectedAction
                ? styles.defaultFontFamilyBold
                : styles.defaultFontFamily,
              styles.addActionTxtTitle,
              {
                color: item?.title === selectedAction ? "#F58C39" : "#404040",
                backgroundColor: "transparent",
              },
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
        {item?.custom ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Kiss her on the cheek"
              placeholderTextColor="#D4D4D4"
              onChangeText={(text) => {
                setInputText(text);
                setSelectedAction("Custom Action");
              }}
              value={inputText}
            />
            {/* <TouchableOpacity onPress={handleSendAction}>
              <CustomSvgImageComponent
                width={36}
                height={36}
                Component={ArrowUp}
              />
            </TouchableOpacity> */}
          </View>
        ) : null}
      </View>
    );
  };

  const handleSendAction = () => {
    sendMessage({
      message_type: MessageType.FULL,
      interaction_type: InteractionType.USER_ACTION,
      content_type: ContentType.TEXT,
      data: inputCheck ? inputText : selectedAction,
    });
    setChatMessages((messages: any) => [
      ...messages,
      {
        type: InteractionType.USER_ACTION,
        text: inputCheck ? inputText : selectedAction,
      },
    ]);
    setSelectedAction("");
    setInputText("");
    closeDrawer();
  };
  return (
    <>
      <StatusBarComp backgroundColor={"#F1F5F9"} barStyle={"dark-content"} />
      <View style={styles.container}>
        <View
          style={[
            styles.drawerHeader,
            {
              paddingTop: Platform.OS === "ios" ? 10 : 0,
              paddingRight: Platform.OS === "ios" ? 10 : 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              closeDrawer();
              setSelectedAction("");
              setInputText("");
            }}
          >
            <CustomSvgImageComponent
              width={20}
              height={20}
              Component={CrossIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.addActionContainer}>
            <CustomSvgImageComponent
              width={20}
              height={20}
              Component={RunIcon}
            />
            <Text style={[styles.defaultFontFamilyBold, styles.addActionTxt]}>
              Add Action
            </Text>
          </View>
          <View>
            <FlatList data={actionsList} renderItem={renderActionList} />
          </View>

          <View style={styles.addActionButtonContainer}>
            <TouchableOpacity
              style={[
                styles.addActionButton,
                { backgroundColor: canAddAction ? "#F58C39" : "#E5E5E5" },
              ]}
              onPress={() => {
                handleSendAction();
              }}
              disabled={!canAddAction}
            >
              <Text
                style={[
                  styles.addActionButtonTxt,
                  styles.defaultFontFamilyBold,
                ]}
              >
                ADD ACTION
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddAction;
