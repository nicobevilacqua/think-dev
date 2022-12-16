// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Lands.sol";

contract BoxLandsTest is Test {
    BoxLands public lands;

    address user = makeAddr("user");

    function setUp() public {
        lands = new BoxLands();
    }

    function testSimpleMint() public {
        vm.startPrank(user);

        assertEq(lands.totalSupply(), 0, "Land total supply should be 0");
        
        lands.mint(0, 0, 0);
        assertEq(lands.totalSupply(), 1, "Land total supply should be 1");

        (int256 expectedX, int256 expectedY, int256 expectedZ, bytes32 expectedHash) = lands.lands(1);

        (int256 x, int256 y, int256 z, bytes32 hash) = lands.coordsToLandPos(12, 10, 10);
        assertEq(x, expectedX, "x should be 0");
        assertEq(y, expectedY, "y should be -30");
        assertEq(z, expectedZ, "z should be 0");
        assertEq(hash, expectedHash, "Wrong hash");        
    }
        
}
