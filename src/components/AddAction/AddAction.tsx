import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import StatusBarComp from "../StatusBarComp/StatusBarComp";
import RunIcon from "../../assets/icons/run.svg";
import ArrowUp from "../../assets/icons/arrow-up-circle-gray.svg";
import CustomSvgImageComponent from "../CustomComponents/Image";
import {
  ContentType,
  InteractionType,
  MessageType,
} from "../../assets/constant";

interface AddActionProps {
  closeDrawer: Function;
  sendMessage: Function;
  setChatMessages: Function;
}

const AddAction: React.FC<AddActionProps> = ({
  closeDrawer,
  sendMessage,
  setChatMessages,
}): React.JSX.Element => {
  const [inputText, setInputText] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const actionsList = [
    { title: "Ask for her number", value: "Ask for her number", custom: false },
    { title: "Smile", value: "Smile", custom: false },
    { title: "Shake hands", value: "Shake hands", custom: false },
    { title: "Custom Action", value: "Custom Action", custom: true },
  ];
  const renderActionList = ({
    item,
  }: {
    item: {
      title: string;
      value: string;
      custom: boolean;
    };
  }) => {
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
        <Text
          onPress={() => setSelectedAction(item.value)}
          style={[
            item?.title === selectedAction
              ? styles.defaultFontFamilyBold
              : styles.defaultFontFamily,
            styles.addActionTxtTitle,
            { color: item?.title === selectedAction ? "#F58C39" : "#404040" },
          ]}
        >
          {item.title}
        </Text>
        {item?.custom ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Kiss her on the cheek"
              placeholderTextColor="#D4D4D4"
              onChangeText={(text) => {
                setInputText(text);
                setSelectedAction(text);
              }}
              value={inputText}
            />
            <TouchableOpacity onPress={handleSendAction}>
              <CustomSvgImageComponent
                width={36}
                height={36}
                Component={ArrowUp}
              />
            </TouchableOpacity>
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
      data: selectedAction,
    });
    setChatMessages((messages) => [
      ...messages,
      {
        type: InteractionType.USER_ACTION,
        text: selectedAction,
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
        <View style={styles.addActionContainer}>
          <CustomSvgImageComponent width={20} height={20} Component={RunIcon} />
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
              { backgroundColor: selectedAction ? "#F58C39" : "#E5E5E5" },
            ]}
            onPress={() => {
              handleSendAction();
            }}
            disabled={!selectedAction}
          >
            <Text
              style={[styles.addActionButtonTxt, styles.defaultFontFamilyBold]}
            >
              ADD ACTION
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddAction;
