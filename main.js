document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

// Assuming this is the complete main.js file
document.getElementById('searchButton').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput').value;
  fetch('/get-channel-recommendations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: "I am looking for YouTube channels that focus on " + searchInput })
  })
  .then(response => response.json())
  .then(data => {
      // Assuming the response data is the list of recommendations
      var recommendations = data.choices[0].text.trim().split('\n').slice(0, 5);
      updateRecommendationsList(recommendations);
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


  