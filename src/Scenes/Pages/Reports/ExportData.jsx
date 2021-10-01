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
        Turbine_Nozzle_Area: "m2",
        Total_Mass_FlowRate: "kg/sec",
        Combustor_Inlet_AirFlow: "kg/sec",
        Combustor_Input_Energy: "KJ",
        Specific_Heat_Capacity: "KJ/Kg-K",
        Combustor_Output_Energy: "KJ",
        Combustor_Input_FuelEnergy: "KJ",
        Combustor_Ideal_Efficiency: "η",
        Turbine_Expansion_Ratio: "",
        Turbine_Differential_Temperature: "Deg C",
        Turbine_Power: "KW",
        Turbine_Isentropic_Efficiency: "ηT",
        Compressor_Pressure_Ratio: "",
        Compressor_Differential_Temperature: "Degree C",
        Ventury_meter_differentialPressure: "mm water",
        Actual_Differential_Pressure: "pascal",
        Ventury_Volume_FlowRate: "m3",
        Compressor_Mass_FlowRate: "",
        Compressor_Power: "KW",
        Compressor_Efficiency: "ηc",
        Compressor_Air_Flow: "kg/sec",
        Combustor_Flue_Gasflowrate: "kg/sec",
        Corrected_Compressor_rpm: "rpm",
        Surge_Margin: "%",
        Corrected_mass_flowofcompressor: "kg/sec",
        Air_Fuel_ratio: "",
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

    console.log(paramObj);
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
          let data = res.data;
          console.log(data);

          if (data.length > 5 && typeof data !== "string") {
            // console.log(data.unshift(merged));

            this.setState({
              reportDetails: data,
            });

            let titleName = Object.keys(data[0]);

            this.setState({
              title: Object.keys(data[0]),
            });
            console.log(this.state.reportDetails);
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
    console.log(this.state.title);
    let merged = { ...this.state.formulaUnit, ...paramObj };
    const columns = [
      {
        title: this.state.title[0] + "\n" + "\n" + merged["testdataDate"],
        dataIndex: "testdataDate",
        key: "testdataDate",
        fixed: "left",
        width: 105,
      },
      {
        title: this.state.title[1] + "\n" + merged["RPM"],
        dataIndex: "RPM",
        key: "RPM",
        fixed: "left",
        width: 100,
      },
      {
        title: this.state.title[2] + "\n" + merged["Ambient Pr"],
        dataIndex: "Ambient Pr",
        key: "Ambient Pr",
        width: 100,
      },
      {
        title: this.state.title[3] + "\n" + merged["Ambient temp"],
        dataIndex: "Ambient temp",
        key: "Ambient temp",
        width: 100,
      },
      {
        title: this.state.title[4] + "\n" + merged["Compressor Inlet Pr"],
        dataIndex: "Compressor Inlet Pr",
        key: "Compressor Inlet Pr",
        width: 100,
      },
      {
        title: this.state.title[5] + "\n" + merged["Compressor outlet Pr"],
        dataIndex: "Compressor outlet Pr",
        key: "Compressor outlet Pr",
        width: 100,
      },
      {
        title:
          this.state.title[6] + "\n" + merged["Compressor Diff venturi Pr"],
        dataIndex: "Compressor Diff venturi Pr",
        key: "Compressor Diff venturi Pr",
        width: 100,
      },
      {
        title: this.state.title[7] + "\n" + merged["Compressor Inlet temp"],
        dataIndex: "Compressor Inlet temp",
        key: "Compressor Inlet temp",
        width: 100,
      },
      {
        title: this.state.title[8] + "\n" + merged["Compressor outlet temp"],
        dataIndex: "Compressor outlet temp",
        key: "Compressor outlet temp",
        width: 100,
      },
      {
        title: this.state.title[9] + "\n" + merged["Combustor outlet temp"],
        dataIndex: "Combustor outlet temp",
        key: "Combustor outlet temp",
        width: 100,
      },
      {
        title: this.state.title[10] + "\n" + merged["Combustor Inlet Pr"],
        dataIndex: "Combustor Inlet Pr",
        key: "Combustor Inlet Pr",
        width: 100,
      },
      {
        title: this.state.title[11] + "\n" + merged["Turbine Inlet temp"],
        dataIndex: "Turbine Inlet temp",
        key: "Turbine Inlet temp",
        width: 100,
      },
      {
        title: this.state.title[12] + "\n" + merged["Turbine outlet temp"],
        dataIndex: "Turbine outlet temp",
        key: "Turbine outlet temp",
        width: 100,
      },
      {
        title: this.state.title[13] + "\n" + merged["Turbine vibration"],
        dataIndex: "Turbine vibration",
        key: "Turbine vibration",
        width: 100,
      },
      {
        title: this.state.title[14] + "\n" + merged["Fuel flow"],
        dataIndex: "Fuel flow",
        key: "Fuel flow",
        width: 100,
      },
      {
        title: this.state.title[15] + "\n" + merged["Fuel Pr"],
        dataIndex: "Fuel Pr",
        key: "Fuel Pr",
        width: 100,
      },
      {
        title: this.state.title[16] + "\n" + merged["Oil Pr"],
        dataIndex: "Oil Pr",
        key: "Oil Pr",
        width: 100,
      },
      {
        title: this.state.title[17] + "\n" + merged["Oil flow Rate"],
        dataIndex: "Oil flow Rate",
        key: "Oil flow Rate",
        width: 100,
      },
      {
        title: this.state.title[18] + "\n" + merged["Oil Brg Inlet Temp"],
        dataIndex: "Oil Brg Inlet Temp",
        key: "Oil Brg Inlet Temp",
        width: 100,
      },
      {
        title: this.state.title[19] + "\n" + merged["Oil Tank Temp"],
        dataIndex: "Oil Tank Temp",
        key: "Oil Tank Temp",
        width: 100,
      },
      {
        title: "Turbine Nozzle Area " + "\n" + merged.Turbine_Nozzle_Area,
        dataIndex: "Turbine Nozzle Area ",
        key: "Turbine Nozzle Area ",
        width: 100,
      },
      {
        title: "Total Mass Flow Rate" + "\n" + merged.Total_Mass_FlowRate,
        dataIndex: "Total Mass Flow Rate",
        key: "Total Mass Flow Rate",
        width: 100,
      },
      {
        title:
          "Combustor Inlet Air Flow" + "\n" + merged.Combustor_Inlet_AirFlow,
        dataIndex: "Combustor Inlet Air Flow",
        key: "Combustor Inlet Air Flow",
        width: 100,
      },
      {
        title: "Combustor Input Energy" + "\n" + merged.Combustor_Input_Energy,
        dataIndex: "Combustor Input Energy",
        key: "Combustor Input Energy",
        width: 100,
      },
      {
        title: "Specific Heat Capacity" + "\n" + merged.Specific_Heat_Capacity,
        dataIndex: "Specific Heat Capacity",
        key: "Specific Heat Capacity",
        width: 100,
      },
      {
        title:
          "Combustor Output Energy" + "\n" + merged.Combustor_Output_Energy,
        dataIndex: "Combustor Output Energy",
        key: "Combustor Output Energy",
        width: 100,
      },
      {
        title:
          "Combustor Input FuelEnergy" +
          "\n" +
          merged.Combustor_Input_FuelEnergy,
        dataIndex: "Combustor Input Fuel Energy",
        key: "Combustor Input Fuel Energy",
        width: 100,
      },
      {
        title:
          "Combustor Ideal Efficiency" +
          "\n" +
          merged.Combustor_Ideal_Efficiency,
        dataIndex: "Combustor Ideal Efficiency",
        key: "Combustor Ideal Efficiency",
        width: 100,
      },
      {
        title:
          "Turbine Expansion Ratio" + "\n" + merged.Turbine_Expansion_Ratio,
        dataIndex: "Turbine Expansion Ratio",
        key: "Turbine Expansion Ratio",
        width: 100,
      },
      {
        title:
          "Turbine Differential Temperature" +
          "\n" +
          merged.Turbine_Differential_Temperature,
        dataIndex: "Turbine Differential Temperature",
        key: "Turbine Differential Temperature",
        width: 100,
      },
      {
        title: "Turbine Power" + "\n" + merged.Turbine_Power,
        dataIndex: "Turbine Power",
        key: "Turbine Power",
        width: 100,
      },
      {
        title:
          "Turbine Isentropic Efficiency" +
          "\n" +
          merged.Turbine_Isentropic_Efficiency,
        dataIndex: "Turbine Isentropic Efficiency",
        key: "Turbine Isentropic Efficiency",
        width: 100,
      },
      {
        title:
          "Compressor Pressure Ratio" + "\n" + merged.Compressor_Pressure_Ratio,
        dataIndex: "Compressor Pressure Ratio",
        key: "Compressor Pressure Ratio",
        width: 100,
      },
      {
        title:
          "Compressor Differential Temperature" +
          "\n" +
          merged.Compressor_Differential_Temperature,
        dataIndex: "Compressor Differential Temperature",
        key: "Compressor Differential Temperature",
        width: 100,
      },
      {
        title:
          "Ventury meter differential Pressure" +
          "\n" +
          merged.Ventury_meter_differentialPressure,
        dataIndex: "Ventury meter differential Pressure",
        key: "Ventury meter differential Pressure",
        width: 100,
      },
      {
        title:
          "Actual Differential Pressure" +
          "\n" +
          merged.Actual_Differential_Pressure,
        dataIndex: "Actual Differential Pressure",
        key: "Actual Differential Pressure",
        width: 100,
      },
      {
        title:
          "Ventury Volume FlowRate" + "\n" + merged.Ventury_Volume_FlowRate,
        dataIndex: "Ventury Volume Flow Rate",
        key: "Ventury Volume Flow Rate",
        width: 100,
      },
      {
        title:
          "Compressor Mass FlowRate" + "\n" + merged.Compressor_Mass_FlowRate,
        dataIndex: "Compressor Mass Flow Rate",
        key: "Compressor Mass Flow Rate",
        width: 100,
      },
      {
        title: "Compressor Power" + "\n" + merged.Compressor_Power,
        dataIndex: "Compressor Power",
        key: "Compressor Power",
        width: 100,
      },
      {
        title: "Compressor Efficiency" + "\n" + merged.Compressor_Efficiency,
        dataIndex: "Compressor Efficiency",
        key: "Compressor Efficiency",
        width: 100,
      },
      {
        title: "Compressor Air Flow" + "\n" + merged.Compressor_Air_Flow,
        dataIndex: "Compressor Air Flow",
        key: "Compressor Air Flow",
        width: 100,
      },
      {
        title:
          "Combustor FlueGas flow rate" +
          "\n" +
          merged.Combustor_Flue_Gasflowrate,
        dataIndex: "Combustor Flue Gas flow rate",
        key: "Combustor Flue Gas flow rate",
        width: 100,
      },
      {
        title:
          "Corrected Compressor rpm" + "\n" + merged.Corrected_Compressor_rpm,
        dataIndex: "Corrected  Compressor rpm",
        key: "Corrected  Compressor rpm",
        width: 100,
      },
      {
        title: "Surge Margin" + "\n" + merged.Surge_Margin,
        dataIndex: "Surge Margin",
        key: "Surge Margin",
        width: 100,
      },
      {
        title:
          "Corrected mass flow of compressor" +
          "\n" +
          merged.Corrected_mass_flowofcompressor,
        dataIndex: "Corrected mass flow of compressor",
        key: "Corrected mass flow of compressor",
        width: 100,
      },
      {
        title: "Air Fuel ratio" + "\n" + merged.Air_Fuel_ratio,
        dataIndex: "Air Fuel ratio",
        key: "Air Fuel ratio",
        width: 100,
      },
    ];

    console.log(this.state.title[0]);
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
                scroll={{ x: 2000 }}
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
