- Tenir en compte si està o no activades les memòries lliures
- El test (2 anys, 31 diocesi) dura uns 50 min i pesa +- 1GB 
- Millor maxStateIndex és de 500, no tocar
- TODO: en el nom de la carpeta afegir la versió, si hi ha lliures i la data del test
-  ./compare.sh nomCarpeta1 nomCarpeta2 > result.txt


UPDATE!
- Ara, posant -1 al límit de Liturgies per Part del fitxer fas que hi hagi una Part per diòcesi (31 parts)
- Ara està limitat el nombre de caracters per cada variable de la LITURGIA que es guarda en l’estat (així pesa molt menys i va molt més ràpid)