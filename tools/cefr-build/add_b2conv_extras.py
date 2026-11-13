import json
p='convs-pron.json';d=json.load(open(p,encoding='utf-8'))
d.update({
"Laba diena. Kaip jau minėjau, nuo kito mėnesio nuoma bus šimtu eurų didesnė.":"LAH-bah dyeh-NAH. kaip yau mi-NAY-yau, nwoh KI-toh MAY-neh-syoh NWOH-mah bus shim-TU EH-u-roo di-DES-nay",
"O ką siūlote?":"oh kaa SYOO-loh-teh",
"Hmm. Jūs tikrai gera nuomininkė. Bet mano išlaidos irgi išaugo.":"hmm. YOOS tik-RAI geh-RAH NWOH-mi-nin-kay. bet MAH-noh ISH-lai-dohs IR-gi ish-AU-goh",
"Tai jau kitas reikalas. Gerai, septyniasdešimt eurų daugiau ir sutartis dvejiems metams.":"tai yau KI-tahs RAY-kah-lahs. geh-RAI, sep-tee-nyahs-deh-SHIMT EH-u-roo dau-GYAU ir su-tar-TIS dveh-YEMS meh-TAHMS",
"Atsiųsiu šiandien. Malonu su jumis turėti reikalų.":"aht-SYOO-syu SHYAHN-dyen. mah-loh-NU su yu-MIS tu-RAY-ti ray-kah-LOO",
"Laba diena, klientų aptarnavimas, kuo galiu padėti?":"LAH-bah dyeh-NAH, kli-en-TOO ahp-tar-nah-VI-mahs, kwoh gah-LYU pah-DAY-ti",
"Apgailestauju. Kokia klaida?":"ahp-gai-les-TAU-yu. koh-KYAH klai-DAH",
"Patikrinsiu. Taip, matau skambučius į Latviją. Galbūt telefonu naudojosi kas nors kitas?":"pah-TIK-rin-syu. taip, mah-TAU skahm-BU-chyus ee LAHT-vi-yaa. gahl-BOOT teh-leh-FOH-nu nau-DOH-yoh-si kahs nors KI-tahs",
"Gerai, perduosiu prašymą techniniam skyriui. Atsakymą gausite per penkias darbo dienas.":"geh-RAI, per-DWOH-syu PRAH-shee-maa TEKH-ni-nyahm SKEE-ryui. aht-SAH-kee-maa GAU-si-teh per PEN-kyahs DAR-boh DYEH-nahs",
"Ar girdėjai? Savivaldybė nori uždrausti automobilius senamiestyje. Manau, tai kvailystė.":"ar gir-DAY-yai? sah-vi-vahl-DEE-bay NOH-ri uzh-DRAUS-ti au-toh-moh-BI-lyus seh-nah-myes-TEE-yeh. mah-NAU, tai kvai-LEES-tay",
"Kodėl? O kaip parduotuvės? Žmonės nebeatvažiuos.":"koh-DAYL? oh kaip par-dwoh-TU-vays? ZHMOH-nays neh-beh-aht-vah-ZHYWOHS",
"Hmm, gal. Bet vyresniems žmonėms bus sunku.":"hmm, GAHL. bet vee-res-NYEMS zhmoh-NAYMS bus sun-KU",
"Gerai, tai skamba protingai. Matai, kartais tave verta paklausyti.":"geh-RAI, tai SKAHM-bah proh-tin-GAI. mah-TAI, KAR-tais tah-VEH VER-tah pahk-lau-SEE-ti",
"Laba diena. Papasakokite apie savo didžiausią stiprybę.":"LAH-bah dyeh-NAH. pah-pah-sah-KOH-ki-teh AH-pyeh SAH-voh di-JYAU-syaa stip-REE-byay",
"O silpnybė?":"oh silp-NEE-bay",
"Gerai. Kodėl norite palikti dabartinę darbovietę?":"geh-RAI. koh-DAYL NOH-ri-teh pah-LIK-ti dah-bar-TI-nyay dar-BOH-vye-tyay",
"Suprantu. Kur matote save po penkerių metų?":"sup-rahn-TU. kur MAH-toh-teh sah-VEH poh pen-keh-RYOO meh-TOO",
"Laba diena. Kas jus vargina?":"LAH-bah dyeh-NAH. kahs YUS var-GI-nah",
"Ar kėlėte ką nors sunkaus? Ar sportuojate?":"ar KAY-lay-teh kaa nors sun-KAUS? ar spor-TWOH-yah-teh",
"Aišku. Greičiausiai patempėte raumenis. Ar skausmas plinta į koją?":"AISH-ku. gray-CHYAU-syai pah-TEM-pay-teh RAU-meh-nis. ar SKAUS-mahs PLIN-tah ee KOH-yaa",
"Gerai. Išrašysiu tepalą ir pratimus. Dvi savaites nekelkite nieko sunkaus.":"geh-RAI. ish-rah-SHEE-syu TEH-pah-laa ir prah-TI-mus. DVI sah-VAI-tes neh-KEL-ki-teh NYEH-koh sun-KAUS",
"Galite, bet kas valandą atsistokite ir pajudėkite. Sveikatos!":"GAH-li-teh, bet kahs VAH-lahn-daa aht-sis-TOH-ki-teh ir pah-yu-DAY-ki-teh. svay-KAH-tohs",
"Hmm, tai skamba gerai. Bet ne daugiau nei tris valandas vaikščiojimo per dieną!":"hmm, tai SKAHM-bah geh-RAI. bet neh dau-GYAU nay TRIS VAH-lahn-dahs vaiksh-chyoh-YI-moh per DYEH-naa",
"Atrodai pavargusi. Kas nutiko?":"aht-roh-DAI pah-var-GU-si. kahs nu-TI-koh",
"Žinoma. Bet tik rytoj, šiandien turiu susitikimą.":"ZHI-noh-mah. bet tik ree-TOY, SHYAHN-dyen tu-RYU su-si-ti-KI-maa",
"Sutarta. Ir nepamiršk šiandien išeiti laiku.":"su-tar-TAH. ir neh-pah-MIRSHK SHYAHN-dyen ish-AY-ti lai-KU",
"O, labas. Nemaniau, kad paskambinsi.":"oh, LAH-bahs. neh-mah-NYAU, kahd pahs-KAHM-bin-si",
"Laukiau tavęs visą vakarą. Galėjai bent parašyti.":"lau-KYAU tah-VAYS VI-saa VAH-kah-raa. gah-LAY-yai bent pah-rah-SHEE-ti",
"O ne… Kaip ji dabar?":"oh NEH. kaip yi dah-BAR",
"Gerai, atleidžiu. Ir linkiu mamai greitai pasveikti.":"geh-RAI, aht-LAY-jyu. ir lin-KYU mah-MAI gray-TAI pahs-VAYK-ti",
"Galime pakeisti ausines naujomis arba išsiųsti į servisą.":"GAH-li-meh pah-KAYS-ti au-SI-nes nau-yoh-MIS AR-bah ish-SYOOS-ti ee ser-VI-saa",
"Gerai, kadangi praėjo mažiau nei keturiolika dienų, galime grąžinti pinigus. Prašau pasirašyti čia.":"geh-RAI, KAH-dahn-gi prah-AY-yoh mah-ZHYAU nay keh-tu-RYOH-li-kah dye-NOO, GAH-li-meh graa-ZHIN-ti PI-ni-gus. prah-SHAU pah-si-rah-SHEE-ti CHYAH",
"Labas vakaras, kaimyne. Ar kažkas atsitiko?":"LAH-bahs VAH-kah-rahs, kai-MEE-neh. ar KAHZH-kahs aht-si-TI-koh",
"Nežinojau. Bet tai labai sena obelis, mano tėvas ją sodino.":"neh-zhi-NOH-yau. bet tai lah-BAI seh-NAH oh-beh-LIS, MAH-noh TAY-vahs yaa SOH-di-noh",
"Gera mintis. Rudenį, po derliaus, nupjausiu. O obuoliai, kurie nukris pas jus, – jūsų.":"geh-RAH min-TIS. RU-deh-nee, poh DER-lyaus, nup-YAU-syu. oh oh-bwoh-LYAI, ku-RYEH nu-KRIS pahs YUS, YOO-soo",
"Nebegaliu. Darbe viskas taip nuobodu, o vadovas manęs negirdi. Galvoju mesti darbą.":"neh-beh-gah-LYU. dar-BEH VIS-kahs taip nwoh-boh-DU, oh vah-DOH-vahs mah-NAYS neh-gir-DI. gahl-VOH-yu MES-ti DAR-baa",
"Dar ne. Bet turiu santaupų trims mėnesiams.":"dar NEH. bet tu-RYU sahn-tau-POO TRIMS may-neh-SYAHMS",
"Gal tu ir teisi. Bet kartais jaučiuosi taip blogai.":"gahl tu ir tay-SI. bet KAR-tais YAU-chyoh-si taip bloh-GAI",
"Gerai, pabandysiu. Ačiū, kad išklausei.":"geh-RAI, pah-bahn-DEE-syu. AA-chyoo, kahd ish-klau-SAY"})
json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False)
p='a2-units-words.json';w=json.load(open(p,encoding='utf-8'))
w.update({"rūpinuosi":"I look after","butu":"the flat (with)","penkiasdešimt":"fifty","pasirašyčiau":"I signed (if)","dvejiems":"two (for)","metams":"years (for)","atsiųskite":"send","paštu":"by post","gavau":"I got","joje":"in it","priskaičiavo":"they charged","skambučius":"calls","užsienį":"abroad","neskambinau":"I didn’t call","laikau":"I keep","savimi":"myself (with)","pinigus":"money","atsiųsti":"to send","patvirtinimą":"a confirmation","kitose":"other (in)","šalyse":"countries (in)","uždraudė":"banned","automobilius":"cars","leidimų":"permits","žmonėms":"people (for)","negalia":"disability","stiprybė":"strength","kantrybė":"patience","žmones":"people","ramiai":"calmly","konfliktus":"conflicts","stengiuosi":"I try hard","pati":"myself (a woman)","deleguoti":"to delegate","atsakomybės":"responsibility","tikiuosi":"I hope","skyriui":"a department","atsikeliu":"I get up","praeitą":"last","nešiau":"I carried","baldus":"furniture","kraustėmės":"we were moving house","apačioje":"at the bottom","kompiuterio":"the computer","patikrinti":"to check","lentelėse":"in the tables","padėsiu":"I will help","graikija":"Greece","paplūdimyje":"on the beach","kalnus":"the mountains","rastume":"we found (if)","vietą":"a place","kroatija":"Croatia","vaikščiotume":"we would walk","kalnuose":"in the mountains","gulėtume":"we would lie","šįvakar":"this evening","paieškosiu":"I will look for","rasa":"Rasa (a name)","neatėjau":"I didn’t come","gimtadienį":"birthday","teisi":"right (a woman)","turėjau":"I had (to)","susirgo":"fell ill","nepasikartos":"won’t happen again","išgerkime":"let’s have (a drink)","vaišinu":"my treat","pirkau":"I bought","šias":"these","ausines":"headphones","nebeveikia":"don’t work any more","atgauti":"to get back","norėjau":"I wanted","obelį":"apple tree","šakos":"branches","auga":"grow","kiemą":"yard","užstoja":"block","neauga":"don’t grow","kirsti":"to cut down","nupjauti":"to cut off","šakas":"branches","iškepsiu":"I will bake","pyragą":"a cake","jus":"you","pavaišinsiu":"I will treat","ieškočiau":"I would look for","išeičiau":"I would leave","pabandyk":"try","vadovu":"the boss (with)","prašom":"you’re welcome","pranešk":"let (me) know","sekėsi":"it went"})
json.dump(w,open(p,'w',encoding='utf-8'),ensure_ascii=False)
print('ok')
