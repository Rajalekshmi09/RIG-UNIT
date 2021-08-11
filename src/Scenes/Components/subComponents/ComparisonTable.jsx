import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { updatecomparedSpeedData } from '../../../Redux/action';
import { ComparisonTableDetails, Details } from '../../../Services/constants';
import { getcomparisonFixedData } from '../../../Services/requests';
const {
  FixedSpeed, FixedOilPr, FixedOilTemp, FixedTurbineInletGasTemp, FixedComprInletPr,

} = ComparisonTableDetails

const {
  Speed, OilPr, OilTemp, TurbineInletGasTemp, ComprInletPr, ComprOutletPr,
  PrRatio, ComperMassFlowRate, TotalMassFlowOfAir
} = Details

// const columns = [
//   {
//     title: 'Speed',
//     dataIndex: 'Speed',
//     key: 'Speed',
//   },
//   {
//     title: 'Oil Pr',
//     dataIndex: 'OilPr',
//     key: 'OilPr',
//   },
//   {
//     title: 'Oil Temp',
//     dataIndex: 'OilTemp',
//     key: 'OilTemp',
//   },
//   {
//     title: 'Turbine Inlet Gas Temp',
//     dataIndex: 'TurbineInletGasTemp',
//     key: 'TurbineInletGasTemp',
//   },
//   {
//     title: 'Compr Inlet Pr',
//     dataIndex: 'ComprInletPr',
//     key: 'ComprInletPr',
//   },
//   {
//     title: 'Compr Outlet Pr',
//     dataIndex: 'ComprOutletPr',
//     key: 'ComprOutlet Pr',
//   },
//   {
//     title: 'Pr Ratio',
//     dataIndex: 'PrRatio',
//     key: 'PrRatio',
//   },
//   {
//     title: 'Comper Mass Flow Rate',
//     dataIndex: 'ComperMassFlowRate',
//     key: 'Comper Mass Flow Rate',
//   },
//   {
//     title: 'Total Mass Flow Of Air',
//     dataIndex: 'TotalMassFlowOfAir',
//     key: 'Total Mass Flow Of Air',
//   },
// ];


class ComparisonTable extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props.app.comparisonLiveData)
    getcomparisonFixedData((data) => {
      data.map((It) => {
        if (It.rpm1 <= this.props.app.comparisonLiveData[0].P6 &&
          It.rpm2 >= this.props.app.comparisonLiveData[0].P6) {
          this.props.updatecomparedSpeedData(It)
        }
      })
    })
  }


  render() {
    const compareLiveVal = this.props.app.comparisonLiveData[0];
    const comparedVal = this.props.app.comparedSpeedData
    console.log(comparedVal)
    console.log(compareLiveVal)
    const liveRPM = compareLiveVal.P6
    const liveCompressorInletPressure = compareLiveVal.P3
    const liveCompressorOutletPr = compareLiveVal.P4
    const liveTurbineInletGasTemp = compareLiveVal.P16
    const liveOilPr = compareLiveVal.P23
    const liveOilTemp = compareLiveVal.P25
    const liveTotalMassFlow = compareLiveVal.C2
    const liveCompressorPrRatio = compareLiveVal.C13
    const liveCompressorMassFlowRate = compareLiveVal.C18


    return (
      <div style={{ paddingTop: '25px' }}  >
        {/* <Table
          columns={columns}

          size="middle"
          pagination={false}
          style={{ Width: '100%' }} >
        </Table> */}

        <table class="content-table">
          <thead>
            <tr>
              <th>Speed</th>
              <th>Compr Inlet Pr</th>
              <th>Oil Pr</th>
              <th>Oil Temp</th>
              <th>Compr Pr Ratio</th>
              <th>Comper MassFlow Rate</th>
              <th>Compr Outlet Pr</th>
              <th>Total MassFlow Of Air</th>
              <th>Turbine Inlet Gas Temp</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>{comparedVal.rpm2}</td>
              <td>{comparedVal.Comprinletpressure2}</td>
              <td>{comparedVal.Oil_Pr2}</td>
              <td>{comparedVal.Oil_temp2}</td>
              <td>{comparedVal.compprratio2}</td>
              <td>{comparedVal.comprmassflowrate2}</td>
              <td>{comparedVal.comproutletpressure2}</td>
              <td>{comparedVal.totalmassflowofair2}</td>
              <td>{comparedVal.turbine_inletgastemp2}</td>
            </tr>

            <tr>
              {
                comparedVal.rpm1 <= liveRPM && comparedVal.rpm2 >= liveRPM ?
                  <td>{liveRPM}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveRPM}</td>
              }
              {
                comparedVal.Comprinletpressure1 <= liveCompressorInletPressure && comparedVal.Comprinletpressure2 >= liveCompressorInletPressure ?
                  <td>{liveCompressorInletPressure}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveCompressorInletPressure}</td>
              }
              {
                comparedVal.Oil_Pr1 <= liveOilPr && comparedVal.Oil_Pr2 >= liveOilPr ?
                  <td>{liveOilPr}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveOilPr}</td>
              }
              {
                comparedVal.Oil_temp1 <= liveOilTemp && comparedVal.Oil_temp2 >= liveOilTemp ?
                  <td>{liveOilTemp}</td> :
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{liveOilTemp}</td>
              }
              {
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
              }
            </tr>
          </tbody>
        </table>
      </div >
    )
  }
}
const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updatecomparedSpeedData
}

const CompareTableData = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparisonTable)
export default CompareTableData;

