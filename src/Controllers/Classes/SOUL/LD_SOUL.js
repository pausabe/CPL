import DBAdapter from '../../../Adapters/DBAdapter';

export default class LD_SOUL {
    constructor(Set_Soul_CB) {
        console.log("PlaceLog. Constructor LD_SOUL");

        this.acceso = new DBAdapter();
        this.makeQueryies(Set_Soul_CB);
    }

    makeQueryies(Set_Soul_CB) {
        Set_Soul_CB(Fake_Values());
    }
}

function Fake_Values() {
    return {
        Lectura1: "Isaïes 49,3.5-6",
        Lectura1Cita: "T’he fet llum de tots els pobles perquè la meva salvació",
        Lectura1Titol: "Lectura del llibre d’Isaïes",
        Lectura1Text: "El Senyor em digué: «Ets el meu servent, Israel, estic orgullós de tu». El Senyor mha format des del si de la mare perquè fos el seu servent i fes tornar el poble de Jacob, li reunís el poble dIsrael; mhe sentit honorat davant el Senyor, i el meu Déu ha estat la meva glòria; però ara ell em diu: «És massa poc que siguis el meu servent per restablir les tribus de Jacob i fer tornar els supervivents dIsrael; the fet llum de tots els pobles perquè la meva salvació arribi dun cap a laltre de la terra».",
        Salm: "Salm 39,2 i 4ab.7.8-9.10 (R.: 8a i 9a)",
        SalmText: "Tenia posada lesperança en el Senyor,\ni ell, inclinant-se cap a mi,\nha inspirat als meus llavis un càntic nou,\nun himne de lloança al nostre Déu.\n\nR. Aquí em teniu: Déu meu, vull fer la vostra voluntat.\n\nPerò vós no voleu oblacions ni sacrificis,\ni mheu parlat a cau dorella;\nno exigiu lholocaust ni lexpiació. R.\n\nPer això us dic: «Aquí em teniu:\ncom està escrit de mi en el llibre,\nDéu meu, vull fer la vostra voluntat,\nguardo la vostra llei al fons del cor». R.\n\nAnuncio amb goig la salvació\ndavant el poble en dia de gran festa.\nNo puc deixar danunciar-la,\nho sabeu prou, Senyor. R.",
        Lectura2: "1 Corintis 1,1-3",
        Lectura2Cita: "Us desitjo la gràcia i la pau de Déu, el nostre Pare,\ni de Jesucrist, el Senyor",
        Lectura2Titol: "Comença la primera carta de sant Pau als cristians de Corint",
        Lectura2Text: "Pau, que per voler de Déu ha estat cridat a ser apòstol de Jesucrist, i el seu germà Sòstenes, a la comunitat de Déu que és a Corint, als santificats en Jesucrist, cridats a ser-li consagrats, en unió amb tots els qui pertot arreu invoquen el nom de Jesucrist, el nostre Senyor i el dells.\nUs desitjo la gràcia i la pau de Déu, el nostre Pare, i de Jesucrist, el Senyor.",
        Alleluia: "Joan 1,14a.12a",
        AlleluiaText: "El qui és la Paraula es va fer home\ni plantà entre nosaltres el seu tabernacle.\nA tots els qui lhan rebut,\nels concedeix poder ser fills de Déu.",
        Evangeli: "Joan 1,29-34",
        EvangeliCita: "Mireu l’Anyell de Déu, que pren damunt seu el pecat del món",
        EvangeliTitol: "Lectura de l’evangeli segons sant Joan",
        EvangeliText: "En aquell temps, Joan veié que Jesús venia i digué: «Mireu lanyell de Déu, que pren damunt seu el pecat del món. És aquell de qui jo deia: Després de mi ve un home que mha passat davant, perquè, abans que jo, ell ja existia. Jo no sabia qui era, però vaig venir a batejar amb aigua perquè ell es manifestés a Israel». Després Joan testificà: «He vist que lEsperit baixava del cel com un colom i es posava damunt dell. Jo no sabia qui era, però el qui menvià a batejar amb aigua em digué: «Aquell sobre el qual veuràs que lEsperit baixa i es posa és el qui bateja amb lEsperit Sant». Jo ho he vist, i dono testimoniatge que aquest és el Fill de Déu»."
    }
}