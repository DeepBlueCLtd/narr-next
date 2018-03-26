import React from 'react'
import FilterLink from '../containers/FilterLink'
import PrivacyLink from '../containers/PrivacyLink'
import TimeLink from '../containers/TimeLink'
import {VisibilityFilters, PrivacyFilters, TimeFilters} from '../actions'

const Footer = () => (
    <div className="row">
        <div className="col-sm-12 col-md-12">
            <div className="entry-head">
                <div className="entry-show-list">
                    <span>Show:</span>
                    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
                        All
                    </FilterLink>
                    <span>,</span>
                    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
                        Unselected
                    </FilterLink>
                    <span>,</span>
                    <FilterLink filter={VisibilityFilters.SHOW_SELECTED}>
                        Selected
                    </FilterLink>
                </div>
                <div className="entry-show-list">
                    <span>Show:</span>
                    <PrivacyLink filter={PrivacyFilters.SHOW_ALL}>
                        All
                    </PrivacyLink>
                      <span>,</span>
                    <PrivacyLink filter={PrivacyFilters.SHOW_PUBLIC}>
                        Public
                    </PrivacyLink>
                    <span>,</span>
                    <PrivacyLink filter={PrivacyFilters.SHOW_SENSITIVE}>
                        Sensitive
                    </PrivacyLink>
                    <span>,</span>
                    <PrivacyLink filter={PrivacyFilters.SHOW_PRIVATE}>
                        Private
                    </PrivacyLink>
                </div>
                <div className="entry-show-list">
                    <span>Show:</span>
                    <TimeLink filter={TimeFilters.SHOW_ALL}>
                        All
                    </TimeLink>
                    <span>,</span>
                    <TimeLink filter={TimeFilters.SHOW_LAST_MIN}>
                        last minute
                    </TimeLink>
                    <span>,</span>
                    <TimeLink filter={TimeFilters.SHOW_LAST_5_MIN}>
                        last 5 mins
                    </TimeLink>
                </div>
            </div>
        </div>
    </div>
);

export default Footer