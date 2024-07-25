import LottieView from "lottie-react-native";
import React from "react";
import { TouchableOpacity, View, Text, TextInput, Keyboard } from "react-native";
import CustomSvgImageComponent from "../CustomComponents/Image";
import Microphonesvg from "../../assets/icons/SvgMicrophone.svg";
import PlusSvg from "../../assets/icons/plus.svg";
import KeyBoardSvg from "../../assets/icons/keyboard.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";
import ArrowUpGrey from "../../assets/icons/arrow-up-grey.svg";
import XSvg from "../../assets/icons/x.svg";
import XBlack from "../../assets/icons/blackX.svg";
import { styles } from "./styles";
import { CharacterChatFooterProps } from "../../intefaces/componentsInterfaces";
import Spinner from "../../assets/animations/Spinner";

const CharacterChatFooter: React.FC<CharacterChatFooterProps> = ({
  enableRecording,
  isRecording,
  speakStatus,
  invalidRecord,
  setInvalidRecord,
  sendingAudio,
  startSpeaking,
  setEnableRecording,
  onStopRecord,
  setIsRecording,
  handleStartRecord,
  setInputText,
  handleInputEnter,
  inputText,
  openDrawer,
  websocketCheck,
  handleError,
}): React.JSX.Element => {
  return (
    <>
      {enableRecording ? (
        <View style={styles.startRecordContainer}>
          <View style={styles.startToRecordContainer}>
            {isRecording ? (
              <>
                <LottieView
                  style={{ width: 100, height: 48 }}
                  source={require("../../assets/animations/recording.json")}
                  autoPlay
                  loop
                />
                <Text
                  style={[styles.defaultFontFamily, styles.startToRecordTxt]}
                >
                  {speakStatus}
                </Text>
              </>
            ) : (
              <>
                {invalidRecord ? (
                  <TouchableOpacity
                    onPress={() => {
                      setInvalidRecord(false);
                    }}
                    style={styles.blackXContainer}
                  >
                    <CustomSvgImageComponent
                      width={20}
                      height={20}
                      Component={XBlack}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {}}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={styles.blackXContainer}
                    ></TouchableOpacity>
                  </TouchableOpacity>
                )}
                <Text
                  style={[styles.defaultFontFamily, styles.startToRecordTxt]}
                >
                  {sendingAudio
                    ? "Sending audio"
                    : invalidRecord
                    ? "Recordings must be longer that 1 sec"
                    : "Tap below to record"}
                </Text>
              </>
            )}
          </View>
          <View
            style={[
              styles.typeMessageContainer,
              { justifyContent: "center", alignItems: "center", gap: 36 },
            ]}
          >
            <TouchableOpacity
              style={styles.plusButton}
              onPress={
                isRecording
                  ? () => {
                      onStopRecord(false, true);
                      setIsRecording(false);
                      Keyboard.dismiss()
                    }
                  : () => {
                      openDrawer();
                      Keyboard.dismiss()
                    }
              }
            >
              {isRecording ? (
                <CustomSvgImageComponent
                  width={25}
                  height={25}
                  Component={XSvg}
                />
              ) : (
                <CustomSvgImageComponent
                  width={25}
                  height={25}
                  Component={PlusSvg}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.startRecordButton}
              disabled={sendingAudio || (isRecording && startSpeaking)}
              onPress={
                !websocketCheck
                  ? ()=>handleError()
                  : isRecording
                  ? () => onStopRecord(true)
                  : () => handleStartRecord()
              }
            >
              {isRecording ? (
                startSpeaking ? (
                  <Spinner />
                ) : (
                  <CustomSvgImageComponent
                    width={42}
                    height={42}
                    Component={ArrowUp}
                  />
                )
              ) : sendingAudio ? (
                <Spinner />
              ) : (
                <CustomSvgImageComponent
                  width={42}
                  height={42}
                  Component={Microphonesvg}
                />
              )}
            </TouchableOpacity>
            {isRecording ? (
              <TouchableOpacity style={styles.emptyBtn}></TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => {
                  setEnableRecording(false);
                }}
              >
                <CustomSvgImageComponent
                  width={25}
                  height={25}
                  Component={KeyBoardSvg}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.typeMessageContainer}>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => {openDrawer()
          Keyboard.dismiss()
            }}
          >
            <PlusSvg width={25} height={25} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#D4D4D4"
            onChangeText={(text) => setInputText(text)}
            onSubmitEditing={() => handleInputEnter()}
            value={inputText}
          />
          <TouchableOpacity
            style={[styles.plusButton, styles.recordeButton]}
            onPress={() =>
              inputText ? handleInputEnter() : setEnableRecording(true)
            }
          >
            {inputText ? (
              <CustomSvgImageComponent
                width={20}
                height={20}
                Component={ArrowUp}
              />
            ) : (
              <CustomSvgImageComponent
                width={22}
                height={22}
                Component={Microphonesvg}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CharacterChatFooter;
