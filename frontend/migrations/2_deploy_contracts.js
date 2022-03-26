/* eslint-disable no-undef */
const DeLib = artifacts.require('DeLib');

module.exports = async function(deployer) {
  await deployer.deploy(DeLib, '0x5bc61D9636769a514149f48220cbF9D978B5A6ea');
}