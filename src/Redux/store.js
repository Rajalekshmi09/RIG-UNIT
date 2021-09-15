import { dashboardDataVal, targetKeysVal, titleElements } from '../Services/constants'

const InitialState = {
  mainPage: 'testPage',
  appState: "login",
  userName: '',
  userParams: '',
  leftBarView: false,
  collapsed: true,
  titleElements: titleElements,
  turboMode: '1',
  IsLogin: false,
  IsUserName: [],

  // -- config page -- //
  testConfigPage: [],
  turboConfig: [],
  paramConfig: [],
  dashboardData: dashboardDataVal,
  targetKeys: targetKeysVal,
  tableViewData: [],
  notifyStatus: 'false',

  // -- test details -- //
  testingPage: [],
  testIdValue: '',
  turboIdTestCount: '',
  testDropdown: 'sub1',

  // -- test page -- //
  statusData: '',
  reset: false,
  chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  /* ADD bugid-(GOARIG_7014)   */
  chartData2: [0, 0, 0, 0],
  shutdownInitiated: false,
  communicationFailed: false,
  communication: false,
  targetState: false,
  showReset: false,
  showTarget: false,
  turboStart: [],
  gasOpend: false,
  stageOne: false,
  fuelOpened: false,
  stageTwo: false,
  gasClosed: false,
  stageThree: false,
  currentDateTime: '',
  targetRPM: '',
  targetTemp: '',
  resetTemp: '',
  resetRPM: '',
  startDbInserting: false,
   /*ADD bugid-(GOARIG_7019) */
  startDisable:false,

  /* ADD bugid-(GOARIG_7021)   */
  testIdData: 0,
  //grapgView
  delayValue: 1000,

  //breakinterval
  clearSetInterval: false,

}
export default InitialState