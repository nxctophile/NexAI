import { FormEvent } from "react";

export interface AlertType {
  icon: string;
  message: string;
}

export interface ConversationType {
  isPrompt: boolean;
  message: string;
}

export interface CommandType {
  command: string;
}

export interface ResponseType {
  response: string;
}

export interface SongType {
    data: [
      {
        id: string;
        name: string;
        artists: {
          primary: [
            {
              name: string;
            }
          ];
        };
        image: [
          {
            url: string;
          },
          {
            url: string;
          },
          {
            url: string;
          }
        ];
        downloadUrl: [
          {
            url: string;
          },
          {
            url: string;
          },
          {
            url: string;
          }
        ];
        duration: number;
      }
    ];
}

export interface InputBoxPropsType {
  sendRequest: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
}
