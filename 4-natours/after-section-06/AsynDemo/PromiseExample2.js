
const readline = require('readline');

const foodMenu = [{
    "Code": "CH001",
    "Type": "Chicken Soup",
    "Price": 10000,
    "Unit": "VND",
    "Size": "Small"
},
{   "Code": "CH002",
    "Type": "Chicken Soup",
    "Price": 30000,
    "Unit": "VND",
    "Size": "Medium"
}, 
{
    "Code": "CH003",
    "Type": "Chicken Soup",
    "Price": 50000,
    "Unit": "VND",
    "Size": "Large"
}];



onServeCustomer = [8,9,10];
PageDeviceList = [];


FoodOrder()
    .then((selectedFood)=>FoodRegistration(selectedFood))
    .then((foodRegInfo)=> console.log(foodRegInfo))
    .catch((mes)=> console.log(mes));



function FoodOrder(){
    return new Promise((resolve, reject) => {
        selectedFood = []; 
        console.log('Please choose your menu...');
        FoodOrder1(0).then((selFood)=>{
                        selectedFood.push(selFood);
                        FoodOrder1(1).then((selFood)=>{
                            selectedFood.push(selFood);
                            FoodOrder1(2)
                                         .then((selFood)=>{
                                                selectedFood.push(selFood);
                                                resolve(selectedFood)
                                                })
                                         .catch((message)=>{reject('message')});   
                        });
                     });
                     
                });
}


function FoodOrder1(menuItem){
    const p = new Promise((resolve, reject)=>{
        const selectionFood = {
            "Code":"",
            "Quatity":0
        }
        const rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout});
        
        if (menuItem < foodMenu.length){
            selectionFood.Code = foodMenu[menuItem].Code;
            rl.question(`This is food  ${foodMenu[menuItem].Type} with ${foodMenu[menuItem].Size} size.
                           \n How many quatities do you want?`, 
                           (answer) => {
                                // Use the input value
                            //check input value is natural number or not? 
                            value = parseInt(answer);
                            if (!(Number.isInteger(value)&& value>=0)){
                                console.log ('The input is invalid. Redo please...!');
                            }
                            else{
                                selectionFood.Quatity = value;
                            }
                            rl.close();                            
                            resolve(selectionFood);
                           });
            }else
            {
                reject('End of the menu');
            }
    });
    return p;
} 


function FoodRegistration(selectedFood){
    selectedFoodList = [];
        //'console.log(selectedFood);
        i = 0;
        while(i < selectedFood.length){
            if (selectedFood[i].Quatity != 0){
                jmenuInd = foodMenu.findIndex(foodMenu => foodMenu.Code == selectedFood[i].Code);
                if (jmenuInd >= 0 ){
                    selectedFoodList.push(foodMenu[jmenuInd]);
                    selectedFoodList[selectedFoodList.length-1].Quatity = selectedFood[i].Quatity;
                }  
            }
            i++;
        }
    const p = new Promise((resolve, reject) => 
        {
            foodRegInfo = {"selectedFood":[]};
            newCustomer = Math.max(...onServeCustomer) + 1;
            onServeCustomer.push(newCustomer);
            foodRegInfo.Customer = newCustomer;
            foodRegInfo.Time = new Date().toISOString();
            foodRegInfo.selectedFood = selectedFoodList;
            total = 0;
            console.log(total);
            i = 0;
            while (i < selectedFood.length){
                total = total + parseFloat(selectedFoodList[i].Price) * selectedFoodList[i].Quatity;
                i++;
            }
            //console.log(`${selectedFood[i].Price}*${selectedFood[i].Quatity}`);
         //   console.log(selectedFood);
            foodRegInfo.Total = total; 
            foodRegInfo.Unit = "VND";
            foodCookingTime = 30;
            foodRegInfo.PaymentStatus = false;
            resolve(foodRegInfo);
            reject(Error("There error in Food Registration"));
        });
    return p;
}



function PaymentRequest(foodRegInfo, callback){
    console.log(`You have ordered the following food`);
    i=0;
    while (i < foodRegInfo.selectedFood.length){
        console.log(`${foodRegInfo.selectedFood[i].Type} - ${foodRegInfo.selectedFood[i].Size} size: ${foodRegInfo.selectedFood[i].Quatity}`);
        i++;
    }
    console.log(`Total: ${foodRegInfo.Total} ${foodRegInfo.Unit}`);
    
    console.log('Waiting for payment confirm.');
    callback(foodRegInfo);
    
}

function PaymentResponse(foodRegInfo, callback){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout});
    rl.question('Press 1 for confirm the payment response....', (answer)=>{
        if (parseInt(answer)==1){
            foodRegInfo.PaymentStatus = true;
            foodRegInfo.CookOK_Cancel = true;
        }
        else
        {
            foodRegInfo.CookOK_Cancel = false;
        }
        rl.close();
        callback(foodRegInfo);
    });

}



