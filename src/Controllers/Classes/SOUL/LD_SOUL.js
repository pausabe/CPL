import DBAdapter from '../../../Adapters/DBAdapter';
import GF from '../../../Globals/GlobalFunctions';

export default class LD_SOUL {
    constructor(Set_Soul_CB) {
        console.log("PlaceLog. Constructor LD_SOUL");

        this.acceso = new DBAdapter();
        this.makeQueryies(Set_Soul_CB);
    }

    makeQueryies(Set_Soul_CB) {
        var DBRow = DefaultValues();

        var isFeria = (G_VALUES.celType == '-' && (G_VALUES.LT == 'A_FERIES' || G_VALUES.LT == 'N_OCTAVA' || G_VALUES.LT == 'N_ABANS'));

        if (G_VALUES.celType == 'M' || G_VALUES.celType == 'S' || G_VALUES.celType == 'F' || isFeria) {
            //Dies festius -> IsSpecialDay
            var day = GF.calculeDia(G_VALUES.date, G_VALUES.diocesi, G_VALUES.diaMogut, G_VALUES.diocesiMogut);
            var specialResultId = this.IsSpecialDay(day); //Returns -1 if not special day

            this.acceso.getLDSantoral(
                day,
                specialResultId,
                G_VALUES.celType,
                isFeria ? 'Especial' : G_VALUES.tempsespecific,
                G_VALUES.ABC,
                G_VALUES.diaDeLaSetmana,
                G_VALUES.parImpar,
                G_VALUES.setmana,
                (result) => {
                    DBRow = result;
                    Set_Soul_CB(DBRow);
                });
        }
        else {
            //Dies no festius -> LDDiumenges
            this.acceso.getLDNormal(
                G_VALUES.tempsespecific,
                G_VALUES.ABC,
                G_VALUES.diaDeLaSetmana,
                G_VALUES.setmana,
                G_VALUES.parImpar,
                (result) => {
                    DBRow = result;
                    Set_Soul_CB(DBRow);
                });
        }
    }

    IsSpecialDay(day) {
        //G_VALUES.date, G_VALUES.LT, G_VALUES.setmana, G_VALUES.pentacosta, G_VALUES.celType

        //TODO: do not repeat same code than LH_SOUL.js


        //Dijous després de Pentecosta par (031)
        //santsSolemnitats F - Dijous després de Pentecosta (Jesucrist, gran sacerdot per sempre)
        if (celType === 'F') {
            var granSacerdot = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate() + 4);
            console.log("InfoLog. granSacerdot: " + granSacerdot);
            if (date.getDate() === granSacerdot.getDate() && date.getMonth() === granSacerdot.getMonth() &&
                date.getFullYear() === granSacerdot.getFullYear()) {
                var precAux = 8;
                if (precAux < this.prec) this.prec = precAux;
                return 52;
            }
        }



        //Dijous després de Pentecosta impar (032)
        //Dissabte de la tercera setmana després de Pentecosta (033)
        //Dissabte abans del primer diumenge de setembre (102)
        //Dilluns després de Pentecosta par (111)
        //Dilluns després de Pentecosta impar (112)
        //Diumenge dins l’Octava de Nadal A (146)
        //Diumenge dins l’Octava de Nadal B (149)
        //Diumenge dins l’Octava de Nadal C (152)
        //Diumenge després del dia 6 de gener A (157)
        //Diumenge després del dia 6 de gener B (158)
        //Diumenge després del dia 6 de gener C (159)
        //Diumenge després de Pentecosta A (160)
        //Diumenge després de Pentecosta B (161)
        //Diumenge després de Pentecosta C (162)
        //Diumenge després de la Santíssima Trinitat A (163)
        //Diumenge després de la Santíssima Trinitat B (164)
        //Diumenge després de la Santíssima Trinitat C (165)
        //Divendres de la tercera setmana després de Pentecosta (Divendres després de Corpus) A (166)
        //Divendres de la tercera setmana després de Pentecosta (Divendres després de Corpus) B (167)
        //Divendres de la tercera setmana després de Pentecosta (Divendres després de Corpus) C (168)
        //Dissabte abans de Pentecosta A (191)
        //Dissabte abans de Pentecosta B (192)
        //Dissabte abans de Pentecosta C (193)
        return '-1';
    }
}

function DefaultValues() {
    return {
        Gloria: '-',
        Lectura1: "-",
        Lectura1Cita: "-",
        Lectura1Titol: "-",
        Lectura1Text: "-",
        Salm: "-",
        SalmText: "-",
        Lectura2: "-",
        Lectura2Cita: "-",
        Lectura2Titol: "-",
        Lectura2Text: "-",
        Alleluia: "-",
        AlleluiaText: "-",
        Evangeli: "-",
        EvangeliCita: "-",
        EvangeliTitol: "-",
        EvangeliText: "-",
        credo: '-'
    }
}