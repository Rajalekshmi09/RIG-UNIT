import React, { Component } from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import { dashboardSensor } from "../../../Services/constants";
const { n_shutdown, e_shutdown, live, offline } = dashboardSensor;

const styles = {
  online: {
    color: "#03fc28",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
  offline: {
    color: "red",
    position: "absolute",
    right: 20,
    top: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
};

class LiveStateBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let nShutdown = false;
    let eShutdown = false;

    let turboStart = this.props.app.turboStart;

    if (turboStart.length >= 0) {
      turboStart.map((they) => {
        if (they.name === "N.Shutdown Completed") {
          nShutdown = true;
        } else if (they.name === "E.Shutdown Completed") {
          eShutdown = true;
        }
      });
    }

    let isActive = false;
    if (this.props.app.showTarget === true) {
      isActive = true;
    }

    return (
      <div>
        <Row>
          {eShutdown ? (
            <p style={styles.offline}>{e_shutdown}</p>
          ) : (
            <Row>
              {nShutdown ? (
                <p style={styles.offline}>{n_shutdown}</p>
              ) : (
                <Row>
                  {isActive ? (
                    <p style={styles.online}>{live}</p>
                  ) : (
                    <p style={styles.offline}>{offline}</p>
                  )}
                </Row>
              )}
            </Row>
          )}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const liveState = connect(mapStateToProps, mapDispatchToProps)(LiveStateBlock);
export default liveState;
