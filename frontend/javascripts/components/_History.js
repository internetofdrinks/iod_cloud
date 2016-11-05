import React from 'react';
import _ from 'lodash';

import UserStore from '../stores/_UserStore';
import Events from '../util/_EventEmitter';

import { LineChart } from 'react-d3';

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: UserStore.getUsers()
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
      users: UserStore.getUsers()
    });
  }

  render() {
    let series = _.filter(_.map(this.state.users, user => {
      var values = _.filter(_.map(user.bacs || [], bac => {
        if(bac.baclevel == null || !bac.date) {
          return null;
        }
        return {
          x: new Date(bac.date),
          y: bac.baclevel
        };
      }));

      if(values.length > 0) {
        return {
          name: `${user.firstname} ${user.lastname}`,
          strokeWidth: 3,
          values: values
        }
      }
    }));

    function colorForEntry(index) {
      // var index = _.findIndex(,  => );
      // var index = barData[0].values.indexOf(entry);
      return ['#FF7F00', '#0566DC', '#00DD95', '#AE5600', '#023572'][index % 5];
    }

    return (
      <div>
        <h2>Global drunkness history</h2>
        {(series.length > 0) ?
          <LineChart data={series}
                     height={300}
                     width={952}
                     colors={colorForEntry}
                     legend={true}
                     yAxisLabel="Blood alcohol level [&permil;]" /> : null
        }
      </div>
    );
  }
}