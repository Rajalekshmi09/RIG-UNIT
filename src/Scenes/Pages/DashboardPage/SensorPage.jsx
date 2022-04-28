import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import { updateTitleElements } from "../../../Redux/action";
import { connect } from "react-redux";
import LiveStateBlock from "../../Components/TestPageComponent/LiveStateBlock";
class SensorPage extends Component {
  componentDidMount() {
    this.props.updateTitleElements({
      title: "Table View",
      type: "Sensor Page",
    });
  }
  render() {
    const sensorData = this.props.app.chartData;

    return (
      <div className="sensor-component">
        <LiveStateBlock />
        <Row gutter={[18, 24]}>
          <Col span={8} className="container-box">
            <h1>PRESSURE</h1>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Ambient_Pr
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P1}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Compr_In Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P3}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Compr_Out Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P4}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Compr_Diff_Vent Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P5}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Comb_In Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P14}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Fuel Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P22}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Oil Pr.
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P23}
              </Col>
            </Row>
            <Divider style={{ backgroundColor: "#91bcc4" }}></Divider>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Turbine Vibration
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P20}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Fuel Flow
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P21}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Oil Flow Rate
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P24}
              </Col>
            </Row>
          </Col>

          <Col span={8} className="container-box">
            <h1>TEMPERATURE</h1>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Ambient_Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P2}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Compr_In Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P7}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Compr_Out Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P10}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Comb_out Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P13}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Turbine_In Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P16}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Turbine_Out Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P17}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Oil_Brg_In Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P25}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={12} className="sensor-component-title">
                Oil_Tank Temp
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P27}
              </Col>
            </Row>
          </Col>
          <Col span={8} className="container-box">
            <h1>CALCULATED VALUE</h1>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Corrected RPM
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P31}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Total_Mass_Flow_Rate
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P35}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_In_AirFlow
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P36}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_In_Energy
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P37}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_Out_Energy
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P38}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_In_FuelEnergy
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P39}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_Ideal_Efficiency
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P40}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Comb_FlueGas_Flow_Rate
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P41}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Turb_Expansion_Ratio
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P42}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Turb_Diff_Temperature
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P43}
              </Col>
            </Row>
            <Row className="sensor-component-row">
              <Col span={13} className="sensor-component-title">
                Turb_Power
              </Col>
              <Col span={8} className="sensor-component-val">
                {sensorData[0].P44}
              </Col>
            </Row>
          </Col>
        </Row>
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
const sensorPage = connect(mapStateToProps, mapDispatchToProps)(SensorPage);
export default sensorPage;
