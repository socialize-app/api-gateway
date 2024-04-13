import { loggerCleanUp } from './logger-cleanup';

const STARTUP_FUNCTIONS = [loggerCleanUp];

export const startup = async () => {
  Promise.all(STARTUP_FUNCTIONS.map((fn) => fn()));
};
