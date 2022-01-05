import React, { Component } from "react";

class expirationTime extends Component {
  componentDidMount() {
    let token = LocalData.getLocalData("currentUser");
    console.log(token);

    setTimeout(() => {
      this.signOut();
    }, token.expirationTime);
  }

  //this is triggered on clicking on logout() button
  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    return <div></div>;
  }
}
export default expirationTime;
