$( document ).ready(function() {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
        var game = {
            questions: [
                {
                    question:"The three kinds of balls used in Quidditch are Bludgers, Snitches, and ... ?",
                    possibles: ["Quaffles ", "Wiffles ", "Boccis ", "Foozles "],
                    id: "question-one",
                    answer: 0
                },
                {
                    question:"What is the name of Harry's pet owl?",
                    possibles:["Fluffy ", "Hedwig ", "Aragog ", "Buckbeak "],
                    id:"question-two",
                    answer:1
                },
                {
                    question:"Who directed 'Harry Potter and the Philosoper's Stone'?",
                    possibles:["David Yates ", "Alfonso Cuaron ", "Mike Newell ", "Chris Columbus "],
                    id:"question-three",
                    answer: 3
                },
                {
                    question:"What does Dumbledore tell Harry he sees in the Mirror of Erised?",
                    possibles:["Himself defeating Voldemort ", "Himself as a cat ", "Himself ruling the World ", "Himself holding a pair of socks "],
                    id:"question-four",
                    answer:3
                },
                {
                    question:"A wizard who cannot do magic is known as a:",
                    possibles:["Bleaker ", "Squib ", "Duddle ", "Wizont "],
                    id:"question-five",
                    answer:1
                },
                {
                    question:"In what year was the first Harry Potter movie released?",
                    possibles:["2000 ", "2001 ", "2002 ", "2003 "],
                    id:"question-six",
                    answer:1
                },
                {
                    question:"What does O.W.L. stand for?",
                    possibles:["Ordinary Wizarding Level ", "Official Wizarding Level ", "Outstanding Wizarding Learning ", 
                                "Outstanding Wonderful Luck "],
                    id:"question-seven",
                    answer:0
                },
                {
                    question:"How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
                    possibles:["He transfigures into a shark ", "He kisses a mermaid ", "He eats gillyweed ", 
                                "He performs a bubble-head charm "],
                    id:"question-eight",
                    answer:2
                },
                {
                    question:"What is the name of Fred and George's joke shop?",
                    possibles:["Weasley Joke Emporium ", "Weasley's Wizard Wheezes ", "Fred & George's Wonder Emporium ", 
                                "Zonko's Joke Shop "],
                    id:"question-nine",
                    answer:1
                },
                {
                    question:"Which of these is NOT one of the Unforgivable Curses?",
                    possibles:["Cruciatus Curse ", "Imperius Curse ", "Sectumsempra ", "Avada Kedavra "],
                    id:"question-ten",
                    answer:2
                },
                {
                    question:"Who played Lord Voldemort in the movies?",
                    possibles:["Jeremy Irons ", "Tom Hiddleston ", "Gary Oldman ", "Ralph Fiennes "],
                    id:"question-eleven",
                    answer:3
                },
                {
                    question:"Who guards the entrance to the Gryffindor common room?",
                    possibles:["The Grey Lady ", "The Fat Friar ", "The Bloody Baron ", "The Fat Lady "],
                    id:"question-twelve",
                    answer:3
                },
                {
                    question:"What does Ron see in the Mirror of Erised?",
                    possibles:["Himself kissing Hermione ", "Himself with lots of money ", "Himself with Harry's lighting bolt scar ", 
                                "Himself holding the Quidditch Cup "],
                    id:"question-thirteen",
                    answer:3
                },
                {
                    question:"Who is NOT a member of the Order of the Phoenix?",
                    possibles:["Cornelius Fudge ", "Mad-Eye Moody ", "Professor Snape ", "Remus Lupin "],
                    id:"question-fourteen",
                    answer:0
                },
                {
                    question:"Who played Ron Weasly in the movies?",
                    possibles:["Kieran Culkin ", "Rupert Grint ", "Tyler Hoechlin ", "Daniel Radcliff "],
                    id:"question-fifteen",
                    answer:1
                }
            ]}
    
     
    var message = 'Game Over!';
        
    // button that starts the game 
    $(".startGame").on("click", function (){
        $(".wrapper").show();
        // console.log('hello');
        $(this).hide();
    });

    //start the timer 
    var number = 60;
    $('#timeLeft').on('click', run);

    function decrement(){
        number--;
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
        if (number === 0){
        stop();
        $('#messageDiv').html("Time's up!");
        checkAnswers();
        }
    }
    
    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    // The stop function
    function stop(){
        clearInterval(counter);
    }
    run();


    function formTemplate(data) {

	    var qString = "<form id='questionOne'>"+ data.question +"<br>";
	    var possibles = data.possibles;
    // a for loop to go through the possibles array for each question to add the values of each possibles
	    for (var i = 0; i < possibles.length; i++) {
		    var possible = possibles[i];
		    console.log(possible);
		    qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	    }
	    return qString + "</form>";
    }
    window.formTemplate = formTemplate;


    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);

    }

    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

    buildQuestions();

    // display of results
    function resultsTemplate(question){
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }

    function checkAnswers (){
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }

        }
        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }

    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        return anyAnswered;
    }
 
    // stops the clock with "done" button 
        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        })
});

    

















