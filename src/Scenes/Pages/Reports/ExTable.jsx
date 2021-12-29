import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const data = [
  { firstname: "jill", lastname: "smith", age: 22 },
  { firstname: "david", lastname: "warner", age: 23 },
  { firstname: "nick", lastname: "james", age: 26 },
];
class ExTable extends Component {
  render() {
    return (
      <div className="App">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="test"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <table id="table-to-xls">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table id="table-to-xls">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExTable;
