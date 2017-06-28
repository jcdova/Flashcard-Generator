var fs = require('fs');

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	this.createCard = function() {
		var data = {
			front: this.front,
			back: this.back,
			type: "basic",
		};
		fs.appendFile("log.txt", JSON.stringify(data) + "\r\n", "utf8", function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
}
module.exports = BasicCard;