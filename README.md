# OSeMOSYS user interface is open source web/standalone web app for creating model solution with OSeMOSYS
OSeMOSYS is an open source modelling system for long-run integrated assessment and energy planning.
WebApp javascript
API flask python 3



#####################################################################################################
In order for Osemosys UI to solve problem created with UI you will need to download GLPK and COIN CBC solver.
In development environment in folder WebAPP\SOLVERs create two folders named COIN-OR and GLPK.
In COIN-OR folder unpack exactly this version of CBC binaries Cbc-2.10-osx10.15-x86_64-gcc9.
In GLPK folder unpack version glpk-4.65.
Folder three for CBC should look like WebAPP\SOLVERs\COIN-OR\Cbc-2.10-win64-msvc16-md\bin
and for GLPK WebAPP\SOLVERs\GLPK\glpk-4.65\w64.
