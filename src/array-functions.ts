// const cars = [
//   {
//     color: 'purple',
//     type: 'minivan',
//     capacity: 7,
//   },
//   {
//     color: 'red',
//     type: 'station wagon',
//     capacity: 7,
//   },
//   {
//     color: 'blue',
//     type: 'sedan',
//     capacity: 5,
//   },
// ];


// function operationonarray(){
//     const carsmodifiedcapacity = cars.map(car => {
//         return({
//             color : car.color,
//             type : car.type,
//             capacity : car.capacity*2

//         }
//         )
//     })
//     console.log(carsmodifiedcapacity);

//     //only used for the operations or loggin purpose because dosen't return anythign to store in the variable
//     const changedcars = cars.forEach(car =>{
//         console.log("printing cars");
//         console.log(Object.values(car)); 
        
//         console.log(Object.entries(car)); 
        
//         console.log(Object.values(car)); 
//     }
//     );
//     console.log(changedcars);//undefined return when try to store in variable

//     const filteredcars = cars.filter(car =>{
//         return (car.capacity>5 && car.color=="red")} )//filter arrray element based on the conditions
//     console.log(filteredcars);


//         const findfirstcar = cars.find(car => car.capacity==7);
//         console.log(findfirstcar);

//         const anycarmatchcondition = cars.some(car => car.capacity < 6)
//         console.log(anycarmatchcondition);

//         const everycarmatchcondition = cars.every(car => car.capacity < 6)
//         console.log(everycarmatchcondition);

//         const pushnewcar = cars.push({color : 'skyblue',type: 'seedan',capacity : 8})
//         console.log("Updated car list", cars);
//         console.log("new variable",pushnewcar);//return number of element pushed

//         cars.pop();
//         console.log("updated car list",cars);
//         console.log("break")

//         const sortedcars = cars.sort((car1,car2)=>car2.capacity-car1.capacity);
//         console.log(sortedcars);

//             cars.sort();
// };



// operationonarray();
