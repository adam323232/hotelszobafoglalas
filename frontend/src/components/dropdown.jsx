import React, { Component } from "react";
import { Input, Checkbox, Button, Badge } from "antd";
import styled from "styled-components";

// const CheckboxGroup = Checkbox.Group;
const { Search } = Input;

const plainOptions = [
  "Szobaszerviz",
  "Mini bár igény szerint",
  "Fitneszterem belépő",
  "Parkoló",
  "Étkezés",
  "Reggeli az árban",
  "Wifi",
];

const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const ActionButton = styled(Button)`
  color: white;
  background-color: #464747;
`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
      DropdownStatus: false,
    };
  }

  onChange = (checkedList) => {
    console.log("checkedList", checkedList);
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onShowDropdown = () => {
    this.setState({ DropdownStatus: !this.state.DropdownStatus });
  };

  render() {
    return (
      <div
        style={{
          left: "50px",
          bottom: "80%",
          zIndex: "10",
          position: "fixed",
        }}
      >
        <Badge count={this.state.checkedList.length}>
          <Button
            onClick={() => this.onShowDropdown()}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Extrák
          </Button>
        </Badge>
        <div
          style={{
            width: "200px",
            height: "auto",
            maxHeight: "500px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            position: "fixed",
            paddingLeft: "0px",
            display: this.state.DropdownStatus ? "inherit" : "none",
            zIndex: "10",
          }}
        >
          <div style={{ overflow: "none", height: "auto", maxHeight: "300px" }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
              style={{ color: "white" }}
            >
              Mindet kérem
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              justifyContent: "space-around",
              width: "50%",
            }}
          ></div>
        </div>
      </div>
    );
  }
}
