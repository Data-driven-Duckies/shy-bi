import React, { PropTypes, cloneElement } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import NotificationBadge from './Badges';

const style = {
  backgroundColor: 'white',
  padding: '30px',
  actionMenuTextColor: '#FF4081',
};

const Header = ({ handleClick, numberOfMatches, numberOfMessages, logOut, handleToggle, auth, location }) => {
  const renderFlatButton = (label, path) => {
    const flatButton = (
      <FlatButton
        label={label}
        labelStyle={{ fontFamily: 'Roboto Condensed', color: '#FF4081', fontSize: '150%' }}
        hoverColor="#FCE4EC"
        containerElement={<Link to={path}>{label}</Link>}
      />
   );
    if (label === 'Log Out') return cloneElement(flatButton, { onTouchTap: logOut });
    return flatButton;
  };

  const renderAppBar = (label, path) => (
    <AppBar
      title="Bind."
      style={style}
      onLeftIconButtonTouchTap={handleToggle}
      iconElementRight={renderFlatButton(label, path)}
      titleStyle={{ fontFamily: 'Bitter', color: '#FF4081', fontSize: '400%' }}
      zDepth={0}
    >
      {
        auth &&
          <NotificationBadge
            numberOfMatches={numberOfMatches}
            numberOfMessages={numberOfMessages}
            handleClick={handleClick}
          />
      }
    </AppBar>
  );

  if (!auth) {
    if (location === '/login') return renderAppBar('Sign UP', '/signup');
    return renderAppBar('Log In', '/login');
  }
  return renderAppBar('Log Out');
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

export default Header;
