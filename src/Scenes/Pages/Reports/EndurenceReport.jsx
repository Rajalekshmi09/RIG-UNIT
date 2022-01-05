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
import { endurence, reportAlert } from "../../../Services/constants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../Images/logo.png";
import logoRig from "../../../Images/logoRig.png";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const { Option } = Select;
const { endurence_RPM, endurence_Minutes, endurence_trubineInletTemp } =
  endurence;
const { turboID_alert, testNo_alert, testno_check } = reportAlert;

class EndurenceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endurence_reportOut: [],
      testno: [],
      testNumberVal: [],
      turboIdVal: [],
      tester: "",
      witness: "",
      loading: false,
    };
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Endurance Report",
      type: "Report",
    });
  }

  getReportPDF = () => {
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(75, 10, "ENDURENCE TEST REPORT");
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
        top: 70,
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
    if (null !== localStorage.getItem("rTestedBy")) {
      tester = localStorage.getItem("rTestedBy");
    }
    let rWitnessName = this.state.witness;
    if (
      null != localStorage.getItem("rWitnessName") &&
      localStorage.getItem("rWitnessName") !== undefined
    ) {
      rWitnessName = localStorage.getItem("rWitnessName");
    }
    doc.setFontSize(8);
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

    doc.save("Endurence Report.pdf");
  };

  //export table to excel
  generateExcel = () => {
    //getting data from our table
    var data_type =
      "pplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    var table_div = document.getElementById("report-layout");
    var table_html = table_div.outerHTML.replace(/ /g, "%20");

    var a = document.createElement("a");
    a.href = data_type + "," + table_html;
    a.download = "RunningReport.xls";
    a.click();
  };

  getReportTable = () => {
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
        .post("http://localhost:5000/Endurence.php", {
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
          } else {
            message.warning(testno_check);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      this.setState({ loading: true });
      axios
        .post("http://localhost:5000/getnames.php", {
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

  handleChangeTestID = (value) => {
    //select the TestID
    axios
      .post("http://localhost:5000/exportData.php", { turboIdVal: value })
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

  handleChangeTestNO = (value) => {
    //select the Test Number
    this.setState({
      testNumberVal: value,
    });
  };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;
    var E_rpm =
      Math.round(this.state.endurence_reportOut.speed_time * 100) / 100;
    var E_Turbine_Inlet =
      Math.round(this.state.endurence_reportOut.Turbine_Inlet * 100) / 100;
    var E_Oil_pr =
      Math.round(this.state.endurence_reportOut.Oil_pr * 100) / 100;
    var E_Oil_temp =
      Math.round(this.state.endurence_reportOut.Oil_temp * 100) / 100;

    return (
      <div>
        <Layout className="layout-container">
          <h2 className="h2">Endurance Report</h2>
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
                  <Button onClick={this.getReportTable}> view</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
        <Row
          style={{
            marginLeft: "1050px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <Col span={12}>
            <Button
              onClick={this.getReportPDF}
              style={{
                width: "158px",
              }}
            >
              Export to PDF
            </Button>
          </Col>
          <Col span={12}>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="report-btn"
              table="table-to-xls"
              filename="EnduranceReport"
              sheet="EnduranceReport"
              buttonText=" Export to Excel"
            />
          </Col>
        </Row>

        {this.state.endurence_reportOut ? (
          <Spin tip="Loading..." size="large" spinning={this.state.loading}>
            <Layout
              className="bottom-container"
              id="report-layout"
              style={{
                paddingTop: "10px",
                paddingBottom: "30px",
                border: "solid white",
              }}
            >
              <table id="table-to-xls" style={{ marginTop: "2%" }}>
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
                        <h1>Endurance Report</h1>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {/* <img alt="logo" style={{ width: "25%" }} src={logo} /> */}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkQnZ6A9cXv3obIsAJYeTsdTsCoPw9I3qJg&usqp=CAU"
                      style={{ width: "20%", marginBottom: "30px" }}
                    />
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
                  </div>
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-4">
                      <label>
                        <b>
                          <u>Tested By : </u>
                          {this.state.tester}
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
                          <u>Witnessed By :</u>
                          {this.state.witness}
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
              </table>
            </Layout>
          </Spin>
        ) : (
          []
        )}
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

const endurenceReport = connect(
  mapStateToProps,
  mapDispatchToProps
)(EndurenceReport);

export default endurenceReport;
