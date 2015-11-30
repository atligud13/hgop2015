docker push atligud13/tictactoe
ssh vagrant@192.168.33.10 << EOF
    docker pull atligud13/tictactoe
    dID=`docker ps -q`
    docker  kill $dID
    docker rm $dID
    docker run -p 8080:8080 -d -e "NODE_ENV=production" atligud13/tictactoe
    bash -l
EOF
