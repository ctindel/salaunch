import React from 'react';
import FontAwesome from 'react-fontawesome';

export class ContactsListItem extends React.Component {

  render() {
    return (
      <tr>
          <td>{this.props.data.id }</td>
          <td>{this.props.data.firstName}</td>
          <td>{this.props.data.lastName}</td>
          <td>{this.props.data.email}</td>
          <td>{this.props.data.mobilePHone}</td>
          <td onClick={this.props.editFunction} className="text-center action"><FontAwesome name='pencil'/></td>
      </tr>
    )
  }
}
