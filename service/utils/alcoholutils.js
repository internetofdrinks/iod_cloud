const RATE_MALE = 0.15;
const RATE_FEMALE = 0.1;
const RATE_LEGAL = 0.3;
const BEER_ALC_GRAMM = 5 * 0.8;
const GLAS_SIZE = 0.2;

class AlcoholUtils {
  static calcRestAlc(user, bac, hours = 0) {
    const hoursLeft = parseFloat(hours);
    const basePromille = bac.baclevel;
    let goalPromille;
    if (user.gametype === 'constant') {
      goalPromille = user.goal;
    } else {
      goalPromille = RATE_LEGAL;
    }
    console.log('hours: ' + hoursLeft);
    console.log('Base: ' + basePromille);
    console.log('Goal: ' + goalPromille);
    const beerPromille = AlcoholUtils.getPromille(user);
    let deltaPromille = goalPromille - basePromille;
    const returnValue = {
      sober: true,
      time_to_sober: 0,
      amount_in_liter: 0,
      amount_in_glasses: 0
    };
    
    console.log('deltapromille: ' + deltaPromille);
    
    // I'm not proud of that part, but it's 2.30am in the morning and day 2 of our hackathon - without sleep! :)
    if (deltaPromille <= 0) {
      const timeToGetSober = AlcoholUtils.getSoberTime(user, Math.abs(deltaPromille));
      if (hoursLeft === 0) {
        // we need to relax a little
        returnValue.sober = timeToGetSober <= hoursLeft;
        returnValue.time_to_sober = timeToGetSober;
      } else if (hoursLeft >= timeToGetSober) {
        returnValue.sober = hoursLeft >= timeToGetSober;
        returnValue.time_to_sober = hoursLeft;
        let possibleTime = hoursLeft - timeToGetSober;
        let possiblePromille = possibleTime * AlcoholUtils.getRate(user);
        const beer = possiblePromille / beerPromille;
        returnValue.amount_in_liter = (beer / 10).toFixed(2);
        returnValue.amount_in_glasses = (beer / 10 / 0.2).toFixed(2);
      } else {
        returnValue.sober = false;
        returnValue.time_to_sober = timeToGetSober;
        returnValue.amount_in_liter = 0;
        returnValue.amount_in_glasses = 0;
      }
      return returnValue;
    } else {
      // we can drink
      if (hoursLeft === 0) {
        returnValue.sober = true;
        returnValue.time_to_sober = 0;
        let liter = deltaPromille / beerPromille;
        returnValue.amount_in_liter = (liter / 10).toFixed(2);
        returnValue.amount_in_glasses = (liter / 10 / 0.2).toFixed(2);
      } else {
        returnValue.sober = true;
        returnValue.time_to_sober = 0;
        let possiblePromille = deltaPromille + hoursLeft * AlcoholUtils.getRate(user);
        returnValue.amount_in_liter = (possiblePromille/(beerPromille*10)).toFixed(2);
        returnValue.amount_in_glasses = ((possiblePromille/(beerPromille*10))/0.2).toFixed(2);
      }
      return returnValue;
    }
  }
  
  static getSoberTime(user, promille) {
    const factor = AlcoholUtils.getRate(user);
    return (promille / factor).toFixed(2);
  }
  
  static getRate(user) {
    let factor = RATE_MALE;
    if (user.gender === 'female') {
      factor = RATE_FEMALE;
    }
    return factor;
  }
  
  static getPromille(user) {
    let gkw = 0;
    if (user.gender === 'female') {
      gkw = -2907 + 0.1069 * user.height + 0.2466 * user.weight;
    } else {
      gkw = 2.447 - 0.09516 * user.age + 0.1074 * user.height + 0.3362 * user.weight;
    }
    
    return (0.8 * BEER_ALC_GRAMM) / (1.055 * gkw);
  }
}

module.exports = AlcoholUtils;