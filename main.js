var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([
	{
		type: 'list',
		name: 'command',
		message: 'Please select an option below:',
		// choices: ['Add-Flashcard', 'Show-Flashcard']
		choices: [{
        name: 'Add Flashcard'
    }, {
        name: 'Show Flashcards'
    }]

	}
]).then(function(answer) {
	if (answer.command === 'Add Flashcard') {
		addCard();
	} else if (answer.command === 'Show Flashcards') {
		showCards();
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
				
			if (answer.continue = true) 
				addCard();
			else 
				return;
				showCards();
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
				
			} else {
				console.log("Please Try Again");
				addCard();
			}
			if (answer.continue = true) 
				addCard();
			else 
				return;
				showCards();		
		});
	}
	});
};

var showCards = function() {
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestion(questions, count);
    });
};

var showCards = function() {
    // reads the log.txt file
    fs.readFile('./log.txt', 'utf8', function(error, data) {
        //if there is an error, log it
        if (error) {
            console.log('Error occurred: ' + error);
        }
        var questions = data.split(';');
        var notBlank = function(value) {
            return value;
        };
        questions = questions.filter(notBlank);
        var count = 0;
        showQuestion(questions, count);
    });
};

var showQuestion = function(array, index) {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctReponse;
    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctReponse = parsedQuestion.back;
    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.partial;
        correctReponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctReponse) {
            console.log('Correct Answer!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        } else {
            console.log('Incorrect Answer!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        }
    });
};