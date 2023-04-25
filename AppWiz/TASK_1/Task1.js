//step 1: Generating an array of 10 random integers between 1 and 100.
const arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100) + 1);
}

// Step 2: Print out the original array.
console.log(`Original Array: [${arr}]`);

// Step 3: Sort the array in ascending order.
arr.sort();

// Step 4: Print out the sorted array.
console.log(`Sorted Array: [${arr}]`);

// Step 5: Calculate the average value of the array and round it to two decimal places.
var sum=0;
for(var i=0;i<10;i++){
    var sum=arr[i]+sum;
}
const avg = (sum / arr.length).toFixed(2);

// Step 6: Print out the average value.
console.log(`Average: ${avg}`);
