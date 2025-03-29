import React, { useContext, useState } from "react";
import { Input, Checkbox, Button, Badge } from "antd";
import styled from "styled-components";
import { DropDownContext } from "../context/DropDownContext.jsx";

const { Search } = Input;

const plainOptions = [
  "Szobaszerviz",
  "Minibár",
  "Fitneszterem belépő",
  "Parkoló",
  "Étkezés",
  "Reggeli",
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

const App = () => {
    const [checkedList, setCheckedList] = useState(["Nem kérek semmit"]); // Alapértelmezett állapot
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [dropdownStatus, setDropdownStatus] = useState(false);
    const { setExtras } = useContext(DropDownContext);
  
    // Extrák kiválasztásának kezelése
    const onChange = (checkedList) => {
      if (checkedList.length === 0) {
        // Ha nincs kiválasztva semmi, akkor "Nem kérek semmit" legyen az alapértelmezett
        setCheckedList(["Nem kérek semmit"]);
        setExtras(["Nem kérek semmit"]);
      } else {
        // Ha van kiválasztás, akkor frissítjük az extrákat
        setCheckedList(checkedList);
        setExtras(checkedList);
      }
  
      setIndeterminate(
        !!checkedList.length && checkedList.length < plainOptions.length
      );
      setCheckAll(checkedList.length === plainOptions.length);
    };
  
    // "Nem kérek semmit" logika
    const onCheckAllChange = (e) => {
      if (e.target.checked) {
        setCheckedList(["Nem kérek semmit"]); // Csak "Nem kérek semmit" legyen kiválasztva
        setExtras(["Nem kérek semmit"]);
      } else {
        setCheckedList([]); // Üres lista, ha nincs kijelölve semmi
        setExtras([]);
      }
      setIndeterminate(false);
      setCheckAll(e.target.checked);
    };
  
    // Dropdown megjelenítése/elrejtése
    const onShowDropdown = () => {
      setDropdownStatus(!dropdownStatus);
    };
  
    return (
      <div className="dropdown-kontener">
        <Badge count={checkedList.length}>
          <Button
            onClick={onShowDropdown}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Extrák
          </Button>
        </Badge>
        {dropdownStatus && (
          <div
            className="dropdown-list-kontener"
            style={{
              width: "200px",
              height: "auto",
              maxHeight: "500px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              position: "fixed",
              paddingLeft: "0px",
              zIndex: "10",
            }}
          >
            <div
              style={{
                overflow: "none",
                height: "auto",
                maxHeight: "300px",
              }}
            >
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkedList.includes("Nem kérek semmit")}
                style={{ color: "white" }}
              >
                Nem kérek semmit
              </Checkbox>
              <CheckboxGroup
                options={plainOptions}
                value={checkedList.filter((item) => item !== "Nem kérek semmit")}
                onChange={onChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
