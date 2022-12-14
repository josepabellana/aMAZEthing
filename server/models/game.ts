
import { mongoose } from './index';

const Schema = mongoose.Schema;

export const gameSchema = new Schema({
    player1: {
      type: String,
    },
    result: {
      type: String,
    },
    player2: {
      type: String,
    },
    
  });

  const Game = mongoose.model('Game', gameSchema)

export { Game };