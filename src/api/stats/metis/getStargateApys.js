const { getMasterChefApys } = require('../common/getMasterChefApys');
const { getStargateV2Apys } = require('../common/stargate/getStargateV2Apys');
const { METIS_CHAIN_ID: chainId } = require('../../../constants');

const poolsV1 = require('../../../data/metis/stargateMetisPools.json');
const poolsV2 = require('../../../data/metis/stargateV2MetisPools.json');

const getStargateApys = async () => {
  const apysV1 = await getMasterChefApys({
    chainId,
    masterchef: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
    tokenPerBlock: 'eTokenPerSecond',
    secondsPerBlock: 1,
    hasMultiplier: false,
    pools: poolsV1,
    oracleId: 'METIS',
    oracle: 'tokens',
    decimals: '1e18',
  });

  const apysV2 = await getStargateV2Apys({
    chainId,
    masterchef: '0xF1fCb4CBd57B67d683972A59B6a7b1e2E8Bf27E6',
    pools: poolsV2,
    //log: true
  });

  const apys = { ...apysV1.apys, ...apysV2.apys };
  const apyBreakdowns = { ...apysV1.apyBreakdowns, ...apysV2.apyBreakdowns };

  return { apys: apys, apyBreakdowns: apyBreakdowns };
};

module.exports = getStargateApys;
