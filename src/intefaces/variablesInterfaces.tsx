export type BooleanInterface = boolean;
export type StringInterface = string;
export type NumberInterface = number;
export type FunctionInterface = Function;
export type NullInterface = null;
export type WebSocketInterface = WebSocket;
export type AnyInterface = any;

export interface chatMessagesInterface {
  type: StringInterface;
  text: StringInterface;
  action?: StringInterface;
  emotion?: StringInterface;
  thought?: StringInterface;
  isTyping?: BooleanInterface;
}
export interface ComponentHeightsObjInterface {
  [key: StringInterface]: NumberInterface;
}
export interface WorldInterface {
  created_at: StringInterface;
  description: StringInterface;
  id: NumberInterface;
  title: StringInterface;
  updated_at: StringInterface;
  world_icon: StringInterface;
  world_index: NumberInterface;
  missions: any;
}
export interface ListItem {
  icon: AnyInterface;
  title: StringInterface;
  subTitle?: StringInterface;
  type?: StringInterface;
  name: StringInterface;
}
export interface ActionList {
  title: StringInterface;
  value: StringInterface;
  custom: BooleanInterface;
}
export interface RenderActionListItem {
  title: StringInterface;
  value: StringInterface;
  custom: BooleanInterface;
}
export interface RenderItemFunction {
  (
    item: {},
    index?: NumberInterface,
    isSelected?: BooleanInterface
  ): JSX.Element;
}
export interface pharsesInterface {
  created_at: StringInterface;
  id: NumberInterface;
  mission_id: NumberInterface;
  text: StringInterface;
  text_language: StringInterface;
  training_id: NumberInterface;
  updated_at: StringInterface;
  user_id: NumberInterface;
}
export interface MissionItemInterface {
  position: StringInterface;
  currentltActive: BooleanInterface;
  icon: AnyInterface;
  secondaryIcon?: AnyInterface;
}
export interface RenderMissionHistoryItemInterface {
  all_user_phrases: AnyInterface;
  correct_user_phrases: AnyInterface;
  created_at: StringInterface;
  id: NumberInterface;
  incorrect_user_phrases: AnyInterface;
  interaction_summary: StringInterface | NullInterface;
  interactions: AnyInterface;
  mission_id: NumberInterface;
  mission_state: StringInterface;
  number_of_goals_completed: NumberInterface;
  pause_time: AnyInterface;
  start_time: AnyInterface;
  time_spent_seconds: NumberInterface;
  updated_at: StringInterface;
  user_assistant_id: NumberInterface;
  user_character_id: NumberInterface;
  user_goals: AnyInterface;
  user_id: NumberInterface;
  user_mission_current_location: StringInterface;
  user_mission_current_time: StringInterface;
  world_id: NumberInterface;
}
