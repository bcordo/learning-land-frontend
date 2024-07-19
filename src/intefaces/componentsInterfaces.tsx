import { ReactNode } from "react";
import {
  AnyInterface,
  BooleanInterface,
  FunctionInterface,
  NumberInterface,
  RenderItemFunction,
  StringInterface,
} from "./variablesInterfaces";

export interface NavigationInterface {
  navigation: AnyInterface;
}
export interface CharacterChatNavbarProps {
  navigation: AnyInterface;
  userSettings: AnyInterface;
}
export interface AddActionProps {
  closeDrawer: FunctionInterface;
  sendMessage: FunctionInterface;
  setChatMessages: FunctionInterface;
}
export interface AssistantCorrectionProps {
  text: StringInterface;
}
export interface CharacterChatFooterProps {
  enableRecording: BooleanInterface;
  isRecording: BooleanInterface;
  speakStatus: StringInterface;
  invalidRecord: BooleanInterface;
  setInvalidRecord: FunctionInterface;
  sendingAudio: BooleanInterface;
  startSpeaking: BooleanInterface;
  setEnableRecording: FunctionInterface;
  onStopRecord: FunctionInterface;
  setIsRecording: FunctionInterface;
  handleStartRecord: FunctionInterface;
  setInputText: FunctionInterface;
  handleInputEnter: FunctionInterface;
  openDrawer: FunctionInterface;
  inputText: StringInterface;
}
export interface CharacterResponseContainerProps {
  quoteText?: StringInterface;
  isTyping?: BooleanInterface;
  profileIconContainerStyle?: {};
  message?: StringInterface;
  loader?:BooleanInterface;
}
export interface CustomButtomProps {
  buttonStyle: {};
  textStyle: {};
  onPress: FunctionInterface;
  buttonTxt: StringInterface;
  icon?: AnyInterface;
}
export interface CustomSvgImageComponentInterface {
  Component: React.ComponentType<AnyInterface>;
  width?: NumberInterface;
  height?: NumberInterface;
}
export interface CustomDropdownProps {
  list: {}[];
  renderButton: (
    selectedItem: AnyInterface,
    isOpened: BooleanInterface
  ) => ReactNode;
  renderItem: () => RenderItemFunction;
  dropdownStyle: {};
  onSelect?: FunctionInterface;
  dropdownOverlayColor?: StringInterface;
}
export interface CustomGoalListComponentProps {
  icon: AnyInterface;
  title: StringInterface;
  description: StringInterface;
  isFetching?: BooleanInterface;
}
export interface CustomMissionCircleComponentProps {
  currentItemIndex: NumberInterface;
  index: NumberInterface;
  listIndex: NumberInterface;
  item: {
    position: StringInterface;
    currentltActive: BooleanInterface;
    icon: AnyInterface;
    secondaryIcon?: AnyInterface;
  };
  navigation: AnyInterface;
  bounceValue: AnyInterface;
  missionData: AnyInterface;
  extraData: AnyInterface;
}
export interface SecondaryIconCompProps {
  item: AnyInterface;
}
export interface CustomShimmerProps {
  styleProps: {};
}
export interface CustomSwitchProps {
  trackColor: {
    false: StringInterface;
    true: StringInterface;
  };
  thumbColor: StringInterface;
  value: BooleanInterface;
  name: StringInterface;
  onValueChange: FunctionInterface;
  style: {
    transform: [{ scaleX: NumberInterface }, { scaleY: NumberInterface }];
  };
}
export interface FadedDividerProps {
  style?: object;
  color: StringInterface[];
}
export interface FadedDividerMiddleTextProps {
  text: StringInterface;
  loaderSate?: BooleanInterface;
}
export interface FadedDividerTextProps {
  fadedDividerTextColor?: {};
  color: StringInterface[];
  showIcon?: BooleanInterface;
  text: StringInterface;
  idx?: AnyInterface;
}
export interface HelpfulActionsContainerProps {
  list: [
    {
      title: StringInterface;
      description: StringInterface;
      descriptionColor?: StringInterface;
      type?: StringInterface;
      hideDescriptionText?: BooleanInterface;
      isRight: BooleanInterface;
      text_language: StringInterface;
      showDescriptionIcons?: BooleanInterface;
    }
  ];
  renderItem: FunctionInterface;
  buttonText: StringInterface;
  buttonTextCheck: StringInterface;
  heading: StringInterface;
  navigation: AnyInterface;
  navigationRoute: StringInterface;
  handleButton?: () => void;
}
export interface HelphulPharasesCompProps {
  title: StringInterface;
  text_language?: StringInterface;
  description?: StringInterface;
  descriptionColor?: StringInterface;
  interaction_type?: StringInterface;
  hideDescriptionText?: BooleanInterface;
  isRight?: BooleanInterface;
  showDescriptionIcons?: BooleanInterface;
  isFetching?: BooleanInterface;
  isPlaying?: BooleanInterface;
  setIsPlaying?: (isPlaying: BooleanInterface) => void;
}
export interface HomeTabHeaderProps {}
export interface ProfileContainerProps {
  profileAlignmnent?: {};
  isTyping?: BooleanInterface;
}

export interface StatusBarProps {
  backgroundColor: StringInterface;
  barStyle: "light-content" | "dark-content";
}
export interface UserResponseContainerProps {
  message: StringInterface;
}
export interface ContainerProps {
  navigation: AnyInterface;
  extraData: AnyInterface;
  index: NumberInterface;
  currentItemIndex: NumberInterface;
  world_id: NumberInterface;
  onLayout?: (event: AnyInterface) => void;
  loaderSate?: any;
  missions: [
    {
      assistant_id: NumberInterface;
      character_id: NumberInterface;
      created_at: StringInterface;
      id: NumberInterface;
      mission_definition: StringInterface;
      mission_icon: any;
      mission_index: NumberInterface;
      mission_location: StringInterface;
      mission_narration_template: StringInterface;
      mission_start_datetime: StringInterface;
      mission_start_situation: StringInterface;
      mission_type: StringInterface;
      public_summary: StringInterface;
      title: StringInterface;
      updated_at: StringInterface;
      world_id: NumberInterface;
    }
  ];
}
