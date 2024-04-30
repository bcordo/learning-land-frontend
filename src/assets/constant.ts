export const WEBSOCKET_URL:string= "wss://desolate-anchorage-97861-39db3837351f.herokuapp.com/api/v1/user_missions/chat"

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
    CHARACTER_RESPONSE: "CHARACTER_RESPONSE",
    CHARACTER_RESPONSE_UTTERANCE: "CHARACTER_RESPONSE_UTTERANCE",
    ASSISTANT_HINT: "ASSISTANT_HINT",
    ASSISTANT_CORRECTION: "ASSISTANT_CORRECTION",
    MISSION_STATUS: "MISSION_STATUS",
    USER_ACTION: "USER_ACTION",
    ERROR: "ERROR",
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