import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import GraphComponent from "./ChartComponent";
import { connect } from "react-redux";
import { updateTableViewData } from "../../../Redux/action";
import { dashboardSensor } from "../../../Services/constants";
import { getTableView } from "../../../Services/requests";

const { sensorLabel, dummyData, chartMax } = dashboardSensor;

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartValue: [],
      textColor: "",
      cardList: [],
      dummygraphData: [
        {
          P1: dummyData, //dummyData = 0 in constant page
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
        {
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
        {
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
        {
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
        {
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
        {
          P1: dummyData,
          P2: dummyData,
          P3: dummyData,
          P4: dummyData,
          P5: dummyData,
          P6: dummyData,
          P7: dummyData,
          P10: dummyData,
          P13: dummyData,
          P14: dummyData,
          P16: dummyData,
          P17: dummyData,
          P20: dummyData,
          P21: dummyData,
          P22: dummyData,
          P23: dummyData,
          P24: dummyData,
          P25: dummyData,
          P27: dummyData,
          testdatadate: dummyData,
        },
      ],
    };
  }

  //Rendering the 6 graph y axis limits while updatinh the table
  componentDidMount() {
    getTableView((data) => {
      //getting this function(data) from request page
      const arrStr = this.props.app.targetKeys; //covertion string to number
      const dashboardDataNumArr = arrStr.map((i) => Number(i));
      let filteredTableData = data.filter((_, index) =>
        dashboardDataNumArr.includes(index)
      );
      //update the tableView rendering the component
      this.props.updateTableViewData(filteredTableData);
    });
  }

  //Initially to render graph with 0 value
  interval = setInterval(() => {
    {
      this.props.app.chartData.length !== 0
        ? this.prepareChartParams(this.props.app.chartData)
        : this.prepareChartParams(this.state.dummygraphData);
    }
  });

  prepareChartParams = (chartdata) => {
    let p1 = [];
    let p2 = [];
    let p3 = [];
    let p4 = [];
    let p5 = [];
    let p6 = [];
    let p7 = [];
    let p10 = [];
    let p13 = [];
    let p14 = [];
    let p16 = [];
    let p17 = [];
    let p20 = [];
    let p21 = [];
    let p22 = [];
    let p23 = [];
    let p24 = [];
    let p25 = [];
    let p27 = [];
    let date_Time = [];
    for (let i = 0; i < 6; i++) {
      p1.push(chartdata[i].P1);
      p2.push(chartdata[i].P2);
      p3.push(chartdata[i].P3);
      p4.push(chartdata[i].P4);
      p5.push(chartdata[i].P5);
      p6.push(chartdata[i].P6);
      p7.push(chartdata[i].P7);
      p10.push(chartdata[i].P10);
      p13.push(chartdata[i].P13);
      p14.push(chartdata[i].P14);
      p16.push(chartdata[i].P16);
      p17.push(chartdata[i].P17);
      p20.push(chartdata[i].P20);
      p21.push(chartdata[i].P21);
      p22.push(chartdata[i].P22);
      p23.push(chartdata[i].P23);
      p24.push(chartdata[i].P24);
      p25.push(chartdata[i].P25);
      p27.push(chartdata[i].P27);

      date_Time.push(
        new Date(chartdata[i].date_Time).toLocaleTimeString([], {
          hour12: false,
        })
      );
    }

    const arrStr = this.props.app.targetKeys;
    const dashboardDataNumArr = arrStr.map((i) => Number(i)); //covertion string to number

    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    ); //chartlabel

    let chartArray = [];
    chartArray.push(p1);
    chartArray.push(p2);
    chartArray.push(p3);
    chartArray.push(p4);
    chartArray.push(p5);
    chartArray.push(p6);
    chartArray.push(p7);
    chartArray.push(p10);
    chartArray.push(p13);
    chartArray.push(p14);
    chartArray.push(p16);
    chartArray.push(p17);
    chartArray.push(p20);
    chartArray.push(p21);
    chartArray.push(p22);
    chartArray.push(p23);
    chartArray.push(p24);
    chartArray.push(p25);
    chartArray.push(p27);

    let filteredData = chartArray.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );
    let filteredDataText;
    {
      this.props.app.chartData[0]
        ? (filteredDataText = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredDataText = []);
    }

    let textColor;
    const chartValue = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (this.props.app.tableViewData) {
        let chart = {
          size: 8,
          labels: date_Time,
          dataSet: {
            title: filteredDataText,
            chartData: filteredData[i],
            filteredDataLabel: filteredDataLabel[i],
            chartBackgroundColor: ["rgba(24,144,255,0.2)"],
            chartBorderColor: [
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
            ],
            chartTextColor: textColor,

            // GOARIG_7001 -del
            // upperLimitVal: this.props.app.tableViewData[i].upperlimit,
            // normalLimitVal: this.props.app.tableViewData[i].normallimit,
            // lowerLimitVal: this.props.app.tableViewData[i].lowerlimit,

            // GOARIG_7001 - add
            upperLimitVal: this.props.app.tableViewData[i].graph_upper,
            normalLimitVal: this.props.app.tableViewData[i].normallimit,
            lowerLimitVal: this.props.app.tableViewData[i].graph_lower,
          },
        };
        chartValue.push(chart);
        this.setState({
          cardList: chartValue,
        });
      }
    }
  };

  render() {
    if (
      this.state.cardList !== undefined &&
      this.state.cardList.length >= chartMax
    ) {
      return (
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.cardList
              ? this.state.cardList.map((it, y) => {
                  return (
                    <Col span={8}>
                      <Row style={{ paddingTop: "30px" }}>
                        <Card
                          style={{
                            backgroundColor: "#131633",
                            height: "250px",
                            border: "none",
                            borderRadius: "0px",
                            width: "450px",
                          }}
                        >
                          {it.title}
                          <GraphComponent
                            data={
                              it.dataSet.chartData ? it.dataSet.chartData : []
                            }
                            labels={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : []
                            }
                            label={
                              it.dataSet.filteredDataLabel
                                ? it.dataSet.filteredDataLabel
                                : "No Label"
                            }
                            title={
                              it.dataSet.title[y]
                                ? it.dataSet.title[y]
                                : "No Data"
                            }
                            backgroundColor={
                              it.dataSet.chartBackgroundColor
                                ? it.dataSet.chartBackgroundColor
                                : []
                            }
                            borderColor={
                              it.dataSet.chartBorderColor
                                ? it.dataSet.chartBorderColor
                                : []
                            }
                            textColor={
                              it.dataSet.chartTextColor
                                ? it.dataSet.chartTextColor
                                : []
                            }
                            upperLimit={
                              it.dataSet.upperLimitVal
                                ? it.dataSet.upperLimitVal
                                : []
                            }
                            normalLimit={
                              it.dataSet.normalLimitVal
                                ? it.dataSet.normalLimitVal
                                : []
                            }
                            lowerLimit={
                              it.dataSet.lowerLimitVal
                                ? it.dataSet.lowerLimitVal
                                : []
                            }
                          />
                        </Card>
                      </Row>
                    </Col>
                  );
                })
              : []}
          </Row>
        </div>
      );
    } else {
      return <div className="site-card-wrapper"></div>;
    }
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  updateTableViewData,
};
const card = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default card;
