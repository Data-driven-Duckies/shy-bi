import React, { Children, Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import Navbar from '../components/Navbar';
import { getMatches, getLikedUsers, getUser, viewMatch } from '../actions';
import { isUserAuthenticated, getUsername } from '../modules/auth';
import styles from '../styles/CardHeader';

class Matches extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node,
    getMatches: PropTypes.func,
    getLikedUsers: PropTypes.func,
    matches: PropTypes.arrayOf(PropTypes.object),
    likes: PropTypes.arrayOf(PropTypes.object),
    getUser: PropTypes.func,
    viewMatch: PropTypes.func,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/home');
    } else {
      const username = getUsername();
      this.props.getMatches(username);
      this.props.getLikedUsers(username);
    }
  }

  componentDidMount() {
    this.props.viewMatch(getUsername());
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => {
        this.context.router.push(`/profile/${userName}`);
      });
  }

  render() {
    const username = getUsername();
    const matchesMenu = [
      { label: 'matches', path: `/matches/${username}` },
      { label: 'likes', path: `matches/likes/${username}` },
    ];

    const children = Children
      .map(this.props.children, child => React.cloneElement(child, {
        matches: this.props.matches,
        likes: this.props.likes,
        handleClick: this.handleClick,
      }));

    return (
      <Paper>
        <Navbar menus={matchesMenu} />
        <Card>
          <CardHeader
            title="Candidates"
            titleStyle={styles.title}
          />
        </Card>
        <div style={{ marginTop: '50px' }}>
          {children}
        </div>
      </Paper>

    );
  }
}

const mapStateToProps = ({ users }) => ({
  matches: users.matches,
  likes: users.likes,
});

export default connect(mapStateToProps, { getMatches, getLikedUsers, getUser, viewMatch })(Matches);
