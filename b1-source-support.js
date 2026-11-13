/* Explicit source-expression teaching. Full expressions are not word/lemma counts. */
(()=>{'use strict';
const base=window.WordamiSourceSupport,course=window.WordamiSkillsContent,vocab=window.WordamiVocabularyContent;
if(!base||!course||!vocab)return;
const authored={
 "lt": {
  "B1": [
   {
    "text": "Praėjusį savaitgalį su drauge važiavome į kitą miestą.",
    "meaning": "Last weekend a friend and I travelled to another city.",
    "context": "Praėjusį savaitgalį su drauge važiavome į kitą miestą.",
    "source": "reading"
   },
   {
    "text": "Iš pradžių viskas vyko pagal planą: laiku atvykome į stotį ir nusipirkome bilietus.",
    "meaning": "At first everything went according to plan: we arrived at the station on time and bought tickets.",
    "context": "Iš pradžių viskas vyko pagal planą: laiku atvykome į stotį ir nusipirkome bilietus.",
    "source": "reading"
   },
   {
    "text": "Tačiau netrukus kilo problema.",
    "meaning": "However, a problem soon arose.",
    "context": "Tačiau netrukus kilo problema.",
    "source": "reading"
   },
   {
    "text": "Traukinys buvo atšauktas, o kitas turėjo išvykti tik po kelių valandų.",
    "meaning": "The train was cancelled, and the next one was not due to leave for several hours.",
    "context": "Traukinys buvo atšauktas, o kitas turėjo išvykti tik po kelių valandų.",
    "source": "reading"
   },
   {
    "text": "Nusprendžiau paprašyti pagalbos.",
    "meaning": "I decided to ask for help.",
    "context": "Nusprendžiau paprašyti pagalbos.",
    "source": "reading"
   },
   {
    "text": "Stoties darbuotoja paaiškino, kad galime važiuoti autobusu.",
    "meaning": "A station employee explained that we could travel by bus.",
    "context": "Stoties darbuotoja paaiškino, kad galime važiuoti autobusu.",
    "source": "reading"
   },
   {
    "text": "Galiausiai radome sprendimą ir kelionę tęsėme kitu maršrutu.",
    "meaning": "In the end we found a solution and continued our journey by another route.",
    "context": "Galiausiai radome sprendimą ir kelionę tęsėme kitu maršrutu.",
    "source": "reading"
   },
   {
    "text": "Atvykome vėliau, bet vis tiek spėjome pasivaikščioti po miestą.",
    "meaning": "We arrived later, but still managed to walk around the city.",
    "context": "Atvykome vėliau, bet vis tiek spėjome pasivaikščioti po miestą.",
    "source": "reading"
   },
   {
    "text": "Ši patirtis mane išmokė neskubėti kaltinti kitų, kai pasikeičia planai.",
    "meaning": "This experience taught me not to rush to blame others when plans change.",
    "context": "Ši patirtis mane išmokė neskubėti kaltinti kitų, kai pasikeičia planai.",
    "source": "reading"
   },
   {
    "text": "Mano nuomone, svarbu pasiruošti iš anksto, bet taip pat mokėti ramiai ieškoti išeities.",
    "meaning": "In my opinion, it is important to prepare in advance but also to know how to look calmly for a way out.",
    "context": "Mano nuomone, svarbu pasiruošti iš anksto, bet taip pat mokėti ramiai ieškoti išeities.",
    "source": "reading"
   },
   {
    "text": "Kitą kartą prieš išvykdama patikrinsiu tvarkaraštį ir numatysiu kitą kelionės būdą.",
    "meaning": "Next time, before leaving, I will check the timetable and plan another way to travel.",
    "context": "Kitą kartą prieš išvykdama patikrinsiu tvarkaraštį ir numatysiu kitą kelionės būdą.",
    "source": "reading"
   },
   {
    "text": "Vakar keliavau į konferenciją kitame mieste.",
    "meaning": "Yesterday I travelled to a conference in another city.",
    "context": "Vakar keliavau į konferenciją kitame mieste.",
    "source": "listen"
   },
   {
    "text": "Bilietą nusipirkau iš anksto, bet stotyje paaiškėjo, kad mano autobusas vėluos dvi valandas.",
    "meaning": "I bought my ticket in advance, but at the station it turned out that my bus would be two hours late.",
    "context": "Bilietą nusipirkau iš anksto, bet stotyje paaiškėjo, kad mano autobusas vėluos dvi valandas.",
    "source": "listen"
   },
   {
    "text": "Iš pradžių labai susinervinau, nes turėjau kalbėti prieš pietus.",
    "meaning": "At first I became very upset because I had to speak before lunch.",
    "context": "Iš pradžių labai susinervinau, nes turėjau kalbėti prieš pietus.",
    "source": "listen"
   },
   {
    "text": "Paprašiau darbuotojos patarimo.",
    "meaning": "I asked an employee for advice.",
    "context": "Paprašiau darbuotojos patarimo.",
    "source": "listen"
   },
   {
    "text": "Ji pasiūlė važiuoti kitu autobusu ir persėsti mažame miestelyje.",
    "meaning": "She suggested taking another bus and changing in a small town.",
    "context": "Ji pasiūlė važiuoti kitu autobusu ir persėsti mažame miestelyje.",
    "source": "listen"
   },
   {
    "text": "Kelionė kainavo šiek tiek daugiau, tačiau atvykau laiku.",
    "meaning": "The journey cost a little more, but I arrived on time.",
    "context": "Kelionė kainavo šiek tiek daugiau, tačiau atvykau laiku.",
    "source": "listen"
   },
   {
    "text": "Apie pasikeitusį maršrutą telefonu pranešiau kolegai.",
    "meaning": "I phoned a colleague to tell them about the changed route.",
    "context": "Apie pasikeitusį maršrutą telefonu pranešiau kolegai.",
    "source": "listen"
   },
   {
    "text": "Dabar manau, kad svarbu turėti atsarginį planą.",
    "meaning": "Now I think it is important to have a backup plan.",
    "context": "Dabar manau, kad svarbu turėti atsarginį planą.",
    "source": "listen"
   },
   {
    "text": "Vis dėlto ne viską galima numatyti.",
    "meaning": "Nevertheless, not everything can be predicted.",
    "context": "Vis dėlto ne viską galima numatyti.",
    "source": "listen"
   },
   {
    "text": "Kartais naudingiau ramiai paklausti, kokios yra galimybės, negu pykti dėl to, ko negali pakeisti.",
    "meaning": "Sometimes it is more useful to ask calmly what the options are than to be angry about what you cannot change.",
    "context": "Kartais naudingiau ramiai paklausti, kokios yra galimybės, negu pykti dėl to, ko negali pakeisti.",
    "source": "listen"
   },
   {
    "text": "Kas pasikeitė jūsų kelionėje?",
    "meaning": "What changed in your journey?",
    "context": "Kas pasikeitė jūsų kelionėje?",
    "source": "partner"
   },
   {
    "text": "Kodėl pasirinkote būtent tokį sprendimą?",
    "meaning": "Why did you choose that particular solution?",
    "context": "Kodėl pasirinkote būtent tokį sprendimą?",
    "source": "partner"
   },
   {
    "text": "Ką patartumėte kitam keliautojui?",
    "meaning": "What would you advise another traveller?",
    "context": "Ką patartumėte kitam keliautojui?",
    "source": "partner"
   },
   {
    "text": "Iš pradžių planavau...",
    "meaning": "At first I planned...",
    "context": "Iš pradžių planavau...",
    "source": "strategy"
   },
   {
    "text": "Pasirinkau šį sprendimą, nes...",
    "meaning": "I chose this solution because...",
    "context": "Pasirinkau šį sprendimą, nes...",
    "source": "strategy"
   },
   {
    "text": "Kitą kartą patarčiau...",
    "meaning": "Next time I would advise...",
    "context": "Kitą kartą patarčiau...",
    "source": "strategy"
   }
  ],
  "B1-appointments": [
   {
    "text": "Praėjusią savaitę internetu užpildžiau registracijos formą, tačiau patvirtinimo negavau.",
    "meaning": "Last week I filled in an online registration form, but I did not receive confirmation.",
    "context": "Praėjusią savaitę internetu užpildžiau registracijos formą, tačiau patvirtinimo negavau.",
    "source": "reading"
   },
   {
    "text": "Maniau, kad susitikimas jau paskirtas, todėl pirmadienį atvykau į klientų aptarnavimo centrą.",
    "meaning": "I thought the appointment had already been scheduled, so on Monday I arrived at the customer service centre.",
    "context": "Maniau, kad susitikimas jau paskirtas, todėl pirmadienį atvykau į klientų aptarnavimo centrą.",
    "source": "reading"
   },
   {
    "text": "Darbuotoja mano pavardės sąraše nerado.",
    "meaning": "The employee could not find my surname on the list.",
    "context": "Darbuotoja mano pavardės sąraše nerado.",
    "source": "reading"
   },
   {
    "text": "Parodžiau išsaugotą žinutę.",
    "meaning": "I showed the message I had saved.",
    "context": "Parodžiau išsaugotą žinutę.",
    "source": "reading"
   },
   {
    "text": "Paaiškėjo, kad tai buvo tik pranešimas apie gautą prašymą, o ne susitikimo patvirtinimas.",
    "meaning": "It turned out to be only a notice that the request had been received, not appointment confirmation.",
    "context": "Paaiškėjo, kad tai buvo tik pranešimas apie gautą prašymą, o ne susitikimo patvirtinimas.",
    "source": "reading"
   },
   {
    "text": "Darbuotoja pasiūlė laisvą laiką trečiadienį ir pažadėjo atsiųsti patvirtinimą.",
    "meaning": "The employee offered an available time on Wednesday and promised to send confirmation.",
    "context": "Darbuotoja pasiūlė laisvą laiką trečiadienį ir pažadėjo atsiųsti patvirtinimą.",
    "source": "reading"
   },
   {
    "text": "Šį kartą paprašiau raštu nurodyti ne tik laiką, bet ir adresą bei reikalingus dokumentus.",
    "meaning": "This time I asked for written details not only of the time, but also of the address and required documents.",
    "context": "Šį kartą paprašiau raštu nurodyti ne tik laiką, bet ir adresą bei reikalingus dokumentus.",
    "source": "reading"
   },
   {
    "text": "Patikrinome jūsų prašymą.",
    "meaning": "We checked your request.",
    "context": "Patikrinome jūsų prašymą.",
    "source": "listen"
   },
   {
    "text": "Jis buvo gautas penktadienį, bet trūko telefono numerio, todėl negalėjome susisiekti.",
    "meaning": "It was received on Friday, but the phone number was missing, so we could not contact you.",
    "context": "Jis buvo gautas penktadienį, bet trūko telefono numerio, todėl negalėjome susisiekti.",
    "source": "listen"
   },
   {
    "text": "Prašome šiandien atsiųsti numerį elektroniniu paštu.",
    "meaning": "Please send the number by email today.",
    "context": "Prašome šiandien atsiųsti numerį elektroniniu paštu.",
    "source": "listen"
   },
   {
    "text": "Galime pasiūlyti susitikimą ketvirtadienį antrą valandą.",
    "meaning": "We can offer an appointment on Thursday at two.",
    "context": "Galime pasiūlyti susitikimą ketvirtadienį antrą valandą.",
    "source": "listen"
   },
   {
    "text": "Kol negausite atskiro patvirtinimo, šis laikas dar nėra galutinai paskirtas.",
    "meaning": "Until you receive separate confirmation, this time has not been definitively assigned.",
    "context": "Kol negausite atskiro patvirtinimo, šis laikas dar nėra galutinai paskirtas.",
    "source": "listen"
   },
   {
    "text": "Jei ketvirtadienis netinka, parašykite, kuriomis dienomis galite atvykti.",
    "meaning": "If Thursday does not work, write to tell us which days you can come.",
    "context": "Jei ketvirtadienis netinka, parašykite, kuriomis dienomis galite atvykti.",
    "source": "listen"
   },
   {
    "text": "Prašymo iš naujo pildyti nereikia.",
    "meaning": "There is no need to fill in the request again.",
    "context": "Prašymo iš naujo pildyti nereikia.",
    "source": "listen"
   },
   {
    "text": "Kokią žinutę gavote pateikę prašymą?",
    "meaning": "What message did you receive after submitting the request?",
    "context": "Kokią žinutę gavote pateikę prašymą?",
    "source": "partner"
   },
   {
    "text": "Ar galėtumėte patikslinti savo duomenis?",
    "meaning": "Could you clarify your details?",
    "context": "Ar galėtumėte patikslinti savo duomenis?",
    "source": "partner"
   },
   {
    "text": "Ką darysite, jei patvirtinimas neateis?",
    "meaning": "What will you do if confirmation does not arrive?",
    "context": "Ką darysite, jei patvirtinimas neateis?",
    "source": "partner"
   },
   {
    "text": "Norėčiau paaiškinti, kas atsitiko.",
    "meaning": "I would like to explain what happened.",
    "context": "Norėčiau paaiškinti, kas atsitiko.",
    "source": "strategy"
   },
   {
    "text": "Turiu žinutės kopiją.",
    "meaning": "I have a copy of the message.",
    "context": "Turiu žinutės kopiją.",
    "source": "strategy"
   },
   {
    "text": "Prašau atsiųsti informaciją raštu.",
    "meaning": "Please send the information in writing.",
    "context": "Prašau atsiųsti informaciją raštu.",
    "source": "strategy"
   }
  ],
  "B1-community": [
   {
    "text": "Mūsų bendruomenė planuoja šeštadienio popietę surengti knygų mainus.",
    "meaning": "Our community plans to hold a book exchange on Saturday afternoon.",
    "context": "Mūsų bendruomenė planuoja šeštadienio popietę surengti knygų mainus.",
    "source": "reading"
   },
   {
    "text": "Pirmasis pasiūlymas buvo susitikti parke, nes ten būtų daugiau vietos šeimoms.",
    "meaning": "The first proposal was to meet in the park because there would be more room for families there.",
    "context": "Pirmasis pasiūlymas buvo susitikti parke, nes ten būtų daugiau vietos šeimoms.",
    "source": "reading"
   },
   {
    "text": "Tačiau keli kaimynai priminė, kad gali lyti.",
    "meaning": "However, several neighbours pointed out that it might rain.",
    "context": "Tačiau keli kaimynai priminė, kad gali lyti.",
    "source": "reading"
   },
   {
    "text": "Bibliotekos salė apsaugotų nuo lietaus, bet joje telpa tik trisdešimt žmonių.",
    "meaning": "The library room would provide shelter from the rain, but it holds only thirty people.",
    "context": "Bibliotekos salė apsaugotų nuo lietaus, bet joje telpa tik trisdešimt žmonių.",
    "source": "reading"
   },
   {
    "text": "Siūlome registruotis iš anksto.",
    "meaning": "We suggest registering in advance.",
    "context": "Siūlome registruotis iš anksto.",
    "source": "reading"
   },
   {
    "text": "Jei užsiregistruos daugiau žmonių, renginį padalysime į dvi dalis.",
    "meaning": "If more people register, we will divide the event into two parts.",
    "context": "Jei užsiregistruos daugiau žmonių, renginį padalysime į dvi dalis.",
    "source": "reading"
   },
   {
    "text": "Du savanoriai jau pažadėjo atnešti kėdes.",
    "meaning": "Two volunteers have already promised to bring chairs.",
    "context": "Du savanoriai jau pažadėjo atnešti kėdes.",
    "source": "reading"
   },
   {
    "text": "Dar ieškome žmogaus, kuris pasirūpintų skelbimu.",
    "meaning": "We are still looking for someone to take care of the announcement.",
    "context": "Dar ieškome žmogaus, kuris pasirūpintų skelbimu.",
    "source": "reading"
   },
   {
    "text": "Galutinį planą paskelbsime penktadienį.",
    "meaning": "We will publish the final plan on Friday.",
    "context": "Galutinį planą paskelbsime penktadienį.",
    "source": "reading"
   },
   {
    "text": "Labas, turiu naujienų dėl knygų mainų.",
    "meaning": "Hello, I have news about the book exchange.",
    "context": "Labas, turiu naujienų dėl knygų mainų.",
    "source": "listen"
   },
   {
    "text": "Užsiregistravo keturiasdešimt žmonių, todėl salėje rengsime dvi grupes.",
    "meaning": "Forty people registered, so we will organise two groups in the room.",
    "context": "Užsiregistravo keturiasdešimt žmonių, todėl salėje rengsime dvi grupes.",
    "source": "listen"
   },
   {
    "text": "Pirmoji pradės antrą, antroji ketvirtą valandą.",
    "meaning": "The first will start at two and the second at four.",
    "context": "Pirmoji pradės antrą, antroji ketvirtą valandą.",
    "source": "listen"
   },
   {
    "text": "Į parką neisime, net jeigu oras pagerės: dalyviams jau išsiuntėme bibliotekos adresą.",
    "meaning": "We will not go to the park even if the weather improves: we have already sent participants the library address.",
    "context": "Į parką neisime, net jeigu oras pagerės: dalyviams jau išsiuntėme bibliotekos adresą.",
    "source": "listen"
   },
   {
    "text": "Prašau šiandien paruošti aiškų skelbimą su abiem laikais.",
    "meaning": "Please prepare a clear announcement with both times today.",
    "context": "Prašau šiandien paruošti aiškų skelbimą su abiem laikais.",
    "source": "listen"
   },
   {
    "text": "Kėdėmis pasirūpins savanoriai, o aš pasitiksiu pirmą grupę.",
    "meaning": "The volunteers will take care of the chairs, and I will welcome the first group.",
    "context": "Kėdėmis pasirūpins savanoriai, o aš pasitiksiu pirmą grupę.",
    "source": "listen"
   },
   {
    "text": "Kuri vieta renginiui būtų tinkamiausia?",
    "meaning": "Which location would be most suitable?",
    "context": "Kuri vieta renginiui būtų tinkamiausia?",
    "source": "partner"
   },
   {
    "text": "O ką darysime, jei dalyvių bus per daug?",
    "meaning": "What will we do if too many people attend?",
    "context": "O ką darysime, jei dalyvių bus per daug?",
    "source": "partner"
   },
   {
    "text": "Kokią užduotį galėtumėte atlikti?",
    "meaning": "Which task could you take responsibility for?",
    "context": "Kokią užduotį galėtumėte atlikti?",
    "source": "partner"
   },
   {
    "text": "Siūlau surengti bendruomenės susitikimą.",
    "meaning": "I suggest organising a community meeting.",
    "context": "Siūlau surengti bendruomenės susitikimą.",
    "source": "strategy"
   },
   {
    "text": "Lauke būtų daugiau vietos.",
    "meaning": "There would be more space outside.",
    "context": "Lauke būtų daugiau vietos.",
    "source": "strategy"
   },
   {
    "text": "Galutinį planą paskelbsime penktadienį.",
    "meaning": "We will publish the final plan on Friday.",
    "context": "Galutinį planą paskelbsime penktadienį.",
    "source": "strategy"
   }
  ],
  "B1-housing": [
   {
    "text": "Vakar pastebėjau, kad virtuvėje laša čiaupas.",
    "meaning": "Yesterday I noticed that the kitchen tap was dripping.",
    "context": "Vakar pastebėjau, kad virtuvėje laša čiaupas.",
    "source": "reading"
   },
   {
    "text": "Parašiau meistrui ir paprašiau atvykti pirmadienį.",
    "meaning": "I wrote to a repair worker and asked them to come on Monday.",
    "context": "Parašiau meistrui ir paprašiau atvykti pirmadienį.",
    "source": "reading"
   },
   {
    "text": "Jis pasiūlė laiką nuo devintos iki vienuoliktos, tačiau tuo metu nebūsiu namuose.",
    "meaning": "He suggested a time from nine to eleven, but I will not be at home then.",
    "context": "Jis pasiūlė laiką nuo devintos iki vienuoliktos, tačiau tuo metu nebūsiu namuose.",
    "source": "reading"
   },
   {
    "text": "Paprašiau vizitą perkelti po trečios valandos.",
    "meaning": "I asked to move the visit to after three.",
    "context": "Paprašiau vizitą perkelti po trečios valandos.",
    "source": "reading"
   },
   {
    "text": "Meistras paaiškino, kad pirmiausia turės apžiūrėti čiaupą ir tik tada galės pasakyti, kiek užtruks remontas.",
    "meaning": "The repair worker explained that first he would have to inspect the tap and only then could he say how long the repair would take.",
    "context": "Meistras paaiškino, kad pirmiausia turės apžiūrėti čiaupą ir tik tada galės pasakyti, kiek užtruks remontas.",
    "source": "reading"
   },
   {
    "text": "Sutarėme, kad iki sekmadienio vakaro patvirtinsime apsilankymo laiką raštu.",
    "meaning": "We agreed to confirm the visit time in writing by Sunday evening.",
    "context": "Sutarėme, kad iki sekmadienio vakaro patvirtinsime apsilankymo laiką raštu.",
    "source": "reading"
   },
   {
    "text": "Kaimyno prašyti įleisti meistrą kol kas nereikia: popietę būsiu namuose pats.",
    "meaning": "There is no need yet to ask a neighbour to let the repair worker in: I myself will be at home in the afternoon.",
    "context": "Kaimyno prašyti įleisti meistrą kol kas nereikia: popietę būsiu namuose pats.",
    "source": "reading"
   },
   {
    "text": "Skambinu dėl pirmadienio vizito.",
    "meaning": "I am calling about the visit on Monday.",
    "context": "Skambinu dėl pirmadienio vizito.",
    "source": "listen"
   },
   {
    "text": "Galėčiau atvykti tarp ketvirtos ir penktos, jeigu jums tinka.",
    "meaning": "I could arrive between four and five, if that works for you.",
    "context": "Galėčiau atvykti tarp ketvirtos ir penktos, jeigu jums tinka.",
    "source": "listen"
   },
   {
    "text": "Tai yra atvykimo laikas, o ne pažadas iki penktos baigti remontą.",
    "meaning": "That is the arrival time, not a promise to finish the repair by five.",
    "context": "Tai yra atvykimo laikas, o ne pažadas iki penktos baigti remontą.",
    "source": "listen"
   },
   {
    "text": "Jei apžiūrėjęs pamatysiu, kad reikia kitos detalės, aptarsime atskirą laiką darbui užbaigti.",
    "meaning": "If inspection shows that another part is needed, we will discuss a separate time to finish the work.",
    "context": "Jei apžiūrėjęs pamatysiu, kad reikia kitos detalės, aptarsime atskirą laiką darbui užbaigti.",
    "source": "listen"
   },
   {
    "text": "Prašau šiandien patvirtinti, ar tuo metu būsite namuose.",
    "meaning": "Please confirm today whether you will be at home then.",
    "context": "Prašau šiandien patvirtinti, ar tuo metu būsite namuose.",
    "source": "listen"
   },
   {
    "text": "Jei mano ankstesnis darbas užtruks, paskambinsiu prieš išvažiuodamas.",
    "meaning": "If my earlier job takes longer, I will call before setting off.",
    "context": "Jei mano ankstesnis darbas užtruks, paskambinsiu prieš išvažiuodamas.",
    "source": "listen"
   },
   {
    "text": "Kokią problemą pastebėjote?",
    "meaning": "What problem have you observed?",
    "context": "Kokią problemą pastebėjote?",
    "source": "partner"
   },
   {
    "text": "Ar galėtumėte mane įleisti pirmadienį ryte?",
    "meaning": "Could you let me in on Monday morning?",
    "context": "Ar galėtumėte mane įleisti pirmadienį ryte?",
    "source": "partner"
   },
   {
    "text": "Negaliu pažadėti, kad remontą užbaigsiu tą pačią dieną.",
    "meaning": "I cannot promise to finish the repair that day.",
    "context": "Negaliu pažadėti, kad remontą užbaigsiu tą pačią dieną.",
    "source": "partner"
   },
   {
    "text": "Virtuvėje laša čiaupas.",
    "meaning": "The kitchen tap is dripping.",
    "context": "Virtuvėje laša čiaupas.",
    "source": "strategy"
   },
   {
    "text": "Galite atvykti po trečios valandos.",
    "meaning": "You can come after three.",
    "context": "Galite atvykti po trečios valandos.",
    "source": "strategy"
   },
   {
    "text": "Patvirtinkime laiką raštu.",
    "meaning": "Let us confirm the time in writing.",
    "context": "Patvirtinkime laiką raštu.",
    "source": "strategy"
   }
  ]
 },
 "es": {
  "B1": [
   {
    "text": "El fin de semana pasado viajé con una amiga a otra ciudad.",
    "meaning": "Last weekend I travelled with a friend to another city.",
    "context": "El fin de semana pasado viajé con una amiga a otra ciudad.",
    "source": "reading"
   },
   {
    "text": "Al principio todo salió según lo previsto: llegamos a la terminal a tiempo y compramos los boletos.",
    "meaning": "At first everything went as planned: we reached the bus terminal on time and bought the tickets.",
    "context": "Al principio todo salió según lo previsto: llegamos a la terminal a tiempo y compramos los boletos.",
    "source": "reading"
   },
   {
    "text": "Sin embargo, pronto surgió un problema.",
    "meaning": "However, a problem soon arose.",
    "context": "Sin embargo, pronto surgió un problema.",
    "source": "reading"
   },
   {
    "text": "El autobús se había cancelado y el siguiente salía varias horas después.",
    "meaning": "The bus had been cancelled, and the next one was leaving several hours later.",
    "context": "El autobús se había cancelado y el siguiente salía varias horas después.",
    "source": "reading"
   },
   {
    "text": "Decidí pedir ayuda.",
    "meaning": "I decided to ask for help.",
    "context": "Decidí pedir ayuda.",
    "source": "reading"
   },
   {
    "text": "Una empleada nos explicó que había otra ruta.",
    "meaning": "An employee explained to us that there was another route.",
    "context": "Una empleada nos explicó que había otra ruta.",
    "source": "reading"
   },
   {
    "text": "Al final encontramos una solución y continuamos el viaje, aunque llegamos más tarde de lo esperado.",
    "meaning": "In the end we found a solution and continued the journey, although we arrived later than expected.",
    "context": "Al final encontramos una solución y continuamos el viaje, aunque llegamos más tarde de lo esperado.",
    "source": "reading"
   },
   {
    "text": "Aun así, pudimos pasear por el centro y disfrutar de la tarde.",
    "meaning": "Even so, we were able to walk around the centre and enjoy the afternoon.",
    "context": "Aun así, pudimos pasear por el centro y disfrutar de la tarde.",
    "source": "reading"
   },
   {
    "text": "Esta experiencia me enseñó que no sirve de mucho buscar culpables cuando cambian los planes.",
    "meaning": "This experience taught me that looking for someone to blame is not very useful when plans change.",
    "context": "Esta experiencia me enseñó que no sirve de mucho buscar culpables cuando cambian los planes.",
    "source": "reading"
   },
   {
    "text": "En mi opinión, conviene prepararse con tiempo y mantener la calma para encontrar una salida.",
    "meaning": "In my opinion, it is advisable to prepare ahead and stay calm to find a way out.",
    "context": "En mi opinión, conviene prepararse con tiempo y mantener la calma para encontrar una salida.",
    "source": "reading"
   },
   {
    "text": "La próxima vez consultaré el horario antes de salir y tendré en cuenta otra forma de llegar.",
    "meaning": "Next time I will check the timetable before leaving and consider another way to get there.",
    "context": "La próxima vez consultaré el horario antes de salir y tendré en cuenta otra forma de llegar.",
    "source": "reading"
   },
   {
    "text": "Ayer viajé a un congreso en otra ciudad.",
    "meaning": "Yesterday I travelled to a conference in another city.",
    "context": "Ayer viajé a un congreso en otra ciudad.",
    "source": "listen"
   },
   {
    "text": "Había comprado el boleto con anticipación, pero en la terminal me dijeron que mi autobús llevaba dos horas de retraso.",
    "meaning": "I had bought the ticket in advance, but at the bus terminal they told me that my bus was two hours late.",
    "context": "Había comprado el boleto con anticipación, pero en la terminal me dijeron que mi autobús llevaba dos horas de retraso.",
    "source": "listen"
   },
   {
    "text": "Al principio me preocupé mucho porque tenía que hablar antes del mediodía.",
    "meaning": "At first I became very worried because I had to speak before noon.",
    "context": "Al principio me preocupé mucho porque tenía que hablar antes del mediodía.",
    "source": "listen"
   },
   {
    "text": "Le pedí consejo a una empleada.",
    "meaning": "I asked an employee for advice.",
    "context": "Le pedí consejo a una empleada.",
    "source": "listen"
   },
   {
    "text": "Me propuso tomar otro autobús y cambiar en un pueblo pequeño.",
    "meaning": "She suggested taking another bus and changing in a small town.",
    "context": "Me propuso tomar otro autobús y cambiar en un pueblo pequeño.",
    "source": "listen"
   },
   {
    "text": "El viaje costó un poco más, pero llegué a tiempo.",
    "meaning": "The journey cost a little more, but I arrived on time.",
    "context": "El viaje costó un poco más, pero llegué a tiempo.",
    "source": "listen"
   },
   {
    "text": "Llamé a un compañero para avisarle del cambio de ruta.",
    "meaning": "I called a colleague to let them know about the change of route.",
    "context": "Llamé a un compañero para avisarle del cambio de ruta.",
    "source": "listen"
   },
   {
    "text": "Ahora creo que conviene tener un plan alternativo.",
    "meaning": "Now I think it is advisable to have an alternative plan.",
    "context": "Ahora creo que conviene tener un plan alternativo.",
    "source": "listen"
   },
   {
    "text": "Sin embargo, no se puede prever todo.",
    "meaning": "However, not everything can be predicted.",
    "context": "Sin embargo, no se puede prever todo.",
    "source": "listen"
   },
   {
    "text": "A veces sirve más preguntar con calma qué opciones hay que enojarse por algo que no puedes cambiar.",
    "meaning": "Sometimes it helps more to ask calmly what options there are than to get angry about something you cannot change.",
    "context": "A veces sirve más preguntar con calma qué opciones hay que enojarse por algo que no puedes cambiar.",
    "source": "listen"
   },
   {
    "text": "¿Qué cambió durante su viaje?",
    "meaning": "What changed during your journey?",
    "context": "¿Qué cambió durante su viaje?",
    "source": "partner"
   },
   {
    "text": "¿Por qué eligió esa solución?",
    "meaning": "Why did you choose that solution?",
    "context": "¿Por qué eligió esa solución?",
    "source": "partner"
   },
   {
    "text": "¿Qué le recomendaría a otra persona que va a viajar?",
    "meaning": "What would you recommend to another traveller?",
    "context": "¿Qué le recomendaría a otra persona que va a viajar?",
    "source": "partner"
   },
   {
    "text": "Al principio pensaba...",
    "meaning": "At first I was planning...",
    "context": "Al principio pensaba...",
    "source": "strategy"
   },
   {
    "text": "Elegí esta solución porque...",
    "meaning": "I chose this solution because...",
    "context": "Elegí esta solución porque...",
    "source": "strategy"
   },
   {
    "text": "La próxima vez recomendaría...",
    "meaning": "Next time I would recommend...",
    "context": "La próxima vez recomendaría...",
    "source": "strategy"
   }
  ],
  "B1-appointments": [
   {
    "text": "La semana pasada llené un formulario de registro por internet, pero no recibí la confirmación.",
    "meaning": "Last week I filled in a registration form online, but I did not receive confirmation.",
    "context": "La semana pasada llené un formulario de registro por internet, pero no recibí la confirmación.",
    "source": "reading"
   },
   {
    "text": "Pensé que la cita ya estaba hecha y el lunes fui al centro de atención.",
    "meaning": "I thought the appointment had already been made, and on Monday I went to the service centre.",
    "context": "Pensé que la cita ya estaba hecha y el lunes fui al centro de atención.",
    "source": "reading"
   },
   {
    "text": "La empleada no encontró mi nombre en la lista.",
    "meaning": "The employee could not find my name on the list.",
    "context": "La empleada no encontró mi nombre en la lista.",
    "source": "reading"
   },
   {
    "text": "Le mostré el mensaje que había guardado.",
    "meaning": "I showed her the message I had saved.",
    "context": "Le mostré el mensaje que había guardado.",
    "source": "reading"
   },
   {
    "text": "Resultó que solo era un aviso de que habían recibido la solicitud, no una confirmación de la cita.",
    "meaning": "It turned out to be only a notice that they had received the request, not confirmation of the appointment.",
    "context": "Resultó que solo era un aviso de que habían recibido la solicitud, no una confirmación de la cita.",
    "source": "reading"
   },
   {
    "text": "Me ofreció un espacio el miércoles y prometió enviar la confirmación.",
    "meaning": "She offered me an available time on Wednesday and promised to send confirmation.",
    "context": "Me ofreció un espacio el miércoles y prometió enviar la confirmación.",
    "source": "reading"
   },
   {
    "text": "Esta vez pedí que el mensaje incluyera la hora, la dirección y los documentos necesarios.",
    "meaning": "This time I asked for the message to include the time, address and necessary documents.",
    "context": "Esta vez pedí que el mensaje incluyera la hora, la dirección y los documentos necesarios.",
    "source": "reading"
   },
   {
    "text": "Revisamos su solicitud.",
    "meaning": "We reviewed your request.",
    "context": "Revisamos su solicitud.",
    "source": "listen"
   },
   {
    "text": "La recibimos el viernes, pero faltaba el teléfono y no pudimos comunicarnos.",
    "meaning": "We received it on Friday, but the phone number was missing and we could not get in touch.",
    "context": "La recibimos el viernes, pero faltaba el teléfono y no pudimos comunicarnos.",
    "source": "listen"
   },
   {
    "text": "Envíenos hoy su número por correo electrónico, por favor.",
    "meaning": "Please send us your number by email today.",
    "context": "Envíenos hoy su número por correo electrónico, por favor.",
    "source": "listen"
   },
   {
    "text": "Podemos ofrecerle una cita el jueves a las dos.",
    "meaning": "We can offer you an appointment on Thursday at two.",
    "context": "Podemos ofrecerle una cita el jueves a las dos.",
    "source": "listen"
   },
   {
    "text": "Ese horario todavía no es definitivo: tiene que recibir una confirmación aparte.",
    "meaning": "That time is not final yet: you need to receive separate confirmation.",
    "context": "Ese horario todavía no es definitivo: tiene que recibir una confirmación aparte.",
    "source": "listen"
   },
   {
    "text": "Si no puede venir el jueves, indique qué días tiene disponibles.",
    "meaning": "If you cannot come on Thursday, indicate which days you have available.",
    "context": "Si no puede venir el jueves, indique qué días tiene disponibles.",
    "source": "listen"
   },
   {
    "text": "No necesita llenar otra vez la solicitud.",
    "meaning": "You do not need to fill in the request again.",
    "context": "No necesita llenar otra vez la solicitud.",
    "source": "listen"
   },
   {
    "text": "¿Qué mensaje recibió al enviar la solicitud?",
    "meaning": "What message did you receive after submitting the request?",
    "context": "¿Qué mensaje recibió al enviar la solicitud?",
    "source": "partner"
   },
   {
    "text": "¿Podría confirmar sus datos?",
    "meaning": "Could you clarify your details?",
    "context": "¿Podría confirmar sus datos?",
    "source": "partner"
   },
   {
    "text": "¿Qué hará si no llega la confirmación?",
    "meaning": "What will you do if confirmation does not arrive?",
    "context": "¿Qué hará si no llega la confirmación?",
    "source": "partner"
   },
   {
    "text": "Quisiera explicar lo que pasó.",
    "meaning": "I would like to explain what happened.",
    "context": "Quisiera explicar lo que pasó.",
    "source": "strategy"
   },
   {
    "text": "Tengo una copia del mensaje.",
    "meaning": "I have a copy of the message.",
    "context": "Tengo una copia del mensaje.",
    "source": "strategy"
   },
   {
    "text": "Por favor, envíeme la información por escrito.",
    "meaning": "Please send the information in writing.",
    "context": "Por favor, envíeme la información por escrito.",
    "source": "strategy"
   }
  ],
  "B1-community": [
   {
    "text": "Nuestra comunidad planea organizar un intercambio de libros el sábado por la tarde.",
    "meaning": "Our community plans to organise a book exchange on Saturday afternoon.",
    "context": "Nuestra comunidad planea organizar un intercambio de libros el sábado por la tarde.",
    "source": "reading"
   },
   {
    "text": "La primera propuesta fue reunirnos en el parque porque habría más espacio para las familias.",
    "meaning": "The first proposal was to meet in the park because there would be more room for families.",
    "context": "La primera propuesta fue reunirnos en el parque porque habría más espacio para las familias.",
    "source": "reading"
   },
   {
    "text": "Sin embargo, algunos vecinos recordaron que podría llover.",
    "meaning": "However, some neighbours pointed out that it might rain.",
    "context": "Sin embargo, algunos vecinos recordaron que podría llover.",
    "source": "reading"
   },
   {
    "text": "El salón de la biblioteca nos protegería de la lluvia, pero solo caben treinta personas.",
    "meaning": "The library room would protect us from the rain, but it holds only thirty people.",
    "context": "El salón de la biblioteca nos protegería de la lluvia, pero solo caben treinta personas.",
    "source": "reading"
   },
   {
    "text": "Proponemos que la gente se registre antes.",
    "meaning": "We propose that people register beforehand.",
    "context": "Proponemos que la gente se registre antes.",
    "source": "reading"
   },
   {
    "text": "Si se inscriben más personas, dividiremos el evento en dos sesiones.",
    "meaning": "If more people register, we will divide the event into two sessions.",
    "context": "Si se inscriben más personas, dividiremos el evento en dos sesiones.",
    "source": "reading"
   },
   {
    "text": "Dos voluntarios ya ofrecieron llevar sillas.",
    "meaning": "Two volunteers have already offered to bring chairs.",
    "context": "Dos voluntarios ya ofrecieron llevar sillas.",
    "source": "reading"
   },
   {
    "text": "Todavía buscamos a alguien que prepare el anuncio.",
    "meaning": "We are still looking for someone to prepare the announcement.",
    "context": "Todavía buscamos a alguien que prepare el anuncio.",
    "source": "reading"
   },
   {
    "text": "Publicaremos el plan final el viernes.",
    "meaning": "We will publish the final plan on Friday.",
    "context": "Publicaremos el plan final el viernes.",
    "source": "reading"
   },
   {
    "text": "Hola, tengo noticias del intercambio de libros.",
    "meaning": "Hello, I have news about the book exchange.",
    "context": "Hola, tengo noticias del intercambio de libros.",
    "source": "listen"
   },
   {
    "text": "Se registraron cuarenta personas, así que vamos a organizar dos grupos en el salón.",
    "meaning": "Forty people registered, so we are going to organise two groups in the room.",
    "context": "Se registraron cuarenta personas, así que vamos a organizar dos grupos en el salón.",
    "source": "listen"
   },
   {
    "text": "El primero empieza a las dos y el segundo a las cuatro.",
    "meaning": "The first starts at two and the second at four.",
    "context": "El primero empieza a las dos y el segundo a las cuatro.",
    "source": "listen"
   },
   {
    "text": "No iremos al parque aunque mejore el tiempo, porque ya enviamos la dirección de la biblioteca.",
    "meaning": "We will not go to the park even if the weather improves, because we already sent the library address.",
    "context": "No iremos al parque aunque mejore el tiempo, porque ya enviamos la dirección de la biblioteca.",
    "source": "listen"
   },
   {
    "text": "Prepara hoy un anuncio claro con los dos horarios, por favor.",
    "meaning": "Please prepare a clear announcement with both times today.",
    "context": "Prepara hoy un anuncio claro con los dos horarios, por favor.",
    "source": "listen"
   },
   {
    "text": "Los voluntarios se encargan de las sillas y yo recibo al primer grupo.",
    "meaning": "The volunteers are taking care of the chairs, and I am welcoming the first group.",
    "context": "Los voluntarios se encargan de las sillas y yo recibo al primer grupo.",
    "source": "listen"
   },
   {
    "text": "¿Qué lugar sería más adecuado para el evento?",
    "meaning": "Which location would be most suitable?",
    "context": "¿Qué lugar sería más adecuado para el evento?",
    "source": "partner"
   },
   {
    "text": "¿Y qué haremos si hay demasiados participantes?",
    "meaning": "What will we do if too many people attend?",
    "context": "¿Y qué haremos si hay demasiados participantes?",
    "source": "partner"
   },
   {
    "text": "¿De qué tarea podría encargarse?",
    "meaning": "Which task could you take responsibility for?",
    "context": "¿De qué tarea podría encargarse?",
    "source": "partner"
   },
   {
    "text": "Propongo organizar una reunión comunitaria.",
    "meaning": "I suggest organising a community meeting.",
    "context": "Propongo organizar una reunión comunitaria.",
    "source": "strategy"
   },
   {
    "text": "Afuera habría más espacio.",
    "meaning": "There would be more space outside.",
    "context": "Afuera habría más espacio.",
    "source": "strategy"
   },
   {
    "text": "Publicaremos el plan final el viernes.",
    "meaning": "We will publish the final plan on Friday.",
    "context": "Publicaremos el plan final el viernes.",
    "source": "strategy"
   }
  ],
  "B1-housing": [
   {
    "text": "Ayer noté que la llave de la cocina gotea.",
    "meaning": "Yesterday I noticed that the kitchen tap was dripping.",
    "context": "Ayer noté que la llave de la cocina gotea.",
    "source": "reading"
   },
   {
    "text": "Le escribí a un técnico y le pedí una visita el lunes.",
    "meaning": "I wrote to a technician and asked him for a visit on Monday.",
    "context": "Le escribí a un técnico y le pedí una visita el lunes.",
    "source": "reading"
   },
   {
    "text": "Propuso llegar entre las nueve y las once, pero no voy a estar en casa a esa hora.",
    "meaning": "He proposed arriving between nine and eleven, but I am not going to be at home then.",
    "context": "Propuso llegar entre las nueve y las once, pero no voy a estar en casa a esa hora.",
    "source": "reading"
   },
   {
    "text": "Pedí cambiar la visita para después de las tres.",
    "meaning": "I asked to change the visit to after three.",
    "context": "Pedí cambiar la visita para después de las tres.",
    "source": "reading"
   },
   {
    "text": "El técnico explicó que primero tendría que revisar la llave y solo entonces podría decir cuánto tardaría la reparación.",
    "meaning": "The technician explained that he would first have to inspect the tap and only then could say how long the repair would take.",
    "context": "El técnico explicó que primero tendría que revisar la llave y solo entonces podría decir cuánto tardaría la reparación.",
    "source": "reading"
   },
   {
    "text": "Acordamos confirmar el horario por escrito antes del domingo por la noche.",
    "meaning": "We agreed to confirm the time in writing before Sunday night.",
    "context": "Acordamos confirmar el horario por escrito antes del domingo por la noche.",
    "source": "reading"
   },
   {
    "text": "Por ahora no hace falta pedirle al vecino que abra: yo voy a estar en casa por la tarde.",
    "meaning": "For now there is no need to ask the neighbour to open the door: I will be at home in the afternoon.",
    "context": "Por ahora no hace falta pedirle al vecino que abra: yo voy a estar en casa por la tarde.",
    "source": "reading"
   },
   {
    "text": "Le llamo por la visita del lunes.",
    "meaning": "I am calling about the Monday visit.",
    "context": "Le llamo por la visita del lunes.",
    "source": "listen"
   },
   {
    "text": "Podría llegar entre las cuatro y las cinco, si le viene bien.",
    "meaning": "I could arrive between four and five, if that works for you.",
    "context": "Podría llegar entre las cuatro y las cinco, si le viene bien.",
    "source": "listen"
   },
   {
    "text": "Ese es el horario de llegada, no una promesa de terminar la reparación antes de las cinco.",
    "meaning": "That is the arrival window, not a promise to finish the repair before five.",
    "context": "Ese es el horario de llegada, no una promesa de terminar la reparación antes de las cinco.",
    "source": "listen"
   },
   {
    "text": "Si al revisar veo que hace falta otra pieza, acordaremos otro horario para terminar.",
    "meaning": "If inspection shows that another part is needed, we will agree on another time to finish.",
    "context": "Si al revisar veo que hace falta otra pieza, acordaremos otro horario para terminar.",
    "source": "listen"
   },
   {
    "text": "Confirme hoy si va a estar en casa, por favor.",
    "meaning": "Please confirm today whether you are going to be at home.",
    "context": "Confirme hoy si va a estar en casa, por favor.",
    "source": "listen"
   },
   {
    "text": "Si el trabajo anterior se alarga, llamaré antes de salir.",
    "meaning": "If the previous job takes longer, I will call before leaving.",
    "context": "Si el trabajo anterior se alarga, llamaré antes de salir.",
    "source": "listen"
   },
   {
    "text": "¿Qué problema ha observado?",
    "meaning": "What problem have you observed?",
    "context": "¿Qué problema ha observado?",
    "source": "partner"
   },
   {
    "text": "¿Podría recibirme el lunes por la mañana?",
    "meaning": "Could you let me in on Monday morning?",
    "context": "¿Podría recibirme el lunes por la mañana?",
    "source": "partner"
   },
   {
    "text": "No puedo prometer que termine la reparación ese mismo día.",
    "meaning": "I cannot promise to finish the repair that day.",
    "context": "No puedo prometer que termine la reparación ese mismo día.",
    "source": "partner"
   },
   {
    "text": "La llave de la cocina gotea.",
    "meaning": "The kitchen tap is dripping.",
    "context": "La llave de la cocina gotea.",
    "source": "strategy"
   },
   {
    "text": "Puede venir después de las tres.",
    "meaning": "You can come after three.",
    "context": "Puede venir después de las tres.",
    "source": "strategy"
   },
   {
    "text": "Confirmemos el horario por escrito.",
    "meaning": "Let us confirm the time in writing.",
    "context": "Confirmemos el horario por escrito.",
    "source": "strategy"
   }
  ]
 }
};
const tokens=text=>String(text).normalize('NFC').toLocaleLowerCase(LANG.code).match(/\p{L}+/gu)||[];
const taught=new Set(),units={...base.units};
for(const unit of course.units){
 for(const phrase of unit.writing.phrases)for(const word of tokens(phrase[0]))taught.add(word);
 for(const entry of vocab.units[unit.id]||[])for(const word of tokens(entry.text))taught.add(word);
 if(authored[LANG.code]?.[unit.id]){
  const entries=authored[LANG.code][unit.id];
  const sources=[unit.reading,unit.listen,...unit.turns.map(t=>t[0]),...(unit.strategies||[]).map(t=>t[0]),...(unit.writing.sources||[]).map(s=>s[1])];
  if(entries.every(e=>sources.some(source=>source.includes(e.text)))){
   units[unit.id]=[];
   for(const entry of entries){if(tokens(entry.text).some(word=>!taught.has(word))){units[unit.id].push(entry);for(const word of tokens(entry.text))taught.add(word);}}
  }
 }
 for(const entry of units[unit.id]||[])for(const word of tokens(entry.text))taught.add(word);
}
window.WordamiSourceSupport=Object.freeze({...base,units});
})();
