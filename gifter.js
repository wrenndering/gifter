	var Gifter = function ( gifterCollection ) {
		this.gifterCollection = gifterCollection;
		this.IdxMap = this.createGifterIdxMap();
		this.bindPossibleGifteeIdxs();
		this.startGifter();
//		console.log(JSON.stringify(this.gifterCollection));
		
	};

	Gifter.prototype.createGifterIdxMap = function () {
		var ret = {};
		this.gifterCollection.forEach(function(el, i, arr){
			var name = Object.keys(el)[0];
			if ( !ret.hasOwnProperty(name) ) {
				ret[name] = i;
			}					
		});
		return ret;
	 
	};

	Gifter.prototype.bindPossibleGifteeIdxs = function () {
		var that = this;
		this.gifterCollection.forEach(function(el, i){
			var Name = Object.keys(el)[0],
				possibilities = [],
				i,
				innerObject;
			innerObject = el[Name];
			for (i in that.IdxMap) {
				if ( innerObject.exception.indexOf(i) < 0 && !(i === Name) ) {
					possibilities.push(i);
				}
			}
			innerObject.possibilities = possibilities;
		});
	};

	Gifter.prototype.startGifter = function () {
		var i = 0,
			l = this.gifterCollection.length,
			usedArr = [],
			randomGifter,
			randomNumIdx;
		for ( ; i < l; i++ ) {
			randomNumIdx = this.getRandomUniqNum(0, l-1, usedArr);
			randomGifter = this.gifterCollection[randomNumIdx];
			usedArr.push(randomNumIdx);
			this.assignGiftee(randomGifter);
		}
	};

	Gifter.prototype.getRandomInt = function (min, max) {
         return Math.floor(Math.random() * (max - min + 1) + min);
	};

	Gifter.prototype.getRandomUniqNum = function (min, max, usedArr) {
		var randomNum = this.getRandomInt(min, max);
		return usedArr.indexOf(randomNum) < 0 ? randomNum : this.getRandomUniqNum(min, max, usedArr);		
	};

	Gifter.prototype.assignGiftee = function (GifterObj) {
		var randomGiftee;
			GifterObj = GifterObj[Object.keys(GifterObj)[0]];
			//console.log(GifterObj);
			randomGiftee = this.getRandomUniqGiftee(GifterObj.possibilities);
			GifterObj["giftee"] = Object.keys(randomGiftee)[0];
			console.log(GifterObj);
	};

	Gifter.prototype.getRandomUniqGiftee = function (posArr) {
		var l = posArr.length,
			randomGifteeIdx,
			randomGiftee,
			posArrCopy = posArr;

		if (l < 1) {
			return false;
		}

		randomGifteeIdx = posArr[this.getRandomInt(0, l-1)];
		randomGiftee = this.gifterCollection[this.IdxMap[randomGifteeIdx]];
		//console.log(randomGiftee);
		if (this.isGiftee(randomGiftee)) {
			this.getRandomUniqGiftee(posArrCopy.splice(randomGifteeIdx, 1));
			console.log("im a giftee");			
		}
		return randomGiftee;		
 			
	};

	Gifter.prototype.tagGiftee = function () {
			
	};

	Gifter.prototype.tagGifter = function () {
			
	};

	Gifter.prototype.isGiftee = function (GifteeObj) {
		var obj = GifteeObj[Object.keys(GifteeObj)[0]];
		//console.log(obj);		
		return obj.hasOwnProperty("isGiftee");				
	};

	var gifter = new Gifter([
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
	]);
	
		



