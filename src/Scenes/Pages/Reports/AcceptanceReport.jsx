import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Form,
  Spin,
  message,
} from "antd";
import axios from "axios";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import jsPDF from "jspdf";
import Doc from "./DocService";
import {
  reportAlert,
  performance,
  endurence,
} from "../../../Services/constants";
import "jspdf-autotable";
import logoRig from "../../../Images/logoRig.png";
import logo from "../../../Images/logo.png";
const { turboID_alert, testNo_alert, testno_check } = reportAlert;
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
const { endurence_RPM, endurence_Minutes, endurence_trubineInletTemp } =
  endurence;
const { Option } = Select;

//add AcceptanceReport bugid-(GOARIG_7003)
class AcceptanceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testno: [],
      testNumberVal: [],
      turboIdVal: [],
      tester: "",
      witness: "",
      loading: false,
      defaultTestno: "Select Turbo ID",

      running_reportOut: [],
      performance_reportOut1: [],
      performance_reportOut2: [],
      endurence_reportOut: [],
      PAE_reportOut1: [],
      PAE_reportOut2: [],
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "Acceptance Report",
      type: "Report",
    });
  }

  getReportPDF = () => {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(75, 10, "ACCEPTANCE TEST REPORT");
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
        fontSize: 8,
      },

      bodyStyles: {
        lineColor: "black",
        fontSize: 8,
      },
      tableWidth: "wrap",
      theme: "grid",
    });

    //running report
    doc.autoTable({
      html: "#example1",
      startY: 88,
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

    // performance report
    doc.autoTable({
      html: "#example2",
      startY: 180,
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

    // endurence report
    doc.autoTable({
      html: "#example3",
      startY: 210,
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

    // performance after endurence report
    doc.autoTable({
      html: "#example4",
      startY: 80,
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
    doc.save("AcceptanceReport.pdf");
  };

  //view the report in table
  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning(turboID_alert);
    } else if (
      this.state.testNumberVal === "" ||
      this.state.testNumberVal.length === 0
    ) {
      message.warning(testNo_alert);
    }

    if (
      this.state.turboIdVal !== "" &&
      this.state.testNumberVal !== "" &&
      this.state.turboIdVal.length !== 0 &&
      this.state.testNumberVal.length !== 0
    ) {
      axios
        .post("http://192.168.0.167:5000/runningReport.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testNumberVal,
        })
        .then((res) => {
          if (typeof res.data !== "string") {
            this.setState({
              running_reportOut: res.data,
            });
          } else {
            message.warning(testno_check);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });

      //Performance report
      axios
        .post("http://192.168.0.167:5000/Performance.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testNumberVal,
        })
        .then((res) => {
          if (
            typeof res.data !== "string" &&
            res.data !== undefined &&
            res.data[0].speed_time !== null
          ) {
            this.setState({
              performance_reportOut1: res.data[0],
              performance_reportOut2: res.data[1],
              PAE_reportOut1: res.data[0],
              PAE_reportOut2: res.data[1],
            });
          }
          // else {
          //   message.warning(testno_check);
          // }
        })
        .catch((err) => {
          console.log(err.res);
        });

      // Endurence Report
      axios
        .post("http://192.168.0.167:5000/Endurence.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testNumberVal,
        })
        .then((res) => {
          if (
            typeof res.data !== "string" &&
            res.data !== undefined &&
            res.data[0].speed_time !== null
          ) {
            this.setState({
              endurence_reportOut: res.data[0],
            });
          }
          // else {
          //   message.warning(testno_check);
          // }
        })
        .catch((err) => {
          console.log(err.res);
        });

      this.getNames();
    }
  };

  //view the tester and witness name in table
  getNames = () => {
    if (
      this.state.turboIdVal !== "" &&
      this.state.testNumberVal !== "" &&
      this.state.turboIdVal.length !== 0 &&
      this.state.testNumberVal.length !== 0
    ) {
      axios
        .post("http://192.168.0.167:5000/getnames.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testNumberVal,
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

  //select the TestID
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

  //select the TstNO
  handleChangeTestNO = (value) => {
    this.setState({
      testNumberVal: value,
    });
  };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    const running_OutData = this.state.running_reportOut;

    // performance report
    var P_rpm1 =
      Math.round(this.state.performance_reportOut1.speed_time * 100) / 100;
    var P_rpm2 =
      Math.round(this.state.performance_reportOut2.speed_time * 100) / 100;
    var P_Turbine_Inlet1 =
      Math.round(this.state.performance_reportOut1.Turbine_Inlet * 100) / 100;
    var P_Turbine_Inlet2 =
      Math.round(this.state.performance_reportOut2.Turbine_Inlet * 100) / 100;
    var P_Compr_Inlet_pr1 =
      Math.round(this.state.performance_reportOut1.Compr_Inlet_pr * 100) / 100;
    var P_Compr_Inlet_pr2 =
      Math.round(this.state.performance_reportOut2.Compr_Inlet_pr * 100) / 100;
    var P_Compr_Outlet_pr1 =
      Math.round(this.state.performance_reportOut1.Compr_Outlet_pr * 100) / 100;
    var P_Compr_Outlet_pr2 =
      Math.round(this.state.performance_reportOut2.Compr_Outlet_pr * 100) / 100;
    var P_Oil_pr1 =
      Math.round(this.state.performance_reportOut1.Oil_pr * 100) / 100;
    var P_Oil_pr2 =
      Math.round(this.state.performance_reportOut2.Oil_pr * 100) / 100;
    var P_Oil_temp1 =
      Math.round(this.state.performance_reportOut1.Oil_temp * 100) / 100;
    var P_Oil_temp2 =
      Math.round(this.state.performance_reportOut2.Oil_temp * 100) / 100;
    var P_pr_ratio1 =
      Math.round(this.state.performance_reportOut1.pr_ratio * 100) / 100;
    var P_pr_ratio2 =
      Math.round(this.state.performance_reportOut2.pr_ratio * 100) / 100;
    var P_Air_Mass_Flow1 =
      Math.round(this.state.performance_reportOut1.Air_Mass_Flow) / 100;
    var P_Air_Mass_Flow2 =
      Math.round(this.state.performance_reportOut1.Air_Mass_Flow) / 100;
    var P_Compr_Efficiency1 =
      Math.round(this.state.performance_reportOut1.Compr_Efficiency) / 100;
    var P_Compr_Efficiency2 =
      Math.round(this.state.performance_reportOut1.Compr_Efficiency) / 100;
    var P_Surge_margin1 =
      Math.round(this.state.performance_reportOut1.Surge_margin) / 100;
    var P_Surge_margin2 =
      Math.round(this.state.performance_reportOut1.Surge_margin) / 100;

    // endurence report
    var E_rpm =
      Math.round(this.state.endurence_reportOut.speed_time * 100) / 100;
    var E_Turbine_Inlet =
      Math.round(this.state.endurence_reportOut.Turbine_Inlet * 100) / 100;
    var E_Oil_pr =
      Math.round(this.state.endurence_reportOut.Oil_pr * 100) / 100;
    var E_Oil_temp =
      Math.round(this.state.endurence_reportOut.Oil_temp * 100) / 100;

    //performance after endurence
    var PAE_rpm1 = Math.round(this.state.PAE_reportOut1.speed_time * 100) / 100;
    var PAE_rpm2 = Math.round(this.state.PAE_reportOut2.speed_time * 100) / 100;
    var PAE_Turbine_Inlet1 =
      Math.round(this.state.PAE_reportOut1.Turbine_Inlet * 100) / 100;
    var PAE_Turbine_Inlet2 =
      Math.round(this.state.PAE_reportOut2.Turbine_Inlet * 100) / 100;
    var PAE_Compr_Inlet_pr1 =
      Math.round(this.state.PAE_reportOut1.Compr_Inlet_pr * 100) / 100;
    var PAE_Compr_Inlet_pr2 =
      Math.round(this.state.PAE_reportOut2.Compr_Inlet_pr * 100) / 100;
    var PAE_Oil_pr1 = Math.round(this.state.PAE_reportOut1.Oil_pr * 100) / 100;
    var PAE_Oil_pr2 = Math.round(this.state.PAE_reportOut2.Oil_pr * 100) / 100;
    var PAE_Oil_temp1 =
      Math.round(this.state.PAE_reportOut1.Oil_temp * 100) / 100;
    var PAE_Oil_temp2 =
      Math.round(this.state.PAE_reportOut2.Oil_temp * 100) / 100;
    var PAE_Compr_Outlet_pr1 =
      Math.round(this.state.PAE_reportOut1.Compr_Outlet_pr * 100) / 100;
    var PAE_Compr_Outlet_pr2 =
      Math.round(this.state.PAE_reportOut2.Compr_Outlet_pr * 100) / 100;
    var PAE_pr_ratio1 =
      Math.round(this.state.PAE_reportOut1.pr_ratio * 100) / 100;
    var PAE_pr_ratio2 =
      Math.round(this.state.PAE_reportOut2.pr_ratio * 100) / 100;
    var PAE_Air_Mass_Flow1 =
      Math.round(this.state.PAE_reportOut1.Air_Mass_Flow) / 100;
    var PAE_Air_Mass_Flow2 =
      Math.round(this.state.PAE_reportOut1.Air_Mass_Flow) / 100;
    var PAE_Compr_Efficiency1 =
      Math.round(this.state.PAE_reportOut1.Compr_Efficiency) / 100;
    var PAE_Compr_Efficiency2 =
      Math.round(this.state.PAE_reportOut1.Compr_Efficiency) / 100;
    var PAE_Surge_margin1 =
      Math.round(this.state.PAE_reportOut1.Surge_margin) / 100;
    var PAE_Surge_margin2 =
      Math.round(this.state.PAE_reportOut1.Surge_margin) / 100;

    return (
      <div>
        <Layout className="layout-container">
          <h2 className="h2">Acceptance Report</h2>
          <Form onFinish={this.onFinish}>
            <Row style={{ paddingTop: "10px" }}>
              <Col sm={2}>
                <label className="label">
                  Turbo ID<i style={{ color: "red", fontSize: "15px" }}> *</i>
                </label>
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
                      defaultValue={this.state.defaultTestno}
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
                  <Button onClick={this.getReport}> View</Button>
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
            width: "158px",
          }}
        >
          Download Report
        </Button>
        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout
            className="bottom-container"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              border: "solid white",
            }}
          >
            <div id="allreport">
              <div className="mx-auto" style={{ marginTop: "2%" }}>
                <div
                  className="sparkline12-hd"
                  style={{ paddingBottom: "5px" }}
                >
                  <div
                    className="main-sparkline12-hd"
                    style={{ textAlign: "center" }}
                  >
                    <h1>Acceptance Report </h1>
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
                  {/* <tr>
                    <td>TEST ID</td>
                    <td>{this.state.testNumberVal}</td>
                  </tr> */}
                </table>
                <div></div>
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
                        colSpan="10"
                      >
                        RUNNING IN TEST
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
                      >
                        Compressor <br />
                        Inlet Temp
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
                        Outlet Temp
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
                        Outlet Pr
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbine <br />
                        Inlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Turbine
                        <br /> Outlet Temp
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Kerosine
                        <br />
                        Flow Rate
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Compressor <br /> Pr Ratio
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Mass <br /> Flow Rate
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
                        <br />
                        (kg/cm^2)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Tempr.
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
                        kg/cm^2
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
                        deg.C
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        kg/Sec
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
                    {running_OutData.map((it) => (
                      <tr>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.speed}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Duration}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Inlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Outlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Compr_Outlet_Pr}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_InletTemp}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_OutletTemp}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.flowrate}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {it.Turbine_Outlet}
                        </td>
                        <td style={{ border: "1px solid #6a6a6b" }}>
                          {" "}
                          {it.Mass_Flow_Rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* performance report */}

              <table
                className="table table-striped table-sm export-table"
                id="example2"
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
                      PERFORMANCE TEST
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
                      Compressor <br /> Intlet Pr
                    </th>
                    <th
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      Compresor
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
                      Air
                      <br /> Mass Flow
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
                      Pressure <br />
                      (kg/cm^2)
                    </th>
                    <th
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      Tempr.
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
                    ></th>
                    <th
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      kg/sec
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
                    >
                      4 - 6
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      70 - 90
                    </td>
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
                      {P_rpm1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {this.state.performance_reportOut1.Duration}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Oil_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Oil_temp1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Turbine_Inlet1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Inlet_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Outlet_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_pr_ratio1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Air_Mass_Flow1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Efficiency1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Surge_margin1}
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
                      {P_rpm2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {this.state.performance_reportOut2.Duration}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Oil_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Oil_temp2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Turbine_Inlet2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Inlet_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Outlet_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_pr_ratio2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Air_Mass_Flow2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Compr_Efficiency2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {P_Surge_margin2}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* endurence report */}
              {this.state.endurence_reportOut ? (
                <table
                  className="table table-striped table-sm export-table"
                  id="example3"
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                        colSpan="6"
                      >
                        ENDURANCE TEST
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
                        Pressure <br /> (kg/cm^2)
                      </th>
                      <th
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        Temperature
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
                        {endurence_RPM}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {endurence_Minutes}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        4 - 6
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        80 - 90
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {endurence_trubineInletTemp}
                      </td>
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
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {E_rpm}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {this.state.endurence_reportOut.Duration}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {E_Oil_pr}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {E_Oil_temp}
                      </td>
                      <td
                        style={{
                          border: "1px solid #6a6a6b",
                          textAlign: "center",
                        }}
                      >
                        {E_Turbine_Inlet}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                []
              )}

              {/* performance after endurence */}
              <table
                className="table table-striped table-sm export-table"
                id="example4"
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
                    ></th>
                    <th
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      kg/sec
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
                    >
                      4 - 6
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      70 - 90
                    </td>
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
                      {PAE_rpm1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {this.state.PAE_reportOut1.Duration}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {PAE_Oil_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {PAE_Oil_temp1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Turbine_Inlet1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Inlet_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Outlet_pr1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_pr_ratio1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Air_Mass_Flow1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Efficiency1}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Surge_margin1}
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
                      3.1+0.1/-0.05
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      1.4
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
                      {PAE_rpm2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {this.state.PAE_reportOut2.Duration}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {PAE_Oil_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {PAE_Oil_temp2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Turbine_Inlet2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Inlet_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Outlet_pr2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_pr_ratio2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Air_Mass_Flow2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Compr_Efficiency2}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        border: "1px solid #6a6a6b",
                        textAlign: "center",
                      }}
                    >
                      {PAE_Surge_margin2}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* tester & witness content */}
              <div className="row" style={{ marginTop: "25px" }}>
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
        ,
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

const accpetanceReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptanceReport);

export default accpetanceReport;
