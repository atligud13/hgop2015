echo pulling docker immage
docker pull atligud13/tictactoe:$2

echo killing and removing previous docker image
docker  kill tictactoe:$1
docker rm tictactoe:$1
echo running updated version
echo $1
echo $2
docker run -p $1:8080 -d --name tictactoe$1 -e "NODE_ENV=production" atligud13/tictactoe:$2