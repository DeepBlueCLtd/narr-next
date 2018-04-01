import {
  ButtonDropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input
} from "reactstrap";
import {
  PrivacyFilters,
  TimeFilters,
  filter,
  search,
  unFilter
} from "../../actions";
import { connect } from "react-redux";
import { entryTypes } from "../../reducers/Selectors";
import Export from "../../containers/Export";
import Hotkeys from "react-hot-keys";
import PrivacyLink from "../../containers/PrivacyLink";
import PropTypes from "prop-types";
import React from "react";
import TimeLink from "./../../containers/TimeLink";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: {
        Time: false,
        Privacy: false,
        Type: false
      },
      checkboxValues: {},
      searchKeyword: ""
    };
    // Bind the methods to the correct "this" context. SO when we access this in the functions we actually acess the class instance.
    this.toggle = this.toggle.bind(this);
    // this.checkboxHandler=this.checkboxHandler(this)
    // arrow function didnt have to bind and if we bind them that will cause problem to function logic
  }

  componentDidMount() {
    window.onload = function() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          document.getElementById(
            "txtBuildDateTime"
          ).innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "/narr-next/static/assets/Last_build", true);
      xhttp.send();
    };
  }

  toggle(e) {
    const { isExpanded } = this.state;
    Object.keys(isExpanded).forEach(x => {
      isExpanded[x] = isExpanded[x] === e.target.parentElement.id;
    });
    isExpanded[e.target.parentElement.id] = !this.state.isExpanded[
      e.target.parentElement.id
    ];
    this.setState({ isExpanded });
  }
  checkboxHandler(e) {
    const { checkboxValues } = this.state;
    checkboxValues[e.target.id] = !this.state.checkboxValues[e.target.id];
    this.setState({ checkboxValues });
    if (this.state.checkboxValues[e.target.id]) {
      this.props.filter(e.target.id);
    } else {
      this.props.unFilter(e.target.id);
    }
  }
  searchBarHandler(e) {
    this.setState({ searchKeyword: e.target.value }, () => {
      this.props.search(this.state.searchKeyword);
    });
  }

  render() {
    return (
      <React.Fragment>
        <h4>Filters</h4>
        <Hotkeys
          keyName="ctrl+f"
          onKeyDown={(_, e) => {
            e.preventDefault();
            this.search.focus();
          }}
        />
        <ButtonGroup>
          <ButtonDropdown
            id="Time"
            isOpen={this.state.isExpanded.Time}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Time</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <TimeLink filter={TimeFilters.SHOW_LAST_5_MIN}>
                  last 5 mins
                </TimeLink>
              </DropdownItem>
              <DropdownItem>
                <TimeLink filter={TimeFilters.SHOW_LAST_MIN}>last min</TimeLink>
              </DropdownItem>
              <DropdownItem>
                <TimeLink filter={TimeFilters.SHOW_ALL}>Show all</TimeLink>
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown
            id="Privacy"
            isOpen={this.state.isExpanded.Privacy}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Privacy</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <PrivacyLink filter={PrivacyFilters.SHOW_PUBLIC}>
                  Public
                </PrivacyLink>
              </DropdownItem>
              <DropdownItem>
                <PrivacyLink filter={PrivacyFilters.SHOW_PRIVATE}>
                  Private
                </PrivacyLink>
              </DropdownItem>
              <DropdownItem>
                <PrivacyLink filter={PrivacyFilters.SHOW_ALL}>
                  Show all
                </PrivacyLink>
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown
            id="Type"
            isOpen={this.state.isExpanded.Type}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Type</DropdownToggle>
            <DropdownMenu>
              {this.props.uniqueTypes &&
                this.props.uniqueTypes.sort().map(x => (
                  <div
                    className={
                      this.state.checkboxValues[x]
                        ? "btn-drop btn-primary"
                        : "btn-drop btn-secondary"
                    }
                  >
                    <input
                      type="checkbox"
                      id={x}
                      checked={this.state.checkboxValues[x]}
                      onClick={e => {
                        this.checkboxHandler(e);
                      }}
                      value={this.state.checkboxValues[x]}
                    />
                    <span>{x}</span>
                  </div>
                ))}
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
        <Input
          innerRef={s => {
            this.search = s;
          }}
          placeholder="Click or Press CTRL+F to search"
          value={this.state.searchKeyword}
          onChange={e => {
            this.searchBarHandler(e);
          }}
        />
        <Export />
      </React.Fragment>
    );
  }
}

Filters.propTypes = {
  filter: PropTypes.func.isRequired,
  unFilter: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  uniqueTypes: PropTypes.func.isRequired
};

// we can directly bind dispatch to a action by using the second parameters
const mapStateToProps = state => ({ uniqueTypes: entryTypes(state) });
export default connect(mapStateToProps, { filter, unFilter, search })(Filters);
