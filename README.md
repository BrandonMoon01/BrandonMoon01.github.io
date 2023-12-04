# SubSuggest
This project is for our CSCE 470 class

This project takes the embeddings from the Tube2Vec github repo (https://github.com/epfl-dlab/youtube-embeddings) to create recommendations for the top 1000 most subscribed youtube channels (from this dataset https://www.kaggle.com/datasets/syedjaferk/top-1000-youtubers-cleaned). 

From the 40,000 channels in Tube2Vec, only 312 matched the top 1000 YouTube channels. From there, recommendations for the 5 were compiled using the reddit, recomm and content embeddings. Each are derived from different sources. 

Note: notebooks are written in IPython
