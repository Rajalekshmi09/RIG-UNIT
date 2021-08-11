import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class ChartComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      label: this.props.label,
      labels: this.props.labels,
      title: this.props.title,
      backgroundColor: this.props.backgroundColor,
      borderColor: this.props.borderColor,
      textColor: 'blue',
      upperLimit: this.props.upperLimit,
      normalLimit: this.props.lowerLimit,
      lowerLimit: this.props.lowerLimit
    }
  }

  render() {
    const { data, label, backgroundColor, borderColor, title, upperLimit, lowerLimit } = this.state
    let max = parseInt(upperLimit, 10);
    let min = parseInt(lowerLimit, 10);
    let titleColor;

    data.map(It => {                                                    //To display the color variation intable view
      if (It > max) {
        titleColor = 'red'
      }
      else if (It < max && It > min) {
        titleColor = 'green'
      }
      else if (It < min && It !== 0) {
        titleColor = 'yellow'
      }
      else if (It === 0) {
        titleColor = 'skyblue'
      }
    })

    return (
      <div>
        <Line
          height={240}
          data={{
            labels: ["", "", "", "", "", ""],
            datasets: [{
              label: label,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
              title: title,
              upperLimit: upperLimit,
              lowerLimit: lowerLimit
            }]
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 0
            },
            title: {
              display: true,
              text: title,
              fontColor: titleColor,
              fontSize: '13'
            },

            legend: {
              position: "top",
              align: "middle",
              labels: {
                fontColor: "white",
                fontSize: 15,
              },
            },
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              }],
              yAxes: [{
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  max: max,
                  min: min,
                  stepSize: max / 10,
                  fontColor: 'rgba(255, 255, 255, 0.5)',
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}
export default ChartComponent;