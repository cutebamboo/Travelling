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

i = foodMenu.findIndex(element => element.Size =='Medium');

if (i>=0) {
    console.log('The price of Medium size food is', foodMenu[i].Price);
}
else {console.log('there is no food with medium size!');}