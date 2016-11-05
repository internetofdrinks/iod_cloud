const RATE_MALE = 0.15;
const RATE_FEMALE = 0.1;
const RATE_LEGAL = 0.3;

class AlcoholUtils {
  static calcRestAlc(user, bac, hours = 0) {
    // return if you're sober already
    if (bac.baclevel === 0) {
      console.log("You're sober already!");
      return {
        "timetosober": 0
      }
    }
    
    const restHours = AlcoholUtils.calcRestHours(user.gender, bac.baclevel, hours);
    console.log(hours);
    console.log(restHours);
    const sober = parseFloat(hours) >= parseFloat(restHours);
    console.log(sober);
    const returnValue = {
      "sober": sober,
    };
    
    if (!sober) {
      returnValue.timetosober = restHours;
    }
    
    return returnValue;
    
  }
  
  static calcRestHours(gender, level, hours) {
    let factor = RATE_MALE;
    if (gender === 'female') {
      factor = RATE_FEMALE;
    }
    // how many hours until sober
    const timeToSober = (Math.round(((level - RATE_LEGAL) / factor)*2)/2).toFixed(1);
    return timeToSober;
  }
}

module.exports = AlcoholUtils;