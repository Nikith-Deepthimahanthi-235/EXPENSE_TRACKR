const prompt = require('prompt-sync')();

var option;
var updatedBal = 0;
var updatedExp = 0;
var updatedInc = 0;
//initial limit is taken to be maximum
var limit = 100000000000000000;
var dayExpense = 0;
let tableEntries = [ 
  // examples if needed
  // { category: "i", amount: 25000 , date : "03/02/2005" , description : ""  }, 
  // { category: "e", amount: 18000 , date : "11/11/1111" , description : ""  }, 
  // { category: "e", amount: 5000 ,  date : "11/11/1111" , description : ""  }, 
]; 


const intro = () => {
// MENU
console.log('1. ADD EXPENSE');   
console.log('2. LIST ALL EXPENSES');
console.log('3. DISPLAY SPECIFIC EXPENSE');
console.log('4. LIMIT CHANGE');
console.log('5. DELETE AN EXPENSE');
console.log('6. EXIT');
option = Number(prompt('choose an option '));
switchy();

}
// Switch statement to select the choice
const switchy = () =>{
  switch (option) {
    case 1:
      addItem();
      break;
    case 2:
      console.log(tableEntries);
      output();
      break;
    case 3:
      var spc = prompt('specify the date (dd/mm/yyyy) :');
      specific(tableEntries, 'date' , spc);
      break;
    case 4:{
      limit = prompt('enter the limit for expenses of each day');
      console.log('limit has been updated');
      repeat();
    }
      break;
      case 5:
      var d = prompt('specify the date (mm/dd/yyyy) :');
      deletion(tableEntries, 'date', d);
      break;
    case 6:
      return;
    default:{
      console.log('choose an option from 1 to 4');
      intro();
      break;
    }
  }

  }
  
  const isDateValid= (dateStr) =>{
    return !isNaN(new Date(dateStr));
  }

const output = () => {
  console.log(`Income is ${updatedInc}`);
  console.log(`Expenditure is ${updatedExp}`);
  console.log(`Balance is ${updatedBal}`);
  repeat();
}

const specific = (arr, attr, value) => {
  var j = arr.length;
  while(j--){
    if(arr[j]
      && arr[j].hasOwnProperty(attr)
      && (arguments.length > 2 && arr[j][attr]===value)){
        console.log(arr[j]);
      }
  }
  updateSummary();
  repeat();
  return arr;
}
const repeat = () =>{
  var ans =prompt('continue? (y/n)');
  if (ans==="y"){
  intro();
  }
  else if(ans==='n')
  console.log('Thanks for ur time! and make sure to watch on ur expenses');
  return;
  }


// Function to delete a specific entry 
var deletion = (arr, attr, value) => {
  var i = arr.length;
  while(i--){
     if( arr[i] 
         && arr[i].hasOwnProperty(attr) 
         && (arguments.length > 2 && arr[i][attr] === value ) ){ 

         arr.splice(i,1);

     }
   
   
  }
  console.log("Expense is deleted");
  updateSummary();
  repeat();
  return arr;
}

// const updateSummary = () => { 

//   tableEntries.map((e, i) => { 
//       // loadItems(e, i); 
//   }); 
//   updateSummary(); 
// } 

// Function to update data expense summary 
const updateSummary=() =>{ 
  let totalIncome = tableEntries.reduce((t, e) => { 
      if (e.category === "i") t += e.amount; 
      return t; 
  }, 0); 
  let totalExpense = tableEntries.reduce((ex, e) => { 
      if (e.category === "e") ex += e.amount; 
      return ex; 
 
  }, 0); 
  updatedInc = totalIncome; 
  updatedExp = totalExpense; 
  updatedBal = totalIncome - totalExpense; 
 
} 
const addItem = () =>{

 var max=0;
  let category = prompt('CATEGORY:(income(i)/expense(e)) '); 
  let amount = prompt('amount? '); 
  let date = prompt('enter date (mm/dd/yyyy) : ');
  let description = prompt('type in description : ');
 
  // Input validation 
  if ((category!== "i" && category!=="e") || Number(amount) === 0){ 
      console.log("invalid input");
      repeat();
  }
  if (Number(amount) <= 0) {
      console.log('Incorrect amount! amount cant be negative'); 
      repeat();
  }   
  if (isDateValid(date)===false){    
      console.log('Date input is invalid');
      repeat();
  }

 const dateLimit = () => {
  var j = tableEntries.length;

  while(j--){
    if(tableEntries[j]
      && tableEntries[j].hasOwnProperty('date')
      && (tableEntries[j].date==date)
      && tableEntries[j].hasOwnProperty('category')
      && ( tableEntries[j].category=="e")
       ){
        max += tableEntries[j].amount;
      }

  }   
}

 
  if(category=="e"){
    dateLimit();
    if((Number(max)+Number(amount)) <= Number(limit)){
   // Push new data 
    console.log('Expense has been added');
    tableEntries.push({ 
    category: category, 
    amount: Number(amount), 
    date: date,
    description: description
   
}); 
    updateSummary();
   }
   else{
    console.log('Daily expense has been exceeded. Cut short on your daily expenses!');
   } 
  }
    if(category=="i"){
    console.log('Income has been added');
    tableEntries.push({ 
    category: category, 
    amount: Number(amount), 
    date: date,
    description: description
   
}); 
  } 



  updateSummary();  
  amount.value = 0;
  max = 0; 
  repeat();
} 
updateSummary();
intro();

