import DBAdapter from '../../../Adapters/DBAdapter';
import GF from '../../../Globals/GlobalFunctions';

export default class LD_SOUL {
    constructor(Set_Soul_CB) {
        console.log("PlaceLog. Constructor LD_SOUL");

        this.acceso = new DBAdapter();
        this.makeQueryies(Set_Soul_CB);
    }

    makeQueryies(Set_Soul_CB) {
        //var DBRow = DefaultValues();

        //TODO: agafar aquí les vísperas (en cas de ser dissabte). Precedeix aquelles especials marcades amb Categoria V (comprovar via codi per aconseguir la id)
        var part_row_extra_visperas = {
            Vespers: G_VALUES.date.getDay() === 6,
            GloriaVespers: '-',
            Lectura1Vespers: "-",
            Lectura1CitaVespers: "-",
            Lectura1TitolVespers: "-",
            Lectura1TextVespers: "-",
            SalmVespers: "-",
            SalmTextVespers: "-",
            Lectura2Vespers: "-",
            Lectura2CitaVespers: "-",
            Lectura2TitolVespers: "-",
            Lectura2TextVespers: "-",
            AlleluiaVespers: "-",
            AlleluiaTextVespers: "-",
            EvangeliVespers: "-",
            EvangeliCitaVespers: "-",
            EvangeliTitolVespers: "-",
            EvangeliTextVespers: "-",
            credoVespers: '-'
        }

        var isFeria = (G_VALUES.celType == '-' && (G_VALUES.LT == 'A_FERIES' || G_VALUES.LT == 'N_OCTAVA' || G_VALUES.LT == 'N_ABANS'));

        if (G_VALUES.celType == 'M' || G_VALUES.celType == 'S' || G_VALUES.celType == 'F' || isFeria) {
            //Dies festius -> IsSpecialDay
            var day = GF.calculeDia(G_VALUES.date, G_VALUES.diocesi, G_VALUES.diaMogut, G_VALUES.diocesiMogut);
            var specialResultId = this.IsSpecialDay(); //Returns -1 if not special day

            console.log("what tha huve", specialResultId);

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
                    Set_Soul_CB(Object.assign(result, part_row_extra_visperas));
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
                    Set_Soul_CB(Object.assign(result, part_row_extra_visperas));
                });
        }
    }

    IsSpecialDay() {
        //TODO: I should not repeat the same code of LH_SOUL.js

        //Dijous després de Pentecosta I (0031) II (032)
        //santsSolemnitats F - Dijous després de Pentecosta (Jesucrist, gran sacerdot per sempre)
        var granSacerdot = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 4);
        if (G_VALUES.date.getDate() === granSacerdot.getDate() && G_VALUES.date.getMonth() === granSacerdot.getMonth() &&
            G_VALUES.date.getFullYear() === granSacerdot.getFullYear()) {
            return G_VALUES.paroimpar == 'I' ? '031' : '032';
        }

        //Dissabte de la tercera setmana després de Pentecosta (033)
        //santsMemories M - Dissabte de la tercera setmana després de Pentecosta (COR IMMACULAT DE LA BENAURADA VERGE MARIA)
        var corImmaculat = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 20);
        if (G_VALUES.date.getDate() === corImmaculat.getDate() && G_VALUES.date.getMonth() === corImmaculat.getMonth() &&
            G_VALUES.date.getFullYear() === corImmaculat.getFullYear()) {
            return '033';
        }

        //Dissabte abans del primer diumenge de setembre (102)
        //santsSolemnitats S - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
        var auxDay = new Date();
        auxDay.setFullYear(G_VALUES.date.getFullYear());
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
        var cinta = new Date(G_VALUES.date.getFullYear(), 8, dies);
        if (G_VALUES.date.getDate() === cinta.getDate() && G_VALUES.date.getMonth() === cinta.getMonth() &&
            G_VALUES.date.getFullYear() === cinta.getFullYear()) {
            return '102';
        }

        //Dilluns després de Pentecosta I (111) II (112)
        //santsMemories M - Dilluns despres de Pentecosta (Benaurada Verge Maria, Mare de l’Església)
        var benaurada = new Date(G_VALUES.pentacosta.getFullYear(), G_VALUES.pentacosta.getMonth(), G_VALUES.pentacosta.getDate() + 1);
        if (G_VALUES.date.getDate() === benaurada.getDate() && G_VALUES.date.getMonth() === benaurada.getMonth() &&
            G_VALUES.date.getFullYear() === benaurada.getFullYear()) {
            return G_VALUES.paroimpar == 'I' ? '111' : '112';
        }

        //Diumenge dins l’Octava de Nadal A (146) B (149) C (152)
        if (G_VALUES.date.getMonth() == 11 && G_VALUES.date.getDay() == 0 && G_VALUES.date.getDate() >= 26 && G_VALUES.date.getDate() <= 31) {
            switch (G_VALUES.ABC) {
                case 'A':
                    return '146';
                case 'B':
                    return '149';
                case 'C':
                    return '152';
            }
        }

        //Diumenge després del dia 6 de gener A (157) B (158) C (159)
        if (G_VALUES.date.getMonth() == 0 && G_VALUES.date.getDay() == 0 && G_VALUES.date.getDate() >= 7 && G_VALUES.date.getDate() <= 13) {
            switch (G_VALUES.ABC) {
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
        if (G_VALUES.date.getDate() === trinitat.getDate() && G_VALUES.date.getMonth() === trinitat.getMonth() &&
            G_VALUES.date.getFullYear() === trinitat.getFullYear()) {
            switch (G_VALUES.ABC) {
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
        if (G_VALUES.date.getDate() === cosSang.getDate() && G_VALUES.date.getMonth() === cosSang.getMonth() &&
            G_VALUES.date.getFullYear() === cosSang.getFullYear()) {
            switch (G_VALUES.ABC) {
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
        if (G_VALUES.date.getDate() === sagratCor.getDate() && G_VALUES.date.getMonth() === sagratCor.getMonth() &&
            G_VALUES.date.getFullYear() === sagratCor.getFullYear()) {
            switch (G_VALUES.ABC) {
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

/*function DefaultValues() {
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
}*/