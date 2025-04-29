const PartRegistry = artifacts.require("PartRegistry");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(PartRegistry, { from: accounts[0] });
};
