
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'react-bootstrap';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';

import 'style/PersonalData.scss';


let Emails = React.createClass({

  render: function () {
    // i18n messages
    const email_label = (
            <FormattedMessage
              id="emails.email"
              defaultMessage={`Email`} />),
          button_add = (
            <FormattedMessage
              id="emails.button_add"
              defaultMessage={`Add`} />);

    return (
        <div className="emailsview-form-container ">
            <TableList entries={this.props.emails} />
            <div className="form-content">
              <form id="emailsview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="emails-form" className="tabpane">
                  <TextControl name="email"
                               label={email_label}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <Button bsStyle="primary"
                          onClick={this.props.handleAdd}>
                        {button_add}
                  </Button>
                </fieldset>
              </form>
            </div>
        </div>
    );
  }
});

Emails.propTypes = {
  emails: PropTypes.array
}

export default Emails;
