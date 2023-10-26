import getLiquidusApys from './getLiquidusApys';

const getVvsApys = require('./getVvsApys');
const getVvsDualApys = require('./getVvsDualApys');
const getCronaApys = require('./getCronaApys');
const getDarkApys = require('./getDarkApys');
const getRipaeApys = require('./getRipaeApys');
const getFerroApys = require('./getFerroApys');

const getApys = [
  getVvsApys,
  getVvsDualApys,
  getCronaApys,
  getLiquidusApys,
  getDarkApys,
  getRipaeApys,
  getFerroApys,
];

const getCronosApys = async () => {
  const start = Date.now();
  let apys = {};
  let apyBreakdowns = {};
  let promises = [];
  getApys.forEach(getApy => promises.push(getApy()));
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (result.status !== 'fulfilled') {
      console.warn('getCronosApys error', result.reason);
      continue;
    }

    // Set default APY values
    let mappedApyValues = result.value;
    let mappedApyBreakdownValues = {};

    // Loop through key values and move default breakdown format
    // To require totalApy key
    for (const [key, value] of Object.entries(result.value)) {
      mappedApyBreakdownValues[key] = {
        totalApy: value,
      };
    }

    // Break out to apy and breakdowns if possible
    let hasApyBreakdowns = 'apyBreakdowns' in result.value;
    if (hasApyBreakdowns) {
      mappedApyValues = result.value.apys;
      mappedApyBreakdownValues = result.value.apyBreakdowns;
    }

    apys = { ...apys, ...mappedApyValues };

    apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
  }

  const end = Date.now();
  console.log(`> [APY] Cronos finished updating in ${(end - start) / 1000}s`);

  return {
    apys,
    apyBreakdowns,
  };
};

module.exports = { getCronosApys };
