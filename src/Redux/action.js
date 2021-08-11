export const updateUserParameter = userParams => ({
  type: 'UPDATE_USER_PARAMETER',
  payload: userParams
})
// leftBarView
export const toggleLeftBar = bool => ({
  type: 'TOGGLE_LEFTBAR_VIEW',
  payload: bool
})
// userName
export const updateUserName = data => ({
  type: 'UPDATE_USER_NAME',
  payload: data
})
//appState
export const updateAppState = path => ({
  type: 'UPDATE_APP_STATE',
  payload: path
})
//mainPage
export const navigateMainPage = data => ({
  type: 'NAVIGATE_MAIN_PAGE',
  payload: data
})
//titleElements
export const updateTitleElements = data => ({
  type: 'UPDATE_TITLE_ELEMENTS',
  payload: data
})
// chartData
export const updateChartData = data => ({
  type: 'UPDATE_CHART_DATA',
  payload: data
})

/* ---config page --- */
// testConfigPage
export const updateTestConfigPage = data => ({
  type: 'UPDATE_TEST_CONFIG_PAGE',
  payload: data
})
//turboConfig
export const updateTurboConfig = data => ({
  type: 'UPDATE_TURBO_CONFIG',
  payload: data
})
//paramConfig
export const updateParamConfig = data => ({
  type: 'UPDATE_PARAM_CONFIG',
  payload: data
})
export const updateTransferElement = data => ({
  type: 'UPDATE_TRANSFER_ELEMENT',
  payload: data
})
// dashboardData
export const updateDashboardData = data => ({
  type: 'UPDATE_DASHBOARD_DATA',
  payload: data
})
// targetKeys
export const updateTargetKeys = data => ({
  type: 'UPDATE_TARGET_KEYS',
  payload: data
})
//notifyStatus
export const updateNotifyAction = data => ({
  type: 'UPDATE_NOTIFY_ACTION',
  payload: data
})

/* ---Table component --- */
//tableViewData
export const updateTableViewData = data => ({
  type: 'UPDATE_TABLEVIEW_DATA',
  payload: data
})
//table statusData
export const updateTableStatusData = data => ({
  type: 'UPDATE_TABLE_STATUS_DATA',
  payload: data
})

/* ---Form component --- */
// loginEvent
export const updateLoginEvent = bool => ({
  type: 'UPDATE_LOGIN_EVENT',
  payload: bool
})
export const updateForgotEvent = data => ({
  type: 'UPDATE_FORGOT_EVENT',
  payload: data
})

/* ---Test page/test details --- */
//testingPage
export const updateTestingPage = data => ({
  type: 'UPDATE_TESTING_PAGE',
  payload: data
})
// testIdValue
export const updateTestIdValue = data => ({
  type: 'UPDATE_TESTID_VALUE',
  payload: data
})
// turboIdTestCount
export const updateTestIdCount = data => ({
  type: 'UPDATE_TESTID_COUNT',
  payload: data
})

// turboMode
export const updateTurboMode = data => ({
  type: 'UPDATE_TURBO_MODE',
  payload: data
})
export const updateDropDown = data => ({
  type: 'UPDATE_DROPDOWN',
  payload: data
})

/* ---Test page/test initialize --- */
// shutdownInitiated
export const initiateShutdown = bool => ({
  type: 'SHUTDOWN_INITIATED',
  payload: bool
})
// showReset
export const initiateShowReset = bool => ({
  type: 'SHOW_RESET_INITIATED',
  payload: bool
})
// communicationfailed
export const initiateCommunicationFailed = bool => ({
  type: 'COMMUNICATION_FAILED_INITIATED',
  payload: bool
})
// communication
export const initiateCommunication = bool => ({
  type: 'COMMUNICATION_INITIATED',
  payload: bool
})
// targetState
export const initiateTargetState = bool => ({
  type: 'TARGET_STATE_INITIATED',
  payload: bool
})
// showTarget
export const initiateShowTarget = bool => ({
  type: 'SHOW_TARGET_INITIATED',
  payload: bool
})
// turboStart
export const initiateTurboStart = data => ({
  type: 'TURBO_START_INITIATED',
  payload: data
})
// gasOpend
export const initiateGasOpened = bool => ({
  type: 'GAS_OPEN_INITIATED',
  payload: bool
})
// stageOne
export const initiateStageOne = bool => ({
  type: 'STAGE_ONE_INITIATED',
  payload: bool
})
// fuelOpened
export const initiateFuelOpened = bool => ({
  type: 'FUEL_OPENED_INITIATED',
  payload: bool
})
// stageTwo
export const initiateStageTwo = bool => ({
  type: 'STAGE_TWO_INITIATED',
  payload: bool
})
// gasClosed
export const initiateGasClosed = bool => ({
  type: 'GAS_CLOSED',
  payload: bool
})
// stageThree
export const initiateStageThree = bool => ({
  type: 'STAGE_THREE_INITIATED',
  payload: bool
})
// currentDateTime
export const getCurrentDateTime = data => ({
  type: 'CURRENT_DATE_TIME',
  payload: data
})
// targetRPM
export const getTargetRPM = data => ({
  type: 'TARGET_RPM',
  payload: data
})
//targetTemp
export const getTargetTemp = data => ({
  type: 'TARGET_TEMP',
  payload: data
})
// resetTemp
export const getResetTemp = data => ({
  type: 'RESET_TEMP',
  payload: data
})
// resetRPM
export const getResetRPM = data => ({
  type: 'RESET_RPM',
  payload: data
})

//  stopDbInsert
export const stopDbInsert = bool => ({
  type: 'STOP_DB_INSERT',
  payload: bool
})

export const startDbInsert = bool => ({
  type: 'START_DB_INSERT',
  payload: bool
})

//comparisonFixedData
export const updatecomparisonFixedData = data => ({
  type: 'COMPARISON_FIXED_DATA',
  payload: data
})
export const updatecomparedSpeedData = data => ({
  type: 'COMPARED_SPEED_DATA',
  payload: data
})
//comparisonLiveData
export const updatecomparisonLiveData = data => ({
  type: 'COMPARISON_LIVE_DATA',
  payload: data
})