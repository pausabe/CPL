//import GLOBAL from '../Globals/Globals';

module.exports = {
  testState: false, //fer-ho amb iphone 8 sense console i memories lliures actives
  initialDayTest: {
    day: 2,
    month: 0,
    year: 2017,
  },
  finalDayTest: {
    day: 28,
    month: 11,
    year: 2017,
  },
  /*today: new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day),
  initalIndex: 0, //0-30
  finalIndex: 30, //0-30
  diocesiTest: this.nextDiocesi(this.initalIndex),
  diocesiNameTest: this.nextDiocesiName(this.initalIndex),
  llocTest: this.nextLloc(this.initalIndex),
  idTest: this.initalIndex,
  maxIdTest: this.finalIndex,

  testThisDay(variables, cbRefresh){
    var nextDay = variables.date;
    nextDay.setDate(nextDay.getDate()+1);
    if(nextDay.getFullYear() === this.finalDayTest.year &&
      nextDay.getMonth() === this.finalDayTest.month &&
      nextDay.getDate() === this.finalDayTest.day){
        if(this.idTest === this.maxIdTest){
          this.setState({testInfo: "Test ended correctly"});
          // console.log("-------------------------------->>>TEST ENDS<<<--------------------------------");
        }
        else{
          firstDay = new Date(this.initialDayTest.year,this.initialDayTest.month,this.initialDayTest.day);
          this.idTest += 1;
          this.diocesiTest = this.nextDiocesi(this.idTest);
          this.diocesiNameTest = this.nextDiocesiName(this.idTest);
          this.llocTest = this.nextLloc(this.idTest);
          auxTomorrow = new Date();
          auxTomorrow.setFullYear(this.initialDayTest.year);
          auxTomorrow.setMonth(this.initialDayTest.month);
          auxTomorrow.setDate(this.initialDayTest.day+1);
          this.dataTomorrow.date = auxTomorrow;
          this.refreshEverything(firstDay);
          this.setState({testInfo: "Testing correctly"});
          // console.log("--------------------------------:::NEXT DIÒCESI: "+this.idTest+" -> "+this.diocesiTest+" - "+firstDay+":::--------------------------------");
        }
    }
    else{
      dtDay = this.dataTomorrow.date.getDate();
      dtMonth = this.dataTomorrow.date.getMonth();
      dtYear = this.dataTomorrow.date.getFullYear();
      // console.log("TEST. Error");
      // console.log("this.dataTomorrow.date NO SET: " + this.dataTomorrow.date);
      // console.log("dtDay: " + dtDay);
      // console.log("dtMonth: " + dtMonth);
      // console.log("dtYear: " + dtYear);
      auxTomorrow = new Date(dtYear,dtMonth,dtDay);
      // console.log("auxTomorrow NO SET: " + auxTomorrow);
      auxTomorrow.setDate(auxTomorrow.getDate()+1);
      // console.log("auxTomorrow SET: " + auxTomorrow);
      this.dataTomorrow.date = auxTomorrow;
      while(this.passDayTest(nextDay)){
        // console.log("-----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - PASS DAY: "+nextDay+"-----------------------------------");
        nextDay.setDate(nextDay.getDate()+1);
        auxTomorrow = this.dataTomorrow.date;
        auxTomorrow.setDate(auxTomorrow.getDate()+1);
        this.dataTomorrow.date = auxTomorrow;
      }
      // console.log("-----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - NEXT DAY: "+nextDay+"-----------------------------------");
      this.refreshEverything(nextDay);
      this.setState({testInfo: "Testing correctly"});
    }
  },*/

  nextDiocesi(index){
    switch (index) {
      case 0:
        return 'BaD';
        break;
      case 1:
        return 'BaV';
        break;
      case 2:
        return 'BaC';
        break;
      case 3:
        return 'GiD';
        break;
      case 4:
        return 'GiV';
        break;
      case 5:
        return 'GiC';
        break;
      case 6:
        return 'LlD';
        break;
      case 7:
        return 'LlV';
        break;
      case 8:
        return 'LlC';
        break;
      case 9:
        return 'SFD';
        break;
      case 10:
        return 'SFV';
        break;
      case 11:
        return 'SFC';
        break;
      case 12:
        return 'SoD';
        break;
      case 13:
        return 'SoV';
        break;
      case 14:
        return 'SoC';
        break;
      case 15:
        return 'TaD';
        break;
      case 16:
        return 'TaV';
        break;
      case 17:
        return 'TaC';
        break;
      case 18:
        return 'TeD';
        break;
      case 19:
        return 'TeV';
        break;
      case 20:
        return 'TeC';
        break;
      case 21:
        return 'ToD';
        break;
      case 22:
        return 'ToV';
        break;
      case 23:
        return 'ToC';
        break;
      case 24:
        return 'UrD';
        break;
      case 25:
        return 'UrV';
        break;
      case 26:
        return 'UrC';
        break;
      case 27:
        return 'ViD';
        break;
      case 28:
        return 'ViV';
        break;
      case 29:
        return 'ViC';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  },

  nextDiocesiName(index){
    switch (index) {
      case 0:
      case 1:
      case 2:
        return 'Barcelona';
        break;
      case 3:
      case 4:
      case 5:
        return 'Girona';
        break;
      case 6:
      case 7:
      case 8:
        return 'Lleida';
        break;
      case 9:
      case 10:
      case 11:
        return 'Sant Feliu de Llobregat';
        break;
      case 12:
      case 13:
      case 14:
        return 'Solsona';
        break;
      case 15:
      case 16:
      case 17:
        return 'Tarragona';
        break;
      case 18:
      case 19:
      case 20:
        return 'Terrassa';
        break;
      case 21:
      case 22:
      case 23:
        return 'Tortosa';
        break;
      case 24:
      case 25:
      case 26:
        return 'Urgell';
        break;
      case 27:
      case 28:
      case 29:
        return 'Vic';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  },

};
