import React from 'react';
import {connect} from 'stent/lib/react';
import { Machine } from 'stent';
import game from '../../machine/game';

Machine.create('gameflow', game);

const Board1 = ({name, isMarshaling, isChallenging, marshal, challenge}) => {
  return (
    <div>
      {!isMarshaling && <span>hello</span>}
      {isMarshaling && <button onClick={challenge}>Challenge</button>}
      {isChallenging && <button onClick={marshal}>Marshal</button>}
    </div>
  )
}

export default connect(Board1)
  .with('gameflow')
  .map(({state, isMarshaling, isChallenging, marshal, challenge}) => ({
    name: state.name,
    isMarshaling: isMarshaling(),
    isChallenging: isChallenging(),
    marshal,
    challenge
  }));
