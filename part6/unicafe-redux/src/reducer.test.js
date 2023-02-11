import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('returns the initial state with empty state', () => {
    const action = { type: 'DO_NOTHING' };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = { type: 'GOOD' };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...state, good: state.good + 1 });
  });
});
