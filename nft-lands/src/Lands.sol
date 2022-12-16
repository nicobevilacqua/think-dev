// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";


contract BoxLands is ERC721("BoxLands", "BLAND") {
    struct LandDimension {
        int256 x;
        int256 y;
        int256 z;
        bytes32 hash;
    }
    uint256 public totalSupply;

    mapping(uint256 => LandDimension) public lands;
    mapping(bytes32 => uint256) public landHashes;


    // free and open mint
    // x, y , z are the coordinates of the land start
    function mint(int256 x, int256 y, int256 z) external {
        // @dev x is the start of the land
        x = x * 30;
        y = y * 60 - 30;
        z = z * 30;

        bytes32 hash = keccak256(abi.encodePacked(x, y, z));
        require(landHashes[hash] == 0, "land already minted");

        unchecked {
            uint256 uid = ++totalSupply;
            landHashes[hash] = uid;
            lands[uid] = LandDimension(x, y, z, hash);

            _safeMint(msg.sender, uid);
        }
    }

    function coordsToLandPos(int256 x, int256 y, int256 z) external pure returns (int256, int256,  int256, bytes32) {
        x = x / 30;
        y = y / 60 - 30;
        z = z / 30;
        return (x, y, z, keccak256(abi.encodePacked(x, y, z)));
    }
}
