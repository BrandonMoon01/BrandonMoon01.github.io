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
  document.getElementById('result').textContent = result;
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


  