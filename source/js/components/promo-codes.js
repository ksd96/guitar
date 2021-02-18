const promoCodes = {
  "GITARAHIT": function(summ) {
    if (typeof summ === `number` && summ !== 0) {
      return (Number(summ) * 90) / 100;
    }
  },
  "SUPERGITARA": function(summ) {
    if (typeof summ === `number` && summ !== 0) {
      if (summ >= 700) {
        return Number(summ) - 700;
      } else {
        return 0;
      }
    }
  },
  "GITARA2020": function(summ) {
    if (typeof summ === `number` && summ !== 0) {
      let number = (Number(summ) * 30) / 100;
      if (number < 3500) {
        return Number(summ) - number;
      } else {
        return Number(summ) - 3500;
      }
    }
  }
}

export default promoCodes;
