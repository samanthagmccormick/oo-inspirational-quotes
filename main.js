///////////////////////////// OBJECTS /////////////////////////

// Your single quote
var Quote = function(quote, author, rating) {
	this.quote = quote;
	this.author = author;
	this.rating = rating;
};

	// Method to add a DOM element that represents each quote
	Quote.prototype.render = function() {
		// If the element property already exists, just return it
		if(this.element) return this.element;

		var ratingFieldset = $('<fieldset class="rating"><legend>Rating:</legend><input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label><input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label><input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label><input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label><input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label></fieldset>');


		// If the element property does NOT exist, generate a 
		// new DOM element and store it inside the instances
		// "element" property

		// ADD TO PAGE 
		this.element = $('<li class = "quoteBlock" data-index = ""><p class = "enteredQuote">' + this.quote + '</p><p class = "enteredAuthor">' + this.author + '</p></li>');

		// Attach an event handler to the element that was created
		// Take advantage of scope inheritance
		var author = this;
		$('.enteredAuthor').on('click', this.authorClick.bind(author));

		$(this.element).append('<fieldset class = "rating">' + ratingFieldset.html() +  '</fieldset>')

		return this.element;

	};

	Quote.prototype.authorClick = function() {
				matchedAuthors.quotes = [];
				console.log('Find: ' + this.author);
				// console.log(allQuotes.quotes);

				// Find all instances of quote.author within your allQuotes.quotes array....then store all found quotes into a new Collection item, which you defined at the bottom of the page
				for (var i = 0; i < allQuotes.quotes.length; i++) {
					if ( this.author === allQuotes.quotes[i].author ) {
						var foundQuote = allQuotes.quotes[i];
						matchedAuthors.quotes.push(foundQuote);
					}
				}

				// // Console log the matching authors
				// console.log(matchedAuthors);
				// console.log(allQuotes);

				$('#quoteArea').hide();

				// Render all the quotes
				$('#matchedQuotes').empty();
				$('#matchedQuotes').append(matchedAuthors.render());
				
				// Show 'click to show all quotes' message
				$('#clickToShowAllQuotes').show();

	};


// Your collection of quotes
var Collection = function(nameOfCollection) {
	
	this.nameOfCollection = nameOfCollection;

	// An array to hold on to references
	// of all quotes in this library
	this.quotes = [];
};

		// Method to add a DOM element that represents each quote
	Collection.prototype.render = function() {

		// If the element property already exists, just return it
		if(this.element) return this.element;

		// If the element property does NOT exist, generate a 
		// new DOM element and store it inside the instances
		// "element" property
		for (var i = 0; i < this.quotes.length; i++) {
			var quoteElement = this.quotes[i].render();
			$('#matchedQuotes').append(quoteElement);
		};

		return this.element;

	}

////////////////////// DEFAULT ACTIONS///////////////////////

	// Empty array to store your data
	var data = [];

	// Show quotes message is automatically hidden
	$('#clickToShowAllQuotes').hide();


  	// Form that appears and allows user to add a quote
	$('#anotherQuote').on('click', function() {
		$(this).after('<textarea class = "quote" placeholder = "Type your favorite quote here"></textarea><textarea class = "author" placeholder = "Type the author here"></textarea><button id = "submit">Submit</button>');
		$('textarea').focus();  // Auto-focus the textarea
	});


/////////////////////////////////////////////////////////////////
////////////////////// EVENT HANDLERS ///////////////////////////
/////////////////////////////////////////////////////////////////

	// On click of the submit button, remove the textareas and button, and replace main p text to say 'add another'
	$(document).on("click", "#submit", function() {
		
		// Take the values from the form fields
		var enteredQuote = $('.quote').val();
		var enteredAuthor = $('.author').val();

		// Create an instance variable of Quote, and store the 
		// form entries in the Quote object
		var newQuote = new Quote(enteredQuote, enteredAuthor, 0);

		// Push all the entered data into the array, to store for searching later!
		allQuotes.quotes.push(newQuote);

		// This will console.log all of the quotes that have been added thus far
		console.log(allQuotes.quotes);

		// Append the entered enteredQuote, enteredAuthor, and star rating fieldset
		$('#quoteArea').append(newQuote.render());

		$('textarea').remove();
		$('button').remove();
		$('#anotherQuote').text('Add another quote.... click here.');

	});


	// On click of 'click to show all quotes', show all quotes!
	$('#clickToShowAllQuotes').on("click", function() {
		matchedAuthors.quotes = [];
		$('#quoteArea').append(allQuotes.render());
		$('#quoteArea').show();
		$('#clickToShowAllQuotes').hide();
	});


	// On change of any input within the star ratings fieldset, 
	// Take in the rating value, and then replace the star field with it.
	$(document).on("change", "input", function() {
		console.log(this);
		// Store the rating in the allQuotes array
		var rating = (this.value); 


		console.log($(this));

		// Add the averageRating as a class to the li
		$(this).closest('li').attr('data-index', rating);

		$(this).parent().replaceWith('<p>Rating: ' + rating + ' stars</p>');

	});


/////////////
// TESTING //
/////////////

// Create some quotes
// CREATE QUOTES WITHIN THE EVENT HANDLER

// Create some libraries
var allQuotes = new Collection('All Quotes');
var matchedAuthors = new Collection('Matched Authors');

// Put the quotes into each library




// console.log( shittyQuotes.quotes[0] ); 
// Access quote information
// shittyQuotes.quotes[0] = Quote {quote: 'This is my quote', name: 'Sam' }
// shittyQuotes.quote[0].name = 'Sam'

// // Pre-render people
// $('#quoteArea').append(samsQuote.render());
// $('#quoteArea').append(jonsQuote.render());






