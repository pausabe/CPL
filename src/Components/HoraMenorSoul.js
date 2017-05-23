import { Platform } from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class TerciaSoul {
  constructor(props, TABLES, CEL, HS, SOUL) {

    this.makePrayer(props.date, props.liturgicProps, TABLES, CEL, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, CEL, HS, SOUL){
    this.state = {
      salteriComuHora: TABLES.salteriComuHora,
      tempsOrdinariOracions: TABLES.tempsOrdinariOracions,
      tempsQuaresmaComuFV: TABLES.tempsQuaresmaComuFV,
      tempsQuaresmaCendra: TABLES.tempsQuaresmaCendra,
      tempsQuaresmaVSetmanes: TABLES.tempsQuaresmaVSetmanes,
      tempsQuaresmaComuSS: TABLES.tempsQuaresmaComuSS,
      tempsQuaresmaRams: TABLES.tempsQuaresmaRams,
      tempsQuaresmaSetSanta: TABLES.tempsQuaresmaSetSanta,
      tempsQuaresmaTridu: TABLES.tempsQuaresmaTridu,
      tempsPasquaAA: TABLES.tempsPasquaAA,
      tempsPasquaOct: TABLES.tempsPasquaOct,
      tempsPasquaDA: TABLES.tempsPasquaDA,
      tempsPasquaSetmanes: TABLES.tempsPasquaSetmanes,
      tempsAdventNadalComu: TABLES.tempsAdventNadalComu,
      tempsAdventSetmanes: TABLES.tempsAdventSetmanes,
      tempsAdventFeries: TABLES.tempsAdventFeries,
      tempsNadalOctava: TABLES.tempsNadalOctava,
      tempsNadalAbansEpifania: TABLES.tempsNadalAbansEpifania,
      salteriComuEspPasquaDium: TABLES.salteriComuEspPasquaDium,
      diversos: TABLES.diversos,
      himneTerciaOrdinariLlati: TABLES.diversos.item(6).oracio,
      himneTerciaOrdinariCat: TABLES.diversos.item(7).oracio,
      himneSextaOrdinariLlati: TABLES.diversos.item(10).oracio,
      himneSextaOrdinariCat: TABLES.diversos.item(11).oracio,
      himneNonaOrdinariLlati: TABLES.diversos.item(14).oracio,
      himneNonaOrdinariCat: TABLES.diversos.item(15).oracio,
    }

    this.TERCIA = { //23
      himne: '',
      antifones: '',
      ant: '',
      ant1: '',
      titol1: '',
      com1: '',
      salm1: '',
      gloria1: '',
      ant2: '',
      titol2: '',
      com2: '',
      salm2: '',
      gloria2: '',
      ant3: '',
      titol3: '',
      com3: '',
      salm3: '',
      gloria3: '',
      vers: '',
      lecturaBreu: '',
      respV: '',
      respR: '',
      oracio: '',
    }

    this.SEXTA = { //23
      himne: '',
      antifones: '',
      ant: '',
      ant1: '',
      titol1: '',
      com1: '',
      salm1: '',
      gloria1: '',
      ant2: '',
      titol2: '',
      com2: '',
      salm2: '',
      gloria2: '',
      ant3: '',
      titol3: '',
      com3: '',
      salm3: '',
      gloria3: '',
      vers: '',
      lecturaBreu: '',
      respV: '',
      respR: '',
      oracio: '',
    }

    this.NONA = { //23
      himne: '',
      antifones: '',
      ant: '',
      ant1: '',
      titol1: '',
      com1: '',
      salm1: '',
      gloria1: '',
      ant2: '',
      titol2: '',
      com2: '',
      salm2: '',
      gloria2: '',
      ant3: '',
      titol3: '',
      com3: '',
      salm3: '',
      gloria3: '',
      vers: '',
      lecturaBreu: '',
      respV: '',
      respR: '',
      oracio: '',
    }

    this.himne(liturgicProps.LT, date.getDay(), liturgicProps.setmana, "Tèrcia");
    this.salmodia(liturgicProps.LT, liturgicProps.setmana, date.getDay(), liturgicProps.cicle, "Tèrcia");
    this.lecturaBreuResp(liturgicProps.LT, "Tèrcia");
    this.oracio(liturgicProps.LT, date.getDay(), "Tèrcia");

    SOUL.setSoul(HS, "tercia", this.TERCIA);

    this.himne(liturgicProps.LT, date.getDay(), liturgicProps.setmana, "Sexta");
    this.salmodia(liturgicProps.LT, liturgicProps.setmana, date.getDay(), liturgicProps.cicle, "Sexta");
    this.lecturaBreuResp(liturgicProps.LT, "Sexta");
    this.oracio(liturgicProps.LT, date.getDay(), "Sexta");

    SOUL.setSoul(HS, "sexta", this.SEXTA);

    this.himne(liturgicProps.LT, date.getDay(), liturgicProps.setmana, "Nona");
    this.salmodia(liturgicProps.LT, liturgicProps.setmana, date.getDay(), liturgicProps.cicle, "Nona");
    this.lecturaBreuResp(liturgicProps.LT, "Nona");
    this.oracio(liturgicProps.LT, date.getDay(), "Nona");

    SOUL.setSoul(HS, "nona", this.NONA);
  }

  himne(LT, weekDay, setmana, HM){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.himneTerciaOrdinariLlati;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.himneSextaOrdinariLlati;
              break;
            case 'Nona':
              this.NONA.himne = this.state.himneNonaOrdinariLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.himneTerciaOrdinariCat;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.himneSextaOrdinariCat;
              break;
            case 'Nona':
              this.NONA.himne = this.state.himneNonaOrdinariCat;
              break;
          }
        }
        break;
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsQuaresmaComuFV.himneTerciaLlati;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsQuaresmaComuFV.himneSextaLlati;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsQuaresmaComuFV.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsQuaresmaComuFV.himneTerciaCat;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsQuaresmaComuFV.himneSextaCat;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsQuaresmaComuFV.himneNonaCat;
              break;
          }
        }
        break;
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          this.TERCIA.himne = this.state.tempsQuaresmaComuSS.himneHoraLlati;
          this.SEXTA.himne = this.state.tempsQuaresmaComuSS.himneHoraLlati;
          this.NONA.himne = this.state.tempsQuaresmaComuSS.himneHoraLlati;
        }
        else{
          this.TERCIA.himne = this.state.tempsQuaresmaComuSS.himneHoraCat;
          this.SEXTA.himne = this.state.tempsQuaresmaComuSS.himneHoraCat;
          this.NONA.himne = this.state.tempsQuaresmaComuSS.himneHoraCat;
        }
        break;
      case GLOBAL.Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsQuaresmaTridu.himneLlatiTercia;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsQuaresmaTridu.himneLlatiSexta;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsQuaresmaTridu.himneLlatiNona;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsQuaresmaTridu.himneCatTercia;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsQuaresmaTridu.himneCatSexta;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsQuaresmaTridu.himneCatNona;
              break;
          }
        }
        break;
      case GLOBAL.P_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsPasquaAA.himneTerciaLlati;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsPasquaAA.himneSextaLlati;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsPasquaAA.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsPasquaAA.himneTerciaCat;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsPasquaAA.himneSextaCat;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsPasquaAA.himneNonaCat;
              break;
          }
        }
        break;
      case GLOBAL.P_SETMANES:
        if(setmana === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                this.TERCIA.himne = this.state.tempsPasquaDA.himneTerciaLlati;
                break;
              case 'Sexta':
                this.SEXTA.himne = this.state.tempsPasquaDA.himneSextaLlati;
                break;
              case 'Nona':
                this.NONA.himne = this.state.tempsPasquaDA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                this.TERCIA.himne = this.state.tempsPasquaDA.himneTerciaCat;
                break;
              case 'Sexta':
                this.SEXTA.himne = this.state.tempsPasquaDA.himneSextaCat;
                break;
              case 'Nona':
                this.NONA.himne = this.state.tempsPasquaDA.himneNonaCat;
                break;
            }
          }
        }
        else{
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                this.TERCIA.himne = this.state.tempsPasquaAA.himneTerciaLlati;
                break;
              case 'Sexta':
                this.SEXTA.himne = this.state.tempsPasquaAA.himneSextaLlati;
                break;
              case 'Nona':
                this.NONA.himne = this.state.tempsPasquaAA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                this.TERCIA.himne = this.state.tempsPasquaAA.himneTerciaCat;
                break;
              case 'Sexta':
                this.SEXTA.himne = this.state.tempsPasquaAA.himneSextaCat;
                break;
              case 'Nona':
                this.NONA.himne = this.state.tempsPasquaAA.himneNonaCat;
                break;
            }
          }
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_OCTAVA:
      case GLOBAL.N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsAdventNadalComu.himneTerciaLlati;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsAdventNadalComu.himneSextaLlati;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsAdventNadalComu.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.himne = this.state.tempsAdventNadalComu.himneTerciaCat;
              break;
            case 'Sexta':
              this.SEXTA.himne = this.state.tempsAdventNadalComu.himneSextaCat;
              break;
            case 'Nona':
              this.NONA.himne = this.state.tempsAdventNadalComu.himneNonaCat;
              break;
          }
        }
        break;
    }
  }

  salmodia(LT, setmana, weekDay, HM){
    this.TERCIA.antifones = true;
    this.SEXTA.antifones = true;
    this.NONA.antifones = true;
    switch(LT){
      case GLOBAL.O_ORDINARI:
        this.TERCIA.ant1 = this.state.salteriComuHora.ant1;
        this.TERCIA.titol1 = this.state.salteriComuHora.titol1;
        this.TERCIA.com1 = this.state.salteriComuHora.com1;
        this.TERCIA.salm1 = this.state.salteriComuHora.salm1;
        this.TERCIA.gloria1 = this.state.salteriComuHora.gloria1;
        this.TERCIA.ant2 = this.state.salteriComuHora.ant2;
        this.TERCIA.titol2 = this.state.salteriComuHora.titol2;
        this.TERCIA.com2 = this.state.salteriComuHora.com2;
        this.TERCIA.salm2 = this.state.salteriComuHora.salm2;
        this.TERCIA.gloria2 = this.state.salteriComuHora.gloria2;
        this.TERCIA.ant3 = this.state.salteriComuHora.ant3;
        this.TERCIA.titol3 = this.state.salteriComuHora.titol3;
        this.TERCIA.com3 = this.state.salteriComuHora.com3;
        this.TERCIA.salm3 = this.state.salteriComuHora.salm3;
        this.TERCIA.gloria3 = this.state.salteriComuHora.gloria3;

        this.SEXTA.ant1 = this.state.salteriComuHora.ant1;
        this.SEXTA.titol1 = this.state.salteriComuHora.titol1;
        this.SEXTA.com1 = this.state.salteriComuHora.com1;
        this.SEXTA.salm1 = this.state.salteriComuHora.salm1;
        this.SEXTA.gloria1 = this.state.salteriComuHora.gloria1;
        this.SEXTA.ant2 = this.state.salteriComuHora.ant2;
        this.SEXTA.titol2 = this.state.salteriComuHora.titol2;
        this.SEXTA.com2 = this.state.salteriComuHora.com2;
        this.SEXTA.salm2 = this.state.salteriComuHora.salm2;
        this.SEXTA.gloria2 = this.state.salteriComuHora.gloria2;
        this.SEXTA.ant3 = this.state.salteriComuHora.ant3;
        this.SEXTA.titol3 = this.state.salteriComuHora.titol3;
        this.SEXTA.com3 = this.state.salteriComuHora.com3;
        this.SEXTA.salm3 = this.state.salteriComuHora.salm3;
        this.SEXTA.gloria3 = this.state.salteriComuHora.gloria3;

        this.NONA.ant1 = this.state.salteriComuHora.ant1;
        this.NONA.titol1 = this.state.salteriComuHora.titol1;
        this.NONA.com1 = this.state.salteriComuHora.com1;
        this.NONA.salm1 = this.state.salteriComuHora.salm1;
        this.NONA.gloria1 = this.state.salteriComuHora.gloria1;
        this.NONA.ant2 = this.state.salteriComuHora.ant2;
        this.NONA.titol2 = this.state.salteriComuHora.titol2;
        this.NONA.com2 = this.state.salteriComuHora.com2;
        this.NONA.salm2 = this.state.salteriComuHora.salm2;
        this.NONA.gloria2 = this.state.salteriComuHora.gloria2;
        this.NONA.ant3 = this.state.salteriComuHora.ant3;
        this.NONA.titol3 = this.state.salteriComuHora.titol3;
        this.NONA.com3 = this.state.salteriComuHora.com3;
        this.NONA.salm3 = this.state.salteriComuHora.salm3;
        this.NONA.gloria3 = this.state.salteriComuHora.gloria3;
        break;
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.salteriComuHora.titol1;
        this.TERCIA.com1 = this.state.salteriComuHora.com1;
        this.TERCIA.salm1 = this.state.salteriComuHora.salm1;
        this.TERCIA.gloria1 = this.state.salteriComuHora.gloria1;
        this.TERCIA.titol2 = this.state.salteriComuHora.titol2;
        this.TERCIA.com2 = this.state.salteriComuHora.com2;
        this.TERCIA.salm2 = this.state.salteriComuHora.salm2;
        this.TERCIA.gloria2 = this.state.salteriComuHora.gloria2;
        this.TERCIA.titol3 = this.state.salteriComuHora.titol3;
        this.TERCIA.com3 = this.state.salteriComuHora.com3;
        this.TERCIA.salm3 = this.state.salteriComuHora.salm3;
        this.TERCIA.gloria3 = this.state.salteriComuHora.gloria3;

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.salteriComuHora.titol1;
        this.SEXTA.com1 = this.state.salteriComuHora.com1;
        this.SEXTA.salm1 = this.state.salteriComuHora.salm1;
        this.SEXTA.gloria1 = this.state.salteriComuHora.gloria1;
        this.SEXTA.titol2 = this.state.salteriComuHora.titol2;
        this.SEXTA.com2 = this.state.salteriComuHora.com2;
        this.SEXTA.salm2 = this.state.salteriComuHora.salm2;
        this.SEXTA.gloria2 = this.state.salteriComuHora.gloria2;
        this.SEXTA.titol3 = this.state.salteriComuHora.titol3;
        this.SEXTA.com3 = this.state.salteriComuHora.com3;
        this.SEXTA.salm3 = this.state.salteriComuHora.salm3;
        this.SEXTA.gloria3 = this.state.salteriComuHora.gloria3;

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.salteriComuHora.titol1;
        this.NONA.com1 = this.state.salteriComuHora.com1;
        this.NONA.salm1 = this.state.salteriComuHora.salm1;
        this.NONA.gloria1 = this.state.salteriComuHora.gloria1;
        this.NONA.titol2 = this.state.salteriComuHora.titol2;
        this.NONA.com2 = this.state.salteriComuHora.com2;
        this.NONA.salm2 = this.state.salteriComuHora.salm2;
        this.NONA.gloria2 = this.state.salteriComuHora.gloria2;
        this.NONA.titol3 = this.state.salteriComuHora.titol3;
        this.NONA.com3 = this.state.salteriComuHora.com3;
        this.NONA.salm3 = this.state.salteriComuHora.salm3;
        this.NONA.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.ant = this.state.tempsQuaresmaComuFV.antTercia;
            break;
          case 'Sexta':
            this.SEXTA.ant = this.state.tempsQuaresmaComuFV.antSexta;
            break;
          case 'Nona':
            this.NONA.ant = this.state.tempsQuaresmaComuFV.antNona;
            break;
        }
        break;
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.salteriComuHora.titol1;
        this.TERCIA.com1 = this.state.salteriComuHora.com1;
        this.TERCIA.salm1 = this.state.salteriComuHora.salm1;
        this.TERCIA.gloria1 = this.state.salteriComuHora.gloria1;
        this.TERCIA.titol2 = this.state.salteriComuHora.titol2;
        this.TERCIA.com2 = this.state.salteriComuHora.com2;
        this.TERCIA.salm2 = this.state.salteriComuHora.salm2;
        this.TERCIA.gloria2 = this.state.salteriComuHora.gloria2;
        this.TERCIA.titol3 = this.state.salteriComuHora.titol3;
        this.TERCIA.com3 = this.state.salteriComuHora.com3;
        this.TERCIA.salm3 = this.state.salteriComuHora.salm3;
        this.TERCIA.gloria3 = this.state.salteriComuHora.gloria3;

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.salteriComuHora.titol1;
        this.SEXTA.com1 = this.state.salteriComuHora.com1;
        this.SEXTA.salm1 = this.state.salteriComuHora.salm1;
        this.SEXTA.gloria1 = this.state.salteriComuHora.gloria1;
        this.SEXTA.titol2 = this.state.salteriComuHora.titol2;
        this.SEXTA.com2 = this.state.salteriComuHora.com2;
        this.SEXTA.salm2 = this.state.salteriComuHora.salm2;
        this.SEXTA.gloria2 = this.state.salteriComuHora.gloria2;
        this.SEXTA.titol3 = this.state.salteriComuHora.titol3;
        this.SEXTA.com3 = this.state.salteriComuHora.com3;
        this.SEXTA.salm3 = this.state.salteriComuHora.salm3;
        this.SEXTA.gloria3 = this.state.salteriComuHora.gloria3;

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.salteriComuHora.titol1;
        this.NONA.com1 = this.state.salteriComuHora.com1;
        this.NONA.salm1 = this.state.salteriComuHora.salm1;
        this.NONA.gloria1 = this.state.salteriComuHora.gloria1;
        this.NONA.titol2 = this.state.salteriComuHora.titol2;
        this.NONA.com2 = this.state.salteriComuHora.com2;
        this.NONA.salm2 = this.state.salteriComuHora.salm2;
        this.NONA.gloria2 = this.state.salteriComuHora.gloria2;
        this.NONA.titol3 = this.state.salteriComuHora.titol3;
        this.NONA.com3 = this.state.salteriComuHora.com3;
        this.NONA.salm3 = this.state.salteriComuHora.salm3;
        this.NONA.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.ant = this.state.tempsQuaresmaComuSS.antTercia;
            break;
          case 'Sexta':
            this.SEXTA.ant = this.state.tempsQuaresmaComuSS.antSexta;
            break;
          case 'Nona':
            this.NONA.ant = this.state.tempsQuaresmaComuSS.antNona;
            break;
        }
        break;
      case GLOBAL.Q_TRIDU:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.tempsQuaresmaTridu.titolSalmMenor1;
        this.TERCIA.com1 = "-";
        this.TERCIA.salm1 = this.state.tempsQuaresmaTridu.salmMenor1;
        this.TERCIA.gloria1 = "1";
        this.TERCIA.titol2 = this.state.tempsQuaresmaTridu.titolSalmMenor2;
        this.TERCIA.com2 = "-";
        this.TERCIA.salm2 = this.state.tempsQuaresmaTridu.salmMenor2;
        this.TERCIA.gloria2 = "1";
        this.TERCIA.titol3 = this.state.tempsQuaresmaTridu.titolSalmMenor3;
        this.TERCIA.com3 = "-";
        this.TERCIA.salm3 = this.state.tempsQuaresmaTridu.salmMenor3;
        this.TERCIA.gloria3 = "1";

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.tempsQuaresmaTridu.titolSalmMenor1;
        this.SEXTA.com1 = "-";
        this.SEXTA.salm1 = this.state.tempsQuaresmaTridu.salmMenor1;
        this.SEXTA.gloria1 = "1";
        this.SEXTA.titol2 = this.state.tempsQuaresmaTridu.titolSalmMenor2;
        this.SEXTA.com2 = "-";
        this.SEXTA.salm2 = this.state.tempsQuaresmaTridu.salmMenor2;
        this.SEXTA.gloria2 = "1";
        this.SEXTA.titol3 = this.state.tempsQuaresmaTridu.titolSalmMenor3;
        this.SEXTA.com3 = "-";
        this.SEXTA.salm3 = this.state.tempsQuaresmaTridu.salmMenor3;
        this.SEXTA.gloria3 = "1";

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.tempsQuaresmaTridu.titolSalmMenor1;
        this.NONA.com1 = "-";
        this.NONA.salm1 = this.state.tempsQuaresmaTridu.salmMenor1;
        this.NONA.gloria1 = "1";
        this.NONA.titol2 = this.state.tempsQuaresmaTridu.titolSalmMenor2;
        this.NONA.com2 = "-";
        this.NONA.salm2 = this.state.tempsQuaresmaTridu.salmMenor2;
        this.NONA.gloria2 = "1";
        this.NONA.titol3 = this.state.tempsQuaresmaTridu.titolSalmMenor3;
        this.NONA.com3 = "-";
        this.NONA.salm3 = this.state.tempsQuaresmaTridu.salmMenor3;
        this.NONA.gloria3 = "1";

        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.ant = this.state.tempsQuaresmaTridu.antTercia;
            break;
          case 'Sexta':
            this.SEXTA.ant = this.state.tempsQuaresmaTridu.antSexta;
            break;
          case 'Nona':
            this.NONA.ant = this.state.tempsQuaresmaTridu.antNona;
            break;
        }
        break;
      case GLOBAL.P_OCTAVA:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.tempsPasquaOct.titol1salm117;
        this.TERCIA.com1 = "-";
        this.TERCIA.salm1 = this.state.tempsPasquaOct.part1Salm117;
        this.TERCIA.gloria1 = this.state.tempsPasquaOct.gloria1salm117;
        this.TERCIA.titol2 = this.state.tempsPasquaOct.titol2salm117;
        this.TERCIA.com2 = "-";
        this.TERCIA.salm2 = this.state.tempsPasquaOct.part2Salm117;
        this.TERCIA.gloria2 = this.state.tempsPasquaOct.gloria2salm117;
        this.TERCIA.titol3 = this.state.tempsPasquaOct.titol3salm117;
        this.TERCIA.com3 = "-";
        this.TERCIA.salm3 = this.state.tempsPasquaOct.part3Salm117;
        this.TERCIA.gloria3 = this.state.tempsPasquaOct.gloria3salm117;

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.tempsPasquaOct.titol1salm117;
        this.SEXTA.com1 = "-";
        this.SEXTA.salm1 = this.state.tempsPasquaOct.part1Salm117;
        this.SEXTA.gloria1 = this.state.tempsPasquaOct.gloria1salm117;
        this.SEXTA.titol2 = this.state.tempsPasquaOct.titol2salm117;
        this.SEXTA.com2 = "-";
        this.SEXTA.salm2 = this.state.tempsPasquaOct.part2Salm117;
        this.SEXTA.gloria2 = this.state.tempsPasquaOct.gloria2salm117;
        this.SEXTA.titol3 = this.state.tempsPasquaOct.titol3salm117;
        this.SEXTA.com3 = "-";
        this.SEXTA.salm3 = this.state.tempsPasquaOct.part3Salm117;
        this.SEXTA.gloria3 = this.state.tempsPasquaOct.gloria3salm117;

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.tempsPasquaOct.titol1salm117;
        this.NONA.com1 = "-";
        this.NONA.salm1 = this.state.tempsPasquaOct.part1Salm117;
        this.NONA.gloria1 = this.state.tempsPasquaOct.gloria1salm117;
        this.NONA.titol2 = this.state.tempsPasquaOct.titol2salm117;
        this.NONA.com2 = "-";
        this.NONA.salm2 = this.state.tempsPasquaOct.part2Salm117;
        this.NONA.gloria2 = this.state.tempsPasquaOct.gloria2salm117;
        this.NONA.titol3 = this.state.tempsPasquaOct.titol3salm117;
        this.NONA.com3 = "-";
        this.NONA.salm3 = this.state.tempsPasquaOct.part3Salm117;
        this.NONA.gloria3 = this.state.tempsPasquaOct.gloria3salm117;

        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.ant = this.state.tempsPasquaOct.antMenorTercia;
            break;
          case 'Sexta':
            this.SEXTA.ant = this.state.tempsPasquaOct.antMenorSexta;
            break;
          case 'Nona':
            this.NONA.ant = this.state.tempsPasquaOct.antMenorNona;
            break;
        }
        break;
      case GLOBAL.P_SETMANES:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.salteriComuHora.titol1;
        this.TERCIA.com1 = this.state.salteriComuHora.com1;
        this.TERCIA.salm1 = this.state.salteriComuHora.salm1;
        this.TERCIA.gloria1 = this.state.salteriComuHora.gloria1;
        this.TERCIA.titol2 = this.state.salteriComuHora.titol2;
        this.TERCIA.com2 = this.state.salteriComuHora.com2;
        this.TERCIA.salm2 = this.state.salteriComuHora.salm2;
        this.TERCIA.gloria2 = this.state.salteriComuHora.gloria2;
        this.TERCIA.titol3 = this.state.salteriComuHora.titol3;
        this.TERCIA.com3 = this.state.salteriComuHora.com3;
        this.TERCIA.salm3 = this.state.salteriComuHora.salm3;
        this.TERCIA.gloria3 = this.state.salteriComuHora.gloria3;

        this.TERCIA.ant = "Al·leluia, al·leluia, al·leluia."

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.salteriComuHora.titol1;
        this.SEXTA.com1 = this.state.salteriComuHora.com1;
        this.SEXTA.salm1 = this.state.salteriComuHora.salm1;
        this.SEXTA.gloria1 = this.state.salteriComuHora.gloria1;
        this.SEXTA.titol2 = this.state.salteriComuHora.titol2;
        this.SEXTA.com2 = this.state.salteriComuHora.com2;
        this.SEXTA.salm2 = this.state.salteriComuHora.salm2;
        this.SEXTA.gloria2 = this.state.salteriComuHora.gloria2;
        this.SEXTA.titol3 = this.state.salteriComuHora.titol3;
        this.SEXTA.com3 = this.state.salteriComuHora.com3;
        this.SEXTA.salm3 = this.state.salteriComuHora.salm3;
        this.SEXTA.gloria3 = this.state.salteriComuHora.gloria3;

        this.SEXTA.ant = "Al·leluia, al·leluia, al·leluia."

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.salteriComuHora.titol1;
        this.NONA.com1 = this.state.salteriComuHora.com1;
        this.NONA.salm1 = this.state.salteriComuHora.salm1;
        this.NONA.gloria1 = this.state.salteriComuHora.gloria1;
        this.NONA.titol2 = this.state.salteriComuHora.titol2;
        this.NONA.com2 = this.state.salteriComuHora.com2;
        this.NONA.salm2 = this.state.salteriComuHora.salm2;
        this.NONA.gloria2 = this.state.salteriComuHora.gloria2;
        this.NONA.titol3 = this.state.salteriComuHora.titol3;
        this.NONA.com3 = this.state.salteriComuHora.com3;
        this.NONA.salm3 = this.state.salteriComuHora.salm3;
        this.NONA.gloria3 = this.state.salteriComuHora.gloria3;

        this.NONA.ant = "Al·leluia, al·leluia, al·leluia."
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.N_OCTAVA:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_ABANS:
        this.TERCIA.antifones = false;

        this.TERCIA.titol1 = this.state.salteriComuHora.titol1;
        this.TERCIA.com1 = this.state.salteriComuHora.com1;
        this.TERCIA.salm1 = this.state.salteriComuHora.salm1;
        this.TERCIA.gloria1 = this.state.salteriComuHora.gloria1;
        this.TERCIA.titol2 = this.state.salteriComuHora.titol2;
        this.TERCIA.com2 = this.state.salteriComuHora.com2;
        this.TERCIA.salm2 = this.state.salteriComuHora.salm2;
        this.TERCIA.gloria2 = this.state.salteriComuHora.gloria2;
        this.TERCIA.titol3 = this.state.salteriComuHora.titol3;
        this.TERCIA.com3 = this.state.salteriComuHora.com3;
        this.TERCIA.salm3 = this.state.salteriComuHora.salm3;
        this.TERCIA.gloria3 = this.state.salteriComuHora.gloria3;

        this.SEXTA.antifones = false;

        this.SEXTA.titol1 = this.state.salteriComuHora.titol1;
        this.SEXTA.com1 = this.state.salteriComuHora.com1;
        this.SEXTA.salm1 = this.state.salteriComuHora.salm1;
        this.SEXTA.gloria1 = this.state.salteriComuHora.gloria1;
        this.SEXTA.titol2 = this.state.salteriComuHora.titol2;
        this.SEXTA.com2 = this.state.salteriComuHora.com2;
        this.SEXTA.salm2 = this.state.salteriComuHora.salm2;
        this.SEXTA.gloria2 = this.state.salteriComuHora.gloria2;
        this.SEXTA.titol3 = this.state.salteriComuHora.titol3;
        this.SEXTA.com3 = this.state.salteriComuHora.com3;
        this.SEXTA.salm3 = this.state.salteriComuHora.salm3;
        this.SEXTA.gloria3 = this.state.salteriComuHora.gloria3;

        this.NONA.antifones = false;

        this.NONA.titol1 = this.state.salteriComuHora.titol1;
        this.NONA.com1 = this.state.salteriComuHora.com1;
        this.NONA.salm1 = this.state.salteriComuHora.salm1;
        this.NONA.gloria1 = this.state.salteriComuHora.gloria1;
        this.NONA.titol2 = this.state.salteriComuHora.titol2;
        this.NONA.com2 = this.state.salteriComuHora.com2;
        this.NONA.salm2 = this.state.salteriComuHora.salm2;
        this.NONA.gloria2 = this.state.salteriComuHora.gloria2;
        this.NONA.titol3 = this.state.salteriComuHora.titol3;
        this.NONA.com3 = this.state.salteriComuHora.com3;
        this.NONA.salm3 = this.state.salteriComuHora.salm3;
        this.NONA.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.ant = this.state.tempsAdventNadalComu.antTercia;
            break;
          case 'Sexta':
            this.SEXTA.ant = this.state.tempsAdventNadalComu.antSexta;
            break;
          case 'Nona':
            this.NONA.ant = this.state.tempsAdventNadalComu.antNona;
            break;
        }
        break;
    }
  }

  lecturaBreuResp(LT, HM){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.salteriComuHora.versetLBTercia;
            this.TERCIA.lecturaBreu = this.state.salteriComuHora.lecturaBreuTercia;
            this.TERCIA.respV = this.state.salteriComuHora.respTercia1;
            this.TERCIA.respR = this.state.salteriComuHora.respTercia2;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.salteriComuHora.versetLBSexta;
            this.SEXTA.lecturaBreu = this.state.salteriComuHora.lecturaBreuSexta;
            this.SEXTA.respV = this.state.salteriComuHora.respSexta1;
            this.SEXTA.respR = this.state.salteriComuHora.respSexta2;
            break;
          case 'Nona':
            this.NONA.vers = this.state.salteriComuHora.versetLBNona;
            this.NONA.lecturaBreu = this.state.salteriComuHora.lecturaBreuNona;
            this.NONA.respV = this.state.salteriComuHora.respNona1;
            this.NONA.respR = this.state.salteriComuHora.respNona2;
            break;
        }
        break;
      case GLOBAL.Q_CENDRA:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsQuaresmaCendra.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsQuaresmaCendra.respVTercia;
            this.TERCIA.respR = this.state.tempsQuaresmaCendra.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsQuaresmaCendra.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsQuaresmaCendra.respVSexta;
            this.SEXTA.respR = this.state.tempsQuaresmaCendra.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsQuaresmaCendra.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuNona;
            this.NONA.respV = this.state.tempsQuaresmaCendra.respVNona;
            this.NONA.respR = this.state.tempsQuaresmaCendra.respRNona;
            break;
        }
        break;
      case GLOBAL.Q_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsQuaresmaVSetmanes.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsQuaresmaVSetmanes.respVTercia;
            this.TERCIA.respR = this.state.tempsQuaresmaVSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsQuaresmaVSetmanes.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsQuaresmaVSetmanes.respVSexta;
            this.SEXTA.respR = this.state.tempsQuaresmaVSetmanes.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsQuaresmaVSetmanes.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuNona;
            this.NONA.respV = this.state.tempsQuaresmaVSetmanes.respVNona;
            this.NONA.respR = this.state.tempsQuaresmaVSetmanes.respRNona;
            break;
        }
        break;
      case GLOBAL.Q_DIUM_RAMS:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsQuaresmaRams.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsQuaresmaRams.respVTercia;
            this.TERCIA.respR = this.state.tempsQuaresmaRams.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsQuaresmaRams.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsQuaresmaRams.respVSexta;
            this.SEXTA.respR = this.state.tempsQuaresmaRams.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsQuaresmaRams.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuNona;
            this.NONA.respV = this.state.tempsQuaresmaRams.respVNona;
            this.NONA.respR = this.state.tempsQuaresmaRams.respRNona;
            break;
        }
        break;
      case GLOBAL.Q_SET_SANTA:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsQuaresmaSetSanta.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsQuaresmaSetSanta.respVTercia;
            this.TERCIA.respR = this.state.tempsQuaresmaSetSanta.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsQuaresmaSetSanta.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsQuaresmaSetSanta.respVSexta;
            this.SEXTA.respR = this.state.tempsQuaresmaSetSanta.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsQuaresmaSetSanta.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuNona;
            this.NONA.respV = this.state.tempsQuaresmaSetSanta.respVNona;
            this.NONA.respR = this.state.tempsQuaresmaSetSanta.respRNona;
            break;
        }
        break;
      case GLOBAL.Q_TRIDU:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuTercia;
            this.TERCIA.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsQuaresmaTridu.respVTercia;
            this.TERCIA.respR = this.state.tempsQuaresmaTridu.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuSexta;
            this.SEXTA.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsQuaresmaTridu.respVSexta;
            this.SEXTA.respR = this.state.tempsQuaresmaTridu.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuNona;
            this.NONA.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuNona;
            this.NONA.respV = this.state.tempsQuaresmaTridu.respVNona;
            this.NONA.respR = this.state.tempsQuaresmaTridu.respRNona;
            break;
        }
        break;
      case GLOBAL.P_OCTAVA:
        this.TERCIA.respV = "Avui és el dia en què ha obrat el Senyor, al·leluia.";
        this.TERCIA.respR = "Alegrem-nos i celebrem-lo, al·leluia.";

        this.SEXTA.respV = "Avui és el dia en què ha obrat el Senyor, al·leluia.";
        this.SEXTA.respR = "Alegrem-nos i celebrem-lo, al·leluia.";

        this.NONA.respV = "Avui és el dia en què ha obrat el Senyor, al·leluia.";
        this.NONA.respR = "Alegrem-nos i celebrem-lo, al·leluia.";
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsPasquaOct.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsPasquaOct.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsPasquaOct.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuNona;
            break;
        }
        break;
      case GLOBAL.P_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsPasquaSetmanes.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsPasquaSetmanes.respVTercia;
            this.TERCIA.respR = this.state.tempsPasquaSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsPasquaSetmanes.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsPasquaSetmanes.respVSexta;
            this.SEXTA.respR = this.state.tempsPasquaSetmanes.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsPasquaSetmanes.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuNona;
            this.NONA.respV = this.state.tempsPasquaSetmanes.respVNona;
            this.NONA.respR = this.state.tempsPasquaSetmanes.respRNona;
            break;
        }
        break;
      case GLOBAL.A_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsAdventSetmanes.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsAdventSetmanes.respVTercia;
            this.TERCIA.respR = this.state.tempsAdventSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsAdventSetmanes.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsAdventSetmanes.respVSexta;
            this.SEXTA.respR = this.state.tempsAdventSetmanes.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsAdventSetmanes.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuNona;
            this.NONA.respV = this.state.tempsAdventSetmanes.respVNona;
            this.NONA.respR = this.state.tempsAdventSetmanes.respRNona;
            break;
        }
        break;
      case GLOBAL.A_FERIES:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsAdventFeries.citaLBTercia;
            this.TERCIA.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsAdventFeries.respVTercia;
            this.TERCIA.respR = this.state.tempsAdventFeries.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsAdventFeries.citaLBSexta;
            this.SEXTA.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsAdventFeries.respVSexta;
            this.SEXTA.respR = this.state.tempsAdventFeries.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsAdventFeries.citaLBNona;
            this.NONA.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuNona;
            this.NONA.respV = this.state.tempsAdventFeries.respVNona;
            this.NONA.respR = this.state.tempsAdventFeries.respRNona;
            break;
        }
        break;
      case GLOBAL.N_OCTAVA:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsNadalOctava.citaLectBreuTercia;
            this.TERCIA.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsNadalOctava.respVTercia;
            this.TERCIA.respR = this.state.tempsNadalOctava.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsNadalOctava.citaLectBreuSexta;
            this.SEXTA.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsNadalOctava.respVSexta;
            this.SEXTA.respR = this.state.tempsNadalOctava.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsNadalOctava.citaLectBreuNona;
            this.NONA.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuNona;
            this.NONA.respV = this.state.tempsNadalOctava.respVNona;
            this.NONA.respR = this.state.tempsNadalOctava.respRNona;
            break;
        }
        break;
      case GLOBAL.N_ABANS:
        switch (HM) {
          case 'Tèrcia':
            this.TERCIA.vers = this.state.tempsNadalAbansEpifania.citaLectBreuTercia;
            this.TERCIA.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuTercia;
            this.TERCIA.respV = this.state.tempsNadalAbansEpifania.respVTercia;
            this.TERCIA.respR = this.state.tempsNadalAbansEpifania.respRTercia;
            break;
          case 'Sexta':
            this.SEXTA.vers = this.state.tempsNadalAbansEpifania.citaLectBreuSexta;
            this.SEXTA.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuSexta;
            this.SEXTA.respV = this.state.tempsNadalAbansEpifania.respVSexta;
            this.SEXTA.respR = this.state.tempsNadalAbansEpifania.respRSexta;
            break;
          case 'Nona':
            this.NONA.vers = this.state.tempsNadalAbansEpifania.citaLectBreuNona;
            this.NONA.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuNona;
            this.NONA.respV = this.state.tempsNadalAbansEpifania.respVNona;
            this.NONA.respR = this.state.tempsNadalAbansEpifania.respRNona;
            break;
        }
        break;
    }
  }

  oracio(LT, weekDay, HM){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(weekDay === 0){ //diumenge
          this.TERCIA.oracio = this.state.tempsOrdinariOracions.oracio;
          this.SEXTA.oracio = this.state.tempsOrdinariOracions.oracio;
          this.NONA.oracio = this.state.tempsOrdinariOracions.oracio;
        }
        else{ //no diumenge
          switch (HM) {
            case 'Tèrcia':
              this.TERCIA.oracio = this.state.salteriComuHora.oraTercia;
              break;
            case 'Sexta':
              this.SEXTA.oracio = this.state.salteriComuHora.oraSexta;
              break;
            case 'Nona':
              this.NONA.oracio = this.state.salteriComuHora.oraNona;
              break;
          }
        }
        break;
      case GLOBAL.Q_CENDRA:
        this.TERCIA.oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        this.NONA.oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        break;
      case GLOBAL.Q_SETMANES:
        this.TERCIA.oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        this.NONA.oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        break;
      case GLOBAL.Q_DIUM_RAMS:
        this.TERCIA.oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        this.NONA.oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        break;
      case GLOBAL.Q_SET_SANTA:
        this.TERCIA.oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        this.NONA.oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        break;
      case GLOBAL.Q_TRIDU:
        this.TERCIA.oracio = this.state.tempsQuaresmaTridu.oraFiMenor;
        this.SEXTA.oracio = this.state.tempsQuaresmaTridu.oraFiMenor;
        this.NONA.oracio = this.state.tempsQuaresmaTridu.oraFiMenor;
        break;
      case GLOBAL.P_OCTAVA:
        this.TERCIA.oracio = this.state.tempsPasquaOct.oraFiMenor;
        this.SEXTA.oracio = this.state.tempsPasquaOct.oraFiMenor;
        this.NONA.oracio = this.state.tempsPasquaOct.oraFiMenor;
        break;
      case GLOBAL.P_SETMANES:
        this.TERCIA.oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        this.NONA.oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        break;
      case GLOBAL.A_SETMANES:
        this.TERCIA.oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        this.NONA.oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        break;
      case GLOBAL.A_FERIES:
        this.TERCIA.oracio = this.state.tempsAdventFeries.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsAdventFeries.oraFiLaudes;
        this.NONA.oracio = this.state.tempsAdventFeries.oraFiLaudes;
        break;
      case GLOBAL.N_OCTAVA:
        this.TERCIA.oracio = this.state.tempsNadalOctava.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsNadalOctava.oraFiLaudes;
        this.NONA.oracio = this.state.tempsNadalOctava.oraFiLaudes;
        break;
      case GLOBAL.N_ABANS:
        this.TERCIA.oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        this.SEXTA.oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        this.NONA.oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        break;
    }
  }
}
