import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import { getUsername, isUserAuthenticated } from '../modules/auth';
import RecommendedUserList from '../components/RecommendedUserList';
import { getRecommendedUsers, getUser } from '../actions';
import styles from '../styles/CardHeader';

class RecommendedUsers extends Component {
  static propTypes = {
    recommended: PropTypes.arrayOf(PropTypes.object.isRequired),
    getRecommendedUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (!isUserAuthenticated()) {
      this.context.router.push('/home');
    } else {
      this.props.getRecommendedUsers(getUsername());
    }
  }

  handleClick = (userName) => {
    this.props.getUser(userName)
      .then(() => this.context.router.push(`/profile/${userName}`));
  }

  render() {
    return (
      <div>
        <Card style={{ position: 'fixed', width: '100%' }}>
          <CardHeader
            title="Recommended for You"
            titleStyle={styles.title}
            subtitle="Based on our special algorithm"
            subtitleStyle={styles.subtitle}
          />
        </Card>
        <RecommendedUserList recommended={this.props.recommended} handleClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  recommended: users.recommended,
});

export default connect(mapStateToProps, { getUser, getRecommendedUsers })(RecommendedUsers);
