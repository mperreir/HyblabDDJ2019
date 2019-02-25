/* functions that calculate expenses for : cars, bikes and electrical bikes
 * return values in euro/km
 * the values used are approximative averages from 2018 statistics
*/

function carExpenses(distance){
  return Math.round(distance * 2.715  * 100) / 100;
}

function bikeExpenses(distance){
  return Math.round(distance * 0.12  * 100) / 100;
}

function eBikeExpenses(distance){
  return Math.round(distance * 0.45  * 100) / 100;
}

/* functions that calculate CO2e emission for : cars, mechanical and electrical bikes
 * return values in kg/km
 * the values used are approximative averages from 2018 statistics
*/
function carEmission(distance){
  return Math.round(distance * 0.271  * 100) / 100;
}

function bikeEmission(distance){
  return Math.round(distance * 0.021  * 100) / 100;
}

function eBikeEmission(distance){
  return Math.round(distance * 0.022  * 100) / 100;
}

/* functions that calculate the calories burned for : cars, mechanical and electrical bikes
 * returns kCal/h
 * for a standard 80 kg body , for leisure use ==> 16 km/h <=speed <=19 km/h
*/

function caloriesBurnedCar(distance){
  //insert here function that counts time spent riding a car
  return Math.round(distance * 0.109  * 100) / 100; // this return value should be multiplied by the time equivalent to the distance
}

function caloriesBurnedBike(distance){
  //insert here function that counts time for distance in bike
  return Math.round(distance * 0.518  * 100) / 100; // this return value should be multiplied by the time equivalent to the distance
}

function caloriesBurnedEBike(distance){
  //insert here function that counts time for distance in elctrical bike
  return Math.round(distance * 0.207  * 100) / 100; // this return value should be multiplied by the time equivalent to the distance
}
