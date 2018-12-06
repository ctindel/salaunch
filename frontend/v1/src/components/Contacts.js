import React from 'react';
import * as actions from '../actions/ContactsActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CModalWindow from './shared/ModalWindow';
import {ListTypes} from '../actions/ContactsActions';

import { Row, Col, Input, InputGroup, InputGroupButton, Button, ButtonGroup } from 'reactstrap';


import ContactsList from './ContactsList';

class Contacts extends React.Component {

    _onChange = (e) => {

      if (e.target.value) {
        this.props.actions.inputSearchParam(e.target.value)
        this.props.actions.filterSearchResult(e.target.value);
      } else {
        this.props.actions.inputSearchParam('');
        this.props.actions.filterSearchResult('');
      }};

    _totalContacts = () => {
      const mappedFavorites = this.props.favorites.map(y => y.contactId);

      let sum = this.props.searched ? //Is the data regular or searched
      (this.props.activeList === "ALL" // Is the view showing all data or just favorites
        ? this.props.searchedData.reduce((sum, value) => { return sum + 1; }, 0) // All searched data
          : this.props.searchedData.filter(x => mappedFavorites.includes(x.id)).reduce((sum, value) => { return sum+1; }, 0) + " favourite") // Favorites searched data
            : (this.props.activeList === "ALL" // Is the view showing all data or just favorites
              ? this.props.data.length // All searched data
                : this.props.favorites.reduce((sum, value) => { return sum + 1; }, 0) + " favourite") // Favorites data

      return sum;
    };

  render() {

    return (
      <div>
        <br />
        <Row>
          <Col xs="12">
            <InputGroup>
              <Input
                ref="firstName"
                type="text"
                placeholder="First Name"
                value={this.props.input.firstName}
                onChange={(e) => this.props.actions.inputFirstName(e.target.value)}/>
              <Input
                type="text"
                placeholder="Last Name"
                value={this.props.input.lastName}
                onChange={(e) => this.props.actions.inputLastName(e.target.value)} />
              <Input
                type="text"
                placeholder="Email Address"
                value={this.props.input.email}
                onChange={(e) => this.props.actions.inputEmail(e.target.value)} />
              <Input
                type="text"
                placeholder="Mobile Phone"
                value={this.props.input.mobilePhone}
                onChange={(e) => this.props.actions.inputPhonenumber(e.target.value)} />
              <InputGroupButton>
                <Button
                  disabled={this.props.input.lastName.length < 2 || this.props.input.mobilePhone.length < 2 || !new RegExp(/^\d+$/).test(this.props.input.mobilePhone)}
                  color="success"
                  onClick={() => {
                   this.props.actions.add(this.props.data.length ? this.props.data[this.props.data.length-1].id+1 : 0, this.props.input.firstName, this.props.input.lastName, this.props.input.email, this.props.input.mobilePhone);
                  }}>Add</Button>
              </InputGroupButton>
            </InputGroup>

            <br />

            <InputGroup>
              <Input
                ref="searchParam"
                type="text"
                placeholder="Search"
                value={this.props.searchParam}
                onChange={(e) => this._onChange(e)}/>
            </InputGroup>
          </Col>
          <Col xs="12">
            <ContactsList />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <p className="text-muted"> You have <b>{this._totalContacts()}</b> contact(s).</p>
          </Col>
          <Col xs="12" md="6">
            <ButtonGroup size="sm" className="float-right">
              <Button onClick={() => this.props.actions.toggleListType(ListTypes.ALL)} color={this.props.activeList === ListTypes.ALL ? "dark" : "light" }>All</Button>
              <Button onClick={() => this.props.actions.toggleListType(ListTypes.FAVORITES)} color={this.props.activeList === ListTypes.FAVORITES ? "dark" : "light" }>Favorites</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <CModalWindow />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
    data: state.contacts.data,
    favorites: state.contacts.favorites,
    input: state.contacts.input,
    activeList: state.contacts.activeList,
    searchParam: state.contacts.searchParam,
    searchedData: state.contacts.searchedData,
    searched: state.contacts.searched
	};
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Contacts);
