import DBAdapter from '../../../Adapters/DBAdapter';

export default class LD_SOUL {
    constructor(Set_Soul_CB) {
        console.log("PlaceLog. Constructor LD_SOUL");

        this.acceso = new DBAdapter();
        this.makeQueryies(Set_Soul_CB);
    }

    makeQueryies(Set_Soul_CB) {
        var DBRow = DefaultValues();

        if(G_VALUES.celType == 'M' || G_VALUES.celType == 'S' || G_VALUES.celType == 'F'){
            //Dies festius -> LDSantoral
            //var day = this.calculeDia(G_VALUES.date, G_VALUES.diocesi, G_VALUES.diaMogut, G_VALUES.diocesiMogut);
            /*this.acceso.getLDSantoral(
                        G_VALUES.tempsespecific,
                        G_VALUES.cicle,
                        G_VALUES.diaDeLaSetmana,
                        G_VALUES.setmana,
                        G_VALUES.parImpar,
                        (result) => {
                DBRow = result;
                Set_Soul_CB(DBRow);
            });*/
        }
        else{
            //Dies no festius -> LDDiumenges
            this.acceso.getLDNormal(
                        G_VALUES.tempsespecific,
                        G_VALUES.cicle,
                        G_VALUES.diaDeLaSetmana,
                        G_VALUES.setmana,
                        G_VALUES.parImpar,
                        (result) => {
                DBRow = result;
                Set_Soul_CB(DBRow);
                });
        }
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