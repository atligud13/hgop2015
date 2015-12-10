##Vagrant

Vagrant ser um ad bua til og vidhalda syndarvelinni sem okkur var gefin. Nokkurn veginn "high level wrapper" utan um virtual box.


##Virtual box

Gerir developerum kleyft ad keyra somu syndarvel ohad thvi hvada tolvu hun er keyrd a.


##Grunt

Grunt er javascript task runner sem ser um ad automata og keyra tasks eins og unit testing, minification og compilation.


##NPM

NPM er package managerinn sem node bidur upp a. Gerir manni kleyft ad baeta vid dependencies i node projectid thitt med litlum erfidum.


##NodeJS

NodeJS er runtime environment skrifad i javascript og hannad fyrir javascript. 


##Bower

Bower er framenda package manager, ekki osvipadur npm.


##Deployment path so far:

Kodi er skrifadur a development velinni, hun keyrir svo deployment script sem pushar nyja docker imageinu, ssh-ar sig sidan inna test velina, pullar nyjasta docker image, slekkur a thvi gamla og keyrir thad nyja upp.

##Load test run results:
Sem stendur þá eru load testin sett á að spila 100 leiki á innan við 10 sekúndum. Í seinasta
testi þá tók þetta um 5 sekúndur á local vél en þegar kallað var á test vélina tók það aðeins lengri tíma.
Hver leikur er hinsvegar spilaðar að jafntefli svo að mikið er af place move köllum í testunum. Það ætti að útskýra að hluta til allavega af hverju þetta er að taka svona langan tíma.

##Serial or parallel:
Node js er single threaded sem þýðir að það er alltaf einn og sama processinn í gangi sem sér um að höndla 
allar skipanir. Hinsvegar er hann asynchronous sem gerir honum kleyft að leggja eitt verkefni til hliðar ef 
það er að bíða eftir svari og halda áfram með það næsta. Load testin eru því keyrandi samhliða hvort öðru, það
sést til dæmis þegar skoðað er köllinn sem eru logguð út server side. 

GET /api/gameHistory/56

GET /api/gameHistory/52

GET /api/gameHistory/54

GET /api/gameHistory/59

Þetta bendir á að testin eru ekki keyrandi hvert á eftir öðru heldur eru þau höndluð eftir hentugleika.