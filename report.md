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

Þetta bendir til að testin eru ekki keyrandi hvert á eftir öðru heldur eru þau höndluð eftir hentugleika.

##Why enforce the capability to track versions?

Útgáfustýring gerir okkur kleift að bregðast við ýmsum vandamálum. Ef upp kemur böggur í nýjustu útfærslu ætti að vera lítið mál að keyra einfaldlega upp seinustu virkandi útgáfu af kerfinu þangað til böggurinn hefur verið lagaður. Hún auðveldar okkur líka að finna gamla legacy bögga og átta okkur á því hvar, hvenær og hvernig villur komu upp í kerfinu með því að geta skoðað gamlar útgáfur og bera þær saman. Þannig er hægt að negla það niður á nokkuð þægilegan hátt hvenær breytingarnar voru gerðar sem orsökuðu hvern þann galla sem kemur upp í kerfinu. 

##What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?

Skyldar aðgerðir eiga að tilheyra sama build stage og því meikar það bara sens að láta sama stig og buildar docker fælinn um að pusha honum líka. Acceptance stage á ekki að snerta við source kóða heldur á það bara að taka við binary sem input.

##How does the "deploy any version, anywhere" build feature work?

Hann gerir okkur kleyft að vita nákvæmlega hvaða útgáfu og stigi í Version Control kerfinu okkar við erum að keyra upp, því ætti að vera lítið mál að snúa aftur til fyrri breytinga ef eitthvað kemur upp.


##Shell scripts

### Commit stage

export DISPLAY=:0

npm install

bower install

./dockerbuild.sh


###Acceptance stage

export GIT_UPSTREAM_HASH=$(<dist/githash.txt)

env

./deploymentscript.sh 8080 $GIT_UPSTREAM_HASH

npm install

export MOCHA_REPORTER=xunit

export MOCHA_REPORT=server-tests.xml

export ACCEPTANCE_URL=192.168.33.10:8080

grunt mochaTest:acceptance


###Load / Capacity testing stage

npm install

export MOCHA_REPORTER=xunit

export MOCHA_REPORT=server-tests.xml

export ACCEPTANCE_URL=192.168.33.10:8080

grunt mochaTest:load


###Production stage

export GIT_UPSTREAM_HASH=$(<dist/githash.txt)

env

./deploymentscript.sh 8081 $GIT_UPSTREAM_HASH


##Final words

Ég naut tímans og verkefnanna virkilega mikið. Hver einasti dagur var bölvað vesen en þannig átti
það líka að vera, maður lærði heilan helling af því og það er það sem situr eftir. 

Nánast hver einasti dagur var barátta við tíma og kenni ég aðallega tölvunni minni um það, lenti í miklu 
basli með að keyra upp allt sem þurfti og allt tók langan tíma. Vegna þessa gæti verið að ég hafi tossað 
einhverja litla hluti, git commits hefðu t.d. mátt vera skipulagðari og meira lýsandi hjá mér sem dæmi. Ég reyndi þó að skilja við verkefnið í ágætis standi og náði að koma upp virkandi útgáfu af leiknum á production.