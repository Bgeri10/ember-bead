# Fifa 16 Ultimate Team meccsek

## Követelményanalízis

### Funkcionális elvárások
**A programnak tartalmaznia kell:**

•	legalább két modellt, egy-sok kapcsolatban

•	legalább 1 űrlapot

•	legalább 1 listázó oldalt

•	legyen lehetőség új felvételére

•	legyen lehetőség meglévő szerkesztésére

•	legyen lehetőség meglévő törlésére

•	legyenek benne csak hitelesítés után elérhető funkciók

### Nem funkcionális követelmények
•	perzisztálás fájlba történjen

•	közzététel Herokun

### Szerepkörök
<<<<<<< HEAD

•	Felhasználó: Láthatja a játékos profilját, valamint a mérkőzések listáját, ahol újakat csinálhat, valamint meglévőket törölhet és módosíthat.
=======
•	Vendég: a főoldal tartalmához fér hozzá, rögzíteni nem tud.

•	Felhasználó: Egy vendég regisztrálás után felhasználóvá válik, így bejelentkezés után listáztatni tudja a névjegyeit, majd ezeket módosítani, törölni, esetleg újat létrehozni.
>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e

### Használatieset-modell
![Használatieset-modell](docs/images/hasznalatesetidiagramm.png)

<<<<<<< HEAD
### Új mérkőzés hozzáadása
![Új mérkőzés hozzáadása](docs/images/meccshozzaadasa.png)

### Mérkőzés módosítása
![Mérkőzés módosítása](docs/images/meccsmodositasa.png)

## Tervezés

### Architektúra terv

Oldaltérkép

=======
### Új névjegy felvétele
![Új névjegy felvétele](docs/images/nevjegyhozzaadasa.png)

## Tervezés

### Architektúra terv

Oldaltérkép

>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e
  Publikus:
  
  •	Kezdőlap
  
  •	Játékos
  
  •	Mérkőzések
  
    +	új mérkőzés
    
    +	mérkőzés módosítása
    
    +	mérkőzés törlése

Végpontok

•	GET /: főoldal

•	GET /profile: Játékos profilja

• GET /history: mérkőzések története részletes adatokkal

•	GET /new-match: új mérkőzés létrehozásának oldala

•	GET /edit-match{id}: mérkőzés módosítása

### Felhasználói felület:
<<<<<<< HEAD
![Design](docs/images/design.jpg)
=======
![Design](docs/images/design.png)
>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e

### Osztálymodell
  Adatmodell
    ![Adatmodell](docs/images/adatmodell.png)
  Állapotdiagram
    ![Állapotdiagram](docs/images/allapotdiagramm.png)

## Implementáció

### Fejlesztői környezet:
<<<<<<< HEAD
Az alkalmazást a Cloud 9 online fejlesztői környezetében készült.
=======
Az alkalmazást a Cloud 9 online fejlesztői környezetében, NodeJS-ben készült.
>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e

### Könyvtárstruktúrában lévő mappák
•	docs/images: A dokumentációhoz szükséges képeket tartalmazza

<<<<<<< HEAD
•	app/models: A match és a player egyedek modelljeit tartalmazza

•	app/controllers: A mérkőzésekhez szükséges műveletek fájljait tartalmazza

•	app/adapters: Az api-val való összekötéshez szükséges fájlt tartalmazza

•	app/routes: A végpontokhoz szükséges fájlokat tartalmazza

•	app/styles: A desig kialakításáért felelős fájlt tartalmazza

•	app/templates: Az oldal megjelenítéséért felelő fájlokat tartalmazza

•	app/templates/components: Az oldal megjelenítéséért felelő kisebb, ismétlődő részeit tartalmazza

•	node_modules: A programhoz szükséges telepített elemeket tartalmazza

•	public/assets/images: Az oldal felépítéséhez használt képeket tartalmazza

•	test: Teszteseketek tartalmazza
=======
•	models: A user és a névjegy egyedek modelljeit tartalmazza

•	node_modules: A programhoz szükséges telepített elemeket tartalmazza

•	publis: Minden oldalhoz használható kódokat tartalmaz

•	test: Teszteseketek tartalmazza

•	views/login: Bejelentkezéshez és regisztrációhoz szükséges fájlokat tartalmazza

•	views/partials: A felület alap (állandó) építőelemeit tartalmazza

•	views: Egyéb funkciókhoz szükséges hbs fájlokat tartalmaz
>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e

## Tesztelés

A tesztesetek a "test" mappában lévő "create.test.js" fájlban találhatóak.
Ez demonstrálja, hogy egy felhasználó a regisztráció után:

•	visszanyerhető-e minden adat és ezek megegyeznek-e a regisztrációnál megadottakkal.

•	az adatbázisban bármikor megtalálhatóak és visszanyerhetőek-e a letárolt adatok

•	rossz adatoknál hibát dob-e az oldal

•	jó jelszó megadása esetén enged-e belépni az oldal

•	rossz jelszó megadása esetén hibát jelez-e az oldal

## Felhasználói dokumentáció
### Menü
<<<<<<< HEAD
•	"Fifa 16 logo" : Ide kattintva a Kezdőlapra navigálunk át.

•	"Kezdőlap" : Ide kattintva szintén a Kezdőlapra navigálunk át.

•	"Játékos" : Ide kattintva láthatjuk a játékos profilját a részletes adatokkal.

•	"Mérkőzések" : Ide kattintva navigálunk át a mérkőzések listáját tartalmazó oldalra.

### Mérkőzések
Itt jelennek meg a mérkőzések az alábbi adataikkal:

•	Játékosok száma

•	Stadion

•   Mérkőzés kimenetele

•	A két csapat játékosonként felsorolva

Az oldalon a mérkőzéseket tartalmazó dobozok kerete a nyertes csapat színében pompázik.
A lista alján található új mérkőzés ikonnal vehetünk fel új mérkőzést a listánkhoz.
Minden mérkőzést a saját módosító ikonjával módosíthatunk.
Minden mérkőzést a saját törlő ikonjával törölhetünk.
=======
•	"Névjegy kezelő" : Ide kattintva a főoldalra navigálunk át.

•	"Listázás" : Csak bejelentkezett felhasználók számára elérhető. Ide kattintva láthatjuk a névjegyek listáját.

•	"Hozzáadás" : Csak bejelentkezett felhasználók számára elérhető. Itt adhatunk a listához új névjegyet.

•	"Regisztráció" : Akik még nem felhasználók, itt regisztrálhatnak.

•	"Bejelentkezés" : Akik már regisztráltak, itt bejelentkezhetnek.

•	"Kilépés" : A már bejelentkezett felhasználók erre kattintva kijelentkezhetnek.


### Regisztráció
A regisztrációhoz szükség van a felhasználó alábbi adataira:

•	Vezetéknév (kötelező)

•	Keresztnév (kötelező)

•	Neptun-kód (kötelező)

•	Jelszó (kötelező)

•	Avatar URL (nem kötelező)

Hiányos adatok megadása esetén hibát jelez az oldal!
A helyes kitöltést követően a "Submit" gombra kattintva elvégezhető a regisztráció.
A "Cancel" gombot használva törölhető az összes eddigi kitöltött mező.

### Bejelentkezés
Itt lehet bejelentkezni a már regisztrált felhasználóknak az alábbi adatokkal:

•	Neptun-kód

•	Jelszó

Hiányos vagy hibás adaok esetén hibát jelez az oldal!
Helyes adatok megadása után a "Submit" gombra kattintva bejelentkezhetünk.
A "Cancel" gombot használva törölhető az összes eddigi kitöltött mező.

### Listázás
Bejelentkezés után itt jelennek meg a névjegyek az alábbi adataikkal:

•	Felvétel ideje

•	Név

• Foglalkozás

•	Telefonszám

•	Műveletek

Az oldal két táblázatból áll.
A fontosabb névjegyeket a zöld pipára kattintva ki lehet jelölni. Ekkor a névjegy az alsó táblázatban fog megjelenni.
Az új, illetve módosított névjegyek a felső táblázatba kerülnek.
A kék gombbal módosíthatunk egy névjegyet.
A piros gombbal törölhetünk egy névjegyet.

### Hozzáadás
Bejelentkezés után itt adhatunk hozzá új névjegyet az alábbi adatok megadásával:

•	Név

• Foglalkozás

•	Telefonszám

Hiányos adatok megadása esetén hibát jelez az oldal!
Az adatok megadása után a "Hozzáadás" gombra kattintva felvehetjünk az új névjegyünket.
A "Mégse" gombra kattintva törölhető az összes eddigi kitöltött mező.
>>>>>>> d4db431660bffcef571284c66351f4b14fe9d42e
