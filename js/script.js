/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
// Check the "Project Resources" section of the project instructions
// Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/***
 * Read Me:
 * Main faunctionality of this app is configured to display randomly selected quotes by the user interection via "Show another quote" button
 * When the page is initially loaded, app automatically starts (called Auto Init) displaying randomly selected quotes in every two seconds
 * Auto Init session ends with user's intereaction via "Show another quote" button
 * During the auto init session main background of the app will switch with the randomly selected colors and when it ends it returns the original color
 * When user intereacted with the button, app starts displaying randomly selected quotes upon per click
 * It's aimed not to get two same quotes in a row during the random selection. Meaning that user will never see two same quotes in a row. 
 * All quotes are designed to be view in configured font and background colors. 
 * 
 */

/***
 * global variables
 */
var lastRandomIndex = -1;
var lastColorIndex = -1;
var intervalT;
var intervalU;

const containerEl = document.getElementsByClassName('container')[0];
const quoteBoxEl = document.getElementById('quote-box');
const quoteEl = document.getElementsByClassName('quote')[0];
const sourceEl = document.getElementsByClassName('source')[0];
const citationEl = document.getElementsByClassName('citation')[0];
const yearEl = document.getElementsByClassName('year')[0];
const tagsEl = document.getElementsByClassName('tags')[0];
const bodyEl= document.querySelector("body");
const initBodyBackground = bodyEl.style.backgroundColor;


/*** 
 * `colors` array 
 * colors credit: https://flatuicolors.com/palette/tr
***/

const colors = [
  {
    name: "Wintergreen",
    color: "#32ff7e",
  },
  {
    name: "Shadowed Steel",
    color: "#4b4b4b",
  },
  {
    name: "Baltic Sea",
    color: "#3d3d3d",
  },
  {
    name: "Hammam Blue",
    color: "#67e6dc",
  },
]

/*** 
 * `quotes` array 
 * CAUTION: some of the citations and years may not be correct ;)
 * keeping extra color obj for dedicated coloring upon quote - sorry for the color choices :)
***/

const quotes = [
  {
    quote: "Talk is cheap. Show me the code",
    source: "Torvalds, Linus",
    citation: "Linux-Kernel Mailing List",
    year: 2006,
    color: {
      back: '#f1c40f',
      font: '#2c3e50',
    },
    tags:"programming, humor"
  },
  {
    quote: "Playing with pointers is like playing with fire. Fire is perhaps the most important tool known to man. Carefully used, fire brings enormous benefits; but when fire gets out of control, disaster strikes",
    source: "John Barnes",
    citation: "Cambridge University Press",
    year: 2014,
    color: {
      back: '#8e44ad',
      font: '#bdc3c7',
    },
    tags:"C Programming, computer science"
  },
  {
    quote: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    source: "Patrick McKenzie",
    citation: "Twitter",
    year: 2016,
    color: {
      back: '#2ecc71',
      font: '#34495e',
    },
    tags:"movitation, innovation, developer"
  },
  {
    quote: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live",
    source: "John F. Woods",
    citation: "Google Groups",
    year: 1991,
    color: {
      back: '#2c3e50',
      font: '#ecf0f1',
    },
    tags:"computer science, prgramming, humor"
  },
  {
    quote: "Before software can be reusable it first has to be usable",
    source: "Ralph Johnson",
    citation: "Design Patterns: Elements of Reusable Object-Oriented Software",
    year: 1994,
    color: {
      back: '#c0392b',
      font: '#ecf0f1',
    },
    tags:"software, programming, OOP"
  },
  {
    quote: "If things are not failing, you are not innovating enough",
    source: "Elon Musk",
    citation: "Article on Fast Company",
    year: 2005,
    color: {
      back: '#1abc9c',
      font: '#e74c3c',
    },
    tags:"business, innovation"
  },
  {
    quote: "Pick a movement, pick a revolution and join it",
    source: "Jack Dorsey",
    citation: "Forbes",
    year: 2012,
    color: {
      back: '#7f8c8d',
      font: '#f39c12',
    },
    tags:"business, entrepreneurship"
  },
]

/***
 * `autoInit` function call
 * initial quote set to view
 * Starts loading randomly selected quotes in every two seconds until user interaction with the button
 */
autoInit();

/***
 * 'appendTags' function
 * param: p_Tags - required: string
 * to append extra tag line to end
 */
function appendTags(p_Tags) {

  tagsEl.innerHTML = `tags: ${p_Tags}`;
}



/***
 * `setRandomColor` function
 * Applies randomly selected color to the background during the Auto Init session
***/
function setRandomColor() {
  //keeping random color selection this way since it depends on color' length: 0-3 for an array with items of 4
  let colorIndex = Math.floor(Math.random() * colors.length);

  if (lastColorIndex > -1 && lastColorIndex === colorIndex) {
    while (lastColorIndex === colorIndex) {
      // will loop until selection of new random color is not equal to previous one
      colorIndex = Math.floor(Math.random() * colors.length);
      //console.warn("Random color re-configured to: ", colorIndex);
    }
  }

  lastColorIndex = colorIndex;
  bodyEl.style.backgroundColor = colors[colorIndex].color;

}


/***
 * `getRandomQuote` function
 * Returns randomly selected index of the quotes 
***/
function getRandomQuote() {
  //keeping random index selection this way since it depends on quotes' length: 0-6 for an array with items of 7
  let randomIndex = Math.floor(Math.random() * quotes.length);

  if (lastRandomIndex > -1 && lastRandomIndex === randomIndex) {
    while (lastRandomIndex === randomIndex) {
      // will loop until selection of new random index is not equal to previous one
      randomIndex = Math.floor(Math.random() * quotes.length);
      //console.warn("Random index re-configured to: ", randomIndex);
    }
  }

  lastRandomIndex = randomIndex;
  return randomIndex;

}


/***
 * `setContent` function
 */
function setContent() {
  //check auto init options and apply necessary
  if(intervalT || intervalU) {
    setRandomColor();
  } else {
    bodyEl.style.backgroundColor = initBodyBackground;
  }

  //get random index and create selected quote
  let retIndex = getRandomQuote();
  let retQuote = quotes[retIndex];

  //give the color styling
  containerEl.style.background = retQuote.color.back;
  containerEl.style.color = retQuote.color.font;
  
  //items to be appended
  quoteEl.innerHTML = retQuote.quote;
  sourceEl.innerHTML = retQuote.source;
  
  //modification
  yearEl.innerHTML = retQuote.year.toString();
  citationEl.innerHTML = retQuote.citation;
  sourceEl.appendChild(citationEl);
  sourceEl.appendChild(yearEl);
  appendTags(retQuote.tags);
}


/***
 * `autoInit` function
 */
function autoInit() {
  setContent();
  intervalT = setInterval(function(){ setContent(); }, 2000);
}


/***
 * `printQuote` function
***/

function printQuote() {

   //clear the intervals
   clearInterval(intervalT);
   clearInterval(intervalU);
 
   //reset the value of inteval
   intervalT = undefined;
   intervalU = undefined;

  // calls setContent which also enables getRandomQuote call in it
  // designed to place immediate print when user clicks
  setContent();

  //set content
  //in auto init session it was set to 2 secs but to differentiate, this time I applied 5 secs
  intervalU = setInterval(function(){ setContent(); }, 5000);
}


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);