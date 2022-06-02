import React, { Component } from "react";
import { Col, Row, Progress } from "antd";
import { connect } from "react-redux";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";
import LiveStateBlock from "./LiveStateBlock";
import CVStageComponent from "../TestPageComponent/CVStageComponent";

const { sensorLabel } = dashboardSensor;

class StatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardlist,
      persons: [],
      tabledata: [],
      filteredTableData: [],
    };
  }

  componentDidMount() {
    //getting data from DB once
    getTableView((data) => {
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      this.setState({
        tabledata: data,
      });
      //filtering the limit values
      let filteredTableData = this.state.tabledata.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      this.setState({
        filteredTableData: filteredTableData,
      });
    });
  }

  render() {
    let persons;
    let persons1;
    let filteredData;
    let filteredData1;
    let receivedDate;
    let colors = [];
    //covertion string to number
    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i));

    //filltering the status block label
    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );

    {
      this.props.app.chartData[0]
        ? (filteredData = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData = []);
    }

    {
      this.props.app.chartData[1]
        ? (filteredData1 = Object.values(this.props.app.chartData[1]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredData1 = []);
    }

    {
      this.props.app.chartData[0]
        ? (persons = filteredData)
        : (persons = [0, 0, 0, 0, 0, 0]);
    }
    {
      this.props.app.chartData[1]
        ? (persons1 = filteredData1)
        : (persons1 = [0, 0, 0, 0, 0, 0]);
    }

    {
      this.props.app.chartData[0]
        ? (receivedDate = this.props.app.chartData[0].testdatadate)
        : (receivedDate = null);
    }

    //Assigning statusblock data color variation
    /* eslint-disable */
    this.state.filteredTableData
      ? this.state.filteredTableData.map((it, y) => {
          if (parseInt(persons[y]) > parseInt(it.upperlimit)) {
            colors = colors.concat("red");
          } else if (parseInt(persons[y]) < parseInt(it.lowerlimit)) {
            colors = colors.concat("yellow");
          } else {
            colors = colors.concat("#03fc28");
          }
        })
      : [];

    const date = new Date();
    const db_date = new Date(receivedDate);

    return (
      <div>
        <div>
          <LiveStateBlock />
        </div>
        <Row>
          {/* {persons.map((It, y) => (
            <Col className="statusblock-col">
              <div className="statistic-block block">
                <Row>
                  {/* up and down arrow column */}
          {/* <Col>
                    {persons1[y] < It ? (
                      <img
                        src="./images/up-arrow-1.gif"
                        alt="Arrow"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    ) : (
                      <img
                        src="./images/down-arrow-1.gif"
                        alt="Arrow"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    )}
                  </Col> */}
          {/* value displaying column */}
          {/* <Col
                    className="number dashtext-1"
                    style={{ paddingLeft: "15%", fontSize: "23px" }}
                  >
                    {/* getting the color from the color array */}
          {/* <span style={{ color: colors[y] }}>{It}</span>
                  </Col>
                </Row> */}

          {/* <div className="progress progress-template">
                  <div
                    role="progressbar"
                    style={{
                      width: "100%",
                      ariavaluenow: "30",
                      ariavaluemin: "0",
                      ariavaluemax: "100",
                    }}
                    className="progress-bar progress-bar-template dashbg-1"
                  ></div>
                </div> */}
          {/*  Title column */}
          {/* <div className="title">
                  <div style={{ fontSize: "10px" }}>
                    <strong>{filteredDataLabel[y]}</strong>
                  </div>
                </div>
              </div>
            </Col> */}
          {/* ))}  */}
          {/* GOARIG_7002 - ADD */}
          <Row className="progress_box" style={{ marginLeft: "10px" }}>
            <Col>
              <div className="statistic-block block">
                <Progress
                  strokeWidth={10}
                  strokeColor="#03fc28"
                  type="circle"
                  width={60}
                  style={{ marginLeft: "28px" }}
                  percent={this.props.app.chartData[0].P28}
                />
                <div className="title">
                  <div style={{ fontSize: "10px" }}>
                    <strong>bypass valve2</strong>
                  </div>
                </div>
              </div>
            </Col>{" "}
          </Row>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const statuspage = connect(mapStateToProps, mapDispatchToProps)(StatusBlock);
export default statuspage;
