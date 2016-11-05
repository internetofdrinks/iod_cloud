const RATE_MALE = 0.15;
const RATE_FEMALE = 0.1;
const RATE_LEGAL = 0.3;
const BEER_ALC_GRAMM = 5 * 0.8;
const GLAS_SIZE = 0.2;

class AlcoholUtils {
  static calcRestAlc(user, bac, hours = 0) {
    const restHours = AlcoholUtils.calcRestHours(user.gender, bac.baclevel);
    const sober = parseFloat(hours) >= parseFloat(restHours);
    const returnValue = {
      "sober": sober,
      "timetosober" : restHours
    };
    
    return returnValue;
  }
  
  static calcRestAlcNeeded(user, bac, hours = 0) {
    let promille = AlcoholUtils.getPromille(user, hours);
    console.log(user.goal);
    console.log(bac.baclevel);
    
    // target already achieved
    if (user.goal - bac.baclevel <= 0) {
      console.log('Goal reached already!');
      return {
        amount_in_liter: 0,
        amount_in_glasses: 0
      }
    }
    
    let beerAmount = (parseFloat(user.goal) - parseFloat(bac.baclevel)) / promille;
    
    if (hours > 0) {
      let factor = RATE_MALE;
      if (user.gender === 'female') {
        factor = RATE_FEMALE;
      }
      beerAmount += (hours * factor);
    }
    
    beerAmount = (beerAmount / 10).toFixed(2);
    return {
      amount_in_liter: beerAmount,
      amount_in_glasses: beerAmount / GLAS_SIZE
    }
  }
  
  static calcRestHours(gender, level) {
    let factor = RATE_MALE;
    if (gender === 'female') {
      factor = RATE_FEMALE;
    }
    // how many hours until sober
    return (Math.round(((level - RATE_LEGAL) / factor) * 2) / 2).toFixed(1);
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