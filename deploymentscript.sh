echo Updating docker container
ssh vagrant@192.168.33.10 'bash -s' < testmachinebash.sh $1 $2
