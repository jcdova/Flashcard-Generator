var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([
	{
		type: 'list',
		name: 'command',
		message: 'Please select an option below:',
		choices: [{
        name: 'Add Flashcard'
    }, {
        name: 'See text file'
    }]

	}
]).then(function(answer) {
	if (answer.command === 'Add Flashcard') {
		addCard();
	} else if (answer.command === 'See text file') {
		console.log ("Please reference log.txt file");
	}
});

var addCard = function() {

inquirer.prompt([
	{
		type: 'list',
		name: 'cardType',
		message: 'What type of card would you like to create?',
		
		choices: [{
            name: 'Basic Flashcard'
        }, {
            name: 'Cloze Flashcard'
        }]
	}
]).then(function(answer) {
	if (answer.cardType === 'Basic Flashcard') {
		inquirer.prompt([
		{
			name: 'front',
			message: 'Enter the question: '
		}, {
			name: 'back',
			message: 'Enter the Answer: '
		}, {
            type: "confirm",
            message: "Do you want to add a new flashcard?",
            name: "continue",
            default: true
		}
		]).then(function(answer) {
			var front = answer.front;
			var back = answer.back;
			var newBasic = new BasicCard(answer.front, answer.back);
			newBasic.createCard();
				
			if (answer.continue === true) {
				addCard();
			}
			else if (answer.continue === false) {
				console.log("Please reference the log.txt file");
			}
		});
	} else if (answer.cardType === 'Cloze Flashcard') {
		inquirer.prompt([
			{
				name: 'fullText',
				message: 'Enter the full text: '		
			}, {
			 	name: 'cloze',
			 	message: 'Enter the cloze deletion portion: '
			}, {
	            type: "confirm",
	            message: "Do you want to add a new flashcard?",
	            name: "continue",
	            default: true
		}
		]).then(function(answer) {
			var fullText = answer.fullText;
			var cloze = answer.cloze;
			if (fullText.includes(cloze)) {
				var newCloze = new ClozeCard(fullText, cloze);
				newCloze.createCard();
			} 
			else {
				console.log("That cloze is not found in the full text. Please try again:");
				addCard();
			}
			if (answer.continue === true) {
				addCard();	
			} 
			else if (answer.continue === false) { 
				console.log("Please reference the log.txt file");
			}
		});
	}
  });
};

