import React from 'react';
import _ from 'lodash';

import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';

import { BarChart } from 'react-d3';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leaders: UserStore.getLeaders()
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    Events.addListener(UserStore.CHANGE_EVENT, this.updateState);

    componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    Events.removeListener(UserStore.CHANGE_EVENT, this.updateState);
  }

  updateState() {
    this.setState({
      leaders: UserStore.getLeaders()
    });
  }

  render() {
    var barData = _.filter(_.map(this.state.leaders, (leader, index) => {
      return {
        name: `${leader.firstname} ${leader.lastname}`,
        values: [{
          x: index + 1,
          y: leader.baclevel
        }]
      };
    }));

    return (
      <div>
        <h2>Blood alcohol leaderboard</h2>
        {(barData.length > 0) ?
          <BarChart data={barData}
                    width={986}
                    height={300}
                    fill={'#3182bd'}
                    yAxisLabel='&permil;'/> : null
        }
      </div>
    );
  }
}