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

        if(G_VALUES.celType == 'M' || G_VALUES.celType == 'S' || G_VALUES.celType == 'F'){
            //Dies festius -> IsSpecialDay
            var day = GF.calculeDia(G_VALUES.date, G_VALUES.diocesi, G_VALUES.diaMogut, G_VALUES.diocesiMogut);
            var specialResultId = this.IsSpecialDay(day);

            this.acceso.getLDSantoral(
                    day,
                    specialResultId,
                    G_VALUES.celType,
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
        else{
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

    IsSpecialDay(day){
        //Exemple: Diuemge abans que nse que... retornar '0034'
        return "-1";
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