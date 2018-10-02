@echo off
set /p commit=Enter commit name: 
echo %commit%
git add -A
git commit -m "%commit%"
git push origin master
npm run postinstall
firebase deploy