@ECHO OFF
ng build --prod --aot --build-optimizer && gzipper c --verbose --include js,css ./dist ./dist && cd ./dist && del *.js && del *.css && cd ./assets/fontawesome-free-5.15.1-web/css && del *.css && cd ../js && del *.js 
:END
pause
