import React, { Component } from "react";
import { Row, Layout, Progress, Col } from "antd";
import { connect } from "react-redux";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { fcvTransferEvent } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";

const { Startdata, nShutdowndata, eShutdowndata } = testParamHash;
class CVStageComponent extends Component {
  constructor(props) {
    super(props);
  }

  //FCV value increasing and decreasing
  fineCVIncreseClick = () => {
    let fineCVIncreseVal =
      parseFloat(this.props.app.chartData2[0].S8) +
      parseFloat(this.props.app.cvStageValue.AirServoValve);

    const body = {
      state: 1,
      fcvValue: fineCVIncreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fineCVDecreseClick = () => {
    let fineCVDecreseVal =
      parseFloat(this.props.app.chartData2[0].S8) -
      parseFloat(this.props.app.cvStageValue[0].AirServoValve);

    const body = {
      state: 1,
      fcvValue: fineCVDecreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  fuelCVIncreseClick = () => {
    let fuelCVIncreseVal =
      parseFloat(this.props.app.chartData2[0].S9) +
      parseFloat(this.props.app.cvStageValue.KeroseneValve);

    const body = {
      state: 2,
      fcvValue: fuelCVIncreseVal,
    };
    fcvTransferEvent(body, (data) => {
      console.log(data);
    });
  };

  fuelCVDecreseClick = () => {
    let fuelCVDecreseVal =
      parseFloat(this.props.app.chartData2[0].S9) -
      parseFloat(this.props.app.cvStageValue.KeroseneValve);

    const body = {
      state: 2,
      fcvValue: fuelCVDecreseVal,
    };
    fcvTransferEvent(body, (data) => {});
  };

  render() {
    let fine_FCV = this.props.app.chartData2[0].S8;
    let fuel_FCV = this.props.app.chartData2[0].S9;
    let turboStart = [];
    if (this.props.app.turboStart) {
      turboStart = this.props.app.turboStart;
    }

    const StartdataArray = turboStart.filter((it) =>
      Startdata.find((val) => val === it.name)
    );
    const nShutdowndataArray = turboStart.filter((it) =>
      nShutdowndata.find((val) => val === it.name)
    );

    const eShutdowndataArray = turboStart.filter((it) =>
      eShutdowndata.find((val) => val === it.name)
    );
    console.log(fine_FCV);

    return (
      <div>
        <Layout style={{ backgroundColor: "transparent", paddingTop: "20px" }}>
          <Row>
            <Row className="progress_box">
              <div className="title">
                <div style={{ fontSize: "15px", color: "white" }}>
                  <strong>Air Servo Valve</strong>
                </div>
              </div>
              <Col span={14}>
                <div style={{ marginTop: "17%" }}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={60}
                    style={{ marginLeft: "2px" }}
                    percent={fine_FCV}
                  />
                </div>
              </Col>
              <Col span={6} style={{ marginTop: "17%" }}>
                {StartdataArray.find((it) => it.name === "Stage 3") &&
                nShutdowndataArray.length === 0 &&
                eShutdowndataArray.length === 0 ? (
                  <div>
                    {fine_FCV >= 100 ? (
                      <ImArrowUp className="arrow-btn-disable" size={30} />
                    ) : (
                      <ImArrowUp
                        size={30}
                        className="arrow-btn"
                        onClick={() => this.fineCVIncreseClick()}
                      />
                    )}
                  </div>
                ) : (
                  <div className="arrow-btn-disable">
                    <ImArrowUp size={30} />
                  </div>
                )}
              </Col>
              <Col span={4} style={{ marginTop: "18%" }}>
                {StartdataArray.find((it) => it.name === "Stage 3") &&
                nShutdowndataArray.length === 0 &&
                eShutdowndataArray.length === 0 ? (
                  <div>
                    {fine_FCV <= 0 ? (
                      <ImArrowDown className="arrow-btn-disable" size={30} />
                    ) : (
                      <ImArrowDown
                        size={30}
                        className="arrow-btn"
                        onClick={() => this.fineCVDecreseClick()}
                      />
                    )}
                  </div>
                ) : (
                  <div className="arrow-btn-disable">
                    <ImArrowDown size={30} />
                  </div>
                )}
              </Col>
            </Row>

            <Row
              className="progress_box"
              style={{
                marginTop: "8%",
              }}
            >
              <div className="title">
                <div style={{ fontSize: "15px", color: "white" }}>
                  <strong>Kerosene Valve</strong>
                </div>
              </div>
              <Col span={14}>
                <div style={{ marginTop: "17%" }}>
                  <Progress
                    strokeWidth={10}
                    strokeColor="#03fc28"
                    type="circle"
                    width={60}
                    style={{ marginLeft: "2px" }}
                    percent={fuel_FCV}
                  />
                </div>
              </Col>
              <Col span={6} style={{ marginTop: "17%" }}>
                {StartdataArray.find((it) => it.name === "Stage 3") &&
                nShutdowndataArray.length === 0 &&
                eShutdowndataArray.length === 0 ? (
                  <div>
                    {fuel_FCV >= 100 ? (
                      <ImArrowUp className="arrow-btn-disable" size={30} />
                    ) : (
                      <ImArrowUp
                        size={30}
                        className="arrow-btn"
                        onClick={() => this.fuelCVIncreseClick()}
                      />
                    )}
                  </div>
                ) : (
                  <div className="arrow-btn-disable">
                    <ImArrowUp size={30} />
                  </div>
                )}
              </Col>
              <Col span={4} style={{ marginTop: "18%" }}>
                {StartdataArray.find((it) => it.name === "Stage 3") &&
                nShutdowndataArray.length === 0 &&
                eShutdowndataArray.length === 0 ? (
                  <div>
                    {fuel_FCV <= 0 ? (
                      <ImArrowDown className="arrow-btn-disable" size={30} />
                    ) : (
                      <ImArrowDown
                        size={30}
                        className="arrow-btn"
                        onClick={() => this.fuelCVDecreseClick()}
                      />
                    )}
                  </div>
                ) : (
                  <div className="arrow-btn-disable">
                    <ImArrowDown size={30} />
                  </div>
                )}
              </Col>
            </Row>
          </Row>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {};

const CVStage = connect(mapStateToProps, mapDispatchToProps)(CVStageComponent);
export default CVStage;
