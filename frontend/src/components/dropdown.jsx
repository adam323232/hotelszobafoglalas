import React, { useContext, useState } from 'react';
import { Input, Checkbox, Button, Badge } from 'antd';
import styled from 'styled-components';
import { DropDownContext } from '../context/DropDownContext.jsx';

const { Search } = Input;

const plainOptions = [
    'Szobaszerviz',
    'Minibár',
    'Fitneszterem belépő',
    'Parkoló',
    'Étkezés',
    'Reggeli',
    'Wifi',
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
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [dropdownStatus, setDropdownStatus] = useState(false);
    const { setExtras } = useContext(DropDownContext);

    const onChange = (checkedList) => {
        console.log('checkedList', checkedList);
        localStorage.setItem('extrak', JSON.stringify(checkedList));
        setExtras(checkedList);
        setCheckedList(checkedList);
        setIndeterminate(
            !!checkedList.length && checkedList.length < plainOptions.length
        );
        setCheckAll(checkedList.length === plainOptions.length);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        setExtras(['Mindet kérem']);
    };

    const onShowDropdown = () => {
        setDropdownStatus(!dropdownStatus);
    };

    return (
        <div
            style={{
                left: '50px',
                bottom: '80%',
                zIndex: '10',
                position: 'fixed',
            }}
        >
            <Badge count={checkedList.length}>
                <Button
                    onClick={onShowDropdown}
                    style={{ backgroundColor: 'black', color: 'white' }}
                >
                    Extrák
                </Button>
            </Badge>
            {dropdownStatus && (
                <div
                    style={{
                        width: '200px',
                        height: 'auto',
                        maxHeight: '500px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        position: 'fixed',
                        paddingLeft: '0px',
                        zIndex: '10',
                    }}
                >
                    <div
                        style={{
                            overflow: 'none',
                            height: 'auto',
                            maxHeight: '300px',
                        }}
                    >
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                            style={{ color: 'white' }}
                        >
                            Mindet kérem
                        </Checkbox>
                        <CheckboxGroup
                            options={plainOptions}
                            value={checkedList}
                            onChange={onChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
