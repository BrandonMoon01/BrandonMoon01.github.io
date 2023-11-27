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
  var csvUrl = 'https://raw.githubusercontent.com/BrandonMoon01/BrandonMoon01.github.io/main/modified_recomm_recs.csv';

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
                  console.log(rows[i] + " dhsfiuds");
                  displayResult(rows[i]);
                  break;
              }
          }

          if (!found) {
              displayResult('No match found');
          }
      })
      .catch(error => console.error('Error:', error));
});

function displayResult(result) {
  var resultElement = document.getElementById('result');

  // Split the result string into name and JSON array
  var [name, channelsJSON] = result.split(',"');

  // Remove the trailing quote from the name
  name = name.slice(1);

  // Remove the trailing quote and comma from the JSON array
  var channelsString = channelsJSON.slice(0, -3);
  var stringWithoutBrackets = channelsString.slice(1, -1);

  var wordsArray = stringWithoutBrackets.replace(/"/g, '').split(', ');
  // Parse the JSON array to an array


  resultElement.innerHTML = wordsArray.join('<br>');

  // Show the result element only when it is populated
  resultElement.style.display = wordsArray ? 'block' : 'none';

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


  