export const WEBSOCKET_URL:string= "wss://desolate-anchorage-97861-39db3837351f.herokuapp.com/api/v1/user_missions/chat"
export const BASE_URL =`https://desolate-anchorage-97861-39db3837351f.herokuapp.com`

export const UserMissionState = {
    INACTIVE: "INACTIVE",
    ACTIVE: "ACTIVE",
    FAILED: "FAILED",
    COMPLETED: "COMPLETED",
    PAUSED: "PAUSED",
    ERROR: "ERROR",
  };
  export const Command = {
    START: "START",
    END: "END",
    PAUSE: "PAUSE",
    RESUME: "RESUME",
  };
  export const InteractionType = {
    COMMAND: "COMMAND",
    USER_UTTERANCE: "USER_UTTERANCE", 
    CHARACTER_UTTERANCE: "CHARACTER_UTTERANCE",
    CHARACTER_RESPONSE: "CHARACTER_RESPONSE",
    ASSISTANT_HINT: "ASSISTANT_HINT",
    ASSISTANT_CORRECTION: "ASSISTANT_CORRECTION",
    MISSION_STATUS: "MISSION_STATUS",
    USER_ACTION: "USER_ACTION",
    ERROR: "ERROR",
    CHARACTER_ACTION: "CHARACTER_ACTION",
    CHARACTER_NARRATION: "CHARACTER_NARRATION",
    CHARACTER_EMOTION: "CHARACTER_EMOTION",
    CHARACTER_THOUGHT: "CHARACTER_THOUGHT",
    CHARACTER_UPDATED_LOCATION: "CHARACTER_UPDATED_LOCATION",
    CHARACTER_UPDATED_TIME: "CHARACTER_UPDATED_TIME",
  };
  export const MessageType = {
    CHUNK: "CHUNK",
    FULL: "FULL",
  };
  export const ContentType = {
    TEXT: "TEXT",
    AUDIO: "AUDIO",
    JSON: "JSON",
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
  };
  export const Language = {
    BULGARIAN: "BG",
    CZECH: "CS",
    DANISH: "DA",
    GERMAN: "DE",
    GREEK: "EL",
    AMERICAN_ENGLISH: "EN-US",
    BRITISH_ENGLISH: "EN-GB",
    ENGLISH: "EN",
    SPANISH: "ES",
    ESTONIAN: "ET",
    FINNISH: "FI",
    FRENCH: "FR",
    HUNGARIAN: "HU",
    INDONESIAN: "ID",
    ITALIAN: "IT",
    JAPANESE: "JA",
    KOREAN: "KO",
    LITHUANIAN: "LT",
    LATVIAN: "LV",
    NORWEGIAN: "NB",
    DUTCH: "NL",
    POLISH: "PL",
    PORTUGUESE: "PT",
    ROMANIAN: "RO",
    RUSSIAN: "RU",
    SLOVAK: "SK",
    SLOVENIAN: "SL",
    SWEDISH: "SV",
    TURKISH: "TR",
    UKRAINIAN: "UK",
    CHINESE: "ZH",
  };

 

  export const LIGHT_BLACK_FADED_COLOR=[
    "rgba(255, 255, 255, 0)",
    "rgba(0, 0, 0, 0.5)",
    "rgba(255, 255, 255, 0)",
  ]
  export const ORANGE_FADED_COLOR=[
    "rgba(245, 140, 57, 0)",
    "#F58C39",
    "rgba(245, 140, 57, 0)",
  ]