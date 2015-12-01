echo pulling docker immage
docker pull atligud13/tictactoe
dID=`docker ps -q`

echo killing and removing previous docker image
docker  kill $dID
docker rm $dID

echo running updated version
docker run -p 8080:8080 -d -e "NODE_ENV=production" atligud13/tictactoe
