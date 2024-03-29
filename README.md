# SubSuggest
This project is for our CSCE 470: Information and Retrieval class

## Video Link
[Link to our 2-minute video](https://youtu.be/ZIohzT-nH4o)


### Data Folder
This project takes the embeddings from the Tube2Vec github repo (https://github.com/epfl-dlab/youtube-embeddings) to create recommendations for the top 1000 most subscribed youtube channels (from this dataset https://www.kaggle.com/datasets/syedjaferk/top-1000-youtubers-cleaned). 

### Notebooks Folder
Contains the scripts for extracting the embeddings, comparing them against the 1000 most subscribed youtubers, and generating a top 5 list. This is for each algorithm type: Recomm (YouTube), Reddit, and Content.
From the 40,000 channels in the embeddings, only 312 matched the top 1000 YouTube channels. 

Note: notebooks are written in IPython

### Live Use of SubSuggest
[SubSuggest](https://brandonmoon01.github.io/) is currently running through this repo on github pages, exlcuding the Open AI API functionality. Therefore, only the embedding recommendations can be generated.
