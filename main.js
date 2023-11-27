document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
  });
});
document.getElementById('searchButton').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput').value.toLowerCase();
  var contentPreference = document.getElementById('contentPreference').value;

  // Choose the CSV file based on the selected option
  var csvUrl;
  switch (contentPreference) {
    case 'youtube':
      csvUrl = 'https://raw.githubusercontent.com/BrandonMoon01/BrandonMoon01.github.io/main/modified_recomm_recs.csv'; // Replace with the actual URL for YouTube CSV
      break;
    case 'reddit':
      csvUrl = 'https://raw.githubusercontent.com/BrandonMoon01/BrandonMoon01.github.io/main/reddit_recs.csv'; // Replace with the actual URL for Reddit CSV
      break;
    case 'content':
      csvUrl = 'https://raw.githubusercontent.com/BrandonMoon01/BrandonMoon01.github.io/main/content_recs.csv'; // Replace with the actual URL for Content CSV
      break;
    default:
      // Handle default case or show an error message
      console.error('Invalid content preference:', contentPreference);
      return;
  }
  // Fetch CSV data
  fetch(csvUrl)
      .then(response => response.text())
      .then(csvData => {
          var rows = csvData.split('\n');
          var found = false;

          for (var i = 0; i < rows.length; i++) {
              var columns = rows[i].split(',');

              // Assuming the search term should match the first column
              if (columns[0].toLowerCase() === searchInput) {
                  found = true;
                  displayResult(rows[i], found);
                  break;
              }
          }

          if (!found) {
              displayResult('Channel not in channel list.', false);
          }
      })
      .catch(error => console.error('Error:', error));
});

function displayResult(result, found) {

  var resultElement = document.getElementById('result');
  resultElement.innerHTML = '';

  if(found){

    // Split the result string into name and JSON array
    var [name, channelsJSON] = result.split(',"');


    // Remove the trailing quote and comma from the JSON array
    var channelsString = channelsJSON.slice(0, -3);
    var stringWithoutBrackets = channelsString.slice(1);

    var wordsArray = stringWithoutBrackets.replace(/"/g, '').split(', ');
    // Parse the JSON array to an array

    resultElement.innerHTML = wordsArray.join('<br>');

    // Show the result element only when it is populated
    resultElement.style.display = wordsArray ? 'block' : 'none';
  }
  else{

    resultElement.innerHTML = result;
    resultElement.id = 'notFoundResult';
    resultElement.style.display = result ? 'block' : 'none';

  }

}


function updateRecommendationsList(recommendations) {
  var list = document.getElementById('recommendationsList');
  list.innerHTML = ''; // Clear existing list
  recommendations.forEach(function(channel) {
      var listItem = document.createElement('li');
      listItem.textContent = channel;
      list.appendChild(listItem);
  });
}


  