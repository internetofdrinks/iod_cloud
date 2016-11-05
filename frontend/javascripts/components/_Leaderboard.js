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
    var barData = [
      {
        name: `Current Alcohol level`,
        values: _.filter(_.map(this.state.leaders, (leader, index) => {
          if(leader && leader.baclevel) {
            return {
              x: leader.firstname || leader.userid,
              y: leader.baclevel
            };
          }
        }))
      }
    ];

    function colorForEntry(entry) {
      // var index = _.findIndex(,  => );
      var index = barData[0].values.indexOf(entry);
      return ['#FF7F00', '#0566DC', '#00DD95', '#AE5600', '#023572'][index % 5];
    }

    return (
      <div>
        <h2>Blood alcohol leaderboard</h2>
        {(barData.length > 0) ?
          <BarChart data={barData}
                    width={986}
                    height={300}
                    fill={"#FF7F00"}
                    colorAccessor={colorForEntry}
                    yAxisLabel='&permil;'/> : null
        }
      </div>
    );
  }
}