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
let paramObj = {};

class ExportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turboIdVal: "",
      testno: [],
      reportDetails: [],
      emptyTestno: false,
      loading: false,
      title: [],
      formulaUnit: {
        "Turbine Nozzle Area": "m2",
        "Total Mass Flow Rate": "kg/sec",
        "Combustor Inlet Air Flow": "kg/sec",
        "Combustor Input Energy": "KJ",
        "Specific Heat Capacity": "KJ/Kg-K",
        "Combustor Output Energy": "KJ",
        "Combustor Input Fuel Energy": "KJ",
        "Combustor Ideal Efficiency": "η",
        "Turbine Expansion Ratio": "",
        "Turbine Differential Temperature": "Deg C",
        "Turbine Power": "KW",
        "Turbine Isentropic Efficiency": "ηT",
        "Compressor Pressure Ratio": "",
        "Compressor Differential Temperature": "Degree C",
        "Ventury meter differential Pressure": "mm water",
        "Actual Differential Pressure": "pascal",
        "Ventury Volume Flow Rate": "m3",
        "Compressor Mass Flow Rate": "",
        "Compressor Power": "KW",
        "Compressor Efficiency": "ηc",
        "Compressor Air Flow": "kg/sec",
        "Combustor Flue Gas flow rate": "kg/sec",
        "Corrected Compressor rpm": "rpm",
        "Surge Margin": "%",
        "Corrected mass flow of compressor": "kg/sec",
        "Air Fuel ratio": "",
        testdataDate: "Time",
      },
    };
  }

  componentDidMount() {
    this.props.updateTitleElements({
      title: "ExportData",
      type: "Report",
    });
    let paramValue = this.props.app.paramConfig
      ? this.props.app.paramConfig
      : [];

    let createParam = paramValue.map((It) => It.Paramname);
    let createUnit = paramValue.map((It) => It.unitname);

    createParam.forEach((key, i) => (paramObj[key] = createUnit[i]));
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
        .post("http://localhost:5000/getReport.php", {
          turboIdVal: this.state.turboIdVal,
          testno: this.state.testno1,
        })
        .then((res) => {
          var data = res.data;
          console.log(data);

          if (data.length > 5 && typeof data !== "string") {
            // let unitMerged = { ...paramObj, ...this.state.formulaUnit };
            // console.log(unitMerged);

            // let exportdataUnit = data.push(unitMerged);
            // console.log(exportdataUnit.reverse);

            this.setState({
              reportDetails: data,
            });
            this.setState({
              title: Object.keys(data[0]),
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
        .post("http://localhost:5000/getnames.php", {
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
    console.log(this.state.reportDetails);

    const columns = [
      {
        title: this.state.title[0],
        dataIndex: "testdataDate",
        key: "testdataDate",
        fixed: "left",
        width: 105,
      },
      {
        title: this.state.title[1],
        dataIndex: "RPM",
        key: "RPM",
        fixed: "left",
        width: 100,
      },
      {
        title: this.state.title[2],
        dataIndex: "Ambient Pr",
        key: "Ambient Pr",
        width: 100,
      },
      {
        title: this.state.title[3],
        dataIndex: "Ambient temp",
        key: "Ambient temp",
        width: 100,
      },
      {
        title: this.state.title[4],
        dataIndex: "Compressor Inlet Pr",
        key: "Compressor Inlet Pr",
        width: 100,
      },
      {
        title: this.state.title[5],
        dataIndex: "Compressor outlet Pr",
        key: "Compressor outlet Pr",
        width: 100,
      },
      {
        title: this.state.title[6],
        dataIndex: "Compressor Diff venturi Pr",
        key: "Compressor Diff venturi Pr",
        width: 100,
      },
      {
        title: this.state.title[7],
        dataIndex: "Compressor Inlet temp",
        key: "Compressor Inlet temp",
        width: 100,
      },
      {
        title: this.state.title[8],
        dataIndex: "Compressor outlet temp",
        key: "Compressor outlet temp",
        width: 100,
      },
      {
        title: this.state.title[9],
        dataIndex: "Combustor outlet temp",
        key: "Combustor outlet temp",
        width: 100,
      },
      {
        title: this.state.title[10],
        dataIndex: "Combustor Inlet Pr",
        key: "Combustor Inlet Pr",
        width: 100,
      },
      {
        title: this.state.title[11],
        dataIndex: "Turbine Inlet temp",
        key: "Turbine Inlet temp",
        width: 100,
      },
      {
        title: this.state.title[12],
        dataIndex: "Turbine outlet temp",
        key: "Turbine outlet temp",
        width: 100,
      },
      {
        title: this.state.title[13],
        dataIndex: "Turbine vibration",
        key: "Turbine vibration",
        width: 100,
      },
      {
        title: this.state.title[14],
        dataIndex: "Fuel flow",
        key: "Fuel flow",
        width: 100,
      },
      {
        title: this.state.title[15],
        dataIndex: "Fuel Pr",
        key: "Fuel Pr",
        width: 100,
      },
      {
        title: this.state.title[16],
        dataIndex: "Oil Pr",
        key: "Oil Pr",
        width: 100,
      },
      {
        title: this.state.title[17],
        dataIndex: "Oil flow Rate",
        key: "Oil flow Rate",
        width: 100,
      },
      {
        title: this.state.title[18],
        dataIndex: "Oil Brg Inlet Temp",
        key: "Oil Brg Inlet Temp",
        width: 100,
      },
      {
        title: this.state.title[19],
        dataIndex: "Oil Tank Temp",
        key: "Oil Tank Temp",
        width: 100,
      },
      {
        title: "Turbine Nozzle Area",
        dataIndex: "Turbine Nozzle Area",
        key: "Turbine Nozzle Area",
        width: 100,
      },
      {
        title: "Total Mass Flow Rate",
        dataIndex: "Total Mass Flow Rate",
        key: "Total Mass Flow Rate",
        width: 100,
      },
      {
        title: "Combustor Inlet Air Flow",
        dataIndex: "Combustor Inlet Air Flow",
        key: "Combustor Inlet Air Flow",
        width: 100,
      },
      {
        title: "Combustor Input Energy",
        dataIndex: "Combustor Input Energy",
        key: "Combustor Input Energy",
        width: 100,
      },
      {
        title: "Specific Heat Capacity",
        dataIndex: "Specific Heat Capacity",
        key: "Specific Heat Capacity",
        width: 100,
      },
      {
        title: "Combustor Output Energy",
        dataIndex: "Combustor Output Energy",
        key: "Combustor Output Energy",
        width: 100,
      },
      {
        title: "Combustor Input Fuel Energy",
        dataIndex: "Combustor Input Fuel Energy",
        key: "Combustor Input Fuel Energy",
        width: 100,
      },
      {
        title: "Combustor Ideal Efficiency",
        dataIndex: "Combustor Ideal Efficiency",
        key: "Combustor Ideal Efficiency",
        width: 100,
      },
      {
        title: "Turbine Expansion Ratio",
        dataIndex: "Turbine Expansion Ratio",
        key: "Turbine Expansion Ratio",
        width: 100,
      },
      {
        title: "Turbine Differential Temperature",
        dataIndex: "Turbine Differential Temperature",
        key: "Turbine Differential Temperature",
        width: 100,
      },
      {
        title: "Turbine Power",
        dataIndex: "Turbine Power",
        key: "Turbine Power",
        width: 100,
      },
      {
        title: "Turbine Isentropic Efficiency",
        dataIndex: "Turbine Isentropic Efficiency",
        key: "Turbine Isentropic Efficiency",
        width: 100,
      },
      {
        title: "Compressor Pressure Ratio",
        dataIndex: "Compressor Pressure Ratio",
        key: "Compressor Pressure Ratio",
        width: 100,
      },
      {
        title: "Compressor Differential Temperature",
        dataIndex: "Compressor Differential Temperature",
        key: "Compressor Differential Temperature",
        width: 100,
      },
      {
        title: "Ventury meter differential Pressure",
        dataIndex: "Ventury meter differential Pressure",
        key: "Ventury meter differential Pressure",
        width: 100,
      },
      {
        title: "Actual Differential Pressure",
        dataIndex: "Actual Differential Pressure",
        key: "Actual Differential Pressure",
        width: 100,
      },
      {
        title: "Ventury Volume Flow Rate",
        dataIndex: "Ventury Volume Flow Rate",
        key: "Ventury Volume Flow Rate",
        width: 100,
      },
      {
        title: "Compressor Mass Flow Rate",
        dataIndex: "Compressor Mass Flow Rate",
        key: "Compressor Mass Flow Rate",
        width: 100,
      },
      {
        title: "Compressor Power",
        dataIndex: "Compressor Power",
        key: "Compressor Power",
        width: 100,
      },
      {
        title: "Compressor Efficiency",
        dataIndex: "Compressor Efficiency",
        key: "Compressor Efficiency",
        width: 100,
      },
      {
        title: "Compressor Air Flow",
        dataIndex: "Compressor Air Flow",
        key: "Compressor Air Flow",
        width: 100,
      },
      {
        title: "Combustor Flue Gas flow rate",
        dataIndex: "Combustor Flue Gas flow rate",
        key: "Combustor Flue Gas flow rate",
        width: 100,
      },
      {
        title: "Corrected Compressor rpm",
        dataIndex: "Corrected Compressor rpm",
        key: "Corrected Compressor rpm",
        width: 100,
      },
      {
        title: "Surge Margin",
        dataIndex: "Surge Margin",
        key: "Surge Margin",
        width: 100,
      },
      {
        title: "Corrected mass flow of compressor",
        dataIndex: "Corrected mass flow of compressor",
        key: "Corrected mass flow of compressor",
        width: 100,
      },
      {
        title: "Air Fuel ratio",
        dataIndex: "Air Fuel ratio",
        key: "Air Fuel ratio",
        width: 100,
      },
    ];

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
            {this.state.title.length > 0 ? (
              <Table
                id="someRandomID"
                size="middle"
                columns={columns}
                pagination={false}
                dataSource={this.state.reportDetails}
                scroll={{ x: 2000, y: 500 }}
              />
            ) : (
              <Table id="someRandomID" size="middle" scroll={{ x: 2000 }} />
            )}
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
