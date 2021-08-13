import React, { Component } from "react";
import {
  Col,
  Row,
  Layout,
  Input,
  Button,
  Select,
  Table,
  Form,
  Spin,
  message,
} from "antd";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const { Option } = Select;
const columns = [
  {
    title: "RPM",
    dataIndex: "rpm",
    key: "rpm",
    fixed: "left",
  },
  {
    title: "Combuster outlet Temperature",
    dataIndex: "T1",
    key: "T1",
  },
  {
    title: "Turbine Inlet Temperature",
    dataIndex: "T2",
    key: "T2",
  },
  {
    title: "Turbine outlet Temperature",
    dataIndex: "T3",
    key: "T3",
  },
  {
    title: "Compressor Inlet Temperature",
    dataIndex: "T4",
    key: "T4",
  },
  {
    title: "Compressor Outlet Temperature",
    dataIndex: "T5",
    key: "T5",
  },
  {
    title: "Ambient Temperature",
    dataIndex: "T11",
    key: "T11",
  },
  {
    title: "Combuster Inlet Pressure",
    dataIndex: "P1",
    key: "P1",
  },
  {
    title: "Fuel Line Pressure",
    dataIndex: "P2",
    key: "P2",
  },
  {
    title: "Turbine Inlet Pressure",
    dataIndex: "P3",
    key: "P3",
  },
  {
    title: "Ambient Pressure",
    dataIndex: "P4",
    key: "P4",
  },
  {
    title: "Compressor Inlet Pressure",
    dataIndex: "P5",
    key: "P5",
  },
  {
    title: "Compressor Outlet Pressure",
    dataIndex: "P6",
    key: "P6",
  },
  {
    title: "Ventury meter differencial Pressure",
    dataIndex: "P7",
    key: "P7",
  },
  {
    title: "Fuel Flow Rate",
    dataIndex: "FFR",
    key: "FFR",
  },
  {
    title: "testdataDate",
    dataIndex: "testdataDate",
    key: "testdataDate",
    fixed: "right",
  },
];
class ExportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboIdVal: "",
      testno: [],
      reportDetails: [],
      emptyTestno: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.props.updateTitleElements({
      title: "ExportData",
      type: "Report",
    });
  }

  getReport = () => {
    if (this.state.turboIdVal === "" || this.state.turboIdVal.length === 0) {
      message.warning("Select the turbo ID");
    } else if (this.state.testno1 === "" || this.state.testno1 === undefined) {
      message.warning("Select the test No");
    }
    if (
      this.state.turboIdVal !== "" &&
      this.state.testno1 !== "" &&
      this.state.testno1 !== undefined &&
      this.state.turboIdVal.length !== 0
    ) {
      axios
        .post("http://192.168.0.167:5000/getReport.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          let data = res.data;
          console.log(typeof data);
          if (data.length > 5 && typeof data !== "string") {
            this.setState({
              reportDetails: data,
            });
          } else {
            message.warning("Check the test No");
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

  //select the Test Number
  handleChangetestNO = (value) => {
    this.setState({
      testno1: value,
    });
  };
  //exporting csv
  exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //export pdf
  exportToPDF = () => {
    const input = document.getElementById("someRandomID");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  render() {
    const testIdValue = this.props.app.turboConfig;
    const testno = this.state.testno;

    return (
      <div style={{ paddingTop: "1px" }}>
        <Layout className="layout-container">
          <h2 className="h2"> Export Report</h2>
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
                Test No <i style={{ color: "red", fontSize: "15px" }}> *</i>
              </label>
              <span> &nbsp; &nbsp; &nbsp;</span>
            </Col>
            <Col sm={10}>
              <Form.Item name="options">
                <Input.Group compact>
                  <Select
                    defaultValue="Select Test No"
                    style={{ width: "300px" }}
                    onChange={this.handleChangetestNO}
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
              paddingBottom: "25px",
            }}
          >
            <Col xs={4}>
              <Button onClick={() => this.getReport()}> View</Button>
              <span> &nbsp;</span>
            </Col>
          </Row>
        </Layout>

        <Button
          style={{
            marginLeft: "1270px",
            marginBottom: "10px",
            marginTop: "10px",
            width: "140px",
          }}
          variant="warning"
          onClick={(e) =>
            this.exportToCSV(this.state.reportDetails, "Export Report")
          }
        >
          Export in Excel
        </Button>

        <Spin tip="Loading..." size="large" spinning={this.state.loading}>
          <Layout
            style={{
              backgroundColor: "#131633",
              paddingLeft: "20px",
              width: "auto",
              paddingTop: "10px",
              border: "solid white",
            }}
          >
            <div id="allreport">
              <div className="mx-auto" style={{ marginTop: "2%" }}>
                <div
                  className="main-sparkline12-hd"
                  style={{ textAlign: "center" }}
                >
                  <h1>Export Data</h1>
                </div>
              </div>
            </div>
            <Table
              id="someRandomID"
              size="middle"
              columns={columns}
              pagination={false}
              dataSource={this.state.reportDetails}
              scroll={{ x: 2000 }}
            />
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
const exportData = connect(mapStateToProps, mapDispatchToProps)(ExportData);
export default exportData;
