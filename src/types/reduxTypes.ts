import { ConversationType } from "./types";

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
  value: object | undefined;
}

export interface SuggestionContext {
  value: string;
}
