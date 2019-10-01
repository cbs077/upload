
;postmessage, 0x301, 1, 0, Edit1,  제목 없음 - 메모장
;postmessage, 0x302, 1, 0, Edit1,  제목 없음 - 메모장 

;postmessage, 0x302, 1, 0, Edit2,  ahk_exe chrome.exe
;SendMessage, 0x201, 1, 2,, ahk_class #32770
;postmessage, 0x201, 0, Edit2,  ahk_class #32770

sleep, 1000
WinActivate, 열기
Send {F4}
ControlSetText, Edit2, C:\Users\cbs\Desktop\파일마루_다운로드, 열기
;ControlSetText, Edit2, %1%, 열기
Send {enter}
sleep, 1000
;ControlSetText, Edit1, %2%, 열기
ControlSetText, Edit1, aa , 열기
ControlClick, Button1, 열기

;SendMessage, WM_KEYDOWN, VK_F4, 2,, 열기
;SendMessage, 0x201, 1, 2,, 열기
;postmessage,  0x201, 1, 0, DirectUIHWND3, ahk_class #32770
;postmessage, WM_KEYDOWN, VK_F4, 0, Edit2, ahk_class #32770
;ControlSetText, Edit2, New Text Here, 열기
;ControlSetText, Edit2, New Text Here, 열기
;ControlFocus, Edit2, 열기
;sleep, 300
;VK_F4
;controlSend, Edit2, abc, 열기

;postmessage,  0x201, 1, 0, DirectUIHWND2, ahk_class #32770
;postmessage,  0x202, 1, 0, DirectUIHWND2, ahk_class #32770

;postmessage,  0x201, 1, 0, SysTreeView321, ahk_class #32770
;postmessage,  0x202, 1, 0, SysTreeView321, ahk_class #32770




;ControlSetText, Edit2, New Text Here, 열기
;ControlSetText, Edit1, New Text Here, 열기


;postmessage,  0x100, 1, 0, Edit2, 열기

;ControlFocus, Edit2, 열기;

;ControlGetText, Text, %NN%
;MsgBox The current 24-hour time is %Text%
;postmessage,0x100,49,131073,edit2,ahk_class #32770
;postmessage,0x101,49,131073,edit2,ahk_class #32770
; 
 
;sleep, 100
;controlSend, Edit1, abc, 열기


;ControlClick, Edit1, 열기
;ControlClick, ComboBox3, 열기
;ControlClick, Edit2, 열기
;controlSend, DirectUIHWND3, abc, 열기
;sleep, 100
;ControlSetText, Edit2, abc , ahk_class #32770

;N := (201 * 65536) + ;
;PostMessage, 0x203, 1, %N%, Edit2, 열기
;PostMessage, 0x202, 0, %N%, Edit2, 열기

;ControlClick, Edit2, 열기
;sleep, 2000
;ControlSetText, Edit2, %1% , 열기
;ControlSetText, Edit2, abc , 열기
;sleep, 500
;Send {Enter}
;sleep, 1000
;ControlSetText, Edit1, %2% , 열기
;ControlSetText, Edit1, thumbnail-at-60-seconds.png , 열기

;sleep, 2000
;ControlClick, Button1, 열기


;ControlSetText, Edit1, %1% , 열기
;ControlClick, Edit1, 열기
; Notepad
;ControlClick, Edit1, ahk_exe Explorer.EXE

;N := (201 * 65536) + 230
;PostMessage, 0x201, 1, %N%, Edit2, FileMaru-파일 다운로드
;PostMessage, 0x202, 0, %N%, Edit2, FileMaru-파일 다운로드
;MsgBox, Text


