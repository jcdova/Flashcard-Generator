var fs = require('fs');

function ClozeCard(fullText, cloze) {
	this.fullText = fullText;
	this.cloze = cloze;
	this.partial = this.fullText.replace(this.cloze, '_ _ _ _ _ _'); 
	this.createCard = function() {
		var data = {
			fullText: this.fullText,
			cloze: this.cloze,
			partial: this.partial,
			type: "cloze",
		};
		fs.appendFile("log.txt", JSON.stringify(data) + "\r\n", "utf8", function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
}
module.exports = ClozeCard;