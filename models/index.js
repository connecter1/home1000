import { initializeDataFile as usersInit } from './userModel.js';
import { initializeDataFile as postsInit } from './taskModel.js';

(async () => {
  await usersInit();
  await postsInit();
})();
