import { Platform } from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

const O_ORDINARI = 'O_ORDINAR';
const Q_CENDRA = 'Q_CENDRA';
const Q_SETMANES = 'Q_SETMANES';
const Q_DIUM_RAMS = 'Q_DIUM_RAMS';
const Q_SET_SANTA = 'Q_SET_SANTA';
const Q_TRIDU = 'Q_TRIDU';
const Q_DIUM_PASQUA = 'Q_DIUM_PASQUA';
const P_OCTAVA = 'P_OCTAVA';
const P_SETMANES = 'P_SETMANES';
const A_SETMANES = 'A_SETMANES';
const A_FERIES = 'A_FERIES';
const N_OCTAVA = 'N_OCTAVA';
const N_ABANS = 'N_ABANS';

export default class TerciaSoul {
  constructor(props, TABLES, HS, SOUL) {

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

    this.HORA_MENOR = { //?¿
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

    this.himne(props.LT, props.weekDay, props.setmana, "Tèrcia");
    this.salmodia(props.LT, props.setmana, props.weekDay, props.cicle, "Tèrcia");
    this.lecturaBreuResp(props.LT, "Tèrcia");
    this.oracio(props.LT, props.weekDay, "Tèrcia");

    SOUL.setSoul(HS, "tercia", this.HORA_MENOR);

    this.himne(props.LT, props.weekDay, props.setmana, "Sexta");
    this.salmodia(props.LT, props.setmana, props.weekDay, props.cicle, "Sexta");
    this.lecturaBreuResp(props.LT, "Sexta");
    this.oracio(props.LT, props.weekDay, "Sexta");

    SOUL.setSoul(HS, "sexta", this.HORA_MENOR);

    this.himne(props.LT, props.weekDay, props.setmana, "Nona");
    this.salmodia(props.LT, props.setmana, props.weekDay, props.cicle, "Nona");
    this.lecturaBreuResp(props.LT, "Nona");
    this.oracio(props.LT, props.weekDay, "Nona");

    SOUL.setSoul(HS, "nona", this.HORA_MENOR);
  }

  himne(LT, weekDay, setmana, HM){
    switch(LT){
      case O_ORDINARI:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.himneTerciaOrdinariLlati;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.himneSextaOrdinariLlati;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.himneNonaOrdinariLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.himneTerciaOrdinariCat;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.himneSextaOrdinariCat;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.himneNonaOrdinariCat;
              break;
          }
        }
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneTerciaLlati;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneSextaLlati;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneTerciaCat;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneSextaCat;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaComuFV.himneNonaCat;
              break;
          }
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          this.HORA_MENOR.himne = this.state.tempsQuaresmaComuSS.himneHoraLlati;
        }
        else{
          this.HORA_MENOR.himne = this.state.tempsQuaresmaComuSS.himneHoraCat;
        }
        break;
      case Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneLlatiTercia;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneLlatiSexta;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneLlatiNona;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneCatTercia;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneCatSexta;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsQuaresmaTridu.himneCatNona;
              break;
          }
        }
        break;
      case P_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneTerciaLlati;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneSextaLlati;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneTerciaCat;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneSextaCat;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneNonaCat;
              break;
          }
        }
        break;
      case P_SETMANES:
        if(setmana === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneTerciaLlati;
                break;
              case 'Sexta':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneSextaLlati;
                break;
              case 'Nona':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneTerciaCat;
                break;
              case 'Sexta':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneSextaCat;
                break;
              case 'Nona':
                this.HORA_MENOR.himne = this.state.tempsPasquaDA.himneNonaCat;
                break;
            }
          }
        }
        else{
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneTerciaLlati;
                break;
              case 'Sexta':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneSextaLlati;
                break;
              case 'Nona':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneTerciaCat;
                break;
              case 'Sexta':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneSextaCat;
                break;
              case 'Nona':
                this.HORA_MENOR.himne = this.state.tempsPasquaAA.himneNonaCat;
                break;
            }
          }
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_OCTAVA:
      case N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneTerciaLlati;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneSextaLlati;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneTerciaCat;
              break;
            case 'Sexta':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneSextaCat;
              break;
            case 'Nona':
              this.HORA_MENOR.himne = this.state.tempsAdventNadalComu.himneNonaCat;
              break;
          }
        }
        break;
    }
  }

  salmodia(LT, setmana, weekDay, HM){
    this.HORA_MENOR.antifones = true;
    switch(LT){
      case O_ORDINARI:
        this.HORA_MENOR.ant1 = this.state.salteriComuHora.ant1;
        this.HORA_MENOR.titol1 = this.state.salteriComuHora.titol1;
        this.HORA_MENOR.com1 = this.state.salteriComuHora.com1;
        this.HORA_MENOR.salm1 = this.state.salteriComuHora.salm1;
        this.HORA_MENOR.gloria1 = this.state.salteriComuHora.gloria1;
        this.HORA_MENOR.ant2 = this.state.salteriComuHora.ant2;
        this.HORA_MENOR.titol2 = this.state.salteriComuHora.titol2;
        this.HORA_MENOR.com2 = this.state.salteriComuHora.com2;
        this.HORA_MENOR.salm2 = this.state.salteriComuHora.salm2;
        this.HORA_MENOR.gloria2 = this.state.salteriComuHora.gloria2;
        this.HORA_MENOR.ant3 = this.state.salteriComuHora.ant3;
        this.HORA_MENOR.titol3 = this.state.salteriComuHora.titol3;
        this.HORA_MENOR.com3 = this.state.salteriComuHora.com3;
        this.HORA_MENOR.salm3 = this.state.salteriComuHora.salm3;
        this.HORA_MENOR.gloria3 = this.state.salteriComuHora.gloria3;
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.salteriComuHora.titol1;
        this.HORA_MENOR.com1 = this.state.salteriComuHora.com1;
        this.HORA_MENOR.salm1 = this.state.salteriComuHora.salm1;
        this.HORA_MENOR.gloria1 = this.state.salteriComuHora.gloria1;
        this.HORA_MENOR.titol2 = this.state.salteriComuHora.titol2;
        this.HORA_MENOR.com2 = this.state.salteriComuHora.com2;
        this.HORA_MENOR.salm2 = this.state.salteriComuHora.salm2;
        this.HORA_MENOR.gloria2 = this.state.salteriComuHora.gloria2;
        this.HORA_MENOR.titol3 = this.state.salteriComuHora.titol3;
        this.HORA_MENOR.com3 = this.state.salteriComuHora.com3;
        this.HORA_MENOR.salm3 = this.state.salteriComuHora.salm3;
        this.HORA_MENOR.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuFV.antTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuFV.antSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuFV.antNona;
            break;
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.salteriComuHora.titol1;
        this.HORA_MENOR.com1 = this.state.salteriComuHora.com1;
        this.HORA_MENOR.salm1 = this.state.salteriComuHora.salm1;
        this.HORA_MENOR.gloria1 = this.state.salteriComuHora.gloria1;
        this.HORA_MENOR.titol2 = this.state.salteriComuHora.titol2;
        this.HORA_MENOR.com2 = this.state.salteriComuHora.com2;
        this.HORA_MENOR.salm2 = this.state.salteriComuHora.salm2;
        this.HORA_MENOR.gloria2 = this.state.salteriComuHora.gloria2;
        this.HORA_MENOR.titol3 = this.state.salteriComuHora.titol3;
        this.HORA_MENOR.com3 = this.state.salteriComuHora.com3;
        this.HORA_MENOR.salm3 = this.state.salteriComuHora.salm3;
        this.HORA_MENOR.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuSS.antTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuSS.antSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaComuSS.antNona;
            break;
        }
        break;
      case Q_TRIDU:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.tempsQuaresmaTridu.titolSalmMenor1;
        this.HORA_MENOR.com1 = "-";
        this.HORA_MENOR.salm1 = this.state.tempsQuaresmaTridu.salmMenor1;
        this.HORA_MENOR.gloria1 = "1";
        this.HORA_MENOR.titol2 = this.state.tempsQuaresmaTridu.titolSalmMenor2;
        this.HORA_MENOR.com2 = "-";
        this.HORA_MENOR.salm2 = this.state.tempsQuaresmaTridu.salmMenor2;
        this.HORA_MENOR.gloria2 = "1";
        this.HORA_MENOR.titol3 = this.state.tempsQuaresmaTridu.titolSalmMenor3;
        this.HORA_MENOR.com3 = "-";
        this.HORA_MENOR.salm3 = this.state.tempsQuaresmaTridu.salmMenor3;
        this.HORA_MENOR.gloria3 = "1";

        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaTridu.antTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaTridu.antSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.ant = this.state.tempsQuaresmaTridu.antNona;
            break;
        }
        break;
      case P_OCTAVA:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.tempsPasquaOct.titol1salm117;
        this.HORA_MENOR.com1 = "-";
        this.HORA_MENOR.salm1 = this.state.tempsPasquaOct.part1Salm117;
        this.HORA_MENOR.gloria1 = this.state.tempsPasquaOct.gloria1salm117;
        this.HORA_MENOR.titol2 = this.state.tempsPasquaOct.titol2salm117;
        this.HORA_MENOR.com2 = "-";
        this.HORA_MENOR.salm2 = this.state.tempsPasquaOct.part2Salm117;
        this.HORA_MENOR.gloria2 = this.state.tempsPasquaOct.gloria2salm117;
        this.HORA_MENOR.titol3 = this.state.tempsPasquaOct.titol3salm117;
        this.HORA_MENOR.com3 = "-";
        this.HORA_MENOR.salm3 = this.state.tempsPasquaOct.part3Salm117;
        this.HORA_MENOR.gloria3 = this.state.tempsPasquaOct.gloria3salm117;

        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.ant = this.state.tempsPasquaOct.antMenorTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.ant = this.state.tempsPasquaOct.antMenorSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.ant = this.state.tempsPasquaOct.antMenorNona;
            break;
        }
        break;
      case P_SETMANES:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.salteriComuHora.titol1;
        this.HORA_MENOR.com1 = this.state.salteriComuHora.com1;
        this.HORA_MENOR.salm1 = this.state.salteriComuHora.salm1;
        this.HORA_MENOR.gloria1 = this.state.salteriComuHora.gloria1;
        this.HORA_MENOR.titol2 = this.state.salteriComuHora.titol2;
        this.HORA_MENOR.com2 = this.state.salteriComuHora.com2;
        this.HORA_MENOR.salm2 = this.state.salteriComuHora.salm2;
        this.HORA_MENOR.gloria2 = this.state.salteriComuHora.gloria2;
        this.HORA_MENOR.titol3 = this.state.salteriComuHora.titol3;
        this.HORA_MENOR.com3 = this.state.salteriComuHora.com3;
        this.HORA_MENOR.salm3 = this.state.salteriComuHora.salm3;
        this.HORA_MENOR.gloria3 = this.state.salteriComuHora.gloria3;

        this.HORA_MENOR.ant = "Al·leluia, al·leluia, al·leluia."
        break;
      case A_SETMANES:
      case N_OCTAVA:
      case A_FERIES:
      case N_ABANS:
        this.HORA_MENOR.antifones = false;

        this.HORA_MENOR.titol1 = this.state.salteriComuHora.titol1;
        this.HORA_MENOR.com1 = this.state.salteriComuHora.com1;
        this.HORA_MENOR.salm1 = this.state.salteriComuHora.salm1;
        this.HORA_MENOR.gloria1 = this.state.salteriComuHora.gloria1;
        this.HORA_MENOR.titol2 = this.state.salteriComuHora.titol2;
        this.HORA_MENOR.com2 = this.state.salteriComuHora.com2;
        this.HORA_MENOR.salm2 = this.state.salteriComuHora.salm2;
        this.HORA_MENOR.gloria2 = this.state.salteriComuHora.gloria2;
        this.HORA_MENOR.titol3 = this.state.salteriComuHora.titol3;
        this.HORA_MENOR.com3 = this.state.salteriComuHora.com3;
        this.HORA_MENOR.salm3 = this.state.salteriComuHora.salm3;
        this.HORA_MENOR.gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.ant = this.state.tempsAdventNadalComu.antTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.ant = this.state.tempsAdventNadalComu.antSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.ant = this.state.tempsAdventNadalComu.antNona;
            break;
        }
        break;
    }
  }

  lecturaBreuResp(LT, HM){
    switch(LT){
      case O_ORDINARI:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.salteriComuHora.versetLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.salteriComuHora.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.salteriComuHora.respTercia1;
            this.HORA_MENOR.respR = this.state.salteriComuHora.respTercia2;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.salteriComuHora.versetLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.salteriComuHora.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.salteriComuHora.respSexta1;
            this.HORA_MENOR.respR = this.state.salteriComuHora.respSexta2;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.salteriComuHora.versetLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.salteriComuHora.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.salteriComuHora.respNona1;
            this.HORA_MENOR.respR = this.state.salteriComuHora.respNona2;
            break;
        }
        break;
      case Q_CENDRA:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaCendra.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaCendra.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaCendra.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaCendra.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaCendra.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaCendra.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaCendra.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaCendra.respVNona;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaCendra.respRNona;
            break;
        }
        break;
      case Q_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaVSetmanes.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaVSetmanes.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaVSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaVSetmanes.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaVSetmanes.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaVSetmanes.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaVSetmanes.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaVSetmanes.respVNona;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaVSetmanes.respRNona;
            break;
        }
        break;
      case Q_DIUM_RAMS:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaRams.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaRams.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaRams.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaRams.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaRams.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaRams.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaRams.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaRams.respVNona;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaRams.respRNona;
            break;
        }
        break;
      case Q_SET_SANTA:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaSetSanta.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaSetSanta.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaSetSanta.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaSetSanta.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaSetSanta.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaSetSanta.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaSetSanta.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaSetSanta.respVNona;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaSetSanta.respRNona;
            break;
        }
        break;
      case Q_TRIDU:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaTridu.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaTridu.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaTridu.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaTridu.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsQuaresmaTridu.citaLecturaBreuNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsQuaresmaTridu.respVNona;
            this.HORA_MENOR.respR = this.state.tempsQuaresmaTridu.respRNona;
            break;
        }
        break;
      case P_OCTAVA:
        this.HORA_MENOR.respV = "Avui és el dia en què ha obrat el Senyor, al·leluia.";
        this.HORA_MENOR.respR = "Alegrem-nos i celebrem-lo, al·leluia.";
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsPasquaOct.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsPasquaOct.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsPasquaOct.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaOct.lecturaBreuNona;
            break;
        }
        break;
      case P_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsPasquaSetmanes.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsPasquaSetmanes.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsPasquaSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsPasquaSetmanes.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsPasquaSetmanes.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsPasquaSetmanes.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsPasquaSetmanes.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsPasquaSetmanes.respVNona;
            this.HORA_MENOR.respR = this.state.tempsPasquaSetmanes.respRNona;
            break;
        }
        break;
      case A_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsAdventSetmanes.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsAdventSetmanes.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsAdventSetmanes.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsAdventSetmanes.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsAdventSetmanes.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsAdventSetmanes.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsAdventSetmanes.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsAdventSetmanes.respVNona;
            this.HORA_MENOR.respR = this.state.tempsAdventSetmanes.respRNona;
            break;
        }
        break;
      case A_FERIES:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsAdventFeries.citaLBTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsAdventFeries.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsAdventFeries.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsAdventFeries.citaLBSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsAdventFeries.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsAdventFeries.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsAdventFeries.citaLBNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsAdventFeries.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsAdventFeries.respVNona;
            this.HORA_MENOR.respR = this.state.tempsAdventFeries.respRNona;
            break;
        }
        break;
      case N_OCTAVA:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsNadalOctava.citaLectBreuTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsNadalOctava.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsNadalOctava.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsNadalOctava.citaLectBreuSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsNadalOctava.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsNadalOctava.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsNadalOctava.citaLectBreuNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalOctava.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsNadalOctava.respVNona;
            this.HORA_MENOR.respR = this.state.tempsNadalOctava.respRNona;
            break;
        }
        break;
      case N_ABANS:
        switch (HM) {
          case 'Tèrcia':
            this.HORA_MENOR.vers = this.state.tempsNadalAbansEpifania.citaLectBreuTercia;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuTercia;
            this.HORA_MENOR.respV = this.state.tempsNadalAbansEpifania.respVTercia;
            this.HORA_MENOR.respR = this.state.tempsNadalAbansEpifania.respRTercia;
            break;
          case 'Sexta':
            this.HORA_MENOR.vers = this.state.tempsNadalAbansEpifania.citaLectBreuSexta;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuSexta;
            this.HORA_MENOR.respV = this.state.tempsNadalAbansEpifania.respVSexta;
            this.HORA_MENOR.respR = this.state.tempsNadalAbansEpifania.respRSexta;
            break;
          case 'Nona':
            this.HORA_MENOR.vers = this.state.tempsNadalAbansEpifania.citaLectBreuNona;
            this.HORA_MENOR.lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuNona;
            this.HORA_MENOR.respV = this.state.tempsNadalAbansEpifania.respVNona;
            this.HORA_MENOR.respR = this.state.tempsNadalAbansEpifania.respRNona;
            break;
        }
        break;
    }
  }

  oracio(LT, weekDay, HM){
    switch(LT){
      case O_ORDINARI:
        if(weekDay === 0){ //diumenge
          this.HORA_MENOR.oracio = this.state.tempsOrdinariOracions.oracio;
        }
        else{ //no diumenge
          switch (HM) {
            case 'Tèrcia':
              this.HORA_MENOR.oracio = this.state.salteriComuHora.oraTercia;
              break;
            case 'Sexta':
              this.HORA_MENOR.oracio = this.state.salteriComuHora.oraSexta;
              break;
            case 'Nona':
              this.HORA_MENOR.oracio = this.state.salteriComuHora.oraNona;
              break;
          }
        }
        break;
      case Q_CENDRA:
        this.HORA_MENOR.oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        break;
      case Q_SETMANES:
        this.HORA_MENOR.oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        break;
      case Q_DIUM_RAMS:
        this.HORA_MENOR.oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        break;
      case Q_SET_SANTA:
        this.HORA_MENOR.oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        break;
      case Q_TRIDU:
        this.HORA_MENOR.oracio = this.state.tempsQuaresmaTridu.oraFiMenor;
        break;
      case P_OCTAVA:
        this.HORA_MENOR.oracio = this.state.tempsPasquaOct.oraFiMenor;
        break;
      case P_SETMANES:
        this.HORA_MENOR.oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        break;
      case A_SETMANES:
        this.HORA_MENOR.oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        break;
      case A_FERIES:
        this.HORA_MENOR.oracio = this.state.tempsAdventFeries.oraFiLaudes;
        break;
      case N_OCTAVA:
        this.HORA_MENOR.oracio = this.state.tempsNadalOctava.oraFiLaudes;
        break;
      case N_ABANS:
        this.HORA_MENOR.oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        break;
    }
  }
}
