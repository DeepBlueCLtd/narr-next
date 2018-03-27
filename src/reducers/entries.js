import { ADD_ENTRY, TOGGLE_SELECTED } from "../actions";

const entries = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          selected: false,
          created: new Date(),
          mType: action.mType,
          privacy: action.privacy
        }
      ];
    case TOGGLE_SELECTED:
      return state.map(
        entry =>
          entry.id === action.id
            ? { ...entry, selected: !entry.selected }
            : entry
      );
    default:
      return state;
  }
};

export default entries;
