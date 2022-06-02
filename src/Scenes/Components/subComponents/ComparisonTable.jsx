import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import LiveStateBlock from "../TestPageComponent/LiveStateBlock";

class ComparisonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareValue: [],
      livedata: [],
    };
  }
  //Rendering the comparison table
  componentDidMount() {
    axios
      .get("http://localhost:5000/comparison.php")
      .then((res) => {
        this.setState({
          compareValue: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    //live data from store
    const compareLiveVal = this.props.app.chartData[0];

    //comparison table value from DB
    const comparedVal = this.state.compareValue;

    //live data from store esch field / column
    const liveRPM = compareLiveVal.P6;
    const liveCompressorInletPressure = compareLiveVal.P3;
    const liveOilPr = compareLiveVal.P23;
    const liveOilTemp = compareLiveVal.P25;
    const liveturbine_inlet_gas = compareLiveVal.P16;
    const livecompr_outlet_pr = compareLiveVal.P4;

    let displayValueRPM2;
    let displayValueComprPr2;
    let displayValueOilPr2;
    let displayValueOilTemp2;
    let displayValueRPM1;
    let displayValueComprPr1;
    let displayValueOilPr1;
    let displayValueOilTemp1;
    let displayValueturbine_inletgastemp1;
    let displayValueturbine_inletgastemp2;
    let displayValuecomproutletpressure2;
    let displayValuecomproutletpressure1;

    comparedVal.map((It) => {
      if (
        parseInt(It.rpm1) <= parseInt(liveRPM) &&
        parseInt(It.rpm2) >= parseInt(liveRPM)
      ) {
        displayValueRPM2 = It.rpm2;
        displayValueComprPr2 = It.Comprinletpressure2;
        displayValueOilPr2 = It.Oil_Pr2;
        displayValueOilTemp2 = It.Oil_temp2;
        displayValueRPM1 = It.rpm1;
        displayValueComprPr1 = It.Comprinletpressure1;
        displayValueOilPr1 = It.Oil_Pr1;
        displayValueOilTemp1 = It.Oil_temp1;
        /* ADD DATAbugid-(GOARIG_7004) */
        displayValueturbine_inletgastemp1 = It.turbine_inletgastemp1;
        displayValueturbine_inletgastemp2 = It.turbine_inletgastemp2;
        displayValuecomproutletpressure1 = It.comproutletpressure1;
        displayValuecomproutletpressure2 = It.comproutletpressure2;
      }
    });

    const getColorComprPr = () => {
      if (
        displayValueComprPr2 > liveCompressorInletPressure &&
        displayValueComprPr1 < liveCompressorInletPressure
      ) {
        return "white";
      } else {
        return "red";
      }
    };

    const getColorOilPr = () => {
      if (displayValueOilPr2 > liveOilPr && displayValueOilPr1 < liveOilPr) {
        return "white";
      } else {
        return "red";
      }
    };

    const getColorOilTemp = () => {
      if (
        displayValueOilTemp2 > liveOilTemp &&
        displayValueOilTemp1 < liveOilTemp
      ) {
        return "white";
      } else {
        return "red";
      }
    };

    /* ADD DATAbugid-(GOARIG_7004)   */
    const getColoturbine_inletgastemp = () => {
      if (
        displayValueturbine_inletgastemp2 > liveturbine_inlet_gas &&
        displayValueturbine_inletgastemp1 < liveturbine_inlet_gas
      ) {
        return "white";
      } else {
        return "red";
      }
    };

    /* ADD DATAbugid-(GOARIG_7004)   */
    const getColorcomproutletpressure = () => {
      if (
        displayValuecomproutletpressure2 > livecompr_outlet_pr &&
        displayValuecomproutletpressure1 < livecompr_outlet_pr
      ) {
        return "white";
      } else {
        return "red";
      }
    };

    //{ /*DEL - GOARIG_7004 */}
    // const liveCompressorOutletPr = compareLiveVal.P4;
    // const liveTurbineInletGasTemp = compareLiveVal.P16;
    // const liveTotalMassFlow = compareLiveVal.C2;
    // const liveCompressorPrRatio = compareLiveVal.C13;
    // const liveCompressorMassFlowRate = compareLiveVal.C18;

    return (
      <div>
        <LiveStateBlock />

        <table class="content-table">
          <thead>
            <tr>
              <th>Speed</th>
              <th>Compr Inlet Pr</th>
              <th>Oil Pr</th>
              <th>Oil Temp</th>
              <th>Turbine Inlet Gas Temp</th>
              <th>Compr. Outlet Pressure</th>
            </tr>
          </thead>
          <tbody>
            {comparedVal ? (
              <tr>
                <td>{displayValueRPM2}</td>
                <td>{displayValueComprPr2}</td>
                <td>{displayValueOilPr2}</td>
                <td>{displayValueOilTemp2}</td>
                <td>{displayValueturbine_inletgastemp2}</td>
                <td>{displayValuecomproutletpressure2}</td>
              </tr>
            ) : (
              []
            )}
            <tr>
              <td>{liveRPM}</td>
              <td style={{ color: getColorComprPr() }}>
                {liveCompressorInletPressure}
              </td>
              <td style={{ color: getColorOilPr() }}>{liveOilPr}</td>
              <td style={{ color: getColorOilTemp() }}>{liveOilTemp}</td>
              {/*ADD - GOARIG_7004 */}
              <td style={{ color: getColoturbine_inletgastemp() }}>
                {liveturbine_inlet_gas}
              </td>
              <td style={{ color: getColorcomproutletpressure() }}>
                {livecompr_outlet_pr}
              </td>
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
const mapDispatchToProps = {};
const CompareTableData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonTable);
export default CompareTableData;
