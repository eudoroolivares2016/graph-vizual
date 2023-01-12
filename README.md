# GraphViz#

This repo is to visualize graph-database data in a nice Ui
features are to search the graph database, a query helper to build searches for those less familiar with the gremlin graph query language
the ability to manipulate the labels of the graph database, as well as saving out query histories

## Dependencies ##
Node.js
Express
REACT
gremlin-server


## Usage ##

To retrieve data from a gremlin-server you need to have it running the most simple way is to
run it through docker:

docker run --rm -it -p 8182:8182 tinkerpop/gremlin-server

npm install --force to get the dependencies

npm start to boot up the react app