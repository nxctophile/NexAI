import { ConversationType, SongType } from "./types";

export interface AlertContext {
  value: {
    icon: string;
    message: string;
  };
}

export interface ConversationContext {
  value: ConversationType[];
}

export interface SongInfoContext {
  value: SongType;
}

export interface SuggestionContext {
  value: string;
}
