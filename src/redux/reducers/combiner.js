import playerReducersCombiner from './player/playerReducersCombiner';
import opponentReducersCombiner from './opponent/opponentReducersCombiner';
import generalReducersCombiner from './general/generalReducersCombiner';

export default {
  player: playerReducersCombiner,
  opponent: opponentReducersCombiner,
  general: generalReducersCombiner,
};
