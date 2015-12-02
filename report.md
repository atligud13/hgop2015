Vagrant
Vagrant ser um ad bua til og vidhalda syndarvelinni sem okkur var gefin. Nokkurn veginn "high level wrapper" utan um virtual box.

Virtual box
Gerir developerum kleyft ad keyra somu syndarvel ohad thvi hvada tolvu hun er keyrd a.

Grunt
Grunt er javascript task runner sem ser um ad automata og keyra tasks eins og unit testing, minification og compilation.

NPM
NPM er package managerinn sem node bidur upp a. Gerir manni kleyft ad baeta vid dependencies i node projectid thitt med litlum erfidum.

NodeJS
NodeJS er runtime environment skrifad i javascript og hannad fyrir javascript. 

Bower
Bower er framenda package manager, ekki osvipadur npm.

Deployment path so far:
Kodi er skrifadur a development velinni, hun keyrir svo deployment script sem pushar nyja docker imageinu, ssh-ar sig sidan inna test velina, pullar nyjasta docker image, slekkur a thvi gamla og keyrir thad nyja upp.
