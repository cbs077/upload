

;Process, Close, FileMaruProcessorManager.exe

;Process, Close, FileMaruDown.exe

;Process, Close, FileMaruAdministrator.exe
if(!errorlevel)

    Process, Close, ahk_exe FileMaruDown.exe

ControlClick, Button1, ahk_exe FileMaruDown.exe
sleep, 2000
WinClose, ahk_exe FileMaruDown.exe

sleep, 2000
WinClose, ahk_exe FileMaruDown.exe
