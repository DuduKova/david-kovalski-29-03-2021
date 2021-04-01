import React, { useState } from 'react';
import {Nav, NavItem, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';
import { Link } from '@reach/router';
import {Currency, currencyToSymbol} from "../../models/types";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { setCurrency } from '../../reducers';
import {formatCurrency} from "../../utils/formatting";

const NavLink = (props: any) => (
    <Link
        {...props}
        getProps={({ isCurrent }) => {
            return {
                style: {
                    color: isCurrent ? 'darkblue' : 'grey'
                }
            };
        }}
    />
);

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();
    const currency = useAppSelector(state => state.productsSlice.currency);
    const onChange = (selectedCurrency: Currency) => {
        dispatch(setCurrency(selectedCurrency))
    };
    const toggle = () => setDropdownOpen(!dropdownOpen);
    return (
            <Nav tabs className="mb-5">
                <NavItem className="navItem">
                    <NavLink to="/">Purchase by item</NavLink>
                </NavItem>
                <NavItem className="navItem">
                    <NavLink to='/stores'>Purchase by store</NavLink>
                </NavItem>
                <Dropdown nav isOpen={dropdownOpen} toggle={toggle} className="ml-auto">
                    <DropdownToggle nav caret className="text-dark-grey border-0">
                        Currency {formatCurrency(currency)}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => onChange('USD')}>USD {currencyToSymbol.USD}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => onChange('ILS')}>ILS {currencyToSymbol.ILS}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Nav>
    );
};

export default Navbar;
