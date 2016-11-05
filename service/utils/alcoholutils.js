const RATE_MALE = 0.15;
const RATE_FEMALE = 0.1;
const RATE_LEGAL = 0.3;
const BEER_ALC_GRAMM = 5*0.8;

class AlcoholUtils {
  static calcRestAlc(user, bac, hours = 0) {
    // return if you're sober already
    if (bac.baclevel === 0) {
      return {
        "sober": true,
        "timetosober": 0
      }
    }
    
    const restHours = AlcoholUtils.calcRestHours(user.gender, bac.baclevel);
    const sober = parseFloat(hours) >= parseFloat(restHours);
    const returnValue = {
      "sober": sober,
    };
    
    if (!sober) {
      returnValue.timetosober = restHours;
    }
    return returnValue;
  }
  
  static calcRestAlcNeeded(user, bac, hours = 0) {
    let promille = AlcoholUtils.getPromille(user);
    console.log(user.goal);
    
    // target already achieved
    if (bac.baclevel-user.goal<=0){
      return 0;
    }
    
    let beerAmount = (parseFloat(user.goal)-parseFloat(bac.baclevel))/promille;
    console.log(beerAmount);
    return promille;
  }
  
  static calcRestHours(gender, level) {
    let factor = RATE_MALE;
    if (gender === 'female') {
      factor = RATE_FEMALE;
    }
    // how many hours until sober
    return (Math.round(((level - RATE_LEGAL) / factor) * 2) / 2).toFixed(1);
  }
  
  static getPromille(user){
    let gkw = 0;
    if (user.gender === 'female'){
      gkw = -2907+0.1069*user.height+0.2466*user.weight;
    } else{
      gkw= 2.447-0.09516*user.age+0.1074*user.height+0.3362*user.weight;
    }
    
    return (0.8*BEER_ALC_GRAMM)/(1.055*gkw);
  }
  
  
}

module.exports = AlcoholUtils;