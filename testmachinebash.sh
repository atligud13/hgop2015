echo pulling docker immage
docker pull atligud13/tictactoe:$2

echo killing and removing previous docker image
docker  kill tictactoe:$1
docker rm tictactoe:$1
echo running updated version
docker run -p 8080:$1 -d --name tictactoe:$1-e "NODE_ENV=production" atligud13/tictactoe:$2