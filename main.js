document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
  });
});

document.getElementById('searchButton').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput').value;
  fetch('/get-channel-recommendations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: searchInput })
  })
  .then(response => response.json())
  .then(data => {
      if (data.recommendationText) {
          document.getElementById('recommendationsTextbox').value = data.recommendationText;
      } else {
          document.getElementById('recommendationsTextbox').value = 'No recommendations found.';
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});

function updateRecommendationsList(recommendations) {
  var list = document.getElementById('recommendationsList');
  list.innerHTML = ''; // Clear existing list
  recommendations.forEach(function(channel) {
      var listItem = document.createElement('li');
      listItem.textContent = channel;
      list.appendChild(listItem);
  });
}


  