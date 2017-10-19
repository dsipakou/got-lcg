import React from 'react';
import {connect} from 'stent/lib/react';

const Board1 = ({name, isMarshaling, isChallenging, marshal, challenge}) => {
  return (
    <div>
      {name}
      marshaling - {isMarshaling()}
      challenging - {isChallenging}
      {isMarshaling && <button onClick={challenge}>Challenge</button>}
      {isChallenging && <button onClick={marshal}>Marshal</button>}
    </div>
  )
}

export default connect(Board1)
  .with('gameflow')
  .map(({state, isMarshaling, isChallenging, marshal, challenge}) => ({
    name: state.name,
    isMarshaling,
    isChallenging,
    marshal,
    challenge
  }));
