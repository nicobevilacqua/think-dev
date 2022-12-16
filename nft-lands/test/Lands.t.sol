// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Lands.sol";

contract BoxLandsTest is Test {
    BoxLands public lands;

    function setUp() public {
        lands = new BoxLands();
    }

    function testSimpleMint() public {
        assertEq(lands.totalSupply(), 0, "Land total supply should be 0");
        
    }

    
}
