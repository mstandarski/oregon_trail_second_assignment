(function(){

    /*
    * Interfaces
    */

//this function exists to provide my travelers with a random amount of food.
//I don't use it anywhere else

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;


    }  //ends ITraveler


//commenting the below four lines out per Eric's instruction.  The need for this code is not clear.
    // //interface describing what the passenger array should look like
    // interface IPassengerArray {
    //     [index:number]:Traveler
    // }

    // food(wagon)
    // Return the total amount of food among all occupants of the wagon.

    //interface describing attributes and methods a wagon should have
    interface IWagon{
        capacity: number;
        passengerArray;

        //when implemented, we should add the traveler to the wagon if the capacity permits
        //this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    } //ends IWagon

    /*
    * Classes
    */


    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food;
        name;
        isHealthy;

        hunt(){
            if (Math.random() > 0.5) {
                this.food += 100;
            } //ends if statement
        //the below three lines have been added following the walkthrough in class.
        //if the traveler hunts and their food is > 20, the traveler will be considered healthy
            if (this.food >= 20) {
                this.isHealthy = true;
            }//ends second if statement
            return this.food;
        } //ends hunt()

        eat(){
            if (this.food >= 20) {
                this.food - 20;
            } else {
                this.isHealthy = false;
            } //ends else
            return this.isHealthy;
        } //ends eat()

//while not reflected in this example, the constructor is usually the first method called in a class.
//the reason for this is because it is the most important method.  
//Having it structured the way I do here does not seem to have any negative side effects
        constructor(food: number, name: string, isHealthy = true){
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        } //ends constructor

    } //ends class Traveler

    // The wagon class that implements the IWagon interface
    // This is currently in violation of its contract with the interface.
    // Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity;
        passengerArray: Traveler[] = [];

        addPassenger(traveler){
            if (this.passengerArray.length < this.capacity) {
                this.passengerArray.push(traveler)
                return "added"
            } else {
                return "sorry"
            }
        } //ends addPassenger

        isQuarantined() {
            for (var i = 0; i < this.passengerArray.length; i++) {
            if (!this.passengerArray[i].isHealthy) {
              return true;
            }
          } //ends 'for' loop
          return false;
        } //ends isQuarantined


        getFood() {
            let total = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                total = total + this.passengerArray[i].food;
            } //ends for loop
            return total;
        } //ends getFood()
        
    //see the Traveler constructor comment on line ~96
        constructor(capacity: number){
            this.capacity = capacity;
        } //ends constructor

    } //ends class Wagon


// Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    let Traveler1 = new Traveler(getRandomIntInclusive(1, 100), "Pikachu", true);
    let Traveler2 = new Traveler(getRandomIntInclusive(1, 100), "Charmander", true);
    let Traveler3 = new Traveler(getRandomIntInclusive(1, 100), "Squirtle", true);
    let Traveler4 = new Traveler(getRandomIntInclusive(1, 100), "Pidgey", true);
    let Traveler5 = new Traveler(getRandomIntInclusive(1, 100), "Mewtwo", true);

// * Make 3 of 5 the travelers eat by calling their eat methods
    console.log("It is " +Traveler1.eat() + " that Pikachu is healthy and has eaten.");
    console.log("Charmander is healthy and eating, right? " + Traveler2.eat()+"!");
    console.log("Squirtle is eating now.  His health status is "+ Traveler3.eat());

// Make the remaining 2 travelers hunt
    console.log("Pidgey attempts to hunt and brings back " + Traveler4.hunt()+ " units of food like a fatass.");
    console.log("Mewtwo comes to hunt and returns " + Traveler5.hunt() + ".  He could have done more, but he's not a team player.");
    

//  Create wagon with an empty passenger list and a capacity of 4.
    let SuperWagon = new Wagon(4);
    

// Create an array of your travelers
    let travelerArray = [Traveler1, Traveler2, Traveler3, Traveler4, Traveler5]


// loop over the array of travelers and give each traveler a 50% chance
//  of attempting to be being added to the wagon using the wagons addPassenger method.
    for(let i=0; i < travelerArray.length; i++){
        if(Math.random() > .5){
            console.log(SuperWagon.addPassenger(travelerArray[i]));
        }
    }

console.log("is the wagon quarantined? " + SuperWagon.isQuarantined())

// Run the getFood method for the wagon
console.log("The SuperWagon has " + SuperWagon.getFood() +" units of food");


    /*
    * Play the game
    * 
    *
    *
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */

})();

