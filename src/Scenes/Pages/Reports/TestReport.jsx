import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf";
class TestReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <table id="table-to-xls">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default TestReport;

var gridOptions = {
  columnDefs: [
    {
      headerName: "datra",
      children: [
        { field: "Firstname", minWidth: 200 },
        { field: "country", minWidth: 200 },
      ],
    },
    {
      headerName: "Group B",
      children: [
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
    },
  ],
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },
};
