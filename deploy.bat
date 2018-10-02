@echo off
set /p commit=Enter commit name: 
echo %commit%
git add -A
git commit -m %commit%
