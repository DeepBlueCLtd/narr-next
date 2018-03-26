import { combineReducers } from 'redux'
import entries from './entries'
import visibilityFilter from './visibilityFilter'
import privacyFilter from './privacyFilter'
import timeFilter from './timeFilter'
import cards from './cards';


const entryApp = combineReducers({
    visibilityFilter,
    privacyFilter,
    timeFilter,
    entries,
    cards,
});

export default entryApp