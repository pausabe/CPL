import DBAdapter from '../../../Adapters/DBAdapter';
import GF from '../../../Globals/GlobalFunctions';

export default class LD_SOUL {
    constructor(Set_Soul_CB) {
        console.log("PlaceLog. Constructor LD_SOUL");

        this.acceso = new DBAdapter();
        this.makeQueryies(Set_Soul_CB);
    }

    makeQueryies(Set_Soul_CB) {
        try {
            var today_date = G_VALUES.date;
            var today_string = GF.calculeDia(today_date, G_VALUES.diocesi, G_VALUES.diaMogut, G_VALUES.diocesiMogut);

            var idSpecialVespers = this.GetSpecialVespers(today_date, today_string, G_VALUES.ABC);

            var part_row_extra_visperas = {
                Vespers: false,
                VetllaPasqua: false,
            }

            if (idSpecialVespers == '-1') {
                if (today_date.getDay() === 6) {
                    var tomorrow_date = new Date(today_date.getFullYear(), today_date.getMonth(), today_date.getDate() + 1);
                    var tomorrow_string = GF.calculeDia(tomorrow_date, G_VALUES.diocesi, G_VALUES.dataTomorrow.diaMogut, G_VALUES.dataTomorrow.diocesiMogut);

                    this.GetLiturgia(
                        tomorrow_date,
                        tomorrow_string,
                        {},
                        G_VALUES.dataTomorrow.celType,
                        G_VALUES.dataTomorrow.tempsespecific,
                        G_VALUES.dataTomorrow.ABC,
                        G_VALUES.dataTomorrow.diaDeLaSetmana,
                        G_VALUES.dataTomorrow.parImpar,
                        G_VALUES.dataTomorrow.setmana,
                        G_VALUES.dataTomorrow.LT,
                        (result) => {
                            console.log("tomorrow result:", result);

                            part_row_extra_visperas = {
                                Vespers: true,
                                VetllaPasqua: false,
                                GloriaVespers: result.Gloria,
                                Lectura1Vespers: result.Lectura1,
                                Lectura1CitaVespers: result.Lectura1Cita,
                                Lectura1TitolVespers: result.Lectura1Titol,
                                Lectura1TextVespers: result.Lectura1Text,
                                SalmVespers: result.Salm,
                                SalmTextVespers: result.SalmText,
                                Lectura2Vespers: result.Lectura2,
                                Lectura2CitaVespers: result.Lectura2Cita,
                                Lectura2TitolVespers: result.Lectura2Titol,
                                Lectura2TextVespers: result.Lectura2Text,
                                AlleluiaVespers: result.Alleluia,
                                AlleluiaTextVespers: result.AlleluiaText,
                                EvangeliVespers: result.Evangeli,
                                EvangeliCitaVespers: result.EvangeliCita,
                                EvangeliTitolVespers: result.EvangeliTitol,
                                EvangeliTextVespers: result.EvangeliText,
                                credoVespers: result.credo
                            }
                            this.GetLiturgia(
                                today_date,
                                today_string,
                                part_row_extra_visperas,
                                G_VALUES.celType,
                                G_VALUES.tempsespecific,
                                G_VALUES.ABC,
                                G_VALUES.diaDeLaSetmana,
                                G_VALUES.parImpar,
                                G_VALUES.setmana,
                                G_VALUES.LT,
                                Set_Soul_CB);
                        });
                }
                else {
                    this.GetLiturgia(
                        today_date,
                        today_string,
                        part_row_extra_visperas,
                        G_VALUES.celType,
                        G_VALUES.tempsespecific,
                        G_VALUES.ABC,
                        G_VALUES.diaDeLaSetmana,
                        G_VALUES.parImpar,
                        G_VALUES.setmana,
                        G_VALUES.LT,
                        Set_Soul_CB);
                }
            }
            else {
                this.acceso.getVispers(
                    idSpecialVespers,
                    (result) => {
                        part_row_extra_visperas = {
                            Vespers: true,
                            VetllaPasqua: false,
                            GloriaVespers: result.Gloria,
                            Lectura1Vespers: result.Lectura1,
                            Lectura1CitaVespers: result.Lectura1Cita,
                            Lectura1TitolVespers: result.Lectura1Titol,
                            Lectura1TextVespers: result.Lectura1Text,
                            SalmVespers: result.Salm,
                            SalmTextVespers: result.SalmText,
                            Lectura2Vespers: result.Lectura2,
                            Lectura2CitaVespers: result.Lectura2Cita,
                            Lectura2TitolVespers: result.Lectura2Titol,
                            Lectura2TextVespers: result.Lectura2Text,
                            AlleluiaVespers: result.Alleluia,
                            AlleluiaTextVespers: result.AlleluiaText,
                            EvangeliVespers: result.Evangeli,
                            EvangeliCitaVespers: result.EvangeliCita,
                            EvangeliTitolVespers: result.EvangeliTitol,
                            EvangeliTextVespers: result.EvangeliText,
                            credoVespers: result.credo
                        }
                        this.GetLiturgia(
                            today_date,
                            today_string,
                            part_row_extra_visperas,
                            G_VALUES.celType,
                            G_VALUES.tempsespecific,
                            G_VALUES.ABC,
                            G_VALUES.diaDeLaSetmana,
                            G_VALUES.parImpar,
                            G_VALUES.setmana,
                            G_VALUES.LT,
                            Set_Soul_CB);
                    });
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    }

    GetLiturgia(
        today_date,
        today_string,
        part_row_extra_visperas,
        celType,
        tempsespecific,
        ABC,
        diaDeLaSetmana,
        parImpar,
        setmana,
        LT,
        Set_Soul_CB) {
        var isFeria = (celType == '-' && (LT == 'A_FERIES' || LT == 'N_OCTAVA' || LT == 'N_ABANS'));

        if (G_VALUES.dataTomorrow.LT == "Q_DIUM_PASQUA") {
            var vetlla_pasqual_data = this.GetVetllaPasqual(ABC);
            Set_Soul_CB(vetlla_pasqual_data);
        }
        else {
            if (celType == 'M' || celType == 'S' || celType == 'F' || isFeria) {
                //Dies festius -> IsSpecialDay
                var specialResultId = this.IsSpecialDay(today_date, parImpar, ABC); //Returns -1 if not special day

                console.log("what tha huve", specialResultId);

                this.acceso.getLDSantoral(
                    today_string,
                    specialResultId,
                    celType,
                    isFeria ? 'Especial' : tempsespecific,
                    ABC,
                    diaDeLaSetmana,
                    parImpar,
                    setmana,
                    (result) => {
                        Set_Soul_CB((result != undefined && Object.entries(part_row_extra_visperas).length > 0) ? Object.assign(result, part_row_extra_visperas) : result);
                    });
            }
            else {
                //Dies no festius -> LDDiumenges
                this.acceso.getLDNormal(
                    tempsespecific,
                    ABC,
                    diaDeLaSetmana,
                    setmana,
                    parImpar,
                    (result) => {
                        Set_Soul_CB((result != undefined && Object.entries(part_row_extra_visperas).length > 0) ? Object.assign(result, part_row_extra_visperas) : result);
                    });
            }
        }
    }

    GetVetllaPasqual(ABC) {
        var globalPart = {
            Vespers: false,
            VetllaPasqua: true,
            Lectura1: "Gn 1,1–2,2",
            Lectura1Cita: "Déu veié tot el que havia fet, i era bo de debò",
            Lectura1Titol: "Lectura del llibre del Gènesi",
            Lectura1Text: "Al principi Déu creà el cel i la terra. La terra era un món buit i sense cap ordre, tota la superfície de l’oceà era coberta de foscor i un vent de Déu batia les ales sobre les aigües. Déu digué: «Que existeixi la llum». I la llum existí. Déu veié que la llum era bona de debò. Déu la separà de la foscor i donà a la llum el nom de «dia», i a la foscor, el de «nit». Hi hagué un vespre i un matí, i fou el primer dia.\nDéu digué: «Que hi hagi un firmament entremig de les aigües per separar unes aigües de les altres». I va ser així. Déu va fer el firmament i separà les aigües que hi ha sota de les de sobre el firmament. Déu veié que el firmament era bo, i li donà el nom de «cel». Hi hagué un vespre i un matí, i fou el segon dia. Déu digué: «Que les aigües de sota el cel es reuneixin totes en un indret i apareguin els continents». I va ser així. I Déu donà als continents el nom de «terra», i a les aigües, el de «mar». Déu ho veié, i era bo.\nDéu digué: «Que la terra produeixi la vegetació: herbes que facin llavor i arbres fruiters de tota mena que donin fruit amb la seva llavor per tota la terra». I va ser així. La terra produí la vegetació, les herbes de tota mena que fan la seva llavor i els arbres de tota mena que donen fruit amb la seva llavor. Déu ho veié i era bo. Hi hagué un vespre i un matí, i fou el tercer dia.\nDéu digué: «Que hi hagi al firmament del cel uns llumeners que separin el dia de la nit, i assenyalin les festivitats, els dies i els anys i, des del firmament del cel, il·luminin la terra». I va ser així. Déu va fer els dos astres gegants: un de més gran que regnés sobre el dia, i un de més petit que governés la nit; va fer també les estrelles. Déu els col·locà al firmament del cel perquè il·luminessin la terra, regnessin sobre el dia i la nit i separessin la llum de la foscor. Déu ho veié i era bo. Hi hagué un vespre i un matí, i fou el quart dia.\nDéu digué: «Que les aigües produeixin éssers vius que hi nedin, i animals alats que volin sobre la terra, ran del firmament del cel». I va ser així. Déu creà els grans monstres marins, éssers vius de tota mena que neden dins de l’aigua i totes les menes de bestioles alades. Déu ho veié, i era bo. Llavors Déu els beneí dient-los: «Sigueu fecunds, multipliqueu-vos i ompliu les aigües dels mars, i que els ocells i les bestioles alades es multipliquin a la terra». Hi hagué un vespre i un matí, i fou el cinquè dia. Déu digué: «Que la terra produeixi éssers vius de tota mena: bestioles i tota mena d’animals domèstics i feréstecs». I va ser així. Déu va fer tota mena d’animals feréstecs i domèstics i tota mena de cucs i bestioles. Déu ho veié, i era bo.\nDéu digué també: «Fem l’home a imatge nostra, semblant a nosaltres, i que tingui sotmesos els peixos del mar, els ocells i els animals domèstics i feréstecs i totes les bestioles que s’arrosseguen per terra». Déu creà l’home a la seva imatge, el creà a imatge de Déu; creà l’home i la dona. Déu els beneí dient-los: «Sigueu fecunds, multipliqueu-vos, ompliu la terra i domineu-la; tingueu sotmesos els peixos del mar, els ocells del cel i tots els animals que s’arrosseguen per terra». Déu digué encara: «Us dono totes les herbes que granen per tota la terra, i tots els arbres que donen fruit amb la seva llavor; seran el vostre aliment. I a tots els animals feréstecs, a tots els ocells del cel i a totes les bestioles que s’arrosseguen per terra, a tots els éssers vius, els dono l’herba verda per aliment». I va ser així. Déu veié tot el que havia fet, i era bo de debò. Hi hagué un vespre i un matí, i fou el sisè dia.\nAixí quedaren acabats el cel i la terra amb tots els estols que s’hi mouen. Déu acabà la seva obra al sisè dia, i al dia setè reposà de tota l’obra que havia fet.",
            Salm1: "103,1-2a.5-6.10 i 12.13-14.24 i 35c (R.: 30)",
            Salm1Text: "Beneeix el Senyor, ànima meva.\nSenyor, Déu meu, que en sou de gran.\nAneu vestit d’esplendor i de majestat,\nus embolcalla la llum com un mantell.\n\nR. Quan envieu el vostre alè, reneix la creació,\ni renoveu la vida sobre la terra.\n\nAssentàreu la terra sobre uns fonaments,\nincommovible per segles i segles.\nLa cobríreu amb el mantell dels oceans,\nles aigües sepultaven les muntanyes. R.\n\nDe les fonts, en feu brollar torrents,\nque s’escolen entre les muntanyes;\na les seves ribes nien els ocells,\nrefilen entre les branques. R.\n\nDes del vostre palau regueu les muntanyes,\nsacieu la terra de pluges del cel;\nfeu néixer l’herba per al bestiar\nque treballa al servei de l’home. R.\n\nQue en són de variades, Senyor, les vostres obres,\ni totes les heu fetes amb saviesa.\nLa terra és plena de les vostres criatures.\nBeneeix el Senyor, ànima meva. R.",
            Lectura2: "Gn 22,1-13.15-18",
            Lectura2Cita: "Sacrifici d’Abraham, el nostre pare en la fe",
            Lectura2Titol: "Lectura del llibre del Gènesi",
            Lectura2Text: `En aquells dies, Déu, per posar a prova Abraham, el cridà: «Abraham». Ell respongué: «Aquí em teniu». Déu li digué: «Pren, si et plau, Isaac, el teu fill únic, que tant estimes, ves-te’n al país de Morià, i allà, dalt de la muntanya que jo t’indicaré, sacrifica’l en holocaust».\nAbraham es llevà de bon matí, guarní l’ase, prengué dos mossos i el seu fill Isaac, estellà la llenya per al foc de l’holocaust i es posà en camí cap a l’indret que Déu li havia dit. Al tercer dia Abraham alçà els ulls i veié de lluny l’indret. Llavors digué als mossos: «Quedeu-vos aquí amb l’ase; jo i el noi ens arribarem allà, i tornarem quan haurem adorat». Abraham carregà la llenya de l’holocaust a les espatlles del seu fill Isaac, i ell portava el foc i el ganivet. I començaren tots dos a caminar. Isaac digué a Abraham el seu pare: «Escolta, pare». Abraham respongué: «Què vols, fill meu?». Li diu Isaac: «Tenim el foc i la llenya per a l’holocaust, però, l’anyell on és?». Abraham li respon: «Déu mateix es proveirà d’anyell per a l’holocaust, fill meu». I continuaren caminant tots dos.\nArribats a l’indret que Déu havia indicat a Abraham, hi aixecà l’altar, apilà la llenya, lligà el seu fill, Isaac, i el posà a l’altar, sobre la llenya.\nLlavors Abraham agafà el ganivet per degollar el seu fill. Però l’àngel del Senyor el cridà des del cel: «Abraham, Abraham». Ell li respongué: «Aquí em teniu». L’àngel li digué: «Deixa estar el noi, no li facis res. Ja veig que reverencies Déu, tu que no m’has refusat el teu fill únic». Llavors Abraham alçà els ulls i veié un moltó agafat per les banyes a una bardissa. Hi anà, el prengué i el sacrificà en holocaust en lloc del seu fill. A aquell indret, Abraham li donà el nom de «El-Senyor-es-proveeix». Per això, encara avui, la gent diu: «A la muntanya el Senyor es proveeix». L’àngel del Senyor tornà a cridar Abraham des del cel i li digué: «Escolta l’oracle del Senyor: "Ja que has fet això de no refusar - me el teu fill únic, juro per mi mateix que t’ompliré de benediccions i faré que la teva descendència sigui tan nombrosa com les estrelles del cel i com els grans de sorra de les platges de la mar; els teus descendents heretaran les ciutats dels seus enemics, i tots els nadius del país, per beneir - se, es valdran de la teva descendència, perquè has obeït el que jo t’havia manat"».`,
            Salm2: "15,5 i 8.9-10.11 (R.: 1)",
            Salm2Text: "Senyor, heretat meva i calze meu,\nvós m’heu triat la possessió.\nSempre tinc present el Senyor;\namb ell a la dreta, mai no cauré.\n\nR. Guardeu-me, Déu meu, en vós trobo refugi.\n\nEl meu cor se n’alegra i en faig festa tot jo,\nfins el meu cos reposa confiat:\nno abandonareu la meva vida enmig dels morts,\nni deixareu caure a la fossa el qui us estima. R.\n\nM’ensenyareu el camí que duu a la vida:\njoia i festa a desdir a la vostra presència;\nal costat vostre, delícies per sempre. R.",
            Lectura3: "Ex 14,15–15,1a",
            Lectura3Cita: "Els israelites caminaren per terra eixuta enmig del mar",
            Lectura3Titol: "Lectura del llibre de l’Èxode",
            Lectura3Text: "En aquells dies, el Senyor digué a Moisès: «Per què aquests crits d’auxili? Ordena als israelites que es posin en marxa, i tu alça la vara, estén la mà cap al mar i es partirà en dos perquè els israelites caminin per terra eixuta, enmig del mar. Jo faré que els egipcis s’obstinin a penetrar-hi darrere d’ells. I mostraré el meu poder sobre el Faraó i sobre tot el seu exèrcit, sobre els seus carros de guerra i els seus soldats. I Egipte sabrà que soc el Senyor, quan la meva glòria s’haurà manifestat en el Faraó, en els seus carros i en els seus soldats». L’àngel de Déu que caminava davant la formació d’Israel es posà a caminar al seu darrere, i també la columna que tenien al davant es posà al darrere i se situà entre la formació dels egipcis i la d’Israel. Hi havia el núvol i la fosca, però el núvol il·luminà la nit. En tota la nit les dues formacions no s’acostaren l’una a l’altra. Moisès estengué la mà cap al mar, i el Senyor, amb un vent fortíssim de llevant, que durà tota la nit, va fer retirar la mar i la convertí en terra eixuta. Les aigües es partiren i els israelites entraren caminant per terra eixuta enmig del mar, amb l’aigua com una muralla a dreta i esquerra. Els egipcis intentaren perseguir-los, i tota la cavalleria del Faraó, amb els carros i els guerrers, entraren darrera d’ells en el llit de la mar.\nA la matinada, el Senyor, des de la columna de foc i de núvol, posà la mirada sobre la formació dels egipcis i hi sembrà la confusió: encallà les rodes dels carros i feia que les tropes avancessin a pas feixuc. Els egipcis digueren: «Fugim del combat! El Senyor lluita a favor d’Israel contra els egipcis». Llavors el Senyor digué a Moisès: «Estén la mà cap al mar: que se’n tornin les aigües i cobreixin els egipcis, els seus carros i els guerrers». Moisès estengué la mà cap al mar, i de bon matí, quan el mar se’n tornava al seu lloc de sempre, es trobà amb els egipcis que fugien, i el Senyor precipità els egipcis al mig del mar. Les aigües que se’n tornaven cobriren els carros amb els seus guerrers. De totes les tropes del Faraó que havien penetrat darrere els israelites en el llit de la mar no en quedà ni un sol home. Però els israelites havien caminat per terra eixuta enmig del mar, amb l’aigua com una muralla a dreta i esquerra.\nAquell dia el Senyor salvà Israel de les mans dels egipcis i els israelites veieren els egipcis morts a la platja. Quan els israelites veieren la gran gesta que el Senyor havia obrat contra Egipte, tot el poble sentí un gran respecte pel Senyor i cregueren en ell i en el seu servent Moisès. Llavors Moisès i els israelites entonaren aquest càntic en honor del Senyor.\n\n[Després d’aquesta lectura no es diu «Paraula de Déu»]",
            Salm3: "Ex 15,1-2.3-4.5-6.17-18 (R.: 1a)",
            Salm3Text: "Cantem al Senyor per la seva gran victòria,\nha tirat al mar cavalls i cavallers.\nDel Senyor em ve la glòria i el triomf,\nés ell qui m’ha salvat. És el meu Déu, i jo l’he de lloar;\nés el Déu del meu pare, i jo l’he d’enaltir!\n\nR. Cantem al Senyor per la seva gran victòria.\n\nEl Senyor és un gran guerrer,\nel seu nom és el Senyor!\nHa tirat al mar els carros del Faraó,\nels millors combatents s’han enfonsat al mar Roig. R.\n\nEls han cobert les onades\ni han baixat al fons com un roc.\nLa vostra dreta, Senyor, té un poder magnífic,\nla vostra dreta, Senyor, ha desfet l’enemic. R.\n\nFeu entrar el vostre poble a la muntanya,\nplanteu-lo a la vostra heretat,\nal lloc on heu posat el vostre tron,\nal santuari que han construït les vostres mans.\nEl Senyor serà rei per sempre més! R.",
            Lectura4: "Is 54,5-14",
            Lectura4Cita: "El Senyor que t’ha reclamat t’estima amb un amor etern",
            Lectura4Titol: "Lectura del llibre d’Isaïes",
            Lectura4Text: "El teu creador s’ha fet el teu marit, el seu nom és El-Senyor-de-l’univers; t’ha rehabilitat el Sant d’Israel, anomenat Déu-de-tota-la-terra. El Senyor t’ha cridat com qui crida l’esposa abandonada que s’enyora. Pot ser repudiada l’esposa de la joventut?, diu el teu Déu. Jo t’havia abandonat per poca estona, però ara et recobro amb un afecte immens. En una flamarada d’indignació t’havia amagat un moment la meva mirada, però ara t’estimo amb un amor etern, diu el Senyor, el qui t’ha reclamat. Faré com vaig fer en els dies de Noè: Llavors vaig jurar que l’aiguat de Noè no inundaria mai més la terra; ara juro que no m’irritaré ni t’amenaçaré mai més. Ni que desapareguin les muntanyes i se somoguin els turons, no desapareixerà l’amor que jo et tinc ni se somourà el meu pacte de pau, diu el Senyor, el qui t’estima. Oh pobra, batuda per les tempestes, desolada. Faré reposar els teus carreus sobre una roca d’antimoni, i et donaré uns fonaments de safir; faré de robins els teus merlets, les teves portes de carboncle i tot el teu recinte de pedres precioses. Tots els qui et reconstruiran treballaran instruïts pel Senyor i serà gran el benestar dels teus fills. Quedaràs sòlidament restaurada, voltada d’estimació, lluny de tota amenaça: no hauràs de témer per res; lluny de tot terror: no s’acostarà vora teu.",
            Salm4: "29,2 i 4.5-6.11 i 12a i 13b (R.: 2a)",
            Salm4Text: "Amb quin goig us exalço, Senyor!\nM’heu tret a flor d’aigua quan m’ofegava,\ni no heu permès que s’alegrin els enemics.\nSenyor, m’heu arrencat de la terra dels morts,\nquan ja m’hi enfonsava, m’heu tornat la vida.\n\nR. Amb quin goig us exalço, Senyor.\n\nCanteu al Senyor els qui l’estimeu,\nenaltiu la seva santedat!\nEl seu rigor dura un instant;\nel seu favor, tota la vida.\nCap al tard tot eren plors,\nl’endemà són crits de joia. R.\n\nEscolteu, Senyor, compadiu-vos de mi;\najudeu-me, Senyor.\nHeu mudat en joia les meves penes.\nSenyor, Déu meu, us lloaré per sempre. R.",
            Lectura5: "Is 55,1-11",
            Lectura5Cita: "Veniu a mi, i us saciareu de vida. Pactaré amb vosaltres una aliança eterna",
            Lectura5Titol: "Lectura del llibre d’Isaïes",
            Lectura5Text: "Això diu el Senyor: «Oh, tots els assedegats, veniu a l’aigua, veniu, els qui no teniu diners, compreu i mengeu, compreu llet i vi sense diners, sense pagar res. Per què perdeu els diners comprant un pa que no alimenta, i malgasteu els vostres guanys en menjars que no satisfan? Escolteu bé, i tastareu cosa bona, i us delectareu assaborint el bo i millor. Estigueu atents, veniu a mi, i us saciareu de vida. Pactaré amb vosaltres una aliança eterna, els favors irrevocables promesos a David. Vaig fer-lo testimoni davant els pobles, sobirà i legislador de nacions. Cridaràs una nació que tu no coneixies, i aquesta nació, sense conèixer-te, vindrà corrents, buscant el Senyor, el teu Déu, el sant d’Israel, que t’ha honorat.\nCerqueu el Senyor, ara que es deixa trobar, invoqueu-lo ara que és a prop. Que els injustos abandonin els seus camins, i els homes malèfics, els seus propòsits; que es converteixin al Senyor i s’apiadarà d’ells, que tornin al nostre Déu, tan generós a perdonar. Perquè els meus pensaments no són els vostres, i els vostres camins no són els meus, diu l’oracle del Senyor. Els meus camins i els meus pensaments estan per damunt dels vostres, tant com la distància del cel a la terra.\nAixí com la pluja i la neu cauen del cel i no hi tornen, sinó que amaren la terra, la fecunden i la fan germinar, fins que dona el gra per a la sembra i el pa per a menjar, així serà la paraula que surt del meus llavis: no tornarà infecunda, sense haver fet el que jo volia i haver complert la missió que jo li havia confiat».",
            Salm5: "Is 12,2.3-4bcd.5-6 (R.: 3)",
            Salm5Text: "Tot jo tinc set de Déu, del Déu que m’és vida;\nquan podré veure Déu cara a cara?\n\nR. Com la cérvola es deleix per l’aigua viva,\ntambé em deleixo jo per vós, Déu meu.\n\nRecordo com en altres temps\nvenia amb colles d’amics\ncap a la casa de Déu,\nenmig d’un aplec festiu,\namb crits d’alegria i de lloança. R.\n\nEnvieu-me la llum i la veritat;\nque elles em guiïn,\nque em duguin a la muntanya sagrada,\nal lloc on residiu. R.\n\nI m’acostaré a l’altar de Déu,\na Déu, que és la meva alegria;\nho celebraré i us lloaré amb la cítara,\nSenyor, Déu meu. R.",
            Lectura6: "Ba 3,9-15.32–4,4",
            Lectura6Cita: "Avança pel camí que condueix a la claror del Senyor",
            Lectura6Titol: "Lectura del llibre de Baruc",
            Lectura6Text: "Escolta, Israel, els preceptes de vida, estigues atent i aprendràs la prudència. Què ho fa, Israel, que et trobes en país enemic i t’has fet vell en una terra que no és teva, que tothom evita el teu contacte com evitaria el contacte d’un difunt, i et tracta igual que si fossis al país dels morts? És que has abandonat la font de la Saviesa. Si haguessis seguit el camí de Déu, hauries viscut en pau per sempre. Aprèn on es troba la prudència, on és el vigor, on és la intel·ligència, i coneixeràs al mateix temps on es troba la vida llarga i bona, on és la llum dels ulls i la pau. Però, qui ha descobert l’indret de la prudència? Qui ha penetrat a les cambres on guarda els tresors? Només la coneix el qui ho sap tot. És ell qui l’ha trobada amb el seu enteniment. Ell ha agençat la terra per sempre i l’ha poblada d’animals; quan envia la llum, ella se’n va; quan la crida, ella l’obeeix tremolant; les estrelles brillaven al lloc on es ponen, celebrant allà la seva festa; ell les cridà i li respongueren: «Aquí ens teniu», i amb alegria brillaven per al seu creador.\nEll és el nostre Déu, ningú no se li pot comparar. I és ell qui ha descobert tots els camins de la Saviesa i l’ha donada a Jacob, el seu servent, a Israel, el seu estimat. Després d’això s’aparegué aquí a la terra, on convisqué amb els homes. És això el llibre dels manaments de Déu, la llei que perdura per sempre més. Tots els qui la guarden s’encaminen a la vida, però els qui l’abandonen moriran. Retorna, poble de Jacob, i apodera-te’n, avança pel camí que condueix a la claror de la seva llum. No donis a un altre poble la teva glòria, no cedeixis el teu privilegi a una gent forastera. Que en som de feliços nosaltres, poble d’Israel! Nosaltres coneixem com hem d’agradar a Déu.",
            Salm6: "18,8.9.10.11 (R.: Jo 6,68b)",
            Salm6Text: "És perfecta la llei del Senyor,\ni l’ànima hi descansa;\nés ferm el que el Senyor disposa,\ndona seny als ignorants.\nR. Senyor, vós teniu paraules de vida eterna.\nEls preceptes del Senyor són planers,\nomplen el cor de goig;\nels manaments del Senyor són transparents,\nil·luminen els ulls. R.\nVenerar el Senyor és cosa santa,\nes manté per sempre;\nels determinis del Senyor són ben presos,\ntots són justíssims. R.\nSón més desitjables que l’or fi,\nmés que l’or a mans plenes;\nsón més dolços que la mel\nregalimant de la bresca. R.",
            Lectura7: "Ez 36,16-17a.18-28",
            Lectura7Cita: "Abocaré sobre vosaltres aigua pura i us donaré un cor nou",
            Lectura7Titol: "Lectura de la profecia d’Ezequiel",
            Lectura7Text: `El Senyor em va fer sentir la seva paraula i em digué: «Fill d’home, quan la casa d’Israel habitava el seu territori, el profanà amb el seu comportament i amb tot el que feia. Llavors vaig abocar sobre ells el meu rigor per la sang que havien vessat sobre aquella terra que ells havien profanat amb els seus ídols. Els vaig dispersar entre els pobles estrangers, els vaig escampar per diversos països en pena del seu comportament i de tot el que feien. Entre els pobles estrangers on anaren profanaren el meu nom, fent que diguessin d’ells: "Aquest era el poble del Senyor, i s’ha vist obligat a abandonar el seu país". Llavors m’ha dolgut de veure el meu sant nom profanat per la casa d’Israel entre els pobles estrangers on anaren. Per això digues a la casa d’Israel: Això diu el Senyor el teu Déu: "No obraré perquè vosaltres ho hàgiu merescut, casa d’Israel, sinó per consideració al meu sant nom, que vosaltres heu profanat entre els pobles estrangers on anàreu.Jo santificaré el meu nom, que ha quedat profanat entre els pobles estrangers, després que vosaltres l’heu profanat entre ells.I quan jo manifestaré en vosaltres la meva santedat, als ulls dels pobles estrangers, sabran que jo soc el Senyor Déu.Us prendré d’entre els pobles estrangers, us aplegaré de tots els països i us faré venir a la vostra terra.Abocaré sobre vosaltres aigua pura perquè sigueu purs de tota màcula i de tots els vostres ídols.Us donaré un cor nou i posaré un esperit nou dins vostre; trauré de vosaltres aquest cor de pedra i us en donaré un de carn.Posaré dins vostre el meu esperit i faré que seguiu els meus decrets, que compliu i observeu les meves decisions.Habitareu el país que vaig donar als vostres pares.Vosaltres sereu el meu poble, i jo seré el vostre Déu"».`,
            Salm7: "41,3.5bcd;42,3.4 (R.: 41,2)",
            Salm7Text: "Tot jo tinc set de Déu, del Déu que m’és vida;\nquan podré veure Déu cara a cara?\n\nR. Com la cérvola es deleix per l’aigua viva,\ntambé em deleixo jo per vós, Déu meu.\n\nRecordo com en altres temps\nvenia amb colles d’amics\ncap a la casa de Déu,\nenmig d’un aplec festiu,\namb crits d’alegria i de lloança. R.\n\nEnvieu-me la llum i la veritat;\nque elles em guiïn,\nque em duguin a la muntanya sagrada,\nal lloc on residiu. R.\n\nI m’acostaré a l’altar de Déu,\na Déu, que és la meva alegria;\nho celebraré i us lloaré amb la cítara,\nSenyor, Déu meu. R.",
            LecturaApostol: "Rm 6,3-11",
            LecturaApostolCita: "Crist, un cop ressuscitat d’entre els morts, ja no mor més",
            LecturaApostolTitol: "Lectura de la carta de sant Pau als cristians de Roma",
            LecturaApostolText: "Germans, tots els qui hem estat batejats en Jesucrist hem estat submergits en la seva mort. Pel baptisme hem estat sepultats amb ell en la mort, perquè, tal com Crist, gràcies al poder admirable del Pare, va ser ressuscitat d’entre els morts, també nosaltres emprenguem una nova vida. I si nosaltres hem estat plantats vora d’ell per aquesta mort semblant a la seva, també hem de ser-ho per la resurrecció. Queda ben clar: l’home que érem abans ha estat crucificat amb ell, perquè el cos pecador perdi el seu domini i d’ara endavant no sigueu esclaus del pecat: els qui són morts queden desvinculats del pecat.\nI si hem mort amb Crist, creiem que també viurem amb ell. I sabem que Crist, un cop ressuscitat d’entre els morts, ja no mor més, la mort ja no té cap poder sobre d’ell. Quan ell morí, morí al pecat una vegada per sempre, però ara que viu, viu per a Déu. Igualment vosaltres, penseu que sou morts pel que fa al pecat, però viviu per a Déu en Jesucrist.",
            Alleluia: "Salm 117,1-2.16ab-17,22-23",
            AlleluiaText: "Enaltiu el Senyor: Que n’és de bo,\nperdura eternament el seu amor.\nQue respongui la casa d’Israel:\nperdura eternament el seu amor.\n\nR. Al·leluia, al·leluia, al·leluia.\n\nLa dreta del Senyor fa proeses,\nla dreta del Senyor em glorifica.\nNo moriré, viuré encara,\nper contar les proeses del Senyor. R.\n\nLa pedra que rebutjaven els constructors\nara corona l’edifici.\nÉs el Senyor qui ho ha fet,\ni els nostres ulls se’n meravellen. R.",
        }
        var differentPart;
        switch (ABC) {
            case 'A':
                differentPart = {
                    Evangeli: "Mt 28,1-10",
                    EvangeliCita: "Ha ressuscitat i anirà davant vostre a Galilea",
                    EvangeliTitol: "Lectura de l’evangeli segons sant Mateu",
                    EvangeliText: "Passat el dissabte, quan ja clarejava el matí del diumenge, Maria Magdalena i l’altra Maria anaren a veure el sepulcre. De cop i volta se sentí un gran terratrèmol: un àngel del Senyor, baixat del cel, havia fet rodolar la pedra i s’hi havia assegut. Resplendia com un llamp i el seu vestit era blanc com la neu. Va ser tan gran el sobresalt dels guardes, que de l’esglai quedaren com morts. L’àngel del Senyor digué a les dones: «No tingueu por, vosaltres. Sé que busqueu Jesús, el crucificat. No hi és, aquí. Ha ressuscitat tal com ho havia predit. Veniu a veure el lloc on havia estat posat, i aneu de seguida a dir als deixebles: Ha ressuscitat d’entre els morts i anirà davant vostre a Galilea; allà el veureu. Mireu que jo us ho he dit». Immediatament elles, amb por, però amb una gran alegria, se n’anaren corrents del sepulcre per anunciar-ho als deixebles. Jesús els sortí al pas i les saludà dient-los: «Déu vos guard». Elles se li acostaren, se li abraçaren als peus i l’adoraren. Jesús els digué. «No tingueu por. Aneu a dir als meus germans que vagin a Galilea i que allà em veuran».",
                }
                break;
            case 'B':
                differentPart = {
                    Evangeli: "Mc 16,1-8",
                    EvangeliCita: "Jesús de Natzaret, el crucificat, ha ressuscitat",
                    EvangeliTitol: "Lectura de l’evangeli segons sant Marc",
                    EvangeliText: "Acabat el repòs del dissabte, Maria Magdalena, Maria, la mare de Jaume, i Salomé compraren espècies aromàtiques per anar a ungir el cos de Jesús. El diumenge, molt de matí, arribaren al sepulcre a la sortida del sol. Entre elles preguntaven: «Qui ens farà rodolar la pedra que tanca l’entrada del sepulcre?». Llavors alçaren els ulls i s’adonaren que la pedra ja havia estat apartada. Era una pedra realment molt grossa. Entraren al sepulcre, veieren, assegut a la dreta, un jove vestit de blanc, i s’esglaiaren. Ell els diu: «No tingueu por. Busqueu Jesús de Natzaret, el crucificat. Ha ressuscitat, no hi és, aquí. Mireu el lloc on l’havien posat. I ara aneu a dir als deixebles i a Pere que anirà davant vostre a Galilea; allà el veureu, tal com ell us ho havia dit». Elles sortiren del sepulcre i fugiren. Tremolaven d’esglai i, de por que tenien, no s’atreviren a dir res a ningú.",
                }
                break;
            case 'C':
                differentPart = {
                    Evangeli: "Lc 24,1-12",
                    EvangeliCita: "Per què busqueu entre els morts aquell que viu?",
                    EvangeliTitol: "Lectura de l’evangeli segons sant Lluc",
                    EvangeliText: "El diumenge, molt de matí, les dones anaren al sepulcre amb les espècies aromàtiques que havien preparat. Trobaren que la pedra havia estat apartada de l’entrada del sepulcre. Hi entraren, però no trobaren el cos de Jesús, el Senyor. Mentre es preguntaven què havia passat, se’ls presentaren dos homes amb vestits resplendents. Esglaiades, s’inclinaren amb la cara fins a terra, i ells els digueren: «Per què busqueu entre els morts aquell que viu? No hi és, aquí: ha ressuscitat. Recordeu com us parlava quan era a Galilea, i us deia que el Fill de l’home havia de ser entregat a uns homes pecadors, que havia de ser crucificat i que, al tercer dia, havia de ressuscitar». Llavors es recordaren del que Jesús havia predit. Se’n tornaren del sepulcre i anunciaren tot això als onze i a tots els altres. Aquestes dones eren Maria Magdalena, Joana, i Maria, mare de Jaume. També les altres que eren amb elles els ho deien. Però als apòstols aquesta història els semblà una quimera, i no se les cregueren. Pere se n’anà corrents al sepulcre, s’ajupí per mirar dintre i veié que no hi havia res més que el llençol d’amortallar tot aplanat, i se’n tornà a casa, preguntant- se amb estranyesa què podia haver passat.",
                }
                break;
        }

        return Object.assign(globalPart, differentPart);
    }

    GetSpecialVespers(today_date, today_string, ABC) {
        //(Dia abans) Naixement de sant Joan Baptista (036)
        if (today_string == '23-jun')
            return '036';

        //(Dia abans) Sants Pere i Pau, apòstols (038)
        if (today_string == '28-jun')
            return '038';

        //(Dia abans) Assumpció de la Benaurada Verge Maria (059)
        if (today_string == '14-ago')
            return '059';

        //(Dia abans) Nadal (142)
        if (today_string == '24-dic')
            return '142';

        //(Dia abans) Pentecosta A (191) B (192) C (193)
        var diaAbansPentecosta = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() - 1);
        if (today_date.getDate() === diaAbansPentecosta.getDate() && today_date.getMonth() === diaAbansPentecosta.getMonth() &&
            today_date.getFullYear() === diaAbansPentecosta.getFullYear()) {
            switch (ABC) {
                case 'A':
                    return '191';
                case 'B':
                    return '192';
                case 'C':
                    return '193';
            }
        }

        return '-1';
    }

    IsSpecialDay(today_date, paroimpar, ABC) {
        //TODO: I should not repeat the same code of LH_SOUL.js

        //Dijous després de Pentecosta I (0031) II (032)
        //santsSolemnitats F - Dijous després de Pentecosta (Jesucrist, gran sacerdot per sempre)
        var granSacerdot = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 4);
        if (today_date.getDate() === granSacerdot.getDate() && today_date.getMonth() === granSacerdot.getMonth() &&
            today_date.getFullYear() === granSacerdot.getFullYear()) {
            return paroimpar == 'I' ? '031' : '032';
        }

        //Dissabte de la tercera setmana després de Pentecosta (033)
        //santsMemories M - Dissabte de la tercera setmana després de Pentecosta (COR IMMACULAT DE LA BENAURADA VERGE MARIA)
        var corImmaculat = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 20);
        if (today_date.getDate() === corImmaculat.getDate() && today_date.getMonth() === corImmaculat.getMonth() &&
            today_date.getFullYear() === corImmaculat.getFullYear()) {
            return '033';
        }

        //Dissabte abans del primer diumenge de setembre (102)
        //santsSolemnitats S - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
        var auxDay = new Date();
        auxDay.setFullYear(today_date.getFullYear());
        auxDay.setMonth(8);
        auxDay.setDate(2);
        var b = true;
        var dies = 0;
        while (b && dies < 7) {
            if (auxDay.getDay() === 0) {
                b = false;
            }
            auxDay.setDate(auxDay.getDate() + 1)
            dies += 1;
        }
        var cinta = new Date(today_date.getFullYear(), 8, dies);
        if (today_date.getDate() === cinta.getDate() && today_date.getMonth() === cinta.getMonth() &&
            today_date.getFullYear() === cinta.getFullYear()) {
            return '102';
        }

        //Dilluns després de Pentecosta I (111) II (112)
        //santsMemories M - Dilluns despres de Pentecosta (Benaurada Verge Maria, Mare de l’Església)
        var benaurada = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 1);
        if (today_date.getDate() === benaurada.getDate() && today_date.getMonth() === benaurada.getMonth() &&
            today_date.getFullYear() === benaurada.getFullYear()) {
            return paroimpar == 'I' ? '111' : '112';
        }

        //Diumenge dins l’Octava de Nadal A (146) B (149) C (152)
        if (today_date.getMonth() == 11 && today_date.getDay() == 0 && today_date.getDate() >= 26 && today_date.getDate() <= 31) {
            switch (ABC) {
                case 'A':
                    return '146';
                case 'B':
                    return '149';
                case 'C':
                    return '152';
            }
        }

        //Diumenge després del dia 6 de gener A (157) B (158) C (159)
        if (today_date.getMonth() == 0 && today_date.getDay() == 0 && today_date.getDate() >= 7 && today_date.getDate() <= 13) {
            switch (ABC) {
                case 'A':
                    return '157';
                case 'B':
                    return '158';
                case 'C':
                    return '159';
            }
        }

        //Diumenge després de Pentecosta A (160) B (161) C (162)
        var trinitat = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 7);
        if (today_date.getDate() === trinitat.getDate() && today_date.getMonth() === trinitat.getMonth() &&
            today_date.getFullYear() === trinitat.getFullYear()) {
            switch (ABC) {
                case 'A':
                    return '160';
                case 'B':
                    return '161';
                case 'C':
                    return '162';
            }
        }

        //Diumenge després de la Santíssima Trinitat A (163) B (164) C (165)
        //Santíssim cos i sang de crist
        var cosSang = new Date(trinitat.getFullYear(), trinitat.getMonth(), trinitat.getDate() + 7);
        if (today_date.getDate() === cosSang.getDate() && today_date.getMonth() === cosSang.getMonth() &&
            today_date.getFullYear() === cosSang.getFullYear()) {
            switch (ABC) {
                case 'A':
                    return '163';
                case 'B':
                    return '164';
                case 'C':
                    return '165';
            }
        }

        //Divendres de la tercera setmana després de Pentecosta (Divendres després de Corpus) A (166) B (167) C (168)
        //Sagrat cor de Jesús
        var sagratCor = new Date(cosSang.getFullYear(), cosSang.getMonth(), cosSang.getDate() + 5);
        if (today_date.getDate() === sagratCor.getDate() && today_date.getMonth() === sagratCor.getMonth() &&
            today_date.getFullYear() === sagratCor.getFullYear()) {
            switch (ABC) {
                case 'A':
                    return '166';
                case 'B':
                    return '167';
                case 'C':
                    return '168';
            }
        }

        return '-1';
    }
}
