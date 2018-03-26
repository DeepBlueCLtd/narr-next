import React from 'react'
import FilterLink from '../containers/FilterLink'
import PrivacyLink from '../containers/PrivacyLink'
import TimeLink from '../containers/TimeLink'
import {VisibilityFilters, PrivacyFilters, TimeFilters} from '../actions'

const Footer = () => (
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="data-head">
                <div className="data-list">
                    <span>Show:</span>
                    {' '}
                    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
                        All
                    </FilterLink>
                    {', '}
                    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
                        Unselected
                    </FilterLink>
                    {', '}
                    <FilterLink filter={VisibilityFilters.SHOW_SELECTED}>
                        Selected
                    </FilterLink>
                </div>
                <div className="data-list">
                    <span>Show:</span>
                    {' '}
                    <PrivacyLink filter={PrivacyFilters.SHOW_ALL}>
                        All
                    </PrivacyLink>
                    {', '}
                    <PrivacyLink filter={PrivacyFilters.SHOW_PUBLIC}>
                        Public
                    </PrivacyLink>
                    {', '}
                    <PrivacyLink filter={PrivacyFilters.SHOW_SENSITIVE}>
                        Sensitive
                    </PrivacyLink>
                    {', '}
                    <PrivacyLink filter={PrivacyFilters.SHOW_PRIVATE}>
                        Private
                    </PrivacyLink>
                </div>
                <div className="data-list">
                    <span>Show:</span>
                    {' '}
                    <TimeLink filter={TimeFilters.SHOW_ALL}>
                        All
                    </TimeLink>
                    {', '}
                    <TimeLink filter={TimeFilters.SHOW_LAST_MIN}>
                        last minute
                    </TimeLink>
                    {', '}
                    <TimeLink filter={TimeFilters.SHOW_LAST_5_MIN}>
                        last 5 mins
                    </TimeLink>
                </div>
            </div>
        </div>
    </div>
);

export default Footer