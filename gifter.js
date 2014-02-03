	var fs = require("fs");
	var Gifter = function ( gifterCollection ) {
		this.gifterCollection = gifterCollection;
		this.IdxMap = this.createGifterIdxMap();
		this.bindPossibleGifteeIdxs();
		this.noAvailGiftee = [];
		this.startGifter();
		console.log(this.noAvailGiftee);
		console.log("\n\n");
		console.log(this.gifterCollection);
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
			//console.log(randomGifter);
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
		var randomGiftee,
			GifterName = Object.keys(GifterObj)[0];
			GifterObj = GifterObj[GifterName];
			//console.log(GifterName);
			randomGiftee = this.getRandomUniqGiftee(GifterObj.possibilities, GifterName);
			if (!randomGiftee) {
				this.AddToNoAvailBucket(GifterName);
			} else {
				//console.log(randomGiftee);
			}
			//GifterObj["giftee"] = Object.keys(randomGiftee)[0];
			//console.log(randomGiftee);
	};

//############# Problem area????? ###########################################

	Gifter.prototype.getRandomUniqGiftee = function (posArr, GifterName) {
		var l = posArr.length,
			randomGifteeIdx,
			randomGiftee,
			posArrCopy;
			posArr = [].concat(posArr);
			posArrCopy = posArr;
		//console.log(posArr);
		if (l < 1) {
			//console.log("hello");
			return false;
		}

		randomGifteeIdx = posArr[this.getRandomInt(0, l-1)];
		randomGiftee = this.gifterCollection[this.IdxMap[randomGifteeIdx]];
		randomGiftee = randomGiftee[Object.keys(randomGiftee)[0]];
		//console.log(randomGiftee);
		if (this.GifteeIsAvail(randomGiftee)) {
			this.tagGiftee(randomGiftee, GifterName);	
			//this.getRandomUniqGiftee(posArrCopy.splice(randomGifteeIdx, 1));
			//console.log("im a giftee");		
			return randomGiftee;	
		} else {
			posArrCopy.splice(randomGifteeIdx, 1)
			this.getRandomUniqGiftee(posArrCopy, GifterName);
			//console.log(randomGiftee);
		}
		return false;
		//console.log("hello bottom");
	};

	Gifter.prototype.GifteeIsAvail = function (randomGiftee) {
		return !(
			this.isGiftee(randomGiftee)	
		)
	};

	Gifter.prototype.tagGiftee = function (GifteeObj, GifterName) {
		GifteeObj.isGiftee = true;
		GifteeObj.Gifter = GifterName;
		//console.log(GifteeObj);
		//console.log(this.gifterCollection[i]);
	};

	Gifter.prototype.tagGifter = function () {
			
	};

	Gifter.prototype.isGiftee = function (GifteeObj) {
		//console.log(obj);		
		return GifteeObj.hasOwnProperty("isGiftee");				
	};

	Gifter.prototype.AddToNoAvailBucket = function (GifterName) {
		this.noAvailGiftee.push(GifterName);		
	};

	var gifter = new Gifter(
		JSON.parse(fs.readFileSync("./data.json"))	
	);
