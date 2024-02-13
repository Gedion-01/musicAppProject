import { createContext } from 'react';


export interface PlayerContextState {
    count: number;
    increment: () => void;
    decrement: () => void;
  }
const PlayerContext = createContext<PlayerContextState>({
    count: 0,
    increment: () => {},
    decrement: () => {},
  });
export {PlayerContext}