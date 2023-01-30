// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockUSDC is ERC20, Ownable {
    constructor() ERC20("Mock USDC", "USDC") {}

    function mintOwner(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function mint(address to, uint256 amount) public {
        require(amount <= 100 * 10e18, "Exceeded 100$ per tx");
        _mint(to, amount);
    }
    function decimals() public override pure returns(uint8){
        return 6;
    }
}