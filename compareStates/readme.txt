- Tenir en compte si està o no activades les memòries lliures
- El test (2 anys, 31 diocesi) dura uns 50 min i pesa +- 1GB
- Millor maxStateIndex és de 500, no tocar
- TODO: en el nom de la carpeta afegir la versió, si hi ha lliures i la data del test
-  ./compare.sh nomCarpeta1 nomCarpeta2 > result.txt


UPDATE!
- Ara, posant -1 al límit de Liturgies per Part del fitxer fas que hi hagi una Part per diòcesi (31 parts)
- Ara està limitat el nombre de caracters per cada variable de la LITURGIA que es guarda en l’estat (així pesa molt menys i va molt més ràpid)






example the diff
# diff -c file1 file2
*** file1 Thu Jan 23 13:36:42 2014
--- file2 Thu Jan 23 13:37:13 2014
***************
*** 1,5 ****
! this is line 1 The UNIX diff command is used to compare (find the differences) between two files.
! this is line 2 This line demonstrates how the diff command handles white space
! this is line 3 if ( a == b )
! this is line 4 THE DIFF COMMAND IS HELPFUL WHEN COMPARING SOURCE CODE FILES
! this is line 5
--- 1,5 ----
! this is line 1
! this is line 2 This line demonstrates how the diff command handles white     space
! this is line 3 if(a==b)
! this is line 4 The diff Command is Helpful When Comparing Source Code Files
! this is line 5 The UNIX diff command is used to compare (find the differences) between two files.
