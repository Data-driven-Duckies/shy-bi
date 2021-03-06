import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const renderAutoComplete = ({ location, handleUpdateInput }) => (
  <AutoComplete
    hintText="Type your city"
    dataSource={location || []}
    disableFocusRipple={false}
    onUpdateInput={handleUpdateInput}
    openOnFocus={true}
  />
);

renderAutoComplete.propTypes = {
  location: PropTypes.arrayOf(PropTypes.object),
  handleUpdateInput: PropTypes.func,
};

export default renderAutoComplete;
