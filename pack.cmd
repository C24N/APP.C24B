mkdir .\pack\
call openssl genrsa -out ./pack/webapp.pem 2048
call crx3 ./webapp/index -p ./pack/webapp.pem -o ./pack/webapp.crx
call web-ext build --source-dir=./webapp/index --artifacts-dir=./pack/ --overwrite-dest=true -n webapp.xpi
pause
