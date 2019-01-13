import { Reload_LH_Data } from './LitHorManager.js';
import { Reload_LD_Data } from './LitDirManager.js';

/************
 * Class in charge of having all the data that will be shown in views. 
 * Also, to refreshed when necessary.
 * DataManager will posses LitHoresManager and LitDiaManager. So, this class 
 * is the only way to get and refresh all the data. 
 * DataManager uses singleton pattern in order to be accessible to other classes being 
 * just one instance in the whole program.
 ***********/

 //Global values
 G_VALUES = {}
 //Liturgia de les Hores values
 LH_VALUES = {}
 //Liturgia diària values
 LD_VALUES = {}

 export function Reload_All_Data(){
    LH_VALUES = Reload_LH_Data();
    LD_VALUES = Reload_LD_Data();
 }