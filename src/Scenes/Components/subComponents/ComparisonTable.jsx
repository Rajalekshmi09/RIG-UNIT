import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilteredComparisonData } from "../../../Redux/action";
import { getcomparisonFixedData } from "../../../Services/requests";
import { testParamHash } from "../../../Services/constants";

const { comparedData_Delay } = testParamHash;
class ComparisonTable extends Component {
  constructor(props) {
    super(props);
  }

  //Rendering the comparison table
  componentDidMount() {
    getcomparisonFixedData((data) => {
      //getting fixed data from request
      data.map((It) => {
        if (
          It.rpm1 <= this.props.app.chartData[0].P6 &&
          It.rpm2 >= this.props.app.chartData[0].P6
        ) {
          this.props.updateFilteredComparisonData(It);
        }
      });
    }, comparedData_Delay);
  }

  render() {
    const compareLiveVal = this.props.app.chartData[0];
    const comparedVal = this.props.app.comparisonFilteredData;

    const liveRPM = compareLiveVal.P6;
    const liveCompressorInletPressure = compareLiveVal.P3;
    const liveOilPr = compareLiveVal.P23;
    const liveOilTemp = compareLiveVal.P25;
    const liveCompressorOutletPr = compareLiveVal.P4;
    const liveTurbineInletGasTemp = compareLiveVal.P16;
    const liveTotalMassFlow = compareLiveVal.C2;
    const liveCompressorPrRatio = compareLiveVal.C13;
    const liveCompressorMassFlowRate = compareLiveVal.C18;

    return (
      <div style={{ paddingTop: "25px" }}>
        <table class="content-table">
          <thead>
            <tr>
              <th>Speed</th>
              <th>Compr Inlet Pr</th>
              <th>Oil Pr</th>
              <th>Oil Temp</th>
              {/* <th>Compr Pr Ratio</th>
              <th>Comper MassFlow Rate</th>
              <th>Compr Outlet Pr</th>
              <th>Total MassFlow Of Air</th>
              <th>Turbine Inlet Gas Temp</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{comparedVal.rpm2}</td>
              <td>{comparedVal.Comprinletpressure2}</td>
              <td>{comparedVal.Oil_Pr2}</td>
              <td>{comparedVal.Oil_temp2}</td>
              {/* <td>{comparedVal.compprratio2}</td>
              <td>{comparedVal.comprmassflowrate2}</td>
              <td>{comparedVal.comproutletpressure2}</td>
              <td>{comparedVal.totalmassflowofair2}</td>
              <td>{comparedVal.turbine_inletgastemp2}</td> */}
            </tr>

            <tr>
              {comparedVal.rpm1 <= liveRPM && comparedVal.rpm2 >= liveRPM ? (
                <td>{liveRPM}</td>
              ) : (
                <td style={{ color: "red", fontWeight: "bold" }}>{liveRPM}</td>
              )}
              {comparedVal.Comprinletpressure1 <= liveCompressorInletPressure &&
              comparedVal.Comprinletpressure2 >= liveCompressorInletPressure ? (
                <td>{liveCompressorInletPressure}</td>
              ) : (
                <td style={{ color: "red", fontWeight: "bold" }}>
                  {liveCompressorInletPressure}
                </td>
              )}
              {comparedVal.Oil_Pr1 <= liveOilPr &&
              comparedVal.Oil_Pr2 >= liveOilPr ? (
                <td>{liveOilPr}</td>
              ) : (
                <td style={{ color: "red", fontWeight: "bold" }}>
                  {liveOilPr}
                </td>
              )}
              {comparedVal.Oil_temp1 <= liveOilTemp &&
              comparedVal.Oil_temp2 >= liveOilTemp ? (
                <td>{liveOilTemp}</td>
              ) : (
                <td style={{ color: "red", fontWeight: "bold" }}>
                  {liveOilTemp}
                </td>
              )}
              {/* {
                comparedVal.compprratio1 <= liveCompressorPrRatio && comparedVal.compprratio2 >= liveCompressorPrRatio ?
                  <td>{liveCompressorPrRatio}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveCompressorPrRatio}</td>
              }
              {
                comparedVal.comprmassflowrate1 <= liveCompressorMassFlowRate && comparedVal.comprmassflowrate2 >= liveCompressorMassFlowRate ?
                  <td >{liveCompressorMassFlowRate}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveCompressorMassFlowRate}</td>
              }
              {
                comparedVal.comproutletpressure1 <= liveCompressorOutletPr && comparedVal.comproutletpressure2 >= liveCompressorOutletPr ?
                  <td>{liveCompressorOutletPr}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveCompressorOutletPr}</td>
              }
              {
                comparedVal.totalmassflowofair1 <= liveTotalMassFlow && comparedVal.totalmassflowofair2 >= liveTotalMassFlow ?
                  <td >{liveTotalMassFlow}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveTotalMassFlow}</td>
              }
              {
                comparedVal.turbine_inletgastemp1 <= liveTurbineInletGasTemp && comparedVal.turbine_inletgastemp2 >= liveTurbineInletGasTemp ?
                  <td>{liveTurbineInletGasTemp}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveTurbineInletGasTemp}</td>
              } */}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  updateFilteredComparisonData,
};

const CompareTableData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonTable);
export default CompareTableData;
