const RATE_MEN = 0.2;
const RATE_WOMEN = 0.1;
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
    
    const restHours = AlcoholUtils.calcRestHours();
    console.log(hours);
    console.log(restHours);
    const sober = hours >= restHours;
    const returnValue = {
      "sober": sober,
    };
    
    if (!sober) {
      returnValue.timetosober = restHours;
    }
    
    return returnValue;
    
  }
  
  static calcRestHours() {
    return 5;
  }
}

module.exports = AlcoholUtils;