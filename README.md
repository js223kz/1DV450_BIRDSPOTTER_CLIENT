# 1DV450_BIRDSPOTTER_CLIENT
Ett Ruby on Rails/Angular projekt

En applikation där fågelskådare kan registrera fågelobservationer på en position och visa registrerade upptäckter av fåglar på en karta över Sverige. Applikationen är ett pågående använder REST-API:et https://github.com/js223kz/1DV450_BIRDSPOTTER_JS223KZ

**Applikationen är optimerad för desktop i Firefox**

#### Del 3 skapa klient som använder tidigare byggt REST-API

#### Använda klienten

**Kort beskrivning:**</br>
Applikationen är tänkt att användas av fågelskådare för att registrera fågelobservationer runt om i Sverige.
  
  * Ej inloggad användare kan
      * Visa alla fågelobservationer på en karta
      * Visa observationer med specificerad avståndsradie
      * Visa observationer med specificerade fåglar
  
  * Inloggad användare kan
  * Göra det ej inloggad användare kan
  * Lägga till en fågel som inte finns i listan
  * Registrera en ny fågelobservation
  * Ta bort egna fågelobservationer
  * Redigera egna fågelobservationer

För att använda API:et krävs en apinyckel som ska skickas med som en parameter vid varje förfrågan</br> 
Apinycklar går att skapa här: https://birdspotterdev.herokuapp.com/

**Ändringar gjorda i API:et under skapandet av klienten**</br>
* Ändrat hur statuskoder visas
* Man kan nu skapa egna taggar i form av fåglar
* Lagt felmeddelanden när användaren hämta fågelobservationer baserat på avstånd
* Mindre buggfix
