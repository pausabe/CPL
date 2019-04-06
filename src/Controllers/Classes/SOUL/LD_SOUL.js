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
                Vespers: false
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
                    Set_Soul_CB(Object.entries(part_row_extra_visperas).length > 0? Object.assign(result, part_row_extra_visperas) : result);
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
                    Set_Soul_CB(Object.entries(part_row_extra_visperas).length > 0? Object.assign(result, part_row_extra_visperas) : result);
                });
        }
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
