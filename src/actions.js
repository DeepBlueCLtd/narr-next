/*
 * action types
 */

export const ADD_ENTRY = "ADD_ENTRY";
export const TOGGLE_SELECTED = "TOGGLE_SELECTED";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const SET_PRIVACY_FILTER = "SET_PRIVACY_FILTER";
export const SET_TIME_FILTER = "SET_TIME_FILTER";

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_SELECTED: "SHOW_SELECTED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const PrivacyFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_PUBLIC: "SHOW_PUBLIC",
  SHOW_SENSITIVE: "SHOW_SENSITIVE",
  SHOW_PRIVATE: "SHOW_PRIVATE"
};

export const TimeFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_LAST_MIN: "SHOW_LAST_MIN",
  SHOW_LAST_5_MIN: "SHOW_LAST_5_MIN"
};

/*
 * action creators
 */

let nextEntryId = 0;

export function addEntry(text, mType, privacy) {
  return { type: ADD_ENTRY, id: nextEntryId++, mType: mType, privacy, text };
}

export function toggleEntry(id) {
  return { type: TOGGLE_SELECTED, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export function setPrivacyFilter(filter) {
  return { type: SET_PRIVACY_FILTER, filter };
}

export function setTimeFilter(filter) {
  return { type: SET_TIME_FILTER, filter };
}
