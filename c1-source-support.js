/* Explicit source-expression teaching. Full expressions are not word/lemma counts. */
(()=>{'use strict';
const base=window.WordamiSourceSupport,course=window.WordamiSkillsContent,vocab=window.WordamiVocabularyContent;
if(!base||!course||!vocab)return;
const authored={
 "lt": {
  "C1": [
   {
    "text": "Abiejuose tekstuose skaitmeninė registracija vertinama kaip galima paslaugų gerinimo priemonė, tačiau jų prielaidos skiriasi.",
    "meaning": "Both texts assess digital registration as a possible way to improve services, but their assumptions differ.",
    "context": "Abiejuose tekstuose skaitmeninė registracija vertinama kaip galima paslaugų gerinimo priemonė, tačiau jų prielaidos skiriasi.",
    "source": "reading"
   },
   {
    "text": "Paslaugų komanda daugiausia dėmesio skiria darbo organizavimui, o skaitytojų grupė – skirtingoms naudojimosi paslauga sąlygoms.",
    "meaning": "The service team focuses on organising work, while the readers’ group focuses on differing conditions for using the service.",
    "context": "Paslaugų komanda daugiausia dėmesio skiria darbo organizavimui, o skaitytojų grupė – skirtingoms naudojimosi paslauga sąlygoms.",
    "source": "reading"
   },
   {
    "text": "Šios perspektyvos nebūtinai prieštarauja viena kitai.",
    "meaning": "These perspectives do not necessarily contradict one another.",
    "context": "Šios perspektyvos nebūtinai prieštarauja viena kitai.",
    "source": "reading"
   },
   {
    "text": "A šaltinyje pateikiamas stebėjimas, kad per trumpą bandymą darbuotojai galėjo daugiau laiko skirti sudėtingoms užklausoms.",
    "meaning": "Source A observes that during a short trial staff could devote more time to complex enquiries.",
    "context": "A šaltinyje pateikiamas stebėjimas, kad per trumpą bandymą darbuotojai galėjo daugiau laiko skirti sudėtingoms užklausoms.",
    "source": "reading"
   },
   {
    "text": "Tai yra argumentas toliau tirti sistemos naudą, bet savaime neįrodo, kad vien skaitmeninė registracija būtų tinkama visiems.",
    "meaning": "This supports further investigation of the system’s benefits, but does not by itself prove digital-only registration would suit everyone.",
    "context": "Tai yra argumentas toliau tirti sistemos naudą, bet savaime neįrodo, kad vien skaitmeninė registracija būtų tinkama visiems.",
    "source": "reading"
   },
   {
    "text": "Bandymo apimtis ribota, o nedalyvavusių skaitytojų patirtis lieka neaiški.",
    "meaning": "The trial’s scope is limited, and the experience of readers who did not participate remains unclear.",
    "context": "Bandymo apimtis ribota, o nedalyvavusių skaitytojų patirtis lieka neaiški.",
    "source": "reading"
   },
   {
    "text": "B šaltinis šią spragą papildo, atkreipdamas dėmesį į pagalbos poreikį.",
    "meaning": "Source B addresses this gap by drawing attention to the need for assistance.",
    "context": "B šaltinis šią spragą papildo, atkreipdamas dėmesį į pagalbos poreikį.",
    "source": "reading"
   },
   {
    "text": "Vis dėlto būtų netikslu teigti, kad ši grupė apskritai nepritaria naujovėms.",
    "meaning": "Nevertheless, it would be inaccurate to claim the group opposes innovation in general.",
    "context": "Vis dėlto būtų netikslu teigti, kad ši grupė apskritai nepritaria naujovėms.",
    "source": "reading"
   },
   {
    "text": "Jos iškelta sąlyga yra pasirinkimo išsaugojimas.",
    "meaning": "Its condition is preserving choice.",
    "context": "Jos iškelta sąlyga yra pasirinkimo išsaugojimas.",
    "source": "reading"
   },
   {
    "text": "Todėl esminis klausimas yra ne vien išlaidos, bet ir prieinamumas.",
    "meaning": "Therefore the central question concerns not only cost but also accessibility.",
    "context": "Todėl esminis klausimas yra ne vien išlaidos, bet ir prieinamumas.",
    "source": "reading"
   },
   {
    "text": "Atsižvelgiant į šias aplinkybes, siūlytina plėsti skaitmeninį būdą kartu išlaikant registraciją bibliotekoje ir telefonu.",
    "meaning": "In view of these circumstances, digital registration should expand while in-library and telephone registration are retained.",
    "context": "Atsižvelgiant į šias aplinkybes, siūlytina plėsti skaitmeninį būdą kartu išlaikant registraciją bibliotekoje ir telefonu.",
    "source": "reading"
   },
   {
    "text": "Tolesnis bandymas turėtų apimti įvairaus amžiaus bei skirtingų skaitmeninių įgūdžių skaitytojus.",
    "meaning": "A further trial should include readers of various ages and digital skill levels.",
    "context": "Tolesnis bandymas turėtų apimti įvairaus amžiaus bei skirtingų skaitmeninių įgūdžių skaitytojus.",
    "source": "reading"
   },
   {
    "text": "Reikėtų vertinti ne tik užklausai skiriamą laiką, bet ir tai, ar žmogus gali savarankiškai užbaigti registraciją.",
    "meaning": "Evaluation should consider not only time per enquiry but whether people can complete registration independently.",
    "context": "Reikėtų vertinti ne tik užklausai skiriamą laiką, bet ir tai, ar žmogus gali savarankiškai užbaigti registraciją.",
    "source": "reading"
   },
   {
    "text": "Sprendimą vertėtų peržiūrėti gavus šią papildomą informaciją.",
    "meaning": "The decision should be reviewed after receiving this additional information.",
    "context": "Sprendimą vertėtų peržiūrėti gavus šią papildomą informaciją.",
    "source": "reading"
   },
   {
    "text": "Norėčiau patikslinti, ką iš tikrųjų leidžia teigti mūsų bandomojo projekto rezultatai.",
    "meaning": "I would like to clarify what our pilot project results actually allow us to claim.",
    "context": "Norėčiau patikslinti, ką iš tikrųjų leidžia teigti mūsų bandomojo projekto rezultatai.",
    "source": "listen"
   },
   {
    "text": "Per keturias savaites vidutinis registracijos laikas sutrumpėjo.",
    "meaning": "Over four weeks the average registration time fell.",
    "context": "Per keturias savaites vidutinis registracijos laikas sutrumpėjo.",
    "source": "listen"
   },
   {
    "text": "Tačiau bandyme daugiausia dalyvavo žmonės, jau mokėję naudotis skaitmeninėmis paslaugomis.",
    "meaning": "However, participants were mainly people who already knew how to use digital services.",
    "context": "Tačiau bandyme daugiausia dalyvavo žmonės, jau mokėję naudotis skaitmeninėmis paslaugomis.",
    "source": "listen"
   },
   {
    "text": "Todėl iš šio stebėjimo negalime daryti išvados, kad naujoji tvarka vienodai naudinga visiems.",
    "meaning": "We therefore cannot conclude from this observation that the new procedure benefits everyone equally.",
    "context": "Todėl iš šio stebėjimo negalime daryti išvados, kad naujoji tvarka vienodai naudinga visiems.",
    "source": "listen"
   },
   {
    "text": "Tai nėra argumentas atsisakyti sistemos.",
    "meaning": "This is not an argument for abandoning the system.",
    "context": "Tai nėra argumentas atsisakyti sistemos.",
    "source": "listen"
   },
   {
    "text": "Veikiau siūlau tiksliau apibrėžti, ką dar turime sužinoti.",
    "meaning": "Rather, I propose defining more precisely what we still need to learn.",
    "context": "Veikiau siūlau tiksliau apibrėžti, ką dar turime sužinoti.",
    "source": "listen"
   },
   {
    "text": "Skaitytojų grupė atkreipė dėmesį į kitą klausimą: ar žmogus, susidūręs su sunkumu, gali greitai gauti tinkamą pagalbą?",
    "meaning": "The readers’ group highlighted another question: can someone facing a difficulty quickly obtain appropriate help?",
    "context": "Skaitytojų grupė atkreipė dėmesį į kitą klausimą: ar žmogus, susidūręs su sunkumu, gali greitai gauti tinkamą pagalbą?",
    "source": "listen"
   },
   {
    "text": "Darbuotojų komanda vertino sutaupytą laiką, o skaitytojai kalbėjo apie galimybę užbaigti procesą.",
    "meaning": "The staff team evaluated time saved, whereas readers discussed being able to finish the process.",
    "context": "Darbuotojų komanda vertino sutaupytą laiką, o skaitytojai kalbėjo apie galimybę užbaigti procesą.",
    "source": "listen"
   },
   {
    "text": "Šios perspektyvos neprivalo viena kitai prieštarauti.",
    "meaning": "These perspectives need not contradict one another.",
    "context": "Šios perspektyvos neprivalo viena kitai prieštarauti.",
    "source": "listen"
   },
   {
    "text": "Galime pripažinti veiklos pagerėjimą ir kartu tirti likusias kliūtis.",
    "meaning": "We can acknowledge an operational improvement while investigating remaining barriers.",
    "context": "Galime pripažinti veiklos pagerėjimą ir kartu tirti likusias kliūtis.",
    "source": "listen"
   },
   {
    "text": "Kitame etape siūlyčiau įtraukti mažiau patyrusius vartotojus, stebėti nebaigtas užklausas ir atskirai vertinti pagalbos poreikį.",
    "meaning": "In the next stage I would propose including less experienced users, tracking unfinished enquiries and evaluating assistance needs separately.",
    "context": "Kitame etape siūlyčiau įtraukti mažiau patyrusius vartotojus, stebėti nebaigtas užklausas ir atskirai vertinti pagalbos poreikį.",
    "source": "listen"
   },
   {
    "text": "Galutinę rekomendaciją turėtume pateikti tik iš anksto sutartais kriterijais įvertinę šiuos papildomus duomenis.",
    "meaning": "We should give a final recommendation only after assessing the additional data against criteria agreed in advance.",
    "context": "Galutinę rekomendaciją turėtume pateikti tik iš anksto sutartais kriterijais įvertinę šiuos papildomus duomenis.",
    "source": "listen"
   },
   {
    "text": "Ar trumpesnis registracijos laikas neįrodo, kad sistemą reikia plėsti?",
    "meaning": "Does a shorter registration time not prove the system should expand?",
    "context": "Ar trumpesnis registracijos laikas neįrodo, kad sistemą reikia plėsti?",
    "source": "partner"
   },
   {
    "text": "Kaip suderintumėte darbuotojų ir skaitytojų vertinimus?",
    "meaning": "How would you reconcile staff and reader evaluations?",
    "context": "Kaip suderintumėte darbuotojų ir skaitytojų vertinimus?",
    "source": "partner"
   },
   {
    "text": "Prašau rekomendaciją pateikti žmogui, kuris nematė ataskaitos.",
    "meaning": "Please give the recommendation to someone who has not seen the report.",
    "context": "Prašau rekomendaciją pateikti žmogui, kuris nematė ataskaitos.",
    "source": "partner"
   },
   {
    "text": "Šis rezultatas leidžia teigti tik tai, kad...",
    "meaning": "This result allows us to say only that...",
    "context": "Šis rezultatas leidžia teigti tik tai, kad...",
    "source": "strategy"
   },
   {
    "text": "Šios perspektyvos papildo viena kitą, nes...",
    "meaning": "These perspectives complement each other because...",
    "context": "Šios perspektyvos papildo viena kitą, nes...",
    "source": "strategy"
   },
   {
    "text": "Paprastai tariant, siūlyčiau...",
    "meaning": "Put simply, I would suggest...",
    "context": "Paprastai tariant, siūlyčiau...",
    "source": "strategy"
   },
   {
    "text": "Per trumpą bandomąjį laikotarpį dalis skaitytojų pasirinko registraciją internetu.",
    "meaning": "During a short trial period, some readers chose online registration.",
    "context": "Per trumpą bandomąjį laikotarpį dalis skaitytojų pasirinko registraciją internetu.",
    "source": "source-0"
   },
   {
    "text": "Darbuotojams reikėjo mažiau laiko paprastoms užklausoms, todėl jie galėjo ilgiau padėti sudėtingesniais klausimais.",
    "meaning": "Staff needed less time for simple enquiries, so they could spend longer helping with complex issues.",
    "context": "Darbuotojams reikėjo mažiau laiko paprastoms užklausoms, todėl jie galėjo ilgiau padėti sudėtingesniais klausimais.",
    "source": "source-0"
   },
   {
    "text": "Komanda siūlo plėsti skaitmeninę registraciją.",
    "meaning": "The team proposes expanding digital registration.",
    "context": "Komanda siūlo plėsti skaitmeninę registraciją.",
    "source": "source-0"
   },
   {
    "text": "Bandymas neapėmė visų bibliotekos lankytojų.",
    "meaning": "The trial did not include all library visitors.",
    "context": "Bandymas neapėmė visų bibliotekos lankytojų.",
    "source": "source-0"
   },
   {
    "text": "Kai kurie skaitytojai naują sistemą įvertino palankiai, tačiau kitiems reikėjo pagalbos.",
    "meaning": "Some readers rated the new system favourably, but others needed assistance.",
    "context": "Kai kurie skaitytojai naują sistemą įvertino palankiai, tačiau kitiems reikėjo pagalbos.",
    "source": "source-1"
   },
   {
    "text": "Grupė prašo išlaikyti registraciją bibliotekoje ir telefonu.",
    "meaning": "The group asks to retain registration in the library and by phone.",
    "context": "Grupė prašo išlaikyti registraciją bibliotekoje ir telefonu.",
    "source": "source-1"
   },
   {
    "text": "Jos nariai sutinka, kad skaitmeninės priemonės gali būti naudingos, jeigu jos nesumažina kitų aptarnavimo galimybių.",
    "meaning": "Its members agree digital tools can be useful if they do not reduce other service options.",
    "context": "Jos nariai sutinka, kad skaitmeninės priemonės gali būti naudingos, jeigu jos nesumažina kitų aptarnavimo galimybių.",
    "source": "source-1"
   }
  ],
  "C1-academic": [
   {
    "text": "Išgalvoto universiteto ataskaitoje aprašoma nauja studentų konsultavimo programa.",
    "meaning": "A fictional university report describes a new student advising programme.",
    "context": "Išgalvoto universiteto ataskaitoje aprašoma nauja studentų konsultavimo programa.",
    "source": "reading"
   },
   {
    "text": "Joje dalyvavę studentai semestro pabaigoje dažniau pateikė darbus laiku negu programoje nedalyvavę studentai.",
    "meaning": "At the end of the semester, participating students submitted work on time more often than non-participants.",
    "context": "Joje dalyvavę studentai semestro pabaigoje dažniau pateikė darbus laiku negu programoje nedalyvavę studentai.",
    "source": "reading"
   },
   {
    "text": "Ataskaitos santraukoje tai pristatoma kaip programos veiksmingumo ženklas.",
    "meaning": "The report summary presents this as a sign of the programme’s effectiveness.",
    "context": "Ataskaitos santraukoje tai pristatoma kaip programos veiksmingumo ženklas.",
    "source": "reading"
   },
   {
    "text": "Toks aiškinimas galimas, tačiau vien pateikto palyginimo jam pagrįsti nepakanka.",
    "meaning": "That interpretation is possible, but the comparison alone is insufficient to support it.",
    "context": "Toks aiškinimas galimas, tačiau vien pateikto palyginimo jam pagrįsti nepakanka.",
    "source": "reading"
   },
   {
    "text": "Studentai patys rinkosi, ar dalyvauti, o jų ankstesni darbo įpročiai nebuvo lyginti.",
    "meaning": "Students chose whether to participate, and their previous work habits were not compared.",
    "context": "Studentai patys rinkosi, ar dalyvauti, o jų ankstesni darbo įpročiai nebuvo lyginti.",
    "source": "reading"
   },
   {
    "text": "Todėl negalima atmesti, kad programą dažniau rinkosi jau labiau motyvuoti studentai.",
    "meaning": "We therefore cannot rule out that already more motivated students chose the programme more often.",
    "context": "Todėl negalima atmesti, kad programą dažniau rinkosi jau labiau motyvuoti studentai.",
    "source": "reading"
   },
   {
    "text": "Kita vertus, ši atrankos problema savaime neįrodo, kad konsultacijos nieko nepakeitė.",
    "meaning": "On the other hand, this selection problem does not itself prove that the advice changed nothing.",
    "context": "Kita vertus, ši atrankos problema savaime neįrodo, kad konsultacijos nieko nepakeitė.",
    "source": "reading"
   },
   {
    "text": "Ji nurodo, kokia abejonė lieka neatsakyta.",
    "meaning": "It identifies which uncertainty remains unresolved.",
    "context": "Ji nurodo, kokia abejonė lieka neatsakyta.",
    "source": "reading"
   },
   {
    "text": "Tikslesniam vertinimui reikėtų palyginti panašią pradinę padėtį turinčias grupes ir stebėti, kaip jų rezultatai keičiasi laikui bėgant.",
    "meaning": "A more precise evaluation would compare groups with similar starting positions and track how their results change over time.",
    "context": "Tikslesniam vertinimui reikėtų palyginti panašią pradinę padėtį turinčias grupes ir stebėti, kaip jų rezultatai keičiasi laikui bėgant.",
    "source": "reading"
   },
   {
    "text": "Praktinis sprendimas taip pat neturi apsiriboti klausimu „plėsti ar nutraukti“.",
    "meaning": "The practical decision also need not be limited to expansion or termination.",
    "context": "Praktinis sprendimas taip pat neturi apsiriboti klausimu „plėsti ar nutraukti“.",
    "source": "reading"
   },
   {
    "text": "Galima tęsti ribotos apimties programą, kartu tikslinant vertinimą ir viešai nurodant išvadų ribas.",
    "meaning": "A limited programme can continue while evaluation improves and the limits of conclusions are publicly stated.",
    "context": "Galima tęsti ribotos apimties programą, kartu tikslinant vertinimą ir viešai nurodant išvadų ribas.",
    "source": "reading"
   },
   {
    "text": "Tokia rekomendacija pripažįsta ir galimą naudą, ir pareigą jos nepateikti kaip jau galutinai nustatyto poveikio.",
    "meaning": "Such a recommendation acknowledges a possible benefit and the duty not to present it as an already definitively established effect.",
    "context": "Tokia rekomendacija pripažįsta ir galimą naudą, ir pareigą jos nepateikti kaip jau galutinai nustatyto poveikio.",
    "source": "reading"
   },
   {
    "text": "Norėčiau pataisyti dvi priešingas mūsų ataskaitos interpretacijas.",
    "meaning": "I would like to correct two opposing interpretations of our report.",
    "context": "Norėčiau pataisyti dvi priešingas mūsų ataskaitos interpretacijas.",
    "source": "listen"
   },
   {
    "text": "Vieni kolegos teigia, kad programa jau įrodė savo veiksmingumą.",
    "meaning": "Some colleagues say the programme has already proved its effectiveness.",
    "context": "Vieni kolegos teigia, kad programa jau įrodė savo veiksmingumą.",
    "source": "listen"
   },
   {
    "text": "Kiti sako, kad dėl savanoriško dalyvavimo visi rezultatai beprasmiški.",
    "meaning": "Others say voluntary participation makes all the results meaningless.",
    "context": "Kiti sako, kad dėl savanoriško dalyvavimo visi rezultatai beprasmiški.",
    "source": "listen"
   },
   {
    "text": "Abi išvados per stiprios.",
    "meaning": "Both conclusions are too strong.",
    "context": "Abi išvados per stiprios.",
    "source": "listen"
   },
   {
    "text": "Matome skirtumą tarp grupių, bet dar nepakankamai suprantame jo kilmę.",
    "meaning": "We see a difference between groups but do not yet understand its origin sufficiently.",
    "context": "Matome skirtumą tarp grupių, bet dar nepakankamai suprantame jo kilmę.",
    "source": "listen"
   },
   {
    "text": "Kitą semestrą siūlome prieš programos pradžią surinkti informaciją apie studentų ankstesnius įpročius ir numatyti palyginimą su panašioje padėtyje esančiais studentais.",
    "meaning": "Next semester we propose collecting information about students’ previous habits before the programme begins and planning comparison with similarly placed students.",
    "context": "Kitą semestrą siūlome prieš programos pradžią surinkti informaciją apie studentų ankstesnius įpročius ir numatyti palyginimą su panašioje padėtyje esančiais studentais.",
    "source": "listen"
   },
   {
    "text": "Taip pat turėtume kalbėtis su tais, kurie norėjo dalyvauti, bet negalėjo atvykti sutartu laiku.",
    "meaning": "We should also speak with those who wanted to participate but could not attend at the agreed time.",
    "context": "Taip pat turėtume kalbėtis su tais, kurie norėjo dalyvauti, bet negalėjo atvykti sutartu laiku.",
    "source": "listen"
   },
   {
    "text": "Jų patirtis padėtų atskirti susidomėjimo stoką nuo praktinių kliūčių.",
    "meaning": "Their experience would help distinguish lack of interest from practical barriers.",
    "context": "Jų patirtis padėtų atskirti susidomėjimo stoką nuo praktinių kliūčių.",
    "source": "listen"
   },
   {
    "text": "Iki tol rekomenduočiau programą tęsti, tačiau viešai vartoti žodžius „perspektyvus rezultatas“, o ne „įrodytas poveikis“.",
    "meaning": "Until then I would recommend continuing the programme, but publicly using the words promising result rather than proven effect.",
    "context": "Iki tol rekomenduočiau programą tęsti, tačiau viešai vartoti žodžius „perspektyvus rezultatas“, o ne „įrodytas poveikis“.",
    "source": "listen"
   },
   {
    "text": "Šis skirtumas svarbus ne vien akademiniam tikslumui: nuo jo priklauso, kaip atsakingai pagrindžiame sprendimą skirti daugiau išteklių.",
    "meaning": "This distinction matters not only for academic precision: it affects how responsibly we justify allocating more resources.",
    "context": "Šis skirtumas svarbus ne vien akademiniam tikslumui: nuo jo priklauso, kaip atsakingai pagrindžiame sprendimą skirti daugiau išteklių.",
    "source": "listen"
   },
   {
    "text": "Kokią išvadą iš šių rezultatų galima daryti pagrįstai?",
    "meaning": "What conclusion is warranted?",
    "context": "Kokią išvadą iš šių rezultatų galima daryti pagrįstai?",
    "source": "partner"
   },
   {
    "text": "Ar atrankos problema nereiškia, kad programą reikia nutraukti?",
    "meaning": "Does the selection problem require cancellation?",
    "context": "Ar atrankos problema nereiškia, kad programą reikia nutraukti?",
    "source": "partner"
   },
   {
    "text": "Paaiškinkite rekomendaciją studentų atstovams be metodinių terminų.",
    "meaning": "Explain the recommendation to student representatives without technical jargon.",
    "context": "Paaiškinkite rekomendaciją studentų atstovams be metodinių terminų.",
    "source": "partner"
   },
   {
    "text": "Duomenys suderinami su keliais paaiškinimais.",
    "meaning": "The data are compatible with several explanations.",
    "context": "Duomenys suderinami su keliais paaiškinimais.",
    "source": "strategy"
   },
   {
    "text": "Reikėtų palyginamos grupės.",
    "meaning": "A comparable group would be needed.",
    "context": "Reikėtų palyginamos grupės.",
    "source": "strategy"
   },
   {
    "text": "Papildomi duomenys galėtų pakeisti vertinimą.",
    "meaning": "Additional data could change the evaluation.",
    "context": "Papildomi duomenys galėtų pakeisti vertinimą.",
    "source": "strategy"
   }
  ],
  "C1-culture": [
   {
    "text": "Išgalvoto miesto muziejus siūlo seną amatų parodą papildyti lankytojų dirbtuvėmis.",
    "meaning": "A fictional city museum proposes adding visitor workshops to an old crafts exhibition.",
    "context": "Išgalvoto miesto muziejus siūlo seną amatų parodą papildyti lankytojų dirbtuvėmis.",
    "source": "reading"
   },
   {
    "text": "Kuratorė teigia, kad galimybė išbandyti paprastą techniką padėtų suprasti, kiek įgūdžių reikia meistro darbui.",
    "meaning": "The curator says trying a simple technique would help people understand the skill a craftsperson’s work requires.",
    "context": "Kuratorė teigia, kad galimybė išbandyti paprastą techniką padėtų suprasti, kiek įgūdžių reikia meistro darbui.",
    "source": "reading"
   },
   {
    "text": "Amatininkų atstovas neprieštarauja lankytojų dalyvavimui, tačiau abejoja, ar trumpa pramoga nebus pristatyta kaip viso amato pažinimas.",
    "meaning": "The craftspeople’s representative does not oppose visitor participation, but doubts whether brief entertainment will be presented as knowledge of the whole craft.",
    "context": "Amatininkų atstovas neprieštarauja lankytojų dalyvavimui, tačiau abejoja, ar trumpa pramoga nebus pristatyta kaip viso amato pažinimas.",
    "source": "reading"
   },
   {
    "text": "Jo žodžiais, „prisiliesti prie medžiagos dar nereiškia suprasti tradiciją“.",
    "meaning": "In his words, touching the material does not yet mean understanding the tradition.",
    "context": "Jo žodžiais, „prisiliesti prie medžiagos dar nereiškia suprasti tradiciją“.",
    "source": "reading"
   },
   {
    "text": "Šią pastabą būtų netikslu laikyti reikalavimu uždrausti dirbtuves.",
    "meaning": "It would be inaccurate to treat this remark as a demand to prohibit workshops.",
    "context": "Šią pastabą būtų netikslu laikyti reikalavimu uždrausti dirbtuves.",
    "source": "reading"
   },
   {
    "text": "Ji veikiau kelia klausimą, kaip atskirti pirmą pažintį nuo įgytos kompetencijos.",
    "meaning": "Rather, it asks how to distinguish an initial encounter from acquired competence.",
    "context": "Ji veikiau kelia klausimą, kaip atskirti pirmą pažintį nuo įgytos kompetencijos.",
    "source": "reading"
   },
   {
    "text": "Abi pusės nori, kad amatas liktų gyvas, bet skirtingai įsivaizduoja, kas tam būtina.",
    "meaning": "Both sides want the craft to stay alive but imagine differently what that requires.",
    "context": "Abi pusės nori, kad amatas liktų gyvas, bet skirtingai įsivaizduoja, kas tam būtina.",
    "source": "reading"
   },
   {
    "text": "Kuratorė pabrėžia atvirumą naujiems dalyviams, o atstovas – tęstinumą ir mokymosi trukmę.",
    "meaning": "The curator stresses openness to new participants; the representative, continuity and the duration of learning.",
    "context": "Kuratorė pabrėžia atvirumą naujiems dalyviams, o atstovas – tęstinumą ir mokymosi trukmę.",
    "source": "reading"
   },
   {
    "text": "Galimas sprendimas būtų dirbtuves aiškiai pristatyti kaip įvadą, suteikti žodį patiems meistrams ir parodyti, kaip atrodo ilgesnis mokymosi kelias.",
    "meaning": "One solution would be to present workshops clearly as an introduction, give craftspeople a voice and show what a longer learning path looks like.",
    "context": "Galimas sprendimas būtų dirbtuves aiškiai pristatyti kaip įvadą, suteikti žodį patiems meistrams ir parodyti, kaip atrodo ilgesnis mokymosi kelias.",
    "source": "reading"
   },
   {
    "text": "Taip lankytojų įtraukimas nebūtų priešpriešinamas tradicijos sudėtingumui.",
    "meaning": "Visitor participation would then not be set against the complexity of the tradition.",
    "context": "Taip lankytojų įtraukimas nebūtų priešpriešinamas tradicijos sudėtingumui.",
    "source": "reading"
   },
   {
    "text": "Apie muziejaus dirbtuves norėčiau kalbėti ne kaip apie kompromisą tarp pažangos ir užsispyrimo.",
    "meaning": "I would like to discuss the museum workshops without calling them a compromise between progress and stubbornness.",
    "context": "Apie muziejaus dirbtuves norėčiau kalbėti ne kaip apie kompromisą tarp pažangos ir užsispyrimo.",
    "source": "listen"
   },
   {
    "text": "Toks apibūdinimas jau iš anksto vieną pusę paverčia kliūtimi.",
    "meaning": "That description already turns one side into an obstacle.",
    "context": "Toks apibūdinimas jau iš anksto vieną pusę paverčia kliūtimi.",
    "source": "listen"
   },
   {
    "text": "Amatininkų pastaba verčia klausti, ką žadame lankytojui.",
    "meaning": "The craftspeople’s comment makes us ask what we promise the visitor.",
    "context": "Amatininkų pastaba verčia klausti, ką žadame lankytojui.",
    "source": "listen"
   },
   {
    "text": "Jei sakome „per valandą tapsite meistru“, sukuriame klaidingą įspūdį.",
    "meaning": "If we say you will become a master in an hour, we create a false impression.",
    "context": "Jei sakome „per valandą tapsite meistru“, sukuriame klaidingą įspūdį.",
    "source": "listen"
   },
   {
    "text": "Jei kviečiame patirti pirmą mokymosi žingsnį, tas pats užsiėmimas įgauna kitą prasmę.",
    "meaning": "If we invite people to experience a first learning step, the same activity takes on another meaning.",
    "context": "Jei kviečiame patirti pirmą mokymosi žingsnį, tas pats užsiėmimas įgauna kitą prasmę.",
    "source": "listen"
   },
   {
    "text": "Vis dėlto vien užrašo pakeisti nepakaks.",
    "meaning": "Nevertheless, changing the label alone will not be enough.",
    "context": "Vis dėlto vien užrašo pakeisti nepakaks.",
    "source": "listen"
   },
   {
    "text": "Meistrai turėtų dalyvauti sprendžiant, kokią techniką rodyti ir kaip paaiškinti jos ryšį su platesne tradicija.",
    "meaning": "Craftspeople should help decide what technique to demonstrate and how to explain its relationship with the wider tradition.",
    "context": "Meistrai turėtų dalyvauti sprendžiant, kokią techniką rodyti ir kaip paaiškinti jos ryšį su platesne tradicija.",
    "source": "listen"
   },
   {
    "text": "Taip pat reikėtų išgirsti naujus lankytojus: ar jie po dirbtuvių geriau supranta amato sudėtingumą, ar tik prisimena malonią veiklą?",
    "meaning": "New visitors should also be heard: after the workshop do they understand the craft’s complexity better or only remember a pleasant activity?",
    "context": "Taip pat reikėtų išgirsti naujus lankytojus: ar jie po dirbtuvių geriau supranta amato sudėtingumą, ar tik prisimena malonią veiklą?",
    "source": "listen"
   },
   {
    "text": "Atsakymas padėtų vertinti ne vien renginio populiarumą, bet ir jo mokomąją vertę.",
    "meaning": "The answer would help evaluate not only the event’s popularity but also its educational value.",
    "context": "Atsakymas padėtų vertinti ne vien renginio populiarumą, bet ir jo mokomąją vertę.",
    "source": "listen"
   },
   {
    "text": "Kokia iš tikrųjų yra šio ginčo esmė?",
    "meaning": "What is the real issue in the dispute?",
    "context": "Kokia iš tikrųjų yra šio ginčo esmė?",
    "source": "partner"
   },
   {
    "text": "Ar pakaktų tiesiog pakeisti dirbtuvių pavadinimą?",
    "meaning": "Would changing the workshop’s name be enough?",
    "context": "Ar pakaktų tiesiog pakeisti dirbtuvių pavadinimą?",
    "source": "partner"
   },
   {
    "text": "Kaip tai paaiškintumėte muziejaus lankytojams?",
    "meaning": "How would you explain this to visitors?",
    "context": "Kaip tai paaiškintumėte muziejaus lankytojams?",
    "source": "partner"
   },
   {
    "text": "Ginčas kyla dėl skirtingo autentiškumo supratimo.",
    "meaning": "The dispute arises from different understandings of authenticity.",
    "context": "Ginčas kyla dėl skirtingo autentiškumo supratimo.",
    "source": "strategy"
   },
   {
    "text": "Formuluotė leidžia numanyti abejonę.",
    "meaning": "The wording suggests a reservation.",
    "context": "Formuluotė leidžia numanyti abejonę.",
    "source": "strategy"
   },
   {
    "text": "Paaiškinimas turėtų išsaugoti šį skirtumą.",
    "meaning": "The explanation should preserve that distinction.",
    "context": "Paaiškinimas turėtų išsaugoti šį skirtumą.",
    "source": "strategy"
   }
  ],
  "C1-professional": [
   {
    "text": "Išgalvotos projekto komandos laiške parašyta: „Tikimės ataskaitą pateikti penktadienį, jei iki trečiadienio gausime galutinę specifikaciją.“ Susitikimo užrašuose vėliau liko tik sakinys „Ataskaita bus penktadienį“.",
    "meaning": "A fictional project team’s email says it expects Friday delivery if final specifications arrive by Wednesday; later meeting notes retain only that the report will be on Friday.",
    "context": "Išgalvotos projekto komandos laiške parašyta: „Tikimės ataskaitą pateikti penktadienį, jei iki trečiadienio gausime galutinę specifikaciją.“ Susitikimo užrašuose vėliau liko tik sakinys „Ataskaita bus penktadienį“.",
    "source": "reading"
   },
   {
    "text": "Klientas šį įrašą suprato kaip patvirtintą terminą.",
    "meaning": "The client understood this entry as a confirmed deadline.",
    "context": "Klientas šį įrašą suprato kaip patvirtintą terminą.",
    "source": "reading"
   },
   {
    "text": "Komanda tvirtina pateikusi sąlyginį vertinimą, o ne besąlygišką pažadą.",
    "meaning": "The team says it gave a conditional estimate rather than an unconditional promise.",
    "context": "Komanda tvirtina pateikusi sąlyginį vertinimą, o ne besąlygišką pažadą.",
    "source": "reading"
   },
   {
    "text": "Būtų netikslu iš karto nuspręsti, kad viena pusė sąmoningai klaidina kitą.",
    "meaning": "It would be inaccurate to decide immediately that either side is deliberately misleading the other.",
    "context": "Būtų netikslu iš karto nuspręsti, kad viena pusė sąmoningai klaidina kitą.",
    "source": "reading"
   },
   {
    "text": "Tačiau vien geranoriško ketinimo neužtenka nesusipratimui pašalinti.",
    "meaning": "However, good intentions alone are insufficient to resolve the misunderstanding.",
    "context": "Tačiau vien geranoriško ketinimo neužtenka nesusipratimui pašalinti.",
    "source": "reading"
   },
   {
    "text": "Reikia atkurti, kokia sąlyga buvo nurodyta, ar ji įvykdyta ir kas turi patvirtinti naują datą.",
    "meaning": "We need to reconstruct the stated condition, whether it was fulfilled and who must confirm a new date.",
    "context": "Reikia atkurti, kokia sąlyga buvo nurodyta, ar ji įvykdyta ir kas turi patvirtinti naują datą.",
    "source": "reading"
   },
   {
    "text": "Tarpininkas siūlo atnaujinti susitikimo įrašą taip, kad jame būtų matoma ir preliminari data, ir jos priklausomybė nuo specifikacijos.",
    "meaning": "The mediator proposes updating the meeting record to show both the provisional date and its dependence on the specifications.",
    "context": "Tarpininkas siūlo atnaujinti susitikimo įrašą taip, kad jame būtų matoma ir preliminari data, ir jos priklausomybė nuo specifikacijos.",
    "source": "reading"
   },
   {
    "text": "Atskiru sakiniu turėtų būti nurodyta, kas informuos klientą, jei ši priklausomybė pakeis grafiką.",
    "meaning": "A separate sentence should state who will inform the client if this dependency changes the schedule.",
    "context": "Atskiru sakiniu turėtų būti nurodyta, kas informuos klientą, jei ši priklausomybė pakeis grafiką.",
    "source": "reading"
   },
   {
    "text": "Galutinė specifikacija dar nepatvirtinta, todėl šiandien negalime patikimai patvirtinti penktadienio datos.",
    "meaning": "The final specification is not yet confirmed, so today we cannot reliably confirm the Friday date.",
    "context": "Galutinė specifikacija dar nepatvirtinta, todėl šiandien negalime patikimai patvirtinti penktadienio datos.",
    "source": "listen"
   },
   {
    "text": "Tai nereiškia, kad ataskaita būtinai vėluos; reiškia, kad pirminio vertinimo sąlyga dar neįvykdyta.",
    "meaning": "This does not mean the report will necessarily be late; it means the original estimate’s condition is not yet fulfilled.",
    "context": "Tai nereiškia, kad ataskaita būtinai vėluos; reiškia, kad pirminio vertinimo sąlyga dar neįvykdyta.",
    "source": "listen"
   },
   {
    "text": "Siūlau iki rytojaus vidurdienio atskirai suderinti trūkstamas detales.",
    "meaning": "I propose separately resolving the missing details by tomorrow noon.",
    "context": "Siūlau iki rytojaus vidurdienio atskirai suderinti trūkstamas detales.",
    "source": "listen"
   },
   {
    "text": "Už tai būsiu atsakinga aš.",
    "meaning": "I will be responsible for this.",
    "context": "Už tai būsiu atsakinga aš.",
    "source": "listen"
   },
   {
    "text": "Po šio patikslinimo komandos vadovas pateiks atnaujintą grafiką ir paaiškins, kurios jo dalys jau patvirtintos, o kurios dar priklauso nuo papildomų sprendimų.",
    "meaning": "After this clarification, the team lead will provide an updated schedule, explaining which parts are confirmed and which still depend on further decisions.",
    "context": "Po šio patikslinimo komandos vadovas pateiks atnaujintą grafiką ir paaiškins, kurios jo dalys jau patvirtintos, o kurios dar priklauso nuo papildomų sprendimų.",
    "source": "listen"
   },
   {
    "text": "Klientui nereikėtų siųsti vien neapibrėžto pažado pasistengti.",
    "meaning": "The client should not be sent only an undefined promise to try.",
    "context": "Klientui nereikėtų siųsti vien neapibrėžto pažado pasistengti.",
    "source": "listen"
   },
   {
    "text": "Naudingesnis būtų konkretus paaiškinimas, ką dabar galime padaryti, ko dar nežinome ir kada pateiksime kitą informaciją.",
    "meaning": "A concrete explanation of what we can do now, what remains unknown and when we will next provide information would be more useful.",
    "context": "Naudingesnis būtų konkretus paaiškinimas, ką dabar galime padaryti, ko dar nežinome ir kada pateiksime kitą informaciją.",
    "source": "listen"
   },
   {
    "text": "Ar komanda pažadėjo pristatyti ataskaitą penktadienį?",
    "meaning": "Did the team promise Friday delivery?",
    "context": "Ar komanda pažadėjo pristatyti ataskaitą penktadienį?",
    "source": "partner"
   },
   {
    "text": "Kaip paaiškintumėte situaciją nekaltindami kliento?",
    "meaning": "How would you explain this without blaming the client?",
    "context": "Kaip paaiškintumėte situaciją nekaltindami kliento?",
    "source": "partner"
   },
   {
    "text": "Kas konkrečiai turi įvykti toliau?",
    "meaning": "What specifically must happen next?",
    "context": "Kas konkrečiai turi įvykti toliau?",
    "source": "partner"
   },
   {
    "text": "Preliminari data nėra besąlygiškas pažadas.",
    "meaning": "A provisional date is not an unconditional promise.",
    "context": "Preliminari data nėra besąlygiškas pažadas.",
    "source": "strategy"
   },
   {
    "text": "Vis dėlto neaiškumą turime išspręsti.",
    "meaning": "Nevertheless, we need to resolve the ambiguity.",
    "context": "Vis dėlto neaiškumą turime išspręsti.",
    "source": "strategy"
   },
   {
    "text": "Atnaujintą planą pateiksime raštu.",
    "meaning": "We will provide the updated plan in writing.",
    "context": "Atnaujintą planą pateiksime raštu.",
    "source": "strategy"
   }
  ]
 },
 "es": {
  "C1": [
   {
    "text": "Ambos textos presentan el registro digital como una posible mejora del servicio, aunque parten de preocupaciones distintas.",
    "meaning": "Both texts present digital registration as a possible service improvement, although they start from different concerns.",
    "context": "Ambos textos presentan el registro digital como una posible mejora del servicio, aunque parten de preocupaciones distintas.",
    "source": "reading"
   },
   {
    "text": "El equipo se centra en la organización del trabajo; el grupo de lectores, en las condiciones de acceso.",
    "meaning": "The team focuses on organising work; the readers’ group, on access conditions.",
    "context": "El equipo se centra en la organización del trabajo; el grupo de lectores, en las condiciones de acceso.",
    "source": "reading"
   },
   {
    "text": "No es necesario tratar estas perspectivas como si fueran incompatibles.",
    "meaning": "These perspectives need not be treated as incompatible.",
    "context": "No es necesario tratar estas perspectivas como si fueran incompatibles.",
    "source": "reading"
   },
   {
    "text": "La fuente A señala que, durante una prueba breve, el personal pudo dedicar más tiempo a las consultas complejas.",
    "meaning": "Source A notes that during a short trial staff could devote more time to complex enquiries.",
    "context": "La fuente A señala que, durante una prueba breve, el personal pudo dedicar más tiempo a las consultas complejas.",
    "source": "reading"
   },
   {
    "text": "Esa observación justifica seguir investigando las ventajas del sistema, pero no demuestra por sí sola que un registro exclusivamente digital resulte adecuado para todos.",
    "meaning": "That observation justifies further investigation of the system’s advantages, but does not by itself show digital-only registration is appropriate for everyone.",
    "context": "Esa observación justifica seguir investigando las ventajas del sistema, pero no demuestra por sí sola que un registro exclusivamente digital resulte adecuado para todos.",
    "source": "reading"
   },
   {
    "text": "La prueba tuvo un alcance limitado y no permite conocer la experiencia de quienes no participaron.",
    "meaning": "The trial had limited scope and does not reveal the experience of those who did not participate.",
    "context": "La prueba tuvo un alcance limitado y no permite conocer la experiencia de quienes no participaron.",
    "source": "reading"
   },
   {
    "text": "La fuente B aporta precisamente esa preocupación por la diversidad de usuarios.",
    "meaning": "Source B contributes precisely that concern about different users.",
    "context": "La fuente B aporta precisamente esa preocupación por la diversidad de usuarios.",
    "source": "reading"
   },
   {
    "text": "Sin embargo, sería inexacto presentarla como un rechazo general de la tecnología.",
    "meaning": "However, it would be inaccurate to portray it as a general rejection of technology.",
    "context": "Sin embargo, sería inexacto presentarla como un rechazo general de la tecnología.",
    "source": "reading"
   },
   {
    "text": "Su condición principal es conservar distintas formas de atención.",
    "meaning": "Its main condition is preserving different forms of assistance.",
    "context": "Su condición principal es conservar distintas formas de atención.",
    "source": "reading"
   },
   {
    "text": "Por tanto, la cuestión central no es solo el costo, sino también el acceso efectivo.",
    "meaning": "Therefore the central issue is not only cost but also effective access.",
    "context": "Por tanto, la cuestión central no es solo el costo, sino también el acceso efectivo.",
    "source": "reading"
   },
   {
    "text": "A la luz de estas circunstancias, convendría ampliar el registro digital sin eliminar las opciones presencial y telefónica.",
    "meaning": "In light of these circumstances, digital registration should expand without removing in-person and telephone options.",
    "context": "A la luz de estas circunstancias, convendría ampliar el registro digital sin eliminar las opciones presencial y telefónica.",
    "source": "reading"
   },
   {
    "text": "Una segunda prueba debería incluir a lectores de distintas edades y con diferentes habilidades digitales.",
    "meaning": "A second trial should include readers of different ages and digital abilities.",
    "context": "Una segunda prueba debería incluir a lectores de distintas edades y con diferentes habilidades digitales.",
    "source": "reading"
   },
   {
    "text": "Además del tiempo de atención, habría que observar si pueden completar el trámite de manera autónoma.",
    "meaning": "Besides service time, evaluation should observe whether they can complete the procedure independently.",
    "context": "Además del tiempo de atención, habría que observar si pueden completar el trámite de manera autónoma.",
    "source": "reading"
   },
   {
    "text": "La decisión debería revisarse cuando se disponga de esa información adicional.",
    "meaning": "The decision should be reviewed when that additional information is available.",
    "context": "La decisión debería revisarse cuando se disponga de esa información adicional.",
    "source": "reading"
   },
   {
    "text": "Quisiera precisar qué permiten afirmar realmente los resultados de nuestra prueba.",
    "meaning": "I would like to specify what our trial results really allow us to claim.",
    "context": "Quisiera precisar qué permiten afirmar realmente los resultados de nuestra prueba.",
    "source": "listen"
   },
   {
    "text": "Durante cuatro semanas se redujo el tiempo medio de registro.",
    "meaning": "Over four weeks the average registration time fell.",
    "context": "Durante cuatro semanas se redujo el tiempo medio de registro.",
    "source": "listen"
   },
   {
    "text": "Sin embargo, participaron principalmente personas que ya sabían utilizar servicios digitales.",
    "meaning": "However, participants were mainly people who already knew how to use digital services.",
    "context": "Sin embargo, participaron principalmente personas que ya sabían utilizar servicios digitales.",
    "source": "listen"
   },
   {
    "text": "De esa observación no podemos concluir que el nuevo procedimiento beneficie por igual a todos.",
    "meaning": "From that observation we cannot conclude the new procedure benefits everyone equally.",
    "context": "De esa observación no podemos concluir que el nuevo procedimiento beneficie por igual a todos.",
    "source": "listen"
   },
   {
    "text": "Esto no constituye un argumento para abandonar el sistema.",
    "meaning": "This does not constitute an argument for abandoning the system.",
    "context": "Esto no constituye un argumento para abandonar el sistema.",
    "source": "listen"
   },
   {
    "text": "Más bien propongo definir con mayor precisión qué necesitamos saber todavía.",
    "meaning": "Rather, I propose defining more precisely what we still need to know.",
    "context": "Más bien propongo definir con mayor precisión qué necesitamos saber todavía.",
    "source": "listen"
   },
   {
    "text": "El grupo de lectores planteó otra pregunta: cuando alguien encuentra una dificultad, ¿puede conseguir ayuda adecuada con rapidez?",
    "meaning": "The readers’ group raised another question: when someone encounters a difficulty, can they quickly get appropriate help?",
    "context": "El grupo de lectores planteó otra pregunta: cuando alguien encuentra una dificultad, ¿puede conseguir ayuda adecuada con rapidez?",
    "source": "listen"
   },
   {
    "text": "El equipo de atención valoró el tiempo ahorrado, mientras que los lectores hablaron de la posibilidad de completar el trámite.",
    "meaning": "The service team valued time saved, whereas readers discussed being able to complete the procedure.",
    "context": "El equipo de atención valoró el tiempo ahorrado, mientras que los lectores hablaron de la posibilidad de completar el trámite.",
    "source": "listen"
   },
   {
    "text": "Estas perspectivas no tienen por qué contradecirse.",
    "meaning": "These perspectives do not have to contradict one another.",
    "context": "Estas perspectivas no tienen por qué contradecirse.",
    "source": "listen"
   },
   {
    "text": "Podemos reconocer una mejora operativa y, al mismo tiempo, investigar las barreras que persisten.",
    "meaning": "We can recognise an operational improvement while investigating barriers that persist.",
    "context": "Podemos reconocer una mejora operativa y, al mismo tiempo, investigar las barreras que persisten.",
    "source": "listen"
   },
   {
    "text": "En la siguiente fase propondría incluir a usuarios con menos experiencia, observar los trámites abandonados y valorar por separado la necesidad de apoyo.",
    "meaning": "In the next phase I would propose including less experienced users, tracking abandoned procedures and assessing support needs separately.",
    "context": "En la siguiente fase propondría incluir a usuarios con menos experiencia, observar los trámites abandonados y valorar por separado la necesidad de apoyo.",
    "source": "listen"
   },
   {
    "text": "La recomendación definitiva debería presentarse después de evaluar estos datos adicionales con criterios acordados de antemano.",
    "meaning": "A final recommendation should follow evaluation of the additional data against criteria agreed in advance.",
    "context": "La recomendación definitiva debería presentarse después de evaluar estos datos adicionales con criterios acordados de antemano.",
    "source": "listen"
   },
   {
    "text": "¿No demuestra un registro más rápido que debemos ampliar el sistema?",
    "meaning": "Does faster registration not prove we should expand the system?",
    "context": "¿No demuestra un registro más rápido que debemos ampliar el sistema?",
    "source": "partner"
   },
   {
    "text": "¿Cómo conciliaría las evaluaciones del personal y de los lectores?",
    "meaning": "How would you reconcile staff and reader evaluations?",
    "context": "¿Cómo conciliaría las evaluaciones del personal y de los lectores?",
    "source": "partner"
   },
   {
    "text": "Explique su recomendación a alguien que no ha leído el informe.",
    "meaning": "Explain your recommendation to someone who has not read the report.",
    "context": "Explique su recomendación a alguien que no ha leído el informe.",
    "source": "partner"
   },
   {
    "text": "Este resultado solo permite afirmar que...",
    "meaning": "This result allows us to say only that...",
    "context": "Este resultado solo permite afirmar que...",
    "source": "strategy"
   },
   {
    "text": "Estas perspectivas se complementan porque...",
    "meaning": "These perspectives complement each other because...",
    "context": "Estas perspectivas se complementan porque...",
    "source": "strategy"
   },
   {
    "text": "En términos sencillos, propondría...",
    "meaning": "In simple terms, I would suggest...",
    "context": "En términos sencillos, propondría...",
    "source": "strategy"
   },
   {
    "text": "Durante una prueba breve, parte de los lectores eligió registrarse en línea.",
    "meaning": "During a short trial, some readers chose online registration.",
    "context": "Durante una prueba breve, parte de los lectores eligió registrarse en línea.",
    "source": "source-0"
   },
   {
    "text": "El personal dedicó menos tiempo a consultas sencillas y pudo atender con más calma los casos complejos.",
    "meaning": "Staff spent less time on simple enquiries and could give more careful attention to complex cases.",
    "context": "El personal dedicó menos tiempo a consultas sencillas y pudo atender con más calma los casos complejos.",
    "source": "source-0"
   },
   {
    "text": "El equipo propone ampliar el registro digital.",
    "meaning": "The team proposes expanding digital registration.",
    "context": "El equipo propone ampliar el registro digital.",
    "source": "source-0"
   },
   {
    "text": "La prueba no incluyó a todos los usuarios.",
    "meaning": "The trial did not include all users.",
    "context": "La prueba no incluyó a todos los usuarios.",
    "source": "source-0"
   },
   {
    "text": "Algunos lectores valoraron favorablemente el sistema, pero otros necesitaron ayuda.",
    "meaning": "Some readers rated the system favourably, but others needed assistance.",
    "context": "Algunos lectores valoraron favorablemente el sistema, pero otros necesitaron ayuda.",
    "source": "source-1"
   },
   {
    "text": "El grupo pide mantener el registro presencial y telefónico.",
    "meaning": "The group asks to retain in-person and telephone registration.",
    "context": "El grupo pide mantener el registro presencial y telefónico.",
    "source": "source-1"
   },
   {
    "text": "Sus integrantes aceptan que las herramientas digitales pueden ser útiles siempre que no reduzcan las demás formas de atención.",
    "meaning": "Its members accept digital tools can be useful as long as they do not reduce other forms of assistance.",
    "context": "Sus integrantes aceptan que las herramientas digitales pueden ser útiles siempre que no reduzcan las demás formas de atención.",
    "source": "source-1"
   }
  ],
  "C1-academic": [
   {
    "text": "El informe de una universidad ficticia describe un nuevo programa de asesoría estudiantil.",
    "meaning": "A fictional university report describes a new student advising programme.",
    "context": "El informe de una universidad ficticia describe un nuevo programa de asesoría estudiantil.",
    "source": "reading"
   },
   {
    "text": "Al terminar el semestre, quienes participaron entregaron sus trabajos puntualmente con mayor frecuencia que quienes no participaron.",
    "meaning": "At semester end, participants submitted work punctually more often than non-participants.",
    "context": "Al terminar el semestre, quienes participaron entregaron sus trabajos puntualmente con mayor frecuencia que quienes no participaron.",
    "source": "reading"
   },
   {
    "text": "El resumen presenta la diferencia como indicio de la eficacia del programa.",
    "meaning": "The summary presents the difference as an indication of the programme’s effectiveness.",
    "context": "El resumen presenta la diferencia como indicio de la eficacia del programa.",
    "source": "reading"
   },
   {
    "text": "La explicación es posible, pero la comparación descrita no basta para establecerla.",
    "meaning": "The explanation is possible, but the described comparison is insufficient to establish it.",
    "context": "La explicación es posible, pero la comparación descrita no basta para establecerla.",
    "source": "reading"
   },
   {
    "text": "Los estudiantes decidieron si inscribirse y no se compararon sus hábitos de trabajo anteriores.",
    "meaning": "Students decided whether to enrol, and their previous work habits were not compared.",
    "context": "Los estudiantes decidieron si inscribirse y no se compararon sus hábitos de trabajo anteriores.",
    "source": "reading"
   },
   {
    "text": "Por tanto, no puede descartarse que el programa atrajera a personas que ya estaban más motivadas.",
    "meaning": "Therefore it cannot be ruled out that the programme attracted people who were already more motivated.",
    "context": "Por tanto, no puede descartarse que el programa atrajera a personas que ya estaban más motivadas.",
    "source": "reading"
   },
   {
    "text": "A su vez, ese problema de selección tampoco demuestra que la asesoría no haya cambiado nada.",
    "meaning": "In turn, that selection problem does not prove the advising changed nothing.",
    "context": "A su vez, ese problema de selección tampoco demuestra que la asesoría no haya cambiado nada.",
    "source": "reading"
   },
   {
    "text": "Señala una incertidumbre que sigue abierta.",
    "meaning": "It identifies an uncertainty that remains open.",
    "context": "Señala una incertidumbre que sigue abierta.",
    "source": "reading"
   },
   {
    "text": "Una evaluación más precisa necesitaría comparar grupos con condiciones iniciales semejantes y observar cómo evolucionan sus resultados.",
    "meaning": "A more precise evaluation would compare groups with similar initial conditions and observe how their results evolve.",
    "context": "Una evaluación más precisa necesitaría comparar grupos con condiciones iniciales semejantes y observar cómo evolucionan sus resultados.",
    "source": "reading"
   },
   {
    "text": "La decisión práctica tampoco tiene por qué reducirse a ampliar o cancelar.",
    "meaning": "The practical decision need not reduce to expansion or cancellation.",
    "context": "La decisión práctica tampoco tiene por qué reducirse a ampliar o cancelar.",
    "source": "reading"
   },
   {
    "text": "Se podría mantener una versión limitada mientras se mejora la evaluación y se comunican sus límites.",
    "meaning": "A limited version could continue while evaluation improves and its limits are communicated.",
    "context": "Se podría mantener una versión limitada mientras se mejora la evaluación y se comunican sus límites.",
    "source": "reading"
   },
   {
    "text": "Esa recomendación reconoce un beneficio posible sin presentarlo como un efecto ya establecido de forma definitiva.",
    "meaning": "That recommendation recognises a possible benefit without presenting it as an already definitively established effect.",
    "context": "Esa recomendación reconoce un beneficio posible sin presentarlo como un efecto ya establecido de forma definitiva.",
    "source": "reading"
   },
   {
    "text": "Quisiera corregir dos interpretaciones opuestas de nuestro informe.",
    "meaning": "I would like to correct two opposing interpretations of our report.",
    "context": "Quisiera corregir dos interpretaciones opuestas de nuestro informe.",
    "source": "listen"
   },
   {
    "text": "Algunos colegas afirman que el programa ya demostró su eficacia.",
    "meaning": "Some colleagues claim the programme has already demonstrated its effectiveness.",
    "context": "Algunos colegas afirman que el programa ya demostró su eficacia.",
    "source": "listen"
   },
   {
    "text": "Otros sostienen que la participación voluntaria vuelve irrelevantes todos los resultados.",
    "meaning": "Others maintain voluntary participation makes all the results irrelevant.",
    "context": "Otros sostienen que la participación voluntaria vuelve irrelevantes todos los resultados.",
    "source": "listen"
   },
   {
    "text": "Ambas conclusiones son excesivas.",
    "meaning": "Both conclusions are excessive.",
    "context": "Ambas conclusiones son excesivas.",
    "source": "listen"
   },
   {
    "text": "Observamos una diferencia entre grupos, pero todavía no entendemos suficientemente su origen.",
    "meaning": "We observe a difference between groups but do not yet sufficiently understand its origin.",
    "context": "Observamos una diferencia entre grupos, pero todavía no entendemos suficientemente su origen.",
    "source": "listen"
   },
   {
    "text": "El próximo semestre proponemos recoger información sobre los hábitos anteriores y prever una comparación con estudiantes en condiciones semejantes.",
    "meaning": "Next semester we propose collecting information about previous habits and planning comparison with students in similar circumstances.",
    "context": "El próximo semestre proponemos recoger información sobre los hábitos anteriores y prever una comparación con estudiantes en condiciones semejantes.",
    "source": "listen"
   },
   {
    "text": "También deberíamos hablar con quienes querían participar pero no podían asistir en el horario disponible.",
    "meaning": "We should also speak to those who wanted to participate but could not attend at the available time.",
    "context": "También deberíamos hablar con quienes querían participar pero no podían asistir en el horario disponible.",
    "source": "listen"
   },
   {
    "text": "Su experiencia ayudaría a distinguir la falta de interés de las barreras prácticas.",
    "meaning": "Their experience would help distinguish lack of interest from practical barriers.",
    "context": "Su experiencia ayudaría a distinguir la falta de interés de las barreras prácticas.",
    "source": "listen"
   },
   {
    "text": "Mientras tanto, recomendaría continuar el programa, pero hablar públicamente de un resultado prometedor, no de un efecto demostrado.",
    "meaning": "Meanwhile I would recommend continuing the programme but speaking publicly of a promising result rather than a demonstrated effect.",
    "context": "Mientras tanto, recomendaría continuar el programa, pero hablar públicamente de un resultado prometedor, no de un efecto demostrado.",
    "source": "listen"
   },
   {
    "text": "La distinción no es solo académica: afecta a la responsabilidad con que justificamos destinar más recursos.",
    "meaning": "The distinction is not only academic: it affects how responsibly we justify allocating more resources.",
    "context": "La distinción no es solo académica: afecta a la responsabilidad con que justificamos destinar más recursos.",
    "source": "listen"
   },
   {
    "text": "¿Qué conclusión permiten sostener estos resultados?",
    "meaning": "What conclusion is warranted?",
    "context": "¿Qué conclusión permiten sostener estos resultados?",
    "source": "partner"
   },
   {
    "text": "¿El problema de selección no obliga a cancelar el programa?",
    "meaning": "Does the selection problem require cancellation?",
    "context": "¿El problema de selección no obliga a cancelar el programa?",
    "source": "partner"
   },
   {
    "text": "Explique la recomendación a representantes estudiantiles sin tecnicismos.",
    "meaning": "Explain the recommendation to student representatives without technical jargon.",
    "context": "Explique la recomendación a representantes estudiantiles sin tecnicismos.",
    "source": "partner"
   },
   {
    "text": "Los datos son compatibles con varias explicaciones.",
    "meaning": "The data are compatible with several explanations.",
    "context": "Los datos son compatibles con varias explicaciones.",
    "source": "strategy"
   },
   {
    "text": "Haría falta un grupo comparable.",
    "meaning": "A comparable group would be needed.",
    "context": "Haría falta un grupo comparable.",
    "source": "strategy"
   },
   {
    "text": "Otros datos podrían modificar la evaluación.",
    "meaning": "Additional data could change the evaluation.",
    "context": "Otros datos podrían modificar la evaluación.",
    "source": "strategy"
   }
  ],
  "C1-culture": [
   {
    "text": "El museo de una ciudad ficticia propone añadir talleres para visitantes a una exposición de oficios tradicionales.",
    "meaning": "A fictional city museum proposes adding visitor workshops to an exhibition of traditional crafts.",
    "context": "El museo de una ciudad ficticia propone añadir talleres para visitantes a una exposición de oficios tradicionales.",
    "source": "reading"
   },
   {
    "text": "La curadora sostiene que probar una técnica sencilla ayudaría a comprender la habilidad del artesano.",
    "meaning": "The curator says trying a simple technique would help people understand the craftsperson’s skill.",
    "context": "La curadora sostiene que probar una técnica sencilla ayudaría a comprender la habilidad del artesano.",
    "source": "reading"
   },
   {
    "text": "Un representante de los maestros no rechaza la participación, pero duda de que una actividad breve se presente como conocimiento completo del oficio.",
    "meaning": "A representative of the craftspeople does not reject participation, but questions presenting a brief activity as complete knowledge of the craft.",
    "context": "Un representante de los maestros no rechaza la participación, pero duda de que una actividad breve se presente como conocimiento completo del oficio.",
    "source": "reading"
   },
   {
    "text": "En sus palabras, «tocar el material no equivale a comprender la tradición».",
    "meaning": "In his words, touching the material is not equivalent to understanding the tradition.",
    "context": "En sus palabras, «tocar el material no equivale a comprender la tradición».",
    "source": "reading"
   },
   {
    "text": "Sería inexacto interpretar la observación como una exigencia de prohibir los talleres.",
    "meaning": "It would be inaccurate to interpret the remark as a demand to ban workshops.",
    "context": "Sería inexacto interpretar la observación como una exigencia de prohibir los talleres.",
    "source": "reading"
   },
   {
    "text": "Más bien pregunta cómo distinguir un primer acercamiento de una competencia adquirida.",
    "meaning": "Rather, it asks how to distinguish an initial encounter from acquired competence.",
    "context": "Más bien pregunta cómo distinguir un primer acercamiento de una competencia adquirida.",
    "source": "reading"
   },
   {
    "text": "Ambas partes desean mantener vivo el oficio, pero imaginan de manera distinta lo que eso requiere.",
    "meaning": "Both sides want to keep the craft alive but imagine differently what this requires.",
    "context": "Ambas partes desean mantener vivo el oficio, pero imaginan de manera distinta lo que eso requiere.",
    "source": "reading"
   },
   {
    "text": "La curadora destaca la apertura a nuevos participantes; el representante, la continuidad y la duración del aprendizaje.",
    "meaning": "The curator emphasises openness to new participants; the representative, continuity and the duration of learning.",
    "context": "La curadora destaca la apertura a nuevos participantes; el representante, la continuidad y la duración del aprendizaje.",
    "source": "reading"
   },
   {
    "text": "Una solución posible sería presentar los talleres como una introducción, dar voz a los maestros y mostrar cómo sería un aprendizaje prolongado.",
    "meaning": "One possible solution would present workshops as an introduction, give craftspeople a voice and show what longer learning would involve.",
    "context": "Una solución posible sería presentar los talleres como una introducción, dar voz a los maestros y mostrar cómo sería un aprendizaje prolongado.",
    "source": "reading"
   },
   {
    "text": "Así, la participación del público no tendría que oponerse a la complejidad de la tradición.",
    "meaning": "Public participation would then not have to oppose the tradition’s complexity.",
    "context": "Así, la participación del público no tendría que oponerse a la complejidad de la tradición.",
    "source": "reading"
   },
   {
    "text": "Quisiera hablar de los talleres sin describirlos como un compromiso entre progreso y terquedad.",
    "meaning": "I would like to discuss workshops without describing them as a compromise between progress and stubbornness.",
    "context": "Quisiera hablar de los talleres sin describirlos como un compromiso entre progreso y terquedad.",
    "source": "listen"
   },
   {
    "text": "Esa etiqueta convierte de antemano a una parte en obstáculo.",
    "meaning": "That label turns one side into an obstacle in advance.",
    "context": "Esa etiqueta convierte de antemano a una parte en obstáculo.",
    "source": "listen"
   },
   {
    "text": "La observación de los artesanos nos obliga a preguntar qué prometemos al visitante.",
    "meaning": "The craftspeople’s remark requires us to ask what we promise the visitor.",
    "context": "La observación de los artesanos nos obliga a preguntar qué prometemos al visitante.",
    "source": "listen"
   },
   {
    "text": "Si anunciamos que será maestro en una hora, creamos una impresión engañosa.",
    "meaning": "If we advertise that they will become a master in an hour, we create a misleading impression.",
    "context": "Si anunciamos que será maestro en una hora, creamos una impresión engañosa.",
    "source": "listen"
   },
   {
    "text": "Si lo invitamos a experimentar un primer paso de aprendizaje, la misma actividad adquiere otro sentido.",
    "meaning": "If we invite them to experience a first learning step, the same activity acquires a different meaning.",
    "context": "Si lo invitamos a experimentar un primer paso de aprendizaje, la misma actividad adquiere otro sentido.",
    "source": "listen"
   },
   {
    "text": "Sin embargo, no basta cambiar el letrero.",
    "meaning": "However, changing the sign is insufficient.",
    "context": "Sin embargo, no basta cambiar el letrero.",
    "source": "listen"
   },
   {
    "text": "Los maestros deberían participar en decidir qué técnica mostrar y cómo explicar su relación con la tradición.",
    "meaning": "Craftspeople should participate in deciding what technique to show and how to explain its relationship to the tradition.",
    "context": "Los maestros deberían participar en decidir qué técnica mostrar y cómo explicar su relación con la tradición.",
    "source": "listen"
   },
   {
    "text": "También habría que escuchar a los visitantes nuevos: ¿comprenden mejor la complejidad del oficio o solo recuerdan una actividad agradable?",
    "meaning": "New visitors should also be heard: do they understand the craft’s complexity better or only remember a pleasant activity?",
    "context": "También habría que escuchar a los visitantes nuevos: ¿comprenden mejor la complejidad del oficio o solo recuerdan una actividad agradable?",
    "source": "listen"
   },
   {
    "text": "Esa respuesta permitiría evaluar el valor educativo, además de la popularidad del evento.",
    "meaning": "That answer would allow evaluation of educational value as well as event popularity.",
    "context": "Esa respuesta permitiría evaluar el valor educativo, además de la popularidad del evento.",
    "source": "listen"
   },
   {
    "text": "¿Cuál es realmente el centro de esta disputa?",
    "meaning": "What is the real issue in the dispute?",
    "context": "¿Cuál es realmente el centro de esta disputa?",
    "source": "partner"
   },
   {
    "text": "¿Bastaría con cambiar el nombre del taller?",
    "meaning": "Would changing the workshop’s name be enough?",
    "context": "¿Bastaría con cambiar el nombre del taller?",
    "source": "partner"
   },
   {
    "text": "¿Cómo se lo explicaría a los visitantes?",
    "meaning": "How would you explain this to visitors?",
    "context": "¿Cómo se lo explicaría a los visitantes?",
    "source": "partner"
   },
   {
    "text": "La disputa nace de distintas ideas de autenticidad.",
    "meaning": "The dispute arises from different understandings of authenticity.",
    "context": "La disputa nace de distintas ideas de autenticidad.",
    "source": "strategy"
   },
   {
    "text": "La formulación deja entrever una reserva.",
    "meaning": "The wording suggests a reservation.",
    "context": "La formulación deja entrever una reserva.",
    "source": "strategy"
   },
   {
    "text": "La explicación debería conservar esa distinción.",
    "meaning": "The explanation should preserve that distinction.",
    "context": "La explicación debería conservar esa distinción.",
    "source": "strategy"
   }
  ],
  "C1-professional": [
   {
    "text": "En el correo de un equipo ficticio se lee: «Esperamos entregar el informe el viernes si recibimos la especificación definitiva antes del miércoles».",
    "meaning": "A fictional team’s email says they expect to deliver the report on Friday if final specifications arrive before Wednesday.",
    "context": "En el correo de un equipo ficticio se lee: «Esperamos entregar el informe el viernes si recibimos la especificación definitiva antes del miércoles».",
    "source": "reading"
   },
   {
    "text": "En las notas de la reunión quedó después solo «El informe estará el viernes».",
    "meaning": "The later meeting notes retain only that the report will be ready on Friday.",
    "context": "En las notas de la reunión quedó después solo «El informe estará el viernes».",
    "source": "reading"
   },
   {
    "text": "El cliente interpretó esa frase como un plazo confirmado.",
    "meaning": "The client understood that phrase as a confirmed deadline.",
    "context": "El cliente interpretó esa frase como un plazo confirmado.",
    "source": "reading"
   },
   {
    "text": "El equipo sostiene que dio una estimación condicional, no una promesa incondicional.",
    "meaning": "The team says it gave a conditional estimate, not an unconditional promise.",
    "context": "El equipo sostiene que dio una estimación condicional, no una promesa incondicional.",
    "source": "reading"
   },
   {
    "text": "Sería inexacto decidir de inmediato que alguien intentó engañar a la otra parte.",
    "meaning": "It would be inaccurate to decide immediately that someone intended to mislead the other side.",
    "context": "Sería inexacto decidir de inmediato que alguien intentó engañar a la otra parte.",
    "source": "reading"
   },
   {
    "text": "Pero una intención de buena fe tampoco basta para resolver el malentendido.",
    "meaning": "But a good-faith intention is also insufficient to resolve the misunderstanding.",
    "context": "Pero una intención de buena fe tampoco basta para resolver el malentendido.",
    "source": "reading"
   },
   {
    "text": "Hay que reconstruir qué condición se mencionó, si se cumplió y quién debe confirmar una fecha nueva.",
    "meaning": "We must reconstruct the stated condition, whether it was met and who must confirm a new date.",
    "context": "Hay que reconstruir qué condición se mencionó, si se cumplió y quién debe confirmar una fecha nueva.",
    "source": "reading"
   },
   {
    "text": "La persona que media propone corregir el acta para que muestre la fecha provisional y su dependencia de la especificación.",
    "meaning": "The mediator proposes correcting the record to show the provisional date and its dependence on the specifications.",
    "context": "La persona que media propone corregir el acta para que muestre la fecha provisional y su dependencia de la especificación.",
    "source": "reading"
   },
   {
    "text": "Otra frase debería indicar quién avisará al cliente si esa dependencia modifica el calendario.",
    "meaning": "Another sentence should state who will notify the client if that dependency changes the schedule.",
    "context": "Otra frase debería indicar quién avisará al cliente si esa dependencia modifica el calendario.",
    "source": "reading"
   },
   {
    "text": "La especificación definitiva todavía no está confirmada, así que hoy no podemos confirmar con fiabilidad la fecha del viernes.",
    "meaning": "The final specification is still unconfirmed, so today we cannot reliably confirm Friday’s date.",
    "context": "La especificación definitiva todavía no está confirmada, así que hoy no podemos confirmar con fiabilidad la fecha del viernes.",
    "source": "listen"
   },
   {
    "text": "Eso no significa que el informe vaya a retrasarse necesariamente; significa que aún no se cumple la condición de la estimación original.",
    "meaning": "That does not mean the report will necessarily be late; it means the condition in the original estimate is not yet met.",
    "context": "Eso no significa que el informe vaya a retrasarse necesariamente; significa que aún no se cumple la condición de la estimación original.",
    "source": "listen"
   },
   {
    "text": "Propongo aclarar los detalles pendientes antes de mañana al mediodía.",
    "meaning": "I propose clarifying pending details before tomorrow noon.",
    "context": "Propongo aclarar los detalles pendientes antes de mañana al mediodía.",
    "source": "listen"
   },
   {
    "text": "Yo me encargo de esa tarea.",
    "meaning": "I will take responsibility for that task.",
    "context": "Yo me encargo de esa tarea.",
    "source": "listen"
   },
   {
    "text": "Después, el responsable del equipo enviará un calendario actualizado y distinguirá las partes confirmadas de las que dependen de otras decisiones.",
    "meaning": "Afterwards the team lead will send an updated schedule distinguishing confirmed parts from those dependent on other decisions.",
    "context": "Después, el responsable del equipo enviará un calendario actualizado y distinguirá las partes confirmadas de las que dependen de otras decisiones.",
    "source": "listen"
   },
   {
    "text": "Al cliente no le serviría recibir solo una promesa vaga de hacer lo posible.",
    "meaning": "It would not help the client to receive only a vague promise to do what is possible.",
    "context": "Al cliente no le serviría recibir solo una promesa vaga de hacer lo posible.",
    "source": "listen"
   },
   {
    "text": "Necesita saber qué podemos hacer ahora, qué no sabemos todavía y cuándo recibirá la siguiente información.",
    "meaning": "They need to know what we can do now, what remains unknown and when they will receive the next information.",
    "context": "Necesita saber qué podemos hacer ahora, qué no sabemos todavía y cuándo recibirá la siguiente información.",
    "source": "listen"
   },
   {
    "text": "¿El equipo prometió entregar el informe el viernes?",
    "meaning": "Did the team promise Friday delivery?",
    "context": "¿El equipo prometió entregar el informe el viernes?",
    "source": "partner"
   },
   {
    "text": "¿Cómo explicaría la situación sin culpar al cliente?",
    "meaning": "How would you explain this without blaming the client?",
    "context": "¿Cómo explicaría la situación sin culpar al cliente?",
    "source": "partner"
   },
   {
    "text": "¿Qué tiene que pasar ahora, concretamente?",
    "meaning": "What specifically must happen next?",
    "context": "¿Qué tiene que pasar ahora, concretamente?",
    "source": "partner"
   },
   {
    "text": "Una fecha provisional no es una promesa incondicional.",
    "meaning": "A provisional date is not an unconditional promise.",
    "context": "Una fecha provisional no es una promesa incondicional.",
    "source": "strategy"
   },
   {
    "text": "Aun así, tenemos que resolver la ambigüedad.",
    "meaning": "Nevertheless, we need to resolve the ambiguity.",
    "context": "Aun así, tenemos que resolver la ambigüedad.",
    "source": "strategy"
   },
   {
    "text": "Presentaremos el plan actualizado por escrito.",
    "meaning": "We will provide the updated plan in writing.",
    "context": "Presentaremos el plan actualizado por escrito.",
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
