const PartRegistry = artifacts.require("PartRegistry");

module.exports = function (deployer, network, accounts) {
  // Deploy to all networks with initial parameters
  deployer.deploy(PartRegistry, { from: accounts[0] });
};