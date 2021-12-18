const SoulsMigrations = artifacts.require("Souls");

module.exports = function(deployer) {
  deployer.deploy(SoulsMigrations);
};
