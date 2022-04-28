import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import TurboConfig from "./ConfigurationPage/TurboConfig";
import DashboardConfig from "./ConfigurationPage/DashboardConfig";
import FooterElement from "../Components/footer/FooterElement";
import HeaderComponent from "../Components/Header/HeaderComponent";
import TitleElement from "../Components/subComponents/TitleElement";
import LeftbarComponent from "../Components/LeftBar/LeftbarComponent";
import TestPage from "./TestPage";
import GraphView from "../Pages/DashboardPage/GraphView";
import TableView from "./DashboardPage/TableView";
import PreTesting from "./DashboardPage/PreTesting";
import SensorPage from "./DashboardPage/SensorPage";
import RunningReport from "./Reports/RunningReport";
import RunningReport2 from "./Reports/RunningReport2";
import TestConfig from "./ConfigurationPage/TestConfig";
import ParamConfig from "./ConfigurationPage/ParamConfig";
import ExportData from "./Reports/ExportData";
import PerformanceReport from "./Reports/PerformanceReport";
import EndurenceReport from "./Reports/EndurenceReport";
import PerformanceAfterEndurence from "./Reports/PerformanceAfterEndurence";
import AcceptanceReport from "./Reports/AcceptanceReport";
import AcceptanceReport2 from "./Reports/AcceptanceReport2";
import axios from "axios";
import {
  updateTurboConfig,
  updateTestConfigPage,
  updateParamConfig,
  updateUserParameter,
  updateTableStatusData,
  updateTestIdCount,
  updateTableViewData,
  fetchingDelayValue,
  updateChartData,
  updateChartData2,
  initiateTurboStart,
  gettingPreTestingSensor,
} from "../../Redux/action";
import {
  getTurboConfigData,
  getTestConfigData,
  getParamConfigData,
  turbineConfigSubmit,
  requestStatusData,
  getHandleChangetestID,
  getTableView,
  gettingChartData,
  getPreTestingDetails,
} from "../../Services/requests";
import { testParamHash } from "../../Services/constants";

const { Content, Header, Footer } = Layout;
const { nShutdowndata, eShutdowndata } = testParamHash;

export class MainComponent extends Component {
  /*ADD bugid-(GOARIG_7017) */
  constructor(props) {
    super(props);
    this.state = {
      testDataInsert: false,
    };
  }

  componentDidMount() {
    // fetch turbo config data on application load
    getTurboConfigData((data) => {
      this.props.updateTurboConfig(data);
    });

    // fetch test config data on application load
    getTestConfigData((data) => {
      this.props.updateTestConfigPage(data);
    });

    // fetch param config data on application load
    getParamConfigData((data) => {
      this.props.updateParamConfig(data);
    });

    // fetch turboconfig submit form data on application load
    turbineConfigSubmit((data) => {
      this.props.updateTurboConfig(data);
    });

    // fetch turbo config data on application load
    requestStatusData((data) => {
      this.props.updateTableStatusData(data);
    });

    // fetch turbine ID Name  on application load
    getHandleChangetestID((data) => {
      this.props.updateTestIdCount(data);
    });

    getPreTestingDetails((data) => {
      this.props.gettingPreTestingSensor(data);
    });

    // fetch graphvalue on application load
    getTableView((data) => {
      //getting this function(data) from request page
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      let filteredTableData = data.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      this.props.updateTableViewData(filteredTableData);
    });

    /*ADD bugid-(GOARIG_7017) */
    if (this.state.testDataInsert === false) {
      axios
        .post("http://localhost:7000/testdatainsert.php")
        .then(function (response) {
          this.setState({
            testDataInsert: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // fetch livedata from DB and store redux store
    //it has 6 rows
    //it is used for graph and live data status block
    //graph.php(live data)
    setInterval(() => {
      if (this.props.app.resetButtonClick !== 1) {
        gettingChartData((data) => {
          //first 7th row is for live data using for graph display
          //getting data from 8 rows of graph.php response ,it has get testcommands
          let ChartValue = data.slice(0, 7);
          this.props.updateChartData(ChartValue);

          let CommandValue = data.slice(7);
          this.props.initiateTurboStart(CommandValue);
        });
      } else {
        let chartArray = [0, 0, 0, 0, 0, 0, 0];
        this.props.updateChartData(chartArray);
      }
    }, 1000);

    /*ADD bugid-(GOARIG_7014) */
    //statusblock2.php(this for 2nd row display from view table)
    // setInterval(() => {
    //   gettingChartData2((data) => {
    //     this.props.updateChartData2(data);
    //   });
    // }, 5000);

    // {/*ADD bugid-(GOARIG_7022) */}
    //getdata.php(command status)

    // setInterval(() => {
    //   const nShutdowndataArray = this.props.app.turboStart.filter((it) =>
    //     nShutdowndata.find((val) => val === it.name)
    //   );

    //   const eShutdowndataArray = this.props.app.turboStart.filter((it) =>
    //     eShutdowndata.find((val) => val === it.name)
    //   );

    //   if (
    //     this.props.app.testIdData !== 0 &&
    //     nShutdowndataArray.length < 2 &&
    //     eShutdowndataArray.length < 2
    //   ) {
    //     getSensorData((data) => {
    //       let val = data;
    //       if (this.props.app.communication === true && val.length >= 1) {
    //         this.props.initiateTurboStart(val);
    //       }
    //     });
    //   }
    // }, 3000);
  }

  render() {
    const appData = this.props.app;
    const { mainPage } = appData;
    return (
      <Layout>
        <Header style={{ paddingLeft: "10px", paddingRight: "0" }}>
          <HeaderComponent />
        </Header>
        <Layout>
          <LeftbarComponent />
          <Content>
            <TitleElement />
            {mainPage === "graphView" ? <GraphView /> : []}
            {mainPage === "tableView" ? <TableView /> : []}
            {mainPage === "preTest" ? <PreTesting /> : []}
            {mainPage === "sensorPage" ? <SensorPage /> : []}
            {mainPage === "testPage" ? <TestPage /> : []}
            {mainPage === "turboConfig" ? <TurboConfig /> : []}
            {mainPage === "dashboardConfig" ? <DashboardConfig /> : []}
            {mainPage === "testConfig" ? <TestConfig /> : []}
            {mainPage === "paramConfig" ? <ParamConfig /> : []}
            {mainPage === "runningReport" ? <RunningReport /> : []}
            {mainPage === "runningReport2" ? <RunningReport2 /> : []}
            {mainPage === "exportData" ? <ExportData /> : []}
            {mainPage === "performanceReport" ? <PerformanceReport /> : []}
            {mainPage === "endurenceReport" ? <EndurenceReport /> : []}
            {mainPage === "performanceafterEndurence" ? (
              <PerformanceAfterEndurence />
            ) : (
              []
            )}
            {/*ADD AcceptanceReport bugid-(GOARIG_7003) */}
            {mainPage === "acceptanceReport" ? <AcceptanceReport /> : []}
            {mainPage === "acceptanceReport2" ? <AcceptanceReport2 /> : []}
          </Content>
        </Layout>
        <Footer>
          <FooterElement />
        </Footer>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateTurboConfig,
  updateTestConfigPage,
  updateTableStatusData,
  updateParamConfig,
  updateUserParameter,
  updateTestIdCount,
  updateTableViewData,
  fetchingDelayValue,
  updateChartData,
  updateChartData2,
  initiateTurboStart,
  gettingPreTestingSensor,
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
export default MainContainer;
