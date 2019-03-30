import LH_SOUL from './LH_SOUL';
import LD_SOUL from './LD_SOUL';

export default class SOUL {
  constructor(Set_Soul_CB) {
    console.log("PlaceLog. Constructor SOUL");

    //1. Get Liturgia de les hores data
    new LH_SOUL(this.receiveLHSoul.bind(this, Set_Soul_CB));
  }

  receiveLHSoul(Set_Soul_CB, liturgia_hores, info_cel) {
    //2. Get Liturgia diària
    new LD_SOUL(this.receiveLDSoul.bind(this, Set_Soul_CB, liturgia_hores, info_cel));
  }

  receiveLDSoul(Set_Soul_CB, liturgia_hores, info_cel, liturgia_diaria){
    Set_Soul_CB(liturgia_hores, info_cel, liturgia_diaria);
  }
}