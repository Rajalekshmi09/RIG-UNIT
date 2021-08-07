import React, { Component } from 'react';
import { Table } from 'antd';

import { ComparisonTableDetails, Details } from '../../../Services/constants';
const {
  FixedSpeed, FixedOilPr, FixedOilTemp, FixedTurbineInletGasTemp, FixedComprInletPr,
  FixedComprOutletPr, FixedPrRatio, FixedComperMassFlowRate, FixedTotalMassFlowOfAir
} = ComparisonTableDetails

const {
  Speed, OilPr, OilTemp, TurbineInletGasTemp, ComprInletPr, ComprOutletPr,
  PrRatio, ComperMassFlowRate, TotalMassFlowOfAir
} = Details

const columns = [
  {
    title: 'Speed',
    dataIndex: 'Speed',
    key: 'Speed',
  },
  {
    title: 'Oil Pr',
    dataIndex: 'OilPr',
    key: 'OilPr',
  },
  {
    title: 'Oil Temp',
    dataIndex: 'OilTemp',
    key: 'OilTemp',
  },
  {
    title: 'Turbine Inlet Gas Temp',
    dataIndex: 'TurbineInletGasTemp',
    key: 'TurbineInletGasTemp',
  },
  {
    title: 'Compr Inlet Pr',
    dataIndex: 'ComprInletPr',
    key: 'ComprInletPr',
  },
  {
    title: 'Compr Outlet Pr',
    dataIndex: 'ComprOutletPr',
    key: 'ComprOutlet Pr',
  },
  {
    title: 'Pr Ratio',
    dataIndex: 'PrRatio',
    key: 'PrRatio',
  },
  {
    title: 'Comper Mass Flow Rate',
    dataIndex: 'ComperMassFlowRate',
    key: 'Comper Mass Flow Rate',
  },
  {
    title: 'Total Mass Flow Of Air',
    dataIndex: 'TotalMassFlowOfAir',
    key: 'Total Mass Flow Of Air',
  },
];


// const data = [
//   {
//     key: '1',
//     Speed: '5000',
//     OilPr: '0-5000',
//     OilTemp: '0-1000',
//     TurbineInletGasTemp: '0-1000',
//     ComprInletPr: '0-1000',
//     ComprOutletPr: '0-1000',
//     PrRatio: '0-1000',
//     ComperMassFlowRate: '0-1000',
//     TotalMassFlowOfAir: '0-1000',

//   },
//   {
//     key: '2',
//     Speed: '1000',
//     OilPr: '5007',
//     OilTemp: '8000',
//     TurbineInletGasTemp: '1897',
//     ComprInletPr: '1000',
//     ComprOutletPr: '5453',
//     PrRatio: '7676',
//     ComperMassFlowRate: '1000',
//     TotalMassFlowOfAir: '1000',
//   },
// ];

class ComparisonTable extends Component {
  render() {
    // const firstRow = data[0];
    // const secondRow = data[1];

    // console.log(firstRow)
    // console.log(secondRow)
    // if (firstRow.Speed >= secondRow.Speed) {
    //   return
    //   console.log(secondRow.Speed)

    // }
    // else {
    //   console.log(firstRow.Speed)
    // }
    return (
      <div style={{ paddingTop: '25px' }}  >
        {/* <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
          style={{ Width: '100%' }} >
        </Table> */}

        <table class="content-table">
          <thead>
            <tr>
              <th>Speed</th>
              <th>Oil Pr</th>
              <th>Oil Temp</th>
              <th>Turbine Inlet Gas Temp</th>
              <th>Compr Inlet Pr</th>
              <th>Compr Outlet Pr</th>
              <th>Pr Ratio</th>
              <th>Comper MassFlow Rate</th>
              <th>Total MassFlow Of Air</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{FixedSpeed}</td>
              <td>{FixedOilPr}</td>
              <td>{FixedOilTemp}</td>
              <td>{FixedTurbineInletGasTemp}</td>
              <td>{FixedComprInletPr}</td>
              <td>{FixedComprOutletPr}</td>
              <td>{FixedPrRatio}</td>
              <td>{FixedComperMassFlowRate}</td>
              <td>{FixedTotalMassFlowOfAir}</td>
            </tr>
            <tr>
              {
                Speed > FixedSpeed ?
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{Speed}</td> :
                  <td>{Speed}</td>
              }
              {
                OilPr > FixedOilPr ?
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{OilPr}</td> :
                  <td>{OilPr}</td>
              }
              {
                OilTemp > FixedOilTemp ?
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{OilTemp}</td> :
                  <td>{OilTemp}</td>
              }
              {
                TurbineInletGasTemp > FixedTurbineInletGasTemp ?
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{TurbineInletGasTemp}</td> :
                  <td>{TurbineInletGasTemp}</td>
              }
              {
                ComprInletPr > FixedComprInletPr ?
                  <td style={{ color: 'red', fontWeight: 'bold' }}>{ComprInletPr}</td> :
                  <td>{ComprInletPr}</td>
              }

              <td>{ComprOutletPr}</td>
              <td>{PrRatio}</td>
              <td>{ComperMassFlowRate}</td>
              <td>{TotalMassFlowOfAir}</td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  }
}

export default ComparisonTable;