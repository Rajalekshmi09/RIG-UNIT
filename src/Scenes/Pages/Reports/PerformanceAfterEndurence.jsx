import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Form,
  message,
  Spin,
} from "antd";
import axios from "axios";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import {
  performance,
  reportAlert,
  CompanyDetails,
} from "../../../Services/constants";
import Doc from "./DocService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoRig from "../../../Images/logoRig.png";
import logo from "../../../Images/logo.png";

const {
  RPM1,
  RPM2,
  Minutes,
  trubineInletTemp,
  ComprInletPr,
  ComprOutletPr,
  PrRatio,
  AirMassFlow,
} = performance;
const { Option } = Select;
const { turboID_alert, testNo_alert, testno_check } = reportAlert;

class PerformanceAfterEndurence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportOut1: [],
      reportOut2: [],
      testno: [],
      testno1: [],
      turboIdVal: [],
      tester: "",
      witness: "",
      loading: false,
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "Performance After Endurence Report",
      type: "Report",
    });
  }

  //exporting ReportPDF
  getReportPDF = () => {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(75, 10, "PERFORMENCE AFTER ENDURENCE TEST REPORT");
    var image = new Image();
    image.src = "../../../Images/up-arrow-1.gif";
    doc.addImage(logoRig, "PNG", 10, 25, 75, 20);
    doc.autoTable({
      html: "#report-constants",
      startX: 50,
      startY: 51,
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },

      bodyStyles: {
        lineColor: "black",
      },
      tableWidth: "wrap",
      theme: "grid",
    });
    doc.autoTable({
      html: "#example1",
      startY: 93,
      didParseCell: function (cell, data) {
        if (
          cell.row.section === "body" &&
          (cell.row.index === 1 || cell.row.index === 3)
        ) {
          cell.cell.styles.fontStyle = "bold";
          cell.cell.styles.textColor = "black";
        }
      },
      margins: {
        top: 40,
        bottom: 60,
        left: 5,
        right: 5,
      },
      headerStyles: {
        lineWidth: 0.1,
        fillColor: "white",
        textColor: "black",
        fontSize: 6,
        fontStyle: "bold",
        lineColor: "black",
        halign: "center",
      },
      bodyStyles: {
        lineColor: "black",
        fontSize: 6,
        fontStyle: "bold",
      },
      theme: "grid",
    });

    let finalY = doc.lastAutoTable.finalY;

    let tester = this.state.tester;
    if (null != localStorage.getItem("rTestedBy")) {
      tester = localStorage.getItem("rTestedBy");
    }
    let rWitnessName = this.state.witness;
    if (
      null !== localStorage.getItem("rWitnessName") &&
      localStorage.getItem("rWitnessName") !== undefined
    ) {
      rWitnessName = localStorage.getItem("rWitnessName");
    }

    doc.setFontSize(8);
    //doc.setTextColor(255, 0, 0);
    doc.text(15, finalY + 10, "Tested By: ");

    const textWidth = doc.getTextWidth("Tested By: ");
    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    doc.line(15, finalY + 11, 10 + (textWidth + 4), finalY + 11);
    var testerAry = tester.split(",");
    var incrementHeight = 5;
    if (testerAry.length > 0) {
      for (var i = 0; i < testerAry.length; i++) {
        doc.text(15, finalY + 13 + incrementHeight, testerAry[i]);
        incrementHeight += 5;
      }
    }
    doc.text(150, finalY + 10, "Witnessed By: ");
    const textWidth1 = doc.getTextWidth("Witnessed By: ");
    doc.line(150, finalY + 11, 150 + (textWidth1 - 2), finalY + 11);
    var rWitnessNameAry = rWitnessName.split(",");
    incrementHeight = 5;
    if (rWitnessNameAry.length > 0) {
      for (i = 0; i < rWitnessNameAry.length; i++) {
        doc.text(150, finalY + 13 + incrementHeight, rWitnessNameAry[0]);
        incrementHeight += 5;
      }
    }

    doc.save("PerformanceafterendurenceReport.pdf");
  };

  //viewing  report in the table
  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning(turboID_alert);
    } else if (this.state.testno1 === "" || this.state.testno1.length === 0) {
      message.warning(testNo_alert);
    }
    if (
      this.state.turboIdVal !== "" &&
      this.state.testno1 !== "" &&
      this.state.turboIdVal.length !== 0 &&
      this.state.testno1.length !== 0
    ) {
      axios
        .post("http://192.168.0.167:5000/Performance.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          if (typeof res.data !== "string") {
            this.setState({
              reportOut1: res.data[0],
              reportOut2: res.data[1],
            });
          } else {
            message.warning(testno_check);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });
      axios
        .post("http://192.168.0.167:5000/getnames.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          this.setState({
            tester: res.data[0].tester,
            witness: res.data[0].witness,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err.res);
        });
    }
  };

  createPdf = (html) => Doc.createPdf(html);

  //delect the test id
  handleChangeTestID = (value) => {
    axios
      .post("http://192.168.0.167:5000/exportData.php", { turboIdVal: value })
      .then((res) => {
        let data = res.data;
        if (typeof data === "string") {
          this.setState({
            testno: [],
          });
        } else if (data.length > 0 && typeof data !== "string") {
          this.setState({
            testno: data,
          });
        }
        this.setState({
          turboIdVal: value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //select the test number
  handleChangeTestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };
  clearReport = () => {
    this.setState({
      testno: null,
      turboIdVal: null,
    });
  };
  render() {
    var rpm1 = Math.round(this.state.reportOut1.speed_time * 100) / 100;
    var rpm2 = Math.round(this.state.reportOut2.speed_time * 100) / 100;
    var Turbine_Inlet1 =
      Math.round(this.state.reportOut1.Turbine_Inlet * 100) / 100;
    var Turbine_Inlet2 =
      Math.round(this.state.reportOut2.Turbine_Inlet * 100) / 100;
    var Compr_Inlet_pr1 =
      Math.round(this.state.reportOut1.Compr_Inlet_pr * 100) / 100;
    var Compr_Inlet_pr2 =
      Math.round(this.state.reportOut2.Compr_Inlet_pr * 100) / 100;
    var Oil_pr1 = Math.round(this.state.reportOut1.Oil_pr * 100) / 100;
    var Oil_pr2 = Math.round(this.state.reportOut2.Oil_pr * 100) / 100;
    var Oil_temp1 = Math.round(this.state.reportOut1.Oil_temp * 100) / 100;
    var Oil_temp2 = Math.round(this.state.reportOut2.Oil_temp * 100) / 100;
    var Compr_Outlet_pr1 =
      Math.round(this.state.reportOut1.Compr_Outlet_pr * 100) / 100;
    var Compr_Outlet_pr2 =
      Math.round(this.state.reportOut2.Compr_Outlet_pr * 100) / 100;
    var pr_ratio1 = Math.round(this.state.reportOut1.pr_ratio * 100) / 100;
    var pr_ratio2 = Math.round(this.state.reportOut2.pr_ratio * 100) / 100;
    var Air_Mass_Flow1 = Math.round(this.state.reportOut1.Air_Mass_Flow) / 100;
    var Air_Mass_Flow2 = Math.round(this.state.reportOut1.Air_Mass_Flow) / 100;
    var Compr_Efficiency1 =
      Math.round(this.state.reportOut1.Compr_Efficiency) / 100;
    var Compr_Efficiency2 =
      Math.round(this.state.reportOut1.Compr_Efficiency) / 100;
    var Surge_margin1 = Math.round(this.state.reportOut1.Surge_margin) / 100;
    var Surge_margin2 = Math.round(this.state.reportOut1.Surge_margin) / 100;
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;

    return (
      <div>
        <Layout className="layout-container">
          <h2 className="h2">Performance After Endurence Report</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "10px" }}>
              <Col sm={2}>
                <label className="label">
                  Turbo ID<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Col sm={10}>
                  <Form.Item name="option">
                    <Input.Group compact>
                      <Input.Group compact>
                        <Select
                          defaultValue="Select Turbo ID"
                          style={{ width: "300px" }}
                          onChange={this.handleChangeTestID}
                        >
                          {testIdValue.map((it) => (
                            <Option key={it.turboname} value={it.turboname}>
                              {it.turboname}
                            </Option>
                          ))}
                        </Select>
                      </Input.Group>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Col>

              <Col sm={2}>
                <label className="label">
                  Test No<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
                <span> &nbsp; &nbsp; &nbsp;</span>
              </Col>
              <Col sm={10}>
                <Form.Item name="options">
                  <Input.Group compact>
                    <Select
                      defaultValue="Select Test No"
                      style={{ width: "300px" }}
                      onChange={this.handleChangeTestNO}
                    >
                      testno ?
                      {testno.map((it) => (
                        <Option key={it.testno} value={it.testno}>
                          {it.testno}
                        </Option>
                      ))}{" "}
                      : []
                    </Select>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row
              style={{
                paddingTop: "0px",
                paddingLeft: "38%",
                paddingBottom: "10px",
              }}
            >
              <Col xs={4}>
                <Form.Item>
                  <Button onClick={this.getReport}> view</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
        <Button
          onClick={this.getReportPDF}
          style={{
            marginLeft: "1270px",
            marginBottom: "10px",
            marginTop: "10px",
            width: "140px",
          }}
        >
          Export Report
        </Button>

        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout
            className="bottom-container"
            style={{
              paddingTop: "10px",
              paddingBottom: "30px",
              border: "solid white",
            }}
          >
            <div id="allreport">
              <div
                className="mx-auto"
                style={{ marginTop: "2%" }}
              >
                <div
                  className="sparkline12-hd"
                  style={{ paddingBottom: "5px" }}
                >
                  <div
                    className="main-sparkline12-hd"
                    style={{ textAlign: "center" }}
                  >
                    <h1>Performance After Endurence Report</h1>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <img alt="logo" style={{ width: "25%" }} src={logo} />
                <table id="report-constants" style={{ marginTop: "10px" }}>
                  <tr>
                    <th>ATR REF. NO </th>
                    <th>TC/0/01</th>
                  </tr>
                  <tr>
                    <td>ATP REF. NO </td>
                    <td>2002 TRS/86</td>
                  </tr>
                  <tr>
                    <td>PART NUMBER</td>
                    <td>sb3336-00-011/sb337-100SB</td>
                  </tr>
                  <tr>
                    <td>PART NAME</td>
                    <td>Turbocharger</td>
                  </tr>
                  <tr>
                    <td>SERIAL NUMBER</td>
                    <td>{this.state.turboIdVal}</td>
                  </tr>
                </table>

                <table
                  className="table table-striped table-sm export-table"
                  id="example1"
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colSpan="12"
                      >
                        PERFORMANCE AFTER ENDURENCE TEST
                      </th>
                    </tr>
                    <tr>
                      <th
                        rowspan="2"
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></th>

                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Speed
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Duration
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colSpan="2"
                      >
                        Oil
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbo <br /> Inlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor
                        <br />
                        Intlet Pr
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor
                        <br /> Outlet Pr
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Pr Ratio
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Air <br /> Mass Flow
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor <br /> Efficiency
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Surge <br /> Margin
                      </th>
                    </tr>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        RPM
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        minutes
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Pressure
                        <br /> (kg/cm^2)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Temp.
                        <br />
                        (deg.C)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        deg.C
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/cm^2
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/cm^2
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        %
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/cm^2
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        %
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Required
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {RPM1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Minutes}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {trubineInletTemp}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {ComprInletPr}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {ComprOutletPr}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {PrRatio}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {AirMassFlow}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>{" "}
                    </tr>
                    <tr ng-repeat="Rreport in RunningResult | filter:query  ">
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Actual(Avg)
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {rpm1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {this.state.reportOut1.Duration}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {Oil_pr1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {Oil_temp1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Turbine_Inlet1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Inlet_pr1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Outlet_pr1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {pr_ratio1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Air_Mass_Flow1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Efficiency1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Surge_margin1}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Required
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {RPM2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Minutes}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {trubineInletTemp}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {ComprInletPr}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {ComprOutletPr}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {PrRatio}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {AirMassFlow}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      ></td>{" "}
                    </tr>
                    <tr ng-repeat="Rreport in RunningResult | filter:query  ">
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Actual(Avg)
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {rpm2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {this.state.reportOut2.Duration}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {Oil_pr2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {Oil_temp1}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Turbine_Inlet2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Inlet_pr2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Outlet_pr2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {pr_ratio2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Air_Mass_Flow2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Compr_Efficiency2}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {Surge_margin2}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-lg-1"></div>
                <div className="col-lg-4">
                  <label>
                    <b>
                      <u>Tested By: {this.state.tester}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="tb in TestedBy">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                  <label>
                    <b>
                      <u>Witnessed By: {this.state.witness}</u>
                    </b>
                  </label>
                  <br />
                  <table>
                    <tr ng-repeat="wn in WitnessName">
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </Layout>
        </Spin>
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

const performanceafterEndurence = connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceAfterEndurence);

export default performanceafterEndurence;
