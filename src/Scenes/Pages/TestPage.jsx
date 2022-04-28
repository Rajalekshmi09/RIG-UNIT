import React, { Component } from "react";
import TestPageContainer from "../Components/TestPageComponent/TestPageContainer";
import StatusBlock from "../Components/TestPageComponent/StatusBlock";
import StatusBlockRow2 from "../Components/TestPageComponent/StatusBlockRow2";
import { updateTitleElements } from "../../Redux/action";
import { connect } from "react-redux";
import SensorPage from "./DashboardPage/SensorPage";
class TestPage extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Test Page",
      type: "Test",
    });
  }

  render() {
    return (
      <div>
        <StatusBlock />

        {/*ADD bugid-(GOARIG_7014) */}
        <StatusBlockRow2 />
        <SensorPage />
        <TestPageContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateTitleElements,
};

const testPage = connect(mapStateToProps, mapDispatchToProps)(TestPage);

export default testPage;
