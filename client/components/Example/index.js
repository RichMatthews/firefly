import React from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import bb8 from '../../../icons/bb-8.svg'
import c3p0 from '../../../icons/C3P-0.svg'
import vader from '../../../icons/vader.svg'
import fett from '../../../icons/fett.svg'
import './index.scss';

export class Example extends React.Component {
  state = {
    robots: [
      {name: 'C-3P0', points: '2,983', icon: c3p0, active: false},
      {name: 'Darth Vader', points: '2,676', icon: vader, active: false},
      {name: 'BB-8', points: '1,292', icon: bb8, active: false},
      {name: 'Boba Fett', points: '872', icon: fett, active: true},
    ]
  }

  checkRobot = (e, checkRobot) => {
    let robots = [...this.state.robots];
    let filteredRobot = this.state.robots.filter(robot => robot.name == checkRobot.name)
    let robot = this.state.robots.find(r => r.name == filteredRobot[0].name)
    robot.name = e.target.value;
    filteredRobot = robot;
    this.setState({filteredRobot})
  }

  activateRobot = (e, checkRobot) => {
    let robots = [...this.state.robots];
    let filteredRobot = this.state.robots.filter(robot => robot.name == checkRobot.name)
    let robot = this.state.robots.find(r => r.name == filteredRobot[0].name)
    robot.active = true;
    filteredRobot = robot;
    let unfilteredRobots = this.state.robots.filter(r => r.name != robot.name)
    unfilteredRobots.map((unfilteredRobot) => {
      unfilteredRobot.active = false
      this.setState({unfilteredRobot})
    })
    this.setState({filteredRobot})
  }


  render(){
    return(
      <div className="container">
        <div className="robotsContainer">
          {this.state.robots.map((robot, index) => (
            <div
              className="robot"
              onClick={(e) => this.activateRobot(e, robot)}
            >
            <img className="mobileIcons" src={robot.icon} />
            <div className="mobileData">
              <div className="mobileName"> {robot.name} </div>
              <div className="mobilePoints"> {robot.points} </div>
            </div>
            </div>
          ))}
        </div>
        <div className="mobileContainer">
          {this.state.robots.map((robot, index) => (
            <div className="robotContainerMobile">
              <div className="robotIconMobile">
                <img src={robot.icon} />
              </div>
            <div className="robotDataMobile">
                <div className="robotNameMobile">
                  <input
                    className="changeRobotName"
                    value={robot.name}
                    name={robot.name}
                    onChange={(e) => this.checkRobot(e, robot)}
                  />
                </div>
                <div className="robotPoints">{robot.points} points</div>
              </div>
            </div>
          ))}
        </div>
        <div className="activeClass">
          {this.state.robots.map((robot, index) => (
            <div>
              {robot.active ?
                <div className="activeRobot">
                  <div className="robotIcon">
                    <img src={robot.icon} />
                  </div>
                  <div className="robotData">
                    <div>
                      <input
                        className="robotName active"
                        onChange={(e) => this.checkRobot(e, robot)}
                        value={robot.name}
                      />
                    </div>
                    <div className="points">{robot.points} points</div>
                  </div>
                </div>
                :
                null
              }
            </div>
          ))}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  myState: state.myState
});

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example);
