import React from 'react';
import UserForm from '../components/_UserForm';
import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';

export default class ShowUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.updateState = this.updateState.bind(this);

    UserStore.fetchUser(this.props.params.id);
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState)
  }

  componentWillUnmount() {
    Events.removeListener(UserStore.CHANGE_EVENT, this.updateState)
  }

  updateState() {
    this.setState({
      user: UserStore.getUser(this.props.params.id)
    });
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col">

      </div>
    );
  }
}
