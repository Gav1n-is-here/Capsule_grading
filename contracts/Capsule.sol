// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Capsule {
    address public owner;
    address public lastUser;       
    address public currentUser;    
    uint256 public constant PRICE = 1 ether;

    constructor() {
        owner = msg.sender;
        lastUser = msg.sender;  
    }

    function checkIn() external payable {
        require(msg.value == PRICE, "Must pay exactly 1 ether");
        lastUser = currentUser;       
        currentUser = msg.sender;     
    }

    function rate(uint8 stars) external {
        require(stars >= 1 && stars <= 5, "Rating must be 1-5");
        if (stars >= 4) {
            payable(lastUser).transfer(PRICE / 10); 
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
