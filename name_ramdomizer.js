;(function () {

	var listArray = [
		{ 
			"Meg" : {
				"email" : "Meg@email.com",
				"exception" : "Josh"
			}
		},
		{
			"Josh" : {
				"email" : "Josh@email.com",
				"exception" : "Meg"
			}
		},
		{
			"Roy" : {
				"email" : "Roy@email.com",
				"exception" : "Jean"
			}
		},
		{
			"Jean" : {
				"email" : "Jean@email.com",
 			    "exception" : "Roy"
			}
		},
		{
			"Chris" : {
				"email" : "Chris@email.com",
				"exception" : [ "Elizabeth", "Meredith" ]
			}
		},
		{
			"Elizabeth" : {
				"email" : "Elizabeth@email.com",
				"exception" : [ "Chris", "Meredith" ]
			}
		},
		{
			"Meredith" : {
				"email" : "Meredith@email.com",
				"exception" : [ "Elizabeth", "Chris" ]
			}
		},
		{
			"Mike" : {
				"email" : "Mike@email.com",
				"exception" : "Courtney"
			}
		},
		{
			"Courtney" : {
				"email" : "Courtney@email.com",
				"exception" : "Mike"
			}
		}
	],
		
		pickedObj = {},
		i,
		l,
		randomNum,
		usedIndexes = [],
		failures,
		choice;

	function getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function getUniqueRandomInt(i, min, max) {
		var randomInt = getRandomInt(min, max);
		return randomInt !== i ? randomInt : getUniqueRandomInt(i, min, max);
	}

	function getAvailPerson() {
		
	}

	function getEveryoneButMe(eye, list) {
		var i = 0,
	        l = list.length,
			ret = [];
		for( ; i < l; i++ ){
			if( eye === i ){
				continue;			
			}
				ret.push(list[i]);
		}
		return ret;
	}
    
    i = 0;
    l = listArray.length;
	for( ; i < l; i++ ){
		failures = [];
		randomNum = getUniqueRandomInt(i, 0, l);
		choice = listArray[randomNum];

		console.log(getEveryoneButMe(i, listArray));

//		console.log(choice);
//		console.log(listArray[i]);
//		console.log(randomNum);
//		console.log(i === randomNum);
		   
	}
	

}());
