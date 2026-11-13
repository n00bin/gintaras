/* Explicit source-expression teaching. Full expressions are not word/lemma counts. */
(()=>{'use strict';
const base=window.WordamiSourceSupport,course=window.WordamiSkillsContent,vocab=window.WordamiVocabularyContent;
if(!base||!course||!vocab)return;
const authored={
 "lt": {
  "B2": [
   {
    "text": "Ar biblioteka turėtų daugiau paslaugų perkelti į internetą?",
    "meaning": "Should the library move more services online?",
    "context": "Ar biblioteka turėtų daugiau paslaugų perkelti į internetą?",
    "source": "reading"
   },
   {
    "text": "Viena vertus, skaitmeninės paslaugos leidžia skaitytojams naudotis medžiaga neatsižvelgiant į bibliotekos darbo laiką.",
    "meaning": "On the one hand, digital services let readers use materials regardless of library opening hours.",
    "context": "Viena vertus, skaitmeninės paslaugos leidžia skaitytojams naudotis medžiaga neatsižvelgiant į bibliotekos darbo laiką.",
    "source": "reading"
   },
   {
    "text": "Tai ypač naudinga tiems, kurie dirba vakarais arba gyvena toliau nuo miesto centro.",
    "meaning": "This is especially useful for those who work evenings or live farther from the city centre.",
    "context": "Tai ypač naudinga tiems, kurie dirba vakarais arba gyvena toliau nuo miesto centro.",
    "source": "reading"
   },
   {
    "text": "Kita vertus, vien prieinamumas internetu dar nereiškia vienodų galimybių.",
    "meaning": "On the other hand, online availability alone does not yet mean equal opportunities.",
    "context": "Kita vertus, vien prieinamumas internetu dar nereiškia vienodų galimybių.",
    "source": "reading"
   },
   {
    "text": "Skaitytojas gali neturėti tinkamo įrenginio arba nemokėti naudotis nauja sistema.",
    "meaning": "A reader may lack a suitable device or not know how to use a new system.",
    "context": "Skaitytojas gali neturėti tinkamo įrenginio arba nemokėti naudotis nauja sistema.",
    "source": "reading"
   },
   {
    "text": "Tokiu atveju patogumas vienai grupei tampa kliūtimi kitai.",
    "meaning": "In that case, convenience for one group becomes an obstacle for another.",
    "context": "Tokiu atveju patogumas vienai grupei tampa kliūtimi kitai.",
    "source": "reading"
   },
   {
    "text": "Pavyzdžiui, registracija tik per programėlę apsunkintų paslaugų naudojimą žmogui, kuris neturi išmaniojo telefono.",
    "meaning": "For example, registration only through an app would make the services harder to use for someone without a smartphone.",
    "context": "Pavyzdžiui, registracija tik per programėlę apsunkintų paslaugų naudojimą žmogui, kuris neturi išmaniojo telefono.",
    "source": "reading"
   },
   {
    "text": "Galima prieštarauti, kad išlaikyti kelis aptarnavimo būdus kainuoja daugiau.",
    "meaning": "One can object that maintaining several service channels costs more.",
    "context": "Galima prieštarauti, kad išlaikyti kelis aptarnavimo būdus kainuoja daugiau.",
    "source": "reading"
   },
   {
    "text": "Nors šis prieštaravimas pagrįstas, jis nėra lemiamas: viešosios paslaugos vertę rodo ne tik sutaupytos lėšos, bet ir žmonių galimybė ja naudotis.",
    "meaning": "Although this objection is justified, it is not decisive: a public service has value not only in money saved but also in people being able to use it.",
    "context": "Nors šis prieštaravimas pagrįstas, jis nėra lemiamas: viešosios paslaugos vertę rodo ne tik sutaupytos lėšos, bet ir žmonių galimybė ja naudotis.",
    "source": "reading"
   },
   {
    "text": "Todėl siūlyčiau lankstesnį modelį.",
    "meaning": "Therefore I would propose a more flexible model.",
    "context": "Todėl siūlyčiau lankstesnį modelį.",
    "source": "reading"
   },
   {
    "text": "Skaitmeninės paslaugos turėtų papildyti, o ne visiškai pakeisti aptarnavimą bibliotekoje.",
    "meaning": "Digital services should supplement rather than completely replace service in the library.",
    "context": "Skaitmeninės paslaugos turėtų papildyti, o ne visiškai pakeisti aptarnavimą bibliotekoje.",
    "source": "reading"
   },
   {
    "text": "Prieš priimant sprendimą reikėtų išbandyti sistemą ir pasikalbėti su skirtingais skaitytojais.",
    "meaning": "Before making a decision, the system should be tested and different readers consulted.",
    "context": "Prieš priimant sprendimą reikėtų išbandyti sistemą ir pasikalbėti su skirtingais skaitytojais.",
    "source": "reading"
   },
   {
    "text": "Siūlymas visą bibliotekos registraciją perkelti į internetą atrodo patrauklus: sistema veiktų ir po darbo valandų, o darbuotojams liktų daugiau laiko sudėtingoms užklausoms.",
    "meaning": "Moving all library registration online seems attractive: the system would operate after hours and staff would have more time for complex enquiries.",
    "context": "Siūlymas visą bibliotekos registraciją perkelti į internetą atrodo patrauklus: sistema veiktų ir po darbo valandų, o darbuotojams liktų daugiau laiko sudėtingoms užklausoms.",
    "source": "listen"
   },
   {
    "text": "Tačiau turime atskirti greitesnį procesą nuo visiems prieinamos paslaugos.",
    "meaning": "However, we must distinguish a faster process from a service accessible to everyone.",
    "context": "Tačiau turime atskirti greitesnį procesą nuo visiems prieinamos paslaugos.",
    "source": "listen"
   },
   {
    "text": "Žmogus gali turėti telefoną, bet nemokėti užpildyti internetinės formos.",
    "meaning": "Someone can have a phone but not know how to complete an online form.",
    "context": "Žmogus gali turėti telefoną, bet nemokėti užpildyti internetinės formos.",
    "source": "listen"
   },
   {
    "text": "Kita vertus, būtų neteisinga manyti, kad kiekvienam skaitytojui būtinas pokalbis su darbuotoju.",
    "meaning": "On the other hand, it would be wrong to think every reader needs a conversation with an employee.",
    "context": "Kita vertus, būtų neteisinga manyti, kad kiekvienam skaitytojui būtinas pokalbis su darbuotoju.",
    "source": "listen"
   },
   {
    "text": "Dalis lankytojų nori savarankiškai atlikti paprastus veiksmus.",
    "meaning": "Some visitors want to carry out simple actions independently.",
    "context": "Dalis lankytojų nori savarankiškai atlikti paprastus veiksmus.",
    "source": "listen"
   },
   {
    "text": "Todėl palaikau bandomąjį mišrų modelį: registraciją internetu kartu su pagalba telefonu ir bibliotekoje.",
    "meaning": "Therefore I support a trial hybrid model: online registration alongside help by phone and in the library.",
    "context": "Todėl palaikau bandomąjį mišrų modelį: registraciją internetu kartu su pagalba telefonu ir bibliotekoje.",
    "source": "listen"
   },
   {
    "text": "Prieštaravimas dėl išlaidų pagrįstas.",
    "meaning": "The objection about costs is justified.",
    "context": "Prieštaravimas dėl išlaidų pagrįstas.",
    "source": "listen"
   },
   {
    "text": "Vis dėlto turėtume skaičiuoti ir pakartotinių kreipimųsi kainą, kai žmogus iš pirmo karto negauna pagalbos.",
    "meaning": "Nevertheless, we should also count the cost of repeated contacts when someone does not receive help the first time.",
    "context": "Vis dėlto turėtume skaičiuoti ir pakartotinių kreipimųsi kainą, kai žmogus iš pirmo karto negauna pagalbos.",
    "source": "listen"
   },
   {
    "text": "Siūlyčiau tris mėnesius vertinti ne tik vidutinį laukimo laiką, bet ir nebaigtų registracijų skaičių.",
    "meaning": "I would propose evaluating not only average waiting time but also incomplete registrations over three months.",
    "context": "Siūlyčiau tris mėnesius vertinti ne tik vidutinį laukimo laiką, bet ir nebaigtų registracijų skaičių.",
    "source": "listen"
   },
   {
    "text": "Po bandymo būtų galima spręsti, kokios pagalbos iš tiesų reikia.",
    "meaning": "After the trial it would be possible to decide what help is really needed.",
    "context": "Po bandymo būtų galima spręsti, kokios pagalbos iš tiesų reikia.",
    "source": "listen"
   },
   {
    "text": "Kokį registracijos modelį siūlote ir kodėl?",
    "meaning": "Which registration model do you propose, and why?",
    "context": "Kokį registracijos modelį siūlote ir kodėl?",
    "source": "partner"
   },
   {
    "text": "Bet ar keli aptarnavimo būdai nekainuos per daug?",
    "meaning": "But will several service channels not cost too much?",
    "context": "Bet ar keli aptarnavimo būdai nekainuos per daug?",
    "source": "partner"
   },
   {
    "text": "Kaip nustatysime, ar pasiūlymas pasiteisino?",
    "meaning": "How will we determine whether the proposal worked?",
    "context": "Kaip nustatysime, ar pasiūlymas pasiteisino?",
    "source": "partner"
   },
   {
    "text": "Siūlyčiau mišrų modelį, nes...",
    "meaning": "I would suggest a hybrid model because...",
    "context": "Siūlyčiau mišrų modelį, nes...",
    "source": "strategy"
   },
   {
    "text": "Šis prieštaravimas pagrįstas, tačiau...",
    "meaning": "This objection is reasonable; however...",
    "context": "Šis prieštaravimas pagrįstas, tačiau...",
    "source": "strategy"
   },
   {
    "text": "Rezultatus vertinčiau pagal...",
    "meaning": "I would evaluate the results using...",
    "context": "Rezultatus vertinčiau pagal...",
    "source": "strategy"
   }
  ],
  "B2-workplace": [
   {
    "text": "Įmonės vadovė siūlo, kad visi darbuotojai tris dienas per savaitę dirbtų biure.",
    "meaning": "The company director proposes that all employees work in the office three days per week.",
    "context": "Įmonės vadovė siūlo, kad visi darbuotojai tris dienas per savaitę dirbtų biure.",
    "source": "reading"
   },
   {
    "text": "Jos nuomone, taip būtų lengviau perduoti žinias naujiems kolegoms.",
    "meaning": "In her view, that would make it easier to pass knowledge to new colleagues.",
    "context": "Jos nuomone, taip būtų lengviau perduoti žinias naujiems kolegoms.",
    "source": "reading"
   },
   {
    "text": "Darbuotojų grupė sutinka, kad bendras laikas svarbus, tačiau abejoja, ar vienoda taisyklė tinka visoms užduotims.",
    "meaning": "The employee group agrees that shared time matters, but doubts whether one rule suits every task.",
    "context": "Darbuotojų grupė sutinka, kad bendras laikas svarbus, tačiau abejoja, ar vienoda taisyklė tinka visoms užduotims.",
    "source": "reading"
   },
   {
    "text": "Analizei ir tekstų rengimui kartais reikia ilgesnio nepertraukiamo darbo, o susitikimus galima sutelkti į sutartas dienas.",
    "meaning": "Analysis and drafting sometimes require longer uninterrupted work, while meetings can be concentrated on agreed days.",
    "context": "Analizei ir tekstų rengimui kartais reikia ilgesnio nepertraukiamo darbo, o susitikimus galima sutelkti į sutartas dienas.",
    "source": "reading"
   },
   {
    "text": "Grupė siūlo dviejų mėnesių bandymą: dvi bendras dienas biure ir vieną papildomą dieną pagal komandos poreikį.",
    "meaning": "The group proposes a two-month trial: two common office days and one additional day according to team need.",
    "context": "Grupė siūlo dviejų mėnesių bandymą: dvi bendras dienas biure ir vieną papildomą dieną pagal komandos poreikį.",
    "source": "reading"
   },
   {
    "text": "Ji taip pat siūlo vertinti atliktų darbų kokybę, vėlavimus ir naujų kolegų gaunamą pagalbą.",
    "meaning": "It also proposes evaluating work quality, delays and the support received by new colleagues.",
    "context": "Ji taip pat siūlo vertinti atliktų darbų kokybę, vėlavimus ir naujų kolegų gaunamą pagalbą.",
    "source": "reading"
   },
   {
    "text": "Prieštaravimas dėl nevienodų sąlygų pagrįstas: skirtingas grafikas gali atrodyti nesąžiningas.",
    "meaning": "The objection about unequal conditions is justified: different schedules can appear unfair.",
    "context": "Prieštaravimas dėl nevienodų sąlygų pagrįstas: skirtingas grafikas gali atrodyti nesąžiningas.",
    "source": "reading"
   },
   {
    "text": "Todėl išimtys turėtų būti aiškiai siejamos su darbo pobūdžiu, o ne su darbuotojo asmeniniais ryšiais.",
    "meaning": "Therefore exceptions should be clearly tied to the nature of the work, not employees’ personal connections.",
    "context": "Todėl išimtys turėtų būti aiškiai siejamos su darbo pobūdžiu, o ne su darbuotojo asmeniniais ryšiais.",
    "source": "reading"
   },
   {
    "text": "Norėčiau pasiūlyti kompromisą dėl darbo grafiko.",
    "meaning": "I would like to propose a compromise about the work schedule.",
    "context": "Norėčiau pasiūlyti kompromisą dėl darbo grafiko.",
    "source": "listen"
   },
   {
    "text": "Dvi bendros dienos suteiktų pakankamai laiko daugumai susitikimų, bet naujiems darbuotojams pirmą mėnesį reikėtų daugiau pagalbos vietoje.",
    "meaning": "Two common days would provide enough time for most meetings, but new staff would need more on-site help during the first month.",
    "context": "Dvi bendros dienos suteiktų pakankamai laiko daugumai susitikimų, bet naujiems darbuotojams pirmą mėnesį reikėtų daugiau pagalbos vietoje.",
    "source": "listen"
   },
   {
    "text": "Siūlau jiems ir jų mentoriams sutarti dėl trečios dienos.",
    "meaning": "I suggest that they and their mentors agree on a third day.",
    "context": "Siūlau jiems ir jų mentoriams sutarti dėl trečios dienos.",
    "source": "listen"
   },
   {
    "text": "Tai nebūtų nuolatinė taisyklė visai komandai.",
    "meaning": "That would not be a permanent rule for the whole team.",
    "context": "Tai nebūtų nuolatinė taisyklė visai komandai.",
    "source": "listen"
   },
   {
    "text": "Suprantu susirūpinimą dėl išimčių, todėl jų priežastis reikėtų užrašyti ir reguliariai peržiūrėti.",
    "meaning": "I understand concern about exceptions, so their reasons should be written down and reviewed regularly.",
    "context": "Suprantu susirūpinimą dėl išimčių, todėl jų priežastis reikėtų užrašyti ir reguliariai peržiūrėti.",
    "source": "listen"
   },
   {
    "text": "Bandymo pabaigoje nepakaktų suskaičiuoti, kiek žmonių atėjo į biurą.",
    "meaning": "At the end of the trial it would not be enough to count how many people came to the office.",
    "context": "Bandymo pabaigoje nepakaktų suskaičiuoti, kiek žmonių atėjo į biurą.",
    "source": "listen"
   },
   {
    "text": "Reikėtų paklausti, ar nauji kolegos laiku gavo atsakymus, ar susitikimai padėjo priimti sprendimus ir ar liko laiko susikaupti.",
    "meaning": "We should ask whether new colleagues received answers on time, whether meetings helped decisions and whether time remained to concentrate.",
    "context": "Reikėtų paklausti, ar nauji kolegos laiku gavo atsakymus, ar susitikimai padėjo priimti sprendimus ir ar liko laiko susikaupti.",
    "source": "listen"
   },
   {
    "text": "Jei pagalbos trūktų, grafiką reikėtų koreguoti, net jeigu dauguma darbuotojų juo būtų patenkinti.",
    "meaning": "If support were insufficient, the schedule should be adjusted even if most staff were satisfied with it.",
    "context": "Jei pagalbos trūktų, grafiką reikėtų koreguoti, net jeigu dauguma darbuotojų juo būtų patenkinti.",
    "source": "listen"
   },
   {
    "text": "Kokį grafiką rekomenduotumėte mūsų komandai?",
    "meaning": "Which schedule would you recommend?",
    "context": "Kokį grafiką rekomenduotumėte mūsų komandai?",
    "source": "partner"
   },
   {
    "text": "Ar tokios išimtys nebus nesąžiningos kitiems?",
    "meaning": "Would those exceptions not be unfair to others?",
    "context": "Ar tokios išimtys nebus nesąžiningos kitiems?",
    "source": "partner"
   },
   {
    "text": "Kada turėtume keisti susitarimą?",
    "meaning": "When should we change the agreement?",
    "context": "Kada turėtume keisti susitarimą?",
    "source": "partner"
   },
   {
    "text": "Siūlomas modelis turėtų būti lankstus.",
    "meaning": "The proposed model should be flexible.",
    "context": "Siūlomas modelis turėtų būti lankstus.",
    "source": "strategy"
   },
   {
    "text": "Galėtume išbandyti šį variantą.",
    "meaning": "We could trial this option.",
    "context": "Galėtume išbandyti šį variantą.",
    "source": "strategy"
   },
   {
    "text": "Esu pasirengęs svarstyti kitą variantą.",
    "meaning": "I am willing to consider another option (male speaker).",
    "context": "Esu pasirengęs svarstyti kitą variantą.",
    "source": "strategy"
   }
  ],
  "B2-media": [
   {
    "text": "Mokomojo naujienų portalo antraštė skelbia: „Pasivaikščiojimai daro žmones laimingesnius.“ Straipsnyje aprašoma savanorių apklausa: žmonės, kurie dažniau vaikščiojo, savo savijautą vertino geriau.",
    "meaning": "A practice news site’s headline says walking makes people happier; the article describes a volunteer survey in which people who walked more often rated their wellbeing more highly.",
    "context": "Mokomojo naujienų portalo antraštė skelbia: „Pasivaikščiojimai daro žmones laimingesnius.“ Straipsnyje aprašoma savanorių apklausa: žmonės, kurie dažniau vaikščiojo, savo savijautą vertino geriau.",
    "source": "reading"
   },
   {
    "text": "Tačiau apklausa neparodė, ar būtent pasivaikščiojimai lėmė geresnę savijautą.",
    "meaning": "However, the survey did not show whether walking itself caused the better wellbeing.",
    "context": "Tačiau apklausa neparodė, ar būtent pasivaikščiojimai lėmė geresnę savijautą.",
    "source": "reading"
   },
   {
    "text": "Galbūt geriau besijaučiantys žmonės dažniau išeina iš namų, o gal abi aplinkybes veikia kiti veiksniai.",
    "meaning": "Perhaps people who feel better go out more often, or other factors influence both circumstances.",
    "context": "Galbūt geriau besijaučiantys žmonės dažniau išeina iš namų, o gal abi aplinkybes veikia kiti veiksniai.",
    "source": "reading"
   },
   {
    "text": "Be to, dalyviai patys pasirinko atsakyti į klausimus.",
    "meaning": "Moreover, participants themselves chose to answer the questions.",
    "context": "Be to, dalyviai patys pasirinko atsakyti į klausimus.",
    "source": "reading"
   },
   {
    "text": "Tai nereiškia, kad apklausa bevertė.",
    "meaning": "This does not mean the survey is worthless.",
    "context": "Tai nereiškia, kad apklausa bevertė.",
    "source": "reading"
   },
   {
    "text": "Ji gali paskatinti aiškiau apibrėžtą tyrimą ir parodyti, kokius klausimus verta užduoti.",
    "meaning": "It can encourage a more clearly defined study and show which questions are worth asking.",
    "context": "Ji gali paskatinti aiškiau apibrėžtą tyrimą ir parodyti, kokius klausimus verta užduoti.",
    "source": "reading"
   },
   {
    "text": "Vis dėlto straipsnyje reikėtų atskirti nustatytą ryšį nuo priežastinio paaiškinimo.",
    "meaning": "Nevertheless, the article should distinguish the observed relationship from a causal explanation.",
    "context": "Vis dėlto straipsnyje reikėtų atskirti nustatytą ryšį nuo priežastinio paaiškinimo.",
    "source": "reading"
   },
   {
    "text": "Tikslesnė antraštė informuotų apie apklausos rezultatą, neapsimesdama, kad galutinis paaiškinimas jau rastas.",
    "meaning": "A more accurate headline would report the survey result without pretending a final explanation had already been found.",
    "context": "Tikslesnė antraštė informuotų apie apklausos rezultatą, neapsimesdama, kad galutinis paaiškinimas jau rastas.",
    "source": "reading"
   },
   {
    "text": "Mūsų redakcija pakeitė antraštę apie pasivaikščiojimus.",
    "meaning": "Our editorial team changed the headline about walking.",
    "context": "Mūsų redakcija pakeitė antraštę apie pasivaikščiojimus.",
    "source": "listen"
   },
   {
    "text": "Naujoji versija pabrėžia, kad kalbame apie apklausą, o ne apie įrodytą poveikį.",
    "meaning": "The new version stresses that we are discussing a survey, not a proven effect.",
    "context": "Naujoji versija pabrėžia, kad kalbame apie apklausą, o ne apie įrodytą poveikį.",
    "source": "listen"
   },
   {
    "text": "Prie straipsnio pridėjome paaiškinimą, kodėl ankstesnė formuluotė buvo per stipri.",
    "meaning": "We added an explanation of why the earlier wording was too strong.",
    "context": "Prie straipsnio pridėjome paaiškinimą, kodėl ankstesnė formuluotė buvo per stipri.",
    "source": "listen"
   },
   {
    "text": "Kai kurie skaitytojai siūlė straipsnį visai pašalinti, tačiau nusprendėme išsaugoti tekstą su aiškiai matomu pataisymu.",
    "meaning": "Some readers proposed removing the article entirely, but we decided to retain it with a clearly visible correction.",
    "context": "Kai kurie skaitytojai siūlė straipsnį visai pašalinti, tačiau nusprendėme išsaugoti tekstą su aiškiai matomu pataisymu.",
    "source": "listen"
   },
   {
    "text": "Taip galima suprasti ir pirminę klaidą, ir jos taisymą.",
    "meaning": "That lets readers understand both the original error and its correction.",
    "context": "Taip galima suprasti ir pirminę klaidą, ir jos taisymą.",
    "source": "listen"
   },
   {
    "text": "Ateityje prieš skelbdami priežastinį teiginį turėsime patikrinti, kokio pobūdžio duomenimis jis remiasi.",
    "meaning": "In future, before publishing a causal claim, we will have to check what kind of evidence supports it.",
    "context": "Ateityje prieš skelbdami priežastinį teiginį turėsime patikrinti, kokio pobūdžio duomenimis jis remiasi.",
    "source": "listen"
   },
   {
    "text": "Tai negarantuos, kad klaidų nebebus, bet suteiks konkretų būdą sumažinti panašių klaidų tikimybę.",
    "meaning": "This will not guarantee that there are no more errors, but will give a specific way to reduce the likelihood of similar errors.",
    "context": "Tai negarantuos, kad klaidų nebebus, bet suteiks konkretų būdą sumažinti panašių klaidų tikimybę.",
    "source": "listen"
   },
   {
    "text": "Ką iš tikrųjų parodė ši apklausa?",
    "meaning": "What did this survey actually show?",
    "context": "Ką iš tikrųjų parodė ši apklausa?",
    "source": "partner"
   },
   {
    "text": "Ar tai reiškia, kad visas straipsnis bevertis?",
    "meaning": "Does that mean the whole article is worthless?",
    "context": "Ar tai reiškia, kad visas straipsnis bevertis?",
    "source": "partner"
   },
   {
    "text": "Kaip turėtume paskelbti pataisymą?",
    "meaning": "How should we publish the correction?",
    "context": "Kaip turėtume paskelbti pataisymą?",
    "source": "partner"
   },
   {
    "text": "Antraštė supaprastina tyrimo išvadą.",
    "meaning": "The headline simplifies the study’s conclusion.",
    "context": "Antraštė supaprastina tyrimo išvadą.",
    "source": "strategy"
   },
   {
    "text": "Reikėtų patikrinti pirminį šaltinį.",
    "meaning": "The original source should be checked.",
    "context": "Reikėtų patikrinti pirminį šaltinį.",
    "source": "strategy"
   },
   {
    "text": "Pataisymas turėtų būti aiškiai matomas.",
    "meaning": "The correction should be clearly visible.",
    "context": "Pataisymas turėtų būti aiškiai matomas.",
    "source": "strategy"
   }
  ],
  "B2-mobility": [
   {
    "text": "Išgalvoto rajono taryba siūlo du mėnesius savaitgaliais riboti automobilių eismą pagrindinėje gatvėje.",
    "meaning": "A fictional district council proposes limiting car traffic on the main street on weekends for two months.",
    "context": "Išgalvoto rajono taryba siūlo du mėnesius savaitgaliais riboti automobilių eismą pagrindinėje gatvėje.",
    "source": "reading"
   },
   {
    "text": "Tikimasi, kad pėstiesiems bus patogiau pasiekti parką ir mažas parduotuves.",
    "meaning": "It is hoped that pedestrians will find it easier to reach the park and small shops.",
    "context": "Tikimasi, kad pėstiesiems bus patogiau pasiekti parką ir mažas parduotuves.",
    "source": "reading"
   },
   {
    "text": "Prekybininkų grupė palaiko patrauklesnės gatvės tikslą, tačiau prašo iš anksto nustatyti prekių pristatymo valandas.",
    "meaning": "A traders’ group supports a more welcoming street but asks for delivery hours to be set in advance.",
    "context": "Prekybininkų grupė palaiko patrauklesnės gatvės tikslą, tačiau prašo iš anksto nustatyti prekių pristatymo valandas.",
    "source": "reading"
   },
   {
    "text": "Kai kurie gyventojai taip pat primena, kad ne visi gali atvykti pėsčiomis ar dviračiu.",
    "meaning": "Some residents also point out that not everyone can arrive on foot or by bicycle.",
    "context": "Kai kurie gyventojai taip pat primena, kad ne visi gali atvykti pėsčiomis ar dviračiu.",
    "source": "reading"
   },
   {
    "text": "Todėl plane reikėtų aiškiai numatyti prieinamą išlaipinimo vietą ir informuoti apie kitus atvykimo būdus.",
    "meaning": "Therefore the plan should clearly provide an accessible drop-off point and information about other ways to arrive.",
    "context": "Todėl plane reikėtų aiškiai numatyti prieinamą išlaipinimo vietą ir informuoti apie kitus atvykimo būdus.",
    "source": "reading"
   },
   {
    "text": "Projekto šalininkai siūlo vertinti lankytojų skaičių, o kritikai prašo atskirai išklausyti tuos, kuriems atvykti tapo sunkiau.",
    "meaning": "Supporters propose evaluating visitor numbers, while critics ask for separate attention to people who find access harder.",
    "context": "Projekto šalininkai siūlo vertinti lankytojų skaičių, o kritikai prašo atskirai išklausyti tuos, kuriems atvykti tapo sunkiau.",
    "source": "reading"
   },
   {
    "text": "Šie kriterijai neprivalo vienas kito paneigti.",
    "meaning": "These criteria do not have to contradict one another.",
    "context": "Šie kriterijai neprivalo vienas kito paneigti.",
    "source": "reading"
   },
   {
    "text": "Bandymo rezultatas būtų naudingesnis, jei parodytų ir bendrą pokytį, ir konkrečias likusias kliūtis.",
    "meaning": "The trial result would be more useful if it showed both the overall change and the particular obstacles that remain.",
    "context": "Bandymo rezultatas būtų naudingesnis, jei parodytų ir bendrą pokytį, ir konkrečias likusias kliūtis.",
    "source": "reading"
   },
   {
    "text": "Manau, kad galime pradėti ribotą bandymą, tačiau jo sąlygas reikia paskelbti prieš pirmą savaitgalį.",
    "meaning": "I think we can begin a limited trial, but its conditions must be published before the first weekend.",
    "context": "Manau, kad galime pradėti ribotą bandymą, tačiau jo sąlygas reikia paskelbti prieš pirmą savaitgalį.",
    "source": "listen"
   },
   {
    "text": "Prekių pristatymui siūlau palikti dvi valandas ryte.",
    "meaning": "I suggest leaving two morning hours for deliveries.",
    "context": "Prekių pristatymui siūlau palikti dvi valandas ryte.",
    "source": "listen"
   },
   {
    "text": "Taip pat būtina nurodyti, kur galima saugiai išleisti keleivį, kuris negali ilgai eiti.",
    "meaning": "It is also essential to specify where a passenger who cannot walk far can be dropped off safely.",
    "context": "Taip pat būtina nurodyti, kur galima saugiai išleisti keleivį, kuris negali ilgai eiti.",
    "source": "listen"
   },
   {
    "text": "Po pirmo mėnesio reikėtų patikrinti, ar šios išimtys iš tiesų veikia.",
    "meaning": "After the first month we should check whether these exceptions actually work.",
    "context": "Po pirmo mėnesio reikėtų patikrinti, ar šios išimtys iš tiesų veikia.",
    "source": "listen"
   },
   {
    "text": "Jei daugėja lankytojų, bet dalis gyventojų nuolat nebegali pasiekti parduotuvių, vien didesnio bendro skaičiaus nepakanka plėtrai pagrįsti.",
    "meaning": "If visitor numbers rise but some residents repeatedly cannot reach the shops, a higher total alone is insufficient to justify expansion.",
    "context": "Jei daugėja lankytojų, bet dalis gyventojų nuolat nebegali pasiekti parduotuvių, vien didesnio bendro skaičiaus nepakanka plėtrai pagrįsti.",
    "source": "listen"
   },
   {
    "text": "Kita vertus, pavienis sunkumas neturėtų automatiškai nutraukti viso bandymo: pirmiausia reikėtų suprasti jo priežastį ir pabandyti ją pašalinti.",
    "meaning": "On the other hand, an isolated difficulty should not automatically end the whole trial: first understand its cause and try to remove it.",
    "context": "Kita vertus, pavienis sunkumas neturėtų automatiškai nutraukti viso bandymo: pirmiausia reikėtų suprasti jo priežastį ir pabandyti ją pašalinti.",
    "source": "listen"
   },
   {
    "text": "Palaikau tokį bandymą, kurį galima koreguoti pagal aiškiai surinktą informaciją.",
    "meaning": "I support a trial that can be adjusted according to clearly collected information.",
    "context": "Palaikau tokį bandymą, kurį galima koreguoti pagal aiškiai surinktą informaciją.",
    "source": "listen"
   },
   {
    "text": "Kokį bandymą siūlytumėte šiai gatvei?",
    "meaning": "What trial would you propose for this street?",
    "context": "Kokį bandymą siūlytumėte šiai gatvei?",
    "source": "partner"
   },
   {
    "text": "Kaip atsižvelgsite į pristatymus ir skirtingas atvykimo galimybes?",
    "meaning": "How will you consider deliveries and different access needs?",
    "context": "Kaip atsižvelgsite į pristatymus ir skirtingas atvykimo galimybes?",
    "source": "partner"
   },
   {
    "text": "Kokie rezultatai leistų bandymą plėsti arba keisti?",
    "meaning": "What results would justify expansion or adjustment?",
    "context": "Kokie rezultatai leistų bandymą plėsti arba keisti?",
    "source": "partner"
   },
   {
    "text": "Siūloma apriboti automobilių eismą.",
    "meaning": "A restriction on car traffic is proposed.",
    "context": "Siūloma apriboti automobilių eismą.",
    "source": "strategy"
   },
   {
    "text": "Palaikau bandymą, bet ne besąlygišką plėtrą.",
    "meaning": "I support a trial, not unconditional expansion.",
    "context": "Palaikau bandymą, bet ne besąlygišką plėtrą.",
    "source": "strategy"
   },
   {
    "text": "Sprendimą peržiūrėtume po bandymo.",
    "meaning": "We would review the decision after the trial.",
    "context": "Sprendimą peržiūrėtume po bandymo.",
    "source": "strategy"
   }
  ]
 },
 "es": {
  "B2": [
   {
    "text": "¿Debería una biblioteca trasladar más servicios a internet?",
    "meaning": "Should a library move more services online?",
    "context": "¿Debería una biblioteca trasladar más servicios a internet?",
    "source": "reading"
   },
   {
    "text": "Por una parte, las herramientas digitales permiten consultar materiales sin depender del horario de apertura.",
    "meaning": "On the one hand, digital tools allow materials to be consulted without depending on opening hours.",
    "context": "Por una parte, las herramientas digitales permiten consultar materiales sin depender del horario de apertura.",
    "source": "reading"
   },
   {
    "text": "Esto beneficia especialmente a quienes trabajan por la tarde o viven lejos del centro.",
    "meaning": "This especially benefits those who work in the afternoon or live far from the centre.",
    "context": "Esto beneficia especialmente a quienes trabajan por la tarde o viven lejos del centro.",
    "source": "reading"
   },
   {
    "text": "Por otra parte, ofrecer un servicio en línea no garantiza que todas las personas puedan usarlo.",
    "meaning": "On the other hand, offering an online service does not guarantee everyone can use it.",
    "context": "Por otra parte, ofrecer un servicio en línea no garantiza que todas las personas puedan usarlo.",
    "source": "reading"
   },
   {
    "text": "Algunas no cuentan con un equipo adecuado o necesitan orientación para manejar una plataforma nueva.",
    "meaning": "Some lack suitable equipment or need guidance to use a new platform.",
    "context": "Algunas no cuentan con un equipo adecuado o necesitan orientación para manejar una plataforma nueva.",
    "source": "reading"
   },
   {
    "text": "Por ejemplo, exigir una aplicación para registrarse podría dificultar el acceso de quienes no tienen un teléfono inteligente.",
    "meaning": "For example, requiring an app to register could make access harder for people without a smartphone.",
    "context": "Por ejemplo, exigir una aplicación para registrarse podría dificultar el acceso de quienes no tienen un teléfono inteligente.",
    "source": "reading"
   },
   {
    "text": "Se podría objetar que mantener varias formas de atención resulta más costoso.",
    "meaning": "One might object that maintaining several forms of service is more expensive.",
    "context": "Se podría objetar que mantener varias formas de atención resulta más costoso.",
    "source": "reading"
   },
   {
    "text": "Aunque la objeción es razonable, no resulta decisiva: el valor de un servicio público no se limita al dinero que permite ahorrar.",
    "meaning": "Although the objection is reasonable, it is not decisive: the value of a public service is not limited to the money it saves.",
    "context": "Aunque la objeción es razonable, no resulta decisiva: el valor de un servicio público no se limita al dinero que permite ahorrar.",
    "source": "reading"
   },
   {
    "text": "También importa que las personas puedan utilizarlo de forma efectiva.",
    "meaning": "It also matters that people can use it effectively.",
    "context": "También importa que las personas puedan utilizarlo de forma efectiva.",
    "source": "reading"
   },
   {
    "text": "Por eso propondría un modelo más flexible.",
    "meaning": "For that reason I would propose a more flexible model.",
    "context": "Por eso propondría un modelo más flexible.",
    "source": "reading"
   },
   {
    "text": "Los servicios digitales deberían complementar la atención presencial, no sustituirla por completo.",
    "meaning": "Digital services should complement in-person service, not replace it completely.",
    "context": "Los servicios digitales deberían complementar la atención presencial, no sustituirla por completo.",
    "source": "reading"
   },
   {
    "text": "Antes de tomar una decisión, convendría probar el sistema y escuchar a distintos grupos de usuarios.",
    "meaning": "Before making a decision, it would be advisable to test the system and listen to different groups of users.",
    "context": "Antes de tomar una decisión, convendría probar el sistema y escuchar a distintos grupos de usuarios.",
    "source": "reading"
   },
   {
    "text": "Así se podría aprovechar la tecnología sin convertirla en una nueva barrera.",
    "meaning": "That way technology could be used without turning it into a new barrier.",
    "context": "Así se podría aprovechar la tecnología sin convertirla en una nueva barrera.",
    "source": "reading"
   },
   {
    "text": "La propuesta de trasladar todo el registro de la biblioteca a internet resulta atractiva: el sistema estaría disponible fuera del horario de atención y el personal tendría más tiempo para consultas complejas.",
    "meaning": "Moving all library registration online looks attractive: the system would be available outside service hours, giving staff more time for complex enquiries.",
    "context": "La propuesta de trasladar todo el registro de la biblioteca a internet resulta atractiva: el sistema estaría disponible fuera del horario de atención y el personal tendría más tiempo para consultas complejas.",
    "source": "listen"
   },
   {
    "text": "Sin embargo, debemos distinguir entre un trámite más rápido y un servicio accesible para todos.",
    "meaning": "However, we must distinguish a faster procedure from a service accessible to everyone.",
    "context": "Sin embargo, debemos distinguir entre un trámite más rápido y un servicio accesible para todos.",
    "source": "listen"
   },
   {
    "text": "Una persona puede tener teléfono y aun así no saber completar el formulario.",
    "meaning": "Someone may have a phone and still not know how to complete the form.",
    "context": "Una persona puede tener teléfono y aun así no saber completar el formulario.",
    "source": "listen"
   },
   {
    "text": "Por otra parte, tampoco sería justo suponer que cada lector necesita hablar con alguien.",
    "meaning": "On the other hand, it would not be fair to suppose every reader needs to speak to someone.",
    "context": "Por otra parte, tampoco sería justo suponer que cada lector necesita hablar con alguien.",
    "source": "listen"
   },
   {
    "text": "Algunos prefieren resolver solos los trámites sencillos.",
    "meaning": "Some prefer to deal with simple procedures on their own.",
    "context": "Algunos prefieren resolver solos los trámites sencillos.",
    "source": "listen"
   },
   {
    "text": "Por eso apoyo una prueba de un modelo híbrido: registro digital junto con ayuda telefónica y presencial.",
    "meaning": "That is why I support a trial hybrid model: digital registration with telephone and in-person help.",
    "context": "Por eso apoyo una prueba de un modelo híbrido: registro digital junto con ayuda telefónica y presencial.",
    "source": "listen"
   },
   {
    "text": "La objeción sobre el costo es razonable.",
    "meaning": "The objection about cost is reasonable.",
    "context": "La objeción sobre el costo es razonable.",
    "source": "listen"
   },
   {
    "text": "Pero también habría que contar el costo de los contactos repetidos cuando alguien no recibe ayuda a la primera.",
    "meaning": "But we should also count the cost of repeated contacts when someone does not get help the first time.",
    "context": "Pero también habría que contar el costo de los contactos repetidos cuando alguien no recibe ayuda a la primera.",
    "source": "listen"
   },
   {
    "text": "Propongo evaluar durante tres meses no solo la espera media, sino también los registros abandonados.",
    "meaning": "I propose evaluating for three months not only average waiting time but also abandoned registrations.",
    "context": "Propongo evaluar durante tres meses no solo la espera media, sino también los registros abandonados.",
    "source": "listen"
   },
   {
    "text": "Después de la prueba podríamos decidir qué apoyo hace falta realmente.",
    "meaning": "After the trial we could decide what support is really needed.",
    "context": "Después de la prueba podríamos decidir qué apoyo hace falta realmente.",
    "source": "listen"
   },
   {
    "text": "¿Qué modelo de registro propone y por qué?",
    "meaning": "Which registration model do you propose, and why?",
    "context": "¿Qué modelo de registro propone y por qué?",
    "source": "partner"
   },
   {
    "text": "¿Pero no será demasiado caro mantener varios canales?",
    "meaning": "But will maintaining several channels not be too expensive?",
    "context": "¿Pero no será demasiado caro mantener varios canales?",
    "source": "partner"
   },
   {
    "text": "¿Cómo sabremos si la propuesta funciona?",
    "meaning": "How will we know whether the proposal works?",
    "context": "¿Cómo sabremos si la propuesta funciona?",
    "source": "partner"
   },
   {
    "text": "Propondría un modelo híbrido porque...",
    "meaning": "I would suggest a hybrid model because...",
    "context": "Propondría un modelo híbrido porque...",
    "source": "strategy"
   },
   {
    "text": "La objeción es razonable; sin embargo...",
    "meaning": "The objection is reasonable; however...",
    "context": "La objeción es razonable; sin embargo...",
    "source": "strategy"
   },
   {
    "text": "Evaluaría los resultados según...",
    "meaning": "I would evaluate the results using...",
    "context": "Evaluaría los resultados según...",
    "source": "strategy"
   }
  ],
  "B2-workplace": [
   {
    "text": "La directora propone que todo el personal trabaje en la oficina tres días por semana.",
    "meaning": "The director proposes that all staff work in the office three days a week.",
    "context": "La directora propone que todo el personal trabaje en la oficina tres días por semana.",
    "source": "reading"
   },
   {
    "text": "Considera que así sería más fácil transmitir conocimientos a los nuevos compañeros.",
    "meaning": "She considers that this would make it easier to pass knowledge to new colleagues.",
    "context": "Considera que así sería más fácil transmitir conocimientos a los nuevos compañeros.",
    "source": "reading"
   },
   {
    "text": "Un grupo de empleados acepta la importancia del tiempo compartido, pero duda de que una regla idéntica convenga a todas las tareas.",
    "meaning": "A group of employees accepts the importance of shared time but doubts that an identical rule suits every task.",
    "context": "Un grupo de empleados acepta la importancia del tiempo compartido, pero duda de que una regla idéntica convenga a todas las tareas.",
    "source": "reading"
   },
   {
    "text": "El análisis y la redacción a veces necesitan periodos de concentración, mientras que las reuniones pueden agruparse en días acordados.",
    "meaning": "Analysis and writing sometimes require periods of concentration, whereas meetings can be grouped on agreed days.",
    "context": "El análisis y la redacción a veces necesitan periodos de concentración, mientras que las reuniones pueden agruparse en días acordados.",
    "source": "reading"
   },
   {
    "text": "El grupo propone una prueba de dos meses: dos días comunes en la oficina y otro según las necesidades del equipo.",
    "meaning": "The group proposes a two-month trial: two shared office days and another according to team needs.",
    "context": "El grupo propone una prueba de dos meses: dos días comunes en la oficina y otro según las necesidades del equipo.",
    "source": "reading"
   },
   {
    "text": "También pide evaluar la calidad del trabajo, los retrasos y el apoyo que reciben los nuevos compañeros.",
    "meaning": "It also asks for evaluation of work quality, delays and the support new colleagues receive.",
    "context": "También pide evaluar la calidad del trabajo, los retrasos y el apoyo que reciben los nuevos compañeros.",
    "source": "reading"
   },
   {
    "text": "La objeción sobre las condiciones desiguales es razonable: distintos horarios pueden parecer injustos.",
    "meaning": "The objection about unequal conditions is reasonable: different schedules can seem unfair.",
    "context": "La objeción sobre las condiciones desiguales es razonable: distintos horarios pueden parecer injustos.",
    "source": "reading"
   },
   {
    "text": "Por eso, las excepciones deberían depender del tipo de trabajo, no de las relaciones personales de cada empleado.",
    "meaning": "That is why exceptions should depend on the kind of work, not employees’ personal relationships.",
    "context": "Por eso, las excepciones deberían depender del tipo de trabajo, no de las relaciones personales de cada empleado.",
    "source": "reading"
   },
   {
    "text": "Quisiera proponer un acuerdo sobre los horarios.",
    "meaning": "I would like to propose an agreement about schedules.",
    "context": "Quisiera proponer un acuerdo sobre los horarios.",
    "source": "listen"
   },
   {
    "text": "Dos días comunes darían tiempo para la mayoría de las reuniones, pero el personal nuevo podría necesitar más apoyo presencial durante el primer mes.",
    "meaning": "Two common days would provide time for most meetings, but new staff might need more in-person support during the first month.",
    "context": "Dos días comunes darían tiempo para la mayoría de las reuniones, pero el personal nuevo podría necesitar más apoyo presencial durante el primer mes.",
    "source": "listen"
   },
   {
    "text": "Sugiero que cada persona nueva acuerde un tercer día con su mentor.",
    "meaning": "I suggest that each new person agree on a third day with their mentor.",
    "context": "Sugiero que cada persona nueva acuerde un tercer día con su mentor.",
    "source": "listen"
   },
   {
    "text": "No sería una regla permanente para todo el equipo.",
    "meaning": "It would not be a permanent rule for the whole team.",
    "context": "No sería una regla permanente para todo el equipo.",
    "source": "listen"
   },
   {
    "text": "Entiendo la preocupación por las excepciones; sus motivos deberían quedar por escrito y revisarse regularmente.",
    "meaning": "I understand concern about exceptions; their reasons should be recorded and reviewed regularly.",
    "context": "Entiendo la preocupación por las excepciones; sus motivos deberían quedar por escrito y revisarse regularmente.",
    "source": "listen"
   },
   {
    "text": "Al terminar la prueba no bastaría contar cuántas personas asistieron.",
    "meaning": "At the end of the trial it would not be enough to count how many people attended.",
    "context": "Al terminar la prueba no bastaría contar cuántas personas asistieron.",
    "source": "listen"
   },
   {
    "text": "Habría que preguntar si los nuevos compañeros recibieron respuestas a tiempo, si las reuniones permitieron tomar decisiones y si quedó tiempo para concentrarse.",
    "meaning": "We should ask whether new colleagues received timely answers, whether meetings enabled decisions and whether time remained for concentration.",
    "context": "Habría que preguntar si los nuevos compañeros recibieron respuestas a tiempo, si las reuniones permitieron tomar decisiones y si quedó tiempo para concentrarse.",
    "source": "listen"
   },
   {
    "text": "Si faltara apoyo, habría que ajustar el horario aunque la mayoría estuviera satisfecha.",
    "meaning": "If support were lacking, the schedule should be adjusted even if the majority were satisfied.",
    "context": "Si faltara apoyo, habría que ajustar el horario aunque la mayoría estuviera satisfecha.",
    "source": "listen"
   },
   {
    "text": "¿Qué horario recomendaría para nuestro equipo?",
    "meaning": "Which schedule would you recommend?",
    "context": "¿Qué horario recomendaría para nuestro equipo?",
    "source": "partner"
   },
   {
    "text": "¿No serían injustas esas excepciones para los demás?",
    "meaning": "Would those exceptions not be unfair to others?",
    "context": "¿No serían injustas esas excepciones para los demás?",
    "source": "partner"
   },
   {
    "text": "¿Cuándo deberíamos cambiar el acuerdo?",
    "meaning": "When should we change the agreement?",
    "context": "¿Cuándo deberíamos cambiar el acuerdo?",
    "source": "partner"
   },
   {
    "text": "El modelo propuesto debería ser flexible.",
    "meaning": "The proposed model should be flexible.",
    "context": "El modelo propuesto debería ser flexible.",
    "source": "strategy"
   },
   {
    "text": "Podríamos poner a prueba esta opción.",
    "meaning": "We could trial this option.",
    "context": "Podríamos poner a prueba esta opción.",
    "source": "strategy"
   },
   {
    "text": "Estoy dispuesto a considerar otra opción.",
    "meaning": "I am willing to consider another option (male speaker).",
    "context": "Estoy dispuesto a considerar otra opción.",
    "source": "strategy"
   }
  ],
  "B2-media": [
   {
    "text": "El titular de un portal de noticias ficticio anuncia: «Caminar hace más feliz a la gente».",
    "meaning": "A fictional news portal headline announces that walking makes people happier.",
    "context": "El titular de un portal de noticias ficticio anuncia: «Caminar hace más feliz a la gente».",
    "source": "reading"
   },
   {
    "text": "El artículo describe una encuesta voluntaria: quienes caminaban más a menudo valoraban mejor su bienestar.",
    "meaning": "The article describes a voluntary survey: those who walked more often rated their wellbeing more highly.",
    "context": "El artículo describe una encuesta voluntaria: quienes caminaban más a menudo valoraban mejor su bienestar.",
    "source": "reading"
   },
   {
    "text": "Sin embargo, la encuesta no mostró que caminar causara esa diferencia.",
    "meaning": "However, the survey did not show that walking caused that difference.",
    "context": "Sin embargo, la encuesta no mostró que caminar causara esa diferencia.",
    "source": "reading"
   },
   {
    "text": "Quizá las personas que ya se sienten mejor salen más de casa, o quizá otros factores influyen en ambas cosas.",
    "meaning": "Perhaps people who already feel better go out more, or other factors affect both things.",
    "context": "Quizá las personas que ya se sienten mejor salen más de casa, o quizá otros factores influyen en ambas cosas.",
    "source": "reading"
   },
   {
    "text": "Además, los participantes decidieron por su cuenta responder.",
    "meaning": "Moreover, the participants chose for themselves to respond.",
    "context": "Además, los participantes decidieron por su cuenta responder.",
    "source": "reading"
   },
   {
    "text": "Eso no vuelve inútil la encuesta.",
    "meaning": "That does not make the survey useless.",
    "context": "Eso no vuelve inútil la encuesta.",
    "source": "reading"
   },
   {
    "text": "Puede sugerir una investigación más precisa e indicar qué preguntas conviene formular.",
    "meaning": "It can suggest a more precise investigation and indicate which questions should be asked.",
    "context": "Puede sugerir una investigación más precisa e indicar qué preguntas conviene formular.",
    "source": "reading"
   },
   {
    "text": "Aun así, el artículo debería distinguir la relación observada de una explicación causal.",
    "meaning": "Even so, the article should distinguish the observed relationship from a causal explanation.",
    "context": "Aun así, el artículo debería distinguir la relación observada de una explicación causal.",
    "source": "reading"
   },
   {
    "text": "Un titular más exacto comunicaría el resultado de la encuesta sin fingir que ya existe una explicación definitiva.",
    "meaning": "A more accurate headline would communicate the survey result without pretending there is already a definitive explanation.",
    "context": "Un titular más exacto comunicaría el resultado de la encuesta sin fingir que ya existe una explicación definitiva.",
    "source": "reading"
   },
   {
    "text": "La redacción cambió el titular sobre las caminatas.",
    "meaning": "The editorial team changed the headline about walking.",
    "context": "La redacción cambió el titular sobre las caminatas.",
    "source": "listen"
   },
   {
    "text": "La nueva versión deja claro que hablamos de una encuesta, no de un efecto demostrado.",
    "meaning": "The new version makes clear that we are talking about a survey, not a demonstrated effect.",
    "context": "La nueva versión deja claro que hablamos de una encuesta, no de un efecto demostrado.",
    "source": "listen"
   },
   {
    "text": "Añadimos una explicación de por qué la formulación anterior era demasiado fuerte.",
    "meaning": "We added an explanation of why the earlier wording was too strong.",
    "context": "Añadimos una explicación de por qué la formulación anterior era demasiado fuerte.",
    "source": "listen"
   },
   {
    "text": "Algunos lectores propusieron eliminar el artículo, pero decidimos conservarlo con una corrección visible.",
    "meaning": "Some readers proposed deleting the article, but we decided to keep it with a visible correction.",
    "context": "Algunos lectores propusieron eliminar el artículo, pero decidimos conservarlo con una corrección visible.",
    "source": "listen"
   },
   {
    "text": "Así se puede entender tanto el error original como su rectificación.",
    "meaning": "This makes both the original error and its correction understandable.",
    "context": "Así se puede entender tanto el error original como su rectificación.",
    "source": "listen"
   },
   {
    "text": "En adelante, antes de publicar una afirmación causal, tendremos que comprobar qué tipo de datos la respalda.",
    "meaning": "In future, before publishing a causal claim, we will have to check what kind of evidence supports it.",
    "context": "En adelante, antes de publicar una afirmación causal, tendremos que comprobar qué tipo de datos la respalda.",
    "source": "listen"
   },
   {
    "text": "Eso no garantizará que nunca cometamos errores, pero ofrece una medida concreta para reducir la posibilidad de repetirlos.",
    "meaning": "That will not guarantee we never make mistakes, but it offers a concrete measure to reduce the chance of repeating them.",
    "context": "Eso no garantizará que nunca cometamos errores, pero ofrece una medida concreta para reducir la posibilidad de repetirlos.",
    "source": "listen"
   },
   {
    "text": "¿Qué mostró realmente esta encuesta?",
    "meaning": "What did this survey actually show?",
    "context": "¿Qué mostró realmente esta encuesta?",
    "source": "partner"
   },
   {
    "text": "¿Significa eso que todo el artículo carece de valor?",
    "meaning": "Does that mean the whole article is worthless?",
    "context": "¿Significa eso que todo el artículo carece de valor?",
    "source": "partner"
   },
   {
    "text": "¿Cómo deberíamos publicar la corrección?",
    "meaning": "How should we publish the correction?",
    "context": "¿Cómo deberíamos publicar la corrección?",
    "source": "partner"
   },
   {
    "text": "El titular simplifica la conclusión del estudio.",
    "meaning": "The headline simplifies the study’s conclusion.",
    "context": "El titular simplifica la conclusión del estudio.",
    "source": "strategy"
   },
   {
    "text": "Habría que consultar la fuente original.",
    "meaning": "The original source should be checked.",
    "context": "Habría que consultar la fuente original.",
    "source": "strategy"
   },
   {
    "text": "La corrección debería ser claramente visible.",
    "meaning": "The correction should be clearly visible.",
    "context": "La corrección debería ser claramente visible.",
    "source": "strategy"
   }
  ],
  "B2-mobility": [
   {
    "text": "El consejo de un barrio ficticio propone restringir el tránsito en la calle principal durante los fines de semana de dos meses.",
    "meaning": "A fictional neighbourhood council proposes restricting traffic on the main street on weekends for two months.",
    "context": "El consejo de un barrio ficticio propone restringir el tránsito en la calle principal durante los fines de semana de dos meses.",
    "source": "reading"
   },
   {
    "text": "Se espera facilitar el acceso peatonal al parque y a las tiendas pequeñas.",
    "meaning": "The aim is to make pedestrian access to the park and small shops easier.",
    "context": "Se espera facilitar el acceso peatonal al parque y a las tiendas pequeñas.",
    "source": "reading"
   },
   {
    "text": "Un grupo de comerciantes apoya la idea de una calle más agradable, pero pide fijar con anticipación horarios para las entregas.",
    "meaning": "A traders’ group supports a more pleasant street but asks for delivery hours to be fixed in advance.",
    "context": "Un grupo de comerciantes apoya la idea de una calle más agradable, pero pide fijar con anticipación horarios para las entregas.",
    "source": "reading"
   },
   {
    "text": "Algunos vecinos recuerdan que no todos pueden llegar caminando o en bicicleta.",
    "meaning": "Some neighbours point out that not everyone can arrive on foot or by bicycle.",
    "context": "Algunos vecinos recuerdan que no todos pueden llegar caminando o en bicicleta.",
    "source": "reading"
   },
   {
    "text": "Por eso el plan debería prever una zona accesible para dejar pasajeros e informar sobre otras formas de llegar.",
    "meaning": "That is why the plan should provide an accessible passenger drop-off area and information about other ways to arrive.",
    "context": "Por eso el plan debería prever una zona accesible para dejar pasajeros e informar sobre otras formas de llegar.",
    "source": "reading"
   },
   {
    "text": "Los defensores proponen medir el número de visitantes; los críticos piden escuchar por separado a quienes encuentran nuevas dificultades.",
    "meaning": "Supporters propose measuring visitor numbers; critics ask to hear separately from those facing new difficulties.",
    "context": "Los defensores proponen medir el número de visitantes; los críticos piden escuchar por separado a quienes encuentran nuevas dificultades.",
    "source": "reading"
   },
   {
    "text": "Esos criterios no tienen por qué excluirse.",
    "meaning": "Those criteria do not have to exclude one another.",
    "context": "Esos criterios no tienen por qué excluirse.",
    "source": "reading"
   },
   {
    "text": "La prueba sería más útil si mostrara tanto el cambio general como las barreras concretas que persisten.",
    "meaning": "The trial would be more useful if it showed both the general change and the specific barriers that persist.",
    "context": "La prueba sería más útil si mostrara tanto el cambio general como las barreras concretas que persisten.",
    "source": "reading"
   },
   {
    "text": "Creo que podemos iniciar una prueba limitada, pero debemos publicar las condiciones antes del primer fin de semana.",
    "meaning": "I think we can begin a limited trial, but we must publish the conditions before the first weekend.",
    "context": "Creo que podemos iniciar una prueba limitada, pero debemos publicar las condiciones antes del primer fin de semana.",
    "source": "listen"
   },
   {
    "text": "Propongo reservar dos horas por la mañana para las entregas.",
    "meaning": "I propose reserving two morning hours for deliveries.",
    "context": "Propongo reservar dos horas por la mañana para las entregas.",
    "source": "listen"
   },
   {
    "text": "También hace falta indicar dónde puede bajar con seguridad una persona que no puede caminar mucho.",
    "meaning": "We also need to indicate where someone who cannot walk far can get out safely.",
    "context": "También hace falta indicar dónde puede bajar con seguridad una persona que no puede caminar mucho.",
    "source": "listen"
   },
   {
    "text": "Después del primer mes habría que comprobar si esas excepciones funcionan de verdad.",
    "meaning": "After the first month, we should check whether those exceptions really work.",
    "context": "Después del primer mes habría que comprobar si esas excepciones funcionan de verdad.",
    "source": "listen"
   },
   {
    "text": "Si aumentan las visitas, pero algunos vecinos siguen sin poder llegar a las tiendas, el total no basta para justificar la ampliación.",
    "meaning": "If visits increase but some residents still cannot reach the shops, the total is not enough to justify expansion.",
    "context": "Si aumentan las visitas, pero algunos vecinos siguen sin poder llegar a las tiendas, el total no basta para justificar la ampliación.",
    "source": "listen"
   },
   {
    "text": "Por otra parte, una dificultad aislada tampoco debería cancelar automáticamente toda la prueba: primero hay que comprenderla e intentar resolverla.",
    "meaning": "On the other hand, an isolated difficulty should not automatically cancel the entire trial: first understand it and try to resolve it.",
    "context": "Por otra parte, una dificultad aislada tampoco debería cancelar automáticamente toda la prueba: primero hay que comprenderla e intentar resolverla.",
    "source": "listen"
   },
   {
    "text": "Apoyo una prueba que pueda ajustarse según información recogida de forma clara.",
    "meaning": "I support a trial that can be adjusted according to clearly gathered information.",
    "context": "Apoyo una prueba que pueda ajustarse según información recogida de forma clara.",
    "source": "listen"
   },
   {
    "text": "¿Qué prueba propondría para esta calle?",
    "meaning": "What trial would you propose for this street?",
    "context": "¿Qué prueba propondría para esta calle?",
    "source": "partner"
   },
   {
    "text": "¿Cómo tendrá en cuenta las entregas y las distintas formas de llegar?",
    "meaning": "How will you consider deliveries and different access needs?",
    "context": "¿Cómo tendrá en cuenta las entregas y las distintas formas de llegar?",
    "source": "partner"
   },
   {
    "text": "¿Qué resultados justificarían ampliar o modificar la prueba?",
    "meaning": "What results would justify expansion or adjustment?",
    "context": "¿Qué resultados justificarían ampliar o modificar la prueba?",
    "source": "partner"
   },
   {
    "text": "Se propone limitar el tránsito de automóviles.",
    "meaning": "A restriction on car traffic is proposed.",
    "context": "Se propone limitar el tránsito de automóviles.",
    "source": "strategy"
   },
   {
    "text": "Apoyo una prueba, no una ampliación sin condiciones.",
    "meaning": "I support a trial, not unconditional expansion.",
    "context": "Apoyo una prueba, no una ampliación sin condiciones.",
    "source": "strategy"
   },
   {
    "text": "Revisaríamos la decisión después de la prueba.",
    "meaning": "We would review the decision after the trial.",
    "context": "Revisaríamos la decisión después de la prueba.",
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
