import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'


const EntryList = ({ entries, onEntryClick }) => (
    <div className="row">
      <div className="col-sm-12 col-md-12">
        <div className="entry-list-detail margin-top-2">
          <ul>
            {entries.map((entry, index) => (
              <Entry key={index} {...entry} onClick={() => onEntryClick(index)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
);

EntryList.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired,
            created: PropTypes.object.isRequired,
            m_type: PropTypes.string.isRequired,
            privacy: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onEntryClick: PropTypes.func.isRequired
};

export default EntryList