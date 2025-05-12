// Please install Better Comments VSCode Plugin to make this file slightly easier to read

// Key:
  // ! Scope of prototype (what service the prototype is for)
  // * Version of prototype

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ! ----------------------------------------------------------------------------------------------------------------------------------

// ! GOV UK Notify

// var NotifyClient = require('notifications-node-client').NotifyClient,
//     notify = new NotifyClient(process.env.NOTIFYAPIKEY);

// ! ----------------------------------------------------------------------------------------------------------------------------------

// ! OIDV

// Add your routes here
const utils = require('../lib/utils')
const config = require('./config.json')

var useViewVersioning = (config.useViewVersioning === true)

// Import version-specific routes
const cxpRoutes = require('./routes/cxp')
const authRoutes = require('./routes/auth')
const idvRoutes = require('./routes/idv')
const kbvRoutes = require('./routes/kbv-uplift')

router.use('/', cxpRoutes)
router.use('/', authRoutes)
router.use('/', idvRoutes)
router.use('/', kbvRoutes)

if (useViewVersioning) {
  router.get('/*/default/*', utils.redirectToVersion, function (req, res, next) {
    next()
  })
}

if (useViewVersioning) {
  router.get('/*/v*/*', utils.checkVersion, function (req, res, next) {
    next()
  })
}

// Prototype-wide routing
router.post('/prototype-submit', (req, res, next) => {
  const currentUrl = req.protocol + '://' + req.get('host')
  // Get journey start and service name from journey-start value
  const journeyDetails = req.session.data['journey-start']
  const journeyDetailsArr = journeyDetails.split(',')
  const journeyStart = journeyDetailsArr[0]
  const serviceName = req.session.data[
    journeyDetailsArr[1] === 'carers' ? 'carers-service-name': 'dss-service-name'
  ]
  req.session.data['service-name'] = serviceName

  // Other variables
  const citizenName = req.session.data['citizen-name']
  const citizenBenefits = req.session.data['citizen-benefits']
  const cxp = req.session.data['cxp']
  const esaStatus = req.session.data['esa-status']
  const pipStatus = req.session.data['pip-status']
  const auth = req.session.data['auth']
  const idv = req.session.data['idv']
  const idvHappy = req.session.data['idvHappy']
  req.session.data['generated-link'] = currentUrl + journeyStart + '?' + 
    'citizen-name=' + citizenName + '&' + 
    'service-name=' + serviceName + '&' + 
    'citizen-benefits=' + citizenBenefits + '&' + 
    'cxp=' + cxp  + '&' + 
    'esa-status=' + esaStatus  + '&' + 
    'pip-status=' + pipStatus  + '&' + 
    'auth=' + auth  + '&' + 
    'idv=' + idv  + '&' + 
    'idvHappy=' + idvHappy 
  const action = req.session.data['action']
  if (action === 'generateLink') {
    res.redirect('/generate-link')
  } else {
    res.redirect(journeyStart)
  }
})


// ! ----------------------------------------------------------------------------------------------------------------------------------


// ! Discovery Prototypes
  // Put these in a separate routes file as they were dated and hefty.

const discoveryRoutes = require('./routes/discovery-experiments')
router.use('/', discoveryRoutes)

// ! ----------------------------------------------------------------------------------------------------------------------------------

// ! Check your Payments

// * ------------------------ Check your Payment V1 ------------------------

router.post('/check-your-payment/v1/information-channels', function (req, res) {


  const contactChannel = req.session.data['contact-channel']

  if (contactChannel === 'telephone') {
    res.redirect('/check-your-payment/v1/concept-2/telephone-information')
  }

  else if (contactChannel === 'dss-signin') {
    res.redirect('/check-your-payment/v1/concept-2/benefit-summary')
  }

  else if (contactChannel === 'chat-bots') {
    res.redirect('/check-your-payment/v1/concept-2/webchat-service')
  }

    else if (contactChannel === 'no-i-did-not-found-info') {
      res.redirect('/check-your-payment/v1/concept-2/did-you-get-all-info-no')
    }
    else if (contactChannel === 'no-i-do-not') {
      res.redirect('/check-your-payment/v1/concept-2/thank-you-close')
    }


})

//Customer View Authentication Options
router.post('/check-your-payment/v1/authentication-options', function (req, res) {


  const authenticationOption = req.session.data['authentication-option']

  if (authenticationOption === 'create') {
    res.redirect('/check-your-payment/v1/concept-2/telephone-information')
  }

  else if (authenticationOption === 'signin-options') {
    res.redirect('/check-your-payment/v1/concept-2/login')
  }

  else if (authenticationOption === 'chat-bots') {
    res.redirect('/check-your-payment/v1/concept-2/webchat-service')
  }

    else if (authenticationOption === 'no-i-did-not-found-info') {
      res.redirect('/check-your-payment/v1/concept-2/did-you-get-all-info-no')
    }
    else if (authenticationOption === 'no-i-do-not') {
      res.redirect('/check-your-payment/v1/concept-2/thank-you-close')
    }

})


// * ------------------------ Check your Payment V2 ------------------------

// V2 information channel routes - what do you want to do?
router.post('/check-your-payment/v2/digital-service/information-channels', function (req, res) {


  const optionSelection = req.session.data['option-selection']

  if (optionSelection === 'next-payment') {
    res.redirect('/check-your-payment/v2/digital-service/next-payment')
  }

  else if (optionSelection === 'payment-history') {
    res.redirect('/check-your-payment/v2/digital-service/payments-history')
  }

  else if (optionSelection === 'personal-details') {
    res.redirect('/check-your-payment/v2/digital-service/personal-details')
  }

  else if (optionSelection === 'bank-details') {
    res.redirect('/check-your-payment/v2/digital-service/bank-details')
  }

  else if (optionSelection === 'chat-bots') {
    res.redirect('/check-your-payment/v2/concept-2/webchat-service')
  }

    else if (optionSelection === 'pob') {
      res.redirect('/check-your-payment/v2/digital-service/pob-overview')
    }
    else if (optionSelection === 'no-i-do-not') {
      res.redirect('/check-your-payment/v2/e-four/concept-2/thank-you-close')
    }

    else  {
      res.redirect('/check-your-payment/v2/digital-service/information-channels-error')
    }

})

// V2 information channel routes - what do you want to do?
router.post('/check-your-payment/v2/digital-service/information-channels-page-two  ', function (req, res) {


  const optionSelection = req.session.data['option-selection']

  if (optionSelection === 'next-payment') {
    res.redirect('/check-your-payment/v2/digital-service/next-payment')
  }

  else if (optionSelection === 'payment-history') {
    res.redirect('/check-your-payment/v2/digital-service/payments-history')
  }

  else if (optionSelection === 'personal-details') {
    res.redirect('/check-your-payment/v2/digital-service/personal-details')
  }

  else if (optionSelection === 'bank-details') {
    res.redirect('/check-your-payment/v2/digital-service/bank-details')
  }

  else if (optionSelection === 'chat-bots') {
    res.redirect('/check-your-payment/v2/concept-2/webchat-service')
  }

    else if (optionSelection === 'pob') {
      res.redirect('/check-your-payment/v2/digital-service/pob-overview')
    }
    else if (optionSelection === 'no-i-do-not') {
      res.redirect('/check-your-payment/v2/e-four/concept-2/thank-you-close')
    }

    else  {
      res.redirect('/check-your-payment/v2/digital-service/information-channels-error')
    }

})

// V2 next-payment page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/next-payment', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v2/digital-service/next-payment-error')
  }


})

// V2 payments-history page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/payments-history', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v2/digital-service/payments-history-error')
  }


})

// V2 personal details page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/personal-details', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v2/digital-service/personal-details-error')
  }


})

// V2 bank details page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/bank-details', function (req, res) {

  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v2/digital-service/bank-details-error')
  }


})

// V2 telephone information page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/telephone-information', function (req, res) {

  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v2/digital-service/telephone-information-error')
  }


})

// V2 payments-history page - do you want to do anything else question
router.post('/check-your-payment/v2/digital-service/return-to-tasks', function (req, res) {

  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v2/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v2/digital-service/thank-you-close')
  }

  else {
    res.redirect('/check-your-payment/v2/digital-service/return-to-tasks-error')
  }


})

// V2 pob-selection page
router.post('/check-your-payment/v2/digital-service/pob-selection-digital', function (req, res) {

  const pobSelection = req.session.data['pob-selection']

  if (pobSelection === 'esa-letter') {
    res.redirect('/check-your-payment/v2/digital-service/pob-esa')
  }

  else if (pobSelection === 'carers-letter') {

    res.redirect('/check-your-payment/v2/digital-service/pob-carers')
  }

  else {
    res.redirect('/check-your-payment/v2/digital-service/pob-selection-digital-error')
  }

})


// V2 pob-carers do you want more proof of benefits?
router.post('/check-your-payment/v2/digital-service/pob-carers', function (req, res) {

  const otherPOB = req.session.data['other-pob']


  if (otherPOB === 'yes-more') {
    res.redirect('/check-your-payment/v2/digital-service/pob-selection-digital')
  }

  else if (otherPOB === 'no-more') {
    res.redirect('/check-your-payment/v2/digital-service/return-to-tasks')
  }

  else {
    res.redirect('/check-your-payment/v2/digital-service/pob-carers-error')
  }

})


// V2 pob-esa do you want more proof of benefits?
router.post('/check-your-payment/v2/digital-service/pob-esa', function (req, res) {


  const otherPOB = req.session.data['other-pob']

  if (otherPOB === 'yes-more') {
    res.redirect('/check-your-payment/v2/digital-service/pob-selection-digital')
  }

  else if (otherPOB === 'no-more') {
    res.redirect('/check-your-payment/v2/digital-service/return-to-tasks')
  }

  else {
    res.redirect('/check-your-payment/v2/digital-service/pob-esa-error')
  }

})


// * ------------------------ Check your Payment V3 ------------------------

// // V1 prototype selection (scenario page)
// router.post('/check-your-payment/v3/prototypes', function (req, res) {

//   const contactChannel = req.session.data['prototypes']

//   if (contactChannel === 'prototype-1') {
//     res.redirect('/check-your-payment/v3/digital-service/start')
//   }

//   else  {
//     res.redirect('/check-your-payment/v3/prototype-2/start')
//   }


// })

// V3 Authentication Options

router.post('/check-your-payment/v3/authentication-options', function (req, res) {


  const authenticationOption = req.session.data['authentication-option']

  if (authenticationOption === 'create') {
    res.redirect('/check-your-payment/v3/concept-2/telephone-information')
  }

  else if (authenticationOption === 'signin-options') {
    res.redirect('/check-your-payment/v3/concept-2/login')
  }

  else if (authenticationOption === 'chat-bots') {
    res.redirect('/check-your-payment/v3/concept-2/webchat-service')
  }

    else if (authenticationOption === 'no-i-did-not-found-info') {
      res.redirect('/check-your-payment/v3/concept-2/did-you-get-all-info-no')
    }
    else if (authenticationOption === 'no-i-do-not') {
      res.redirect('/check-your-payment/v3/concept-2/thank-you-close')
    }

})

// V3 information channel routes - what do you want to do?
router.post('/check-your-payment/v3/digital-service/information-channels', function (req, res) {


  const optionSelection = req.session.data['option-selection']

  if (optionSelection === 'next-payment') {
    res.redirect('/check-your-payment/v3/digital-service/next-payment')
  }

  else if (optionSelection === 'payment-history') {
    res.redirect('/check-your-payment/v3/digital-service/payments-history')
  }

  else if (optionSelection === 'personal-details') {
    res.redirect('/check-your-payment/v3/digital-service/personal-details')
  }

  else if (optionSelection === 'bank-details') {
    res.redirect('/check-your-payment/v3/digital-service/bank-details')
  }

  else if (optionSelection === 'chat-bots') {
    res.redirect('/check-your-payment/v3/concept-2/webchat-service')
  }

    else if (optionSelection === 'pob') {
      res.redirect('/check-your-payment/v3/digital-service/pob-overview')
    }
    else if (optionSelection === 'no-i-do-not') {
      res.redirect('/check-your-payment/v1/e-four/concept-2/thank-you-close')
    }

    else if (optionSelection === 'evidence') {
      res.redirect ('/check-your-payment/v3/digital-service/information-channels')
    }

    else  {
      res.redirect('/check-your-payment/v3/digital-service/information-channels-error')
    }

})


// V3 information channel routes that skip IDV - what do you want to do?
router.post('/check-your-payment/v3/digital-service/information-channels-page-two', function (req, res) {


  const optionSelection = req.session.data['option-selection']

  if (optionSelection === 'next-payment') {
    res.redirect('/check-your-payment/v3/digital-service/next-payment')
  }

  else if (optionSelection === 'payment-history') {
    res.redirect('/check-your-payment/v3/digital-service/payments-history')
  }

  else if (optionSelection === 'personal-details') {
    res.redirect('/check-your-payment/v3/digital-service/personal-details')
  }

  else if (optionSelection === 'bank-details') {
    res.redirect('/check-your-payment/v3/digital-service/bank-details')
  }

  else if (optionSelection === 'chat-bots') {
    res.redirect('/check-your-payment/v3/concept-2/webchat-service')
  }

    else if (optionSelection === 'pob') {
      res.redirect('/check-your-payment/v3/digital-service/pob-overview')
    }
    else if (optionSelection === 'no-i-do-not') {
      res.redirect('/check-your-payment/v1/e-four/concept-2/thank-you-close')
    }

    else  {
      res.redirect('/check-your-payment/v3/digital-service/information-channels-error')
    }

})

// V3 pob-format-selection page
router.post('/check-your-payment/v3/digital-service/pob-format-selection', function (req, res) {


  const pobFormat = req.session.data['pob-format-selection']

  if (pobFormat === 'digital-copy') {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-digital')
  }

  else if (pobFormat === 'printed-copy') {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-printed')
  }
  else if (pobFormat === 'shareable-code') {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-code')
  }


})

// V3 pob-selection page
router.post('/check-your-payment/v3/digital-service/pob-selection-digital', function (req, res) {


  const pobSelection = req.session.data['pob-selection']

  if (pobSelection === 'esa-letter') {
    res.redirect('/check-your-payment/v3/digital-service/pob-esa')
  }

  else if (pobSelection === 'carers-letter') {

    res.redirect('/check-your-payment/v3/digital-service/pob-carers')
  }

  else {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-digital-error')
  }

})

// V3 next-payment page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/next-payment', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v3/digital-service/next-payment-error')
  }


})

// V3 payments-history page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/payments-history', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v3/digital-service/payments-history-error')
  }


})

// V3 personal details page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/personal-details', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v3/digital-service/personal-details-error')
  }


})

// V3 bank details page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/bank-details', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v3/digital-service/bank-details-error')
  }


})

// V3 telephone information page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/telephone-information', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else  {
    res.redirect('/check-your-payment/v3/digital-service/telephone-information-error')
  }


})

// V3 payments-history page - do you want to do anything else question
router.post('/check-your-payment/v3/digital-service/return-to-tasks', function (req, res) {


  const anythingElse = req.session.data['anything-else']

  if (anythingElse === 'yes') {
    res.redirect('/check-your-payment/v3/digital-service/information-channels-page-two')
  }

  else if (anythingElse === 'no') {
    res.redirect('/check-your-payment/v3/digital-service/thank-you-close')
  }

  else {
    res.redirect('/check-your-payment/v3/digital-service/return-to-tasks-error')
  }


})

// V3 pob-carers do you want more proof of benefits?
router.post('/check-your-payment/v3/digital-service/pob-carers', function (req, res) {


  const otherPOB = req.session.data['other-pob']


  if (otherPOB === 'yes-more') {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-digital')
  }

  else if (otherPOB === 'no-more') {
    res.redirect('/check-your-payment/v3/digital-service/return-to-tasks')
  }

  else {
    res.redirect('/check-your-payment/v3/digital-service/pob-carers-error')
  }

})


// V3 pob-esa do you want more proof of benefits?
router.post('/check-your-payment/v3/digital-service/pob-esa', function (req, res) {


  const otherPOB = req.session.data['other-pob']

  if (otherPOB === 'yes-more') {
    res.redirect('/check-your-payment/v3/digital-service/pob-selection-digital')
  }

  else if (otherPOB === 'no-more') {
    res.redirect('/check-your-payment/v3/digital-service/return-to-tasks')
  }

  else {
    res.redirect('/check-your-payment/v3/digital-service/pob-esa-error')
  }

})


// * ------------------------ Baseline ------------------------

router.post('/change-bank-details/baseline/check-you-can-change-bank-details/are-you-expecting-a-payment-in-the-next-six-working-days-answer', function (req, res) {

  // Make a variable and give it the value from 'are-you-expecting-a-payment-in-the-next-six-working-days'
  var areYouExpectingaPaymentInTheNextSixWorkingDays = req.session.data['are-you-expecting-a-payment-in-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (areYouExpectingaPaymentInTheNextSixWorkingDays == "yes"){
      // Send user to next page
      res.redirect('/change-bank-details/baseline/check-you-can-change-bank-details/you-can-use-service-payment-due')
    } else if (areYouExpectingaPaymentInTheNextSixWorkingDays == "no"){
    // Send user to next page
    res.redirect('/change-bank-details/baseline/check-you-can-change-bank-details/you-can-use-service-no-payment-due')
  } else {
    // Inactive
    res.redirect('/change-bank-details/baseline/check-you-can-change-bank-details/you-can-use-service-unsure-payment-due')
  }

})

router.post('/change-bank-details/baseline/change-bank-details/benefits-you-need-to-change-answer', function (req, res) {

  // Make a variable and give it the value from 'are-you-expecting-a-payment-in-the-next-six-working-days'
  var areYouExpectingaPaymentInTheNextSixWorkingDays = req.session.data['are-you-expecting-a-payment-in-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (areYouExpectingaPaymentInTheNextSixWorkingDays == "yes"){
      // Send user to next page
      res.redirect('/change-bank-details/baseline/change-bank-details/your-next-payment-old-account')
    } else if (areYouExpectingaPaymentInTheNextSixWorkingDays == "no"){
    // Send user to next page
    res.redirect('/change-bank-details/baseline/change-bank-details/your-next-payment-new-account')
  } else {
    // Inactive
    res.redirect('/change-bank-details/baseline/change-bank-details/your-next-payment-old-account')
  }

})


router.post('/change-bank-details/baseline/change-bank-details/enter-bank-details-answer', function (req, res) {

  // Make a variable and give it the value from 'how-do-you-need-your-benefits-to-be-paid'
  var howDoYouNeedYourBenefitsToBePaid = req.session.data['how-do-you-need-your-benefits-to-be-paid']

  // Check whether the variable matches a condition
  if (howDoYouNeedYourBenefitsToBePaid == "Pay my benefits into separate accounts"){
      // Send user to next page
      res.redirect('/change-bank-details/baseline/change-bank-details/enter-bank-details-2.html')
    } else {
    // Send user to next page
    res.redirect('/change-bank-details/baseline/change-bank-details/check-your-details')
  } 

})
      

// ! ----------------------------------------------------------------------------------------------------------------------------------

// ! Change your address

// * ------------------------ Change your address V1 ------------------------

router.post('/change-address/v1/digital-service/circumstances/cora/address_location', function (req, res) {
  const editChoice = req.session.data['UKRES'];

  if (editChoice === 'UK') {
    res.redirect('/change-address/v1/digital-service/circumstances/cora/search-pattern');
  } else if (editChoice === 'Other') {
    res.redirect('/change-address/v1/digital-service/circumstances/cora/international_address_pattern');
  } else {
      res.render(__dirname + "/views/change-address/v1/digital-service/circumstances/cora/address_location", {"error":true});
  }
});


router.post('/change-address/v1/digital-service/circumstances/cora/search-pattern-answer', function (req, res) {
  const postcode = req.session.data['address-postcode'];
  const property = req.session.data['address-property'];

  if (postcode === 'LS1') {
    res.redirect('/change-address/v1/digital-service/circumstances/cora/confirm-address-pattern');
  } else if (postcode === 'LS2') {
    res.redirect('/change-address/v1/digital-service/circumstances/cora/select_address_pattern');
  }  else if (postcode === 'LS3') {
      res.redirect('/change-address/v1/digital-service/circumstances/cora/no-address');
    } else {
      let errorObject = { "error": true };
      if(!postcode) errorObject["errorPostcode"] = true;
      if(!property) errorObject["errorProperty"] = true;
console.log(postcode, property);
      res.render(__dirname + "/views/change-address/v1/digital-service/circumstances/cora/search-pattern", errorObject);
  }

});

// * ------------------------ Change your address V2 ------------------------


router.post('/change-address/v2/digital-service/circumstances/cora/address_location', function (req, res) {
  const editChoice = req.session.data['UKRES'];

  if (editChoice === 'UK') {
    res.redirect('/change-address/v2/digital-service/circumstances/cora/search-pattern');
  } else if (editChoice === 'Other') {
    res.redirect('/change-address/v2/digital-service/circumstances/cora/international_address_pattern');
  } else {
      res.render(__dirname + "/views/change-address/v2/digital-service/circumstances/cora/address_location", {"error":true});
  }
})


router.post('/change-address/v2/digital-service/circumstances/cora/search-pattern-answer', function (req, res) {
  const postcode = req.session.data['address-postcode'];
  const property = req.session.data['address-property'];

  if (postcode === 'LS1') {
    res.redirect('/change-address/v2/digital-service/circumstances/cora/confirm-address-pattern');
  } else if (postcode === 'LS2') {
    res.redirect('/change-address/v2/digital-service/circumstances/cora/select_address_pattern');
  }  else if (postcode === 'LS3') {
      res.redirect('/change-address/v2/digital-service/circumstances/cora/no-address');
    } else {
      let errorObject = { "error": true };
      if(!postcode) errorObject["errorPostcode"] = true;
      if(!property) errorObject["errorProperty"] = true;
console.log(postcode, property);
      res.render(__dirname + "/views/change-address/v2/digital-service/circumstances/cora/search-pattern", errorObject);
  }

})

// * ------------------------ Change your address V3 [DOES NOT WORK - DID NOT FIX] ------------------------

router.post('/change-address/v3/circumstances/cora/address_location', function (req, res) {
  const editChoice = req.session.data['UKRES'];

  if (editChoice === 'UK') {
    res.redirect('/change-address/v3/digital-service/circumstances/cora/search-pattern');
  } else if (editChoice === 'Other') {
    res.redirect('/change-address/v3/digital-service/circumstances/cora/international_address_pattern');
  } else {
      res.render(__dirname + "/views/change-address/v3/digital-service/circumstances/cora/address_location", {"error":true});
  }
});


router.post('/change-address/v3/circumstances/cora/search-pattern', function (req, res) {
  const postcode = req.session.data['address-postcode'];
  const property = req.session.data['address-property'];

  if (postcode === 'LS1') {
    res.redirect('/change-address/v3/digital-service/circumstances/cora/confirm-address-pattern');
  } else if (postcode === 'LS2') {
    res.redirect('/change-address/v3/digital-service/circumstances/cora/select_address_pattern');
  }  else if (postcode === 'LS3') {
      res.redirect('/change-address/v3/digital-service/circumstances/cora/no-address');
    } else {
      let errorObject = { "error": true };
      if(!postcode) errorObject["errorPostcode"] = true;
      if(!property) errorObject["errorProperty"] = true;
console.log(postcode, property);
      res.render(__dirname + "/views/change-address/v3/digital-service/circumstances/cora/search-pattern", errorObject);
  }

});






//radio options
// this is for radio selection for 1st page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-1', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var howManyBalls = req.session.data['Have-you-used-this-service-before']

  // Check whether the variable matches a condition
  if (howManyBalls == "No"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-1');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 2nd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitChange = req.session.data['Do-you-need-to-change-bank-details-for-benefits-State-Pension-or-both']

  // Check whether the variable matches a condition
  if (benefitChange == "Benefits"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-2');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-3', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var changeBankdetails = req.session.data['Do-you-need-to-change-bank-details-for-your-own-benefit-payments']

  // Check whether the variable matches a condition
  if (changeBankdetails == "Yes for my own"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-3');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-5', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var whereBenefitPaid = req.session.data['Where-do-your-benefits-get-paid']

  // Check whether the variable matches a condition
  if (whereBenefitPaid == "Bank account"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-5');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})
// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-6', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaid = req.session.data['paid-into-UK-bank-account']

  // Check whether the variable matches a condition
  if (benefitPaid == "Yes"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-6');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-7', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaid = req.session.data['new-account-based-in-the-UK']

  // Check whether the variable matches a condition
  if (benefitPaid == "Yes"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-question-7');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-eligible', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var paymentDue = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (paymentDue == "No"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/Eligibility-questions/eligibility-eligible');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/list-homepage/esa-New-bankdetails', function (req, res) {

  req.session.data['new-name-on-the-account']='';
  req.session.data['new-sort-code']='';
  req.session.data['new-account-number']='';
  req.session.data['new-roll-number']='';
  // Make a variable and give it the value from 'how-many-balls'
  var changePayment = req.session.data['interview-needs']

  // Check whether the variable matches a condition
  if (changePayment == "yes"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/list-homepage/esa-New-bankdetails');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 3rd page
router.post('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/list-homepage/Before-you-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var oneBankAccount = req.session.data['payments-into-one-bank-account']

  // Check whether the variable matches a condition
  if (oneBankAccount == "yes"){
    // Send user to next page
    res.redirect('/V42_2-Change-bank-details-user-testing-2/Change-bank-details-user-testing-2/list-homepage/Before-you-change-bank-details');

  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


//Alpha assessment prototype start here


// How did you find about this service
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/check-if-you-can-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['How-did-you-find-out-about-this-service']

  // Check whether the variable matches a condition
  if (findService == "Letter"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/check-if-you-can-change-bank-details');

  } else {
    // Send on contact us page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/can-not-use-this-service');
  }

})

//radio options
// this is for radio selection for 1st page
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-1', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var usedServicebefore = req.session.data['Have-you-used-this-service-before']

  // Check whether the variable matches a condition
  if (usedServicebefore == "No"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-1');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 2nd page
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var changeDetail = req.session.data['change-bank-details-for-benefits-State-Pension-or-both']

  // Check whether the variable matches a condition
  if (changeDetail == "Benefits"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-2');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// for who does the payment belongs to?
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-3', function (req, res) {

  req.session.data['Which-benefits-do-you-get']='';

  // Make a variable and give it the value from 'how-many-balls'
  var changeFor = req.session.data['Do-you-need-to-change-bank-details-for-your-own-benefit-payments']

  // Check whether the variable matches a condition
  if (changeFor == "Yes for my own"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-3');

  } else {
      // Check whether the variable matches a condition
    if (changeFor == "someone else"){
      // Send user to next page
      res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/someone-else');
   } else {
    // Send user back to same page
    res.redirect('back');
  }
}

})


// this is for radio selection for 3rd page
router.post('V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-5', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaid = req.session.data['benefits-get-paid']

  // Check whether the variable matches a condition
  if (benefitPaid == "Not-sure"){
    // Send user to next page
     res.redirect('V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-5');
  } else {
            // Send user back to same page
            res.redirect('back');
  }

}) 


// Do you benefit paid into UK bank account?
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-6', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaidUK = req.session.data['paid-into-UK-bank-account']

  // Check whether the variable matches a condition
  if (benefitPaidUK == "Yes"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-6');
  } else {
    if (benefitPaidUK == "No"){
    // Send on contact us page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/non-UKBank-message');
    } else {
    // Send user back to same page
    res.redirect('back');
  }
}
})

// Do you benefit paid into UK bank account?
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-7', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var newBankUK = req.session.data['Is-your-new-account-also-based-in-the-UK']

  // Check whether the variable matches a condition
  if (newBankUK == "Yes"){
       // Send next page
       res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-7');
  } else {
    if (newBankUK == "No"){
      // Send on contact us page
      res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/non-UKBank-message');
      }
      else {
      // Send user back to same page
      res.redirect('back');
    }
  }
})
// Do you benefit paid into UK bank account?
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var duePayment = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (duePayment == "Yes"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/paymentdue');

  } else {
    if (duePayment == "No"){
      // Send user to next page
      res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible');
    } else {
      // Send user back to same page
      res.redirect('back');
    }
}

})


// this is for radio selection for 3rd page
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/list-homepage/esa-New-bankdetails', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var changeBank = req.session.data['Before-you-change-bank-details']

  // Check whether the variable matches a condition
  if (changeBank == "Yes"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/list-homepage/esa-New-bankdetails');

  } else {
    // Send on contact us page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/list-homepage/contactus');
  }

})

// this is for radio selection for List home page
router.post('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/list-homepage/Before-you-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var intoOneAccount = req.session.data['payments-into-one-bank-account']

  // Check whether the variable matches a condition
  if (intoOneAccount == "into one account"){
    // Send user to next page
    res.redirect('/V4_3-Change-bank-details-user-testing-3/Change-bank-details-iteration-3/list-homepage/Before-you-change-bank-details');

  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// code for dynamic prototype - ur14


// How did you find about this service
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/check-if-you-can-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['How-did-you-find-out-about-this-service']

  // Check whether the variable matches a condition
  if (findService == "Letter"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/check-if-you-can-change-bank-details');

  } else {
    // Send on contact us page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/can-not-use-this-service');
  }

})

//radio options
// this is for radio selection for 1st page
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-1', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var usedServicebefore = req.session.data['Have-you-used-this-service-before']

  // Check whether the variable matches a condition
  if (usedServicebefore == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-1');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 2nd page
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var changeDetail = req.session.data['change-bank-details-for-benefits-State-Pension-or-both']

  // Check whether the variable matches a condition
  if (changeDetail == "Benefits"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-2');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// for who does the payment belongs to?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-3', function (req, res) {

  req.session.data['Which-benefits-do-you-get']='';

  // Make a variable and give it the value from 'how-many-balls'
  var changeFor = req.session.data['Do-you-need-to-change-bank-details-for-your-own-benefit-payments']

  // Check whether the variable matches a condition
  if (changeFor == "Yes for my own"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-3');

  } else {
      // Check whether the variable matches a condition
    if (changeFor == "someone else"){
      // Send user to next page
      res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/someone-else');
   } else {
    // Send user back to same page
    res.redirect('back');
  }
}

})

// for who does the payment belongs to?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-4', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitsYouGet = req.session.data['Which-benefits-do-you-get']

  // Check whether the variable matches a condition
  if (benefitsYouGet == "I get a different benefit"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/get-different-benefits');

  } else {
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-4');
}
})


// this is for radio selection for 3rd page
router.post('V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-5', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaid = req.session.data['benefits-get-paid']

  // Check whether the variable matches a condition
  if (benefitPaid == "Not-sure"){
    // Send user to next page
     res.redirect('V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-5');
  } else {
            // Send user back to same page
            res.redirect('back');
  }

}) 


// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-6', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaidUK = req.session.data['paid-into-UK-bank-account']

  // Check whether the variable matches a condition
  if (benefitPaidUK == "Yes"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-6');
  } else {
    if (benefitPaidUK == "No"){
    // Send on contact us page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/non-UKBank-message');
    } else {
    // Send user back to same page
    res.redirect('back');
  }
}
})

// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-7', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var newBankUK = req.session.data['Is-your-new-account-also-based-in-the-UK']

  // Check whether the variable matches a condition
  if (newBankUK == "Yes"){
       // Send next page
       res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-question-7');
  } else {
    if (newBankUK == "No"){
      // Send on contact us page
      res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/non-UKBank-message');
      }
      else {
      // Send user back to same page
      res.redirect('back');
    }
  }
})

// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var duePayment = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (duePayment == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible');

    } else {
      // Send user payment due page
      res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/paymentdue');
    }

})


// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var basedAnswerCont = req.session.data['Do-you-want-to-continue']

  // Check whether the variable matches a condition
  if (basedAnswerCont == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/unhappy-path/contactUs');

    } else {
      // Send user payment due page
      res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/Eligibility-questions/eligibility-eligible-2');
    }

})


// // Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/Before-you-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var paymentDue = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (paymentDue == "Yes") {
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/payment-in-progress');
  }
  else {
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/Before-you-change-bank-details');
  }
})



// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/all-benefits-in-One-account', function (req, res) {
  // Make a variable and give it the value from 'how-many-balls'
  var confirmBeforeChange = req.session.data['Before-you-change-bank-details']
  var benefitPayAccount = req.session.data['payments-into-one-bank-account']
  // Check whether the variable matches a condition
  if (confirmBeforeChange == "No") {
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/contactus'); 
  } else {  
      req.session.data['oneAccount'] = '';
      req.session.data['dataName'] = '';
      req.session.data['new-name-on-the-account'] = '';
      req.session.data['new-sort-code'] = '';
      req.session.data['new-account-number'] = '';
      req.session.data['new-roll-number'] = '';
      if (benefitPayAccount == "into one account") {
        res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/all-benefits-in-One-account');
      } else if (benefitPayAccount == "into separate account") {  
        req.session.data['benefitNumber'] = 0
        res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/multiple-account/new-bankdetail-for-1');
      }
  } 

})


router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/multiple-account/new-bankdetail-for-1-answers', function (req, res) {

  var benefitAmount = req.session.data['Which-benefits-do-you-get-1']
  var nextBenefitNumber = req.session.data['benefitNumber'] + 1
  
  if(benefitAmount.length == nextBenefitNumber ){
    res.redirect('../check-answers')
  }
  else {
    // Make sure we change this benefitNumber 
    req.session.data['benefitNumber'] = nextBenefitNumber
    res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/multiple-account/new-bankdetail-for-1')
  }
})


// confirmation page based on the due date within 6 days or not
router.post('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/confirmation', function (req, res) {

   // Make a variable and give it the value from 'how-many-balls'
   var paymentDue = req.session.data['payment-due-within-the-next-six-working-days']

   // Check whether the variable matches a condition
   if (paymentDue == "Yes") {
     res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/confirmation-2');
   }
   else {
     res.redirect('/V5-dynamic-prototype/Change-bank-details-iteration-3/list-homepage/confirmation');
   }
 })




 //just for OIDV for Andy's demo - remove after that
 

// Common error page for OIDV Security number
// this is for NINO number for UR round-5
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/list-home-page', function (req, res) {
if (req.session.data['signin-code'] == '471350') {
  // Send user to next page
  res.render('V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/list-home-page')
} else {
  var errMsg = "";
  if (req.session.data['signin-code'] == '' || req.session.data['signin-code'] == undefined) {
    errMsg = "Enter your security code";
  } else {
    errMsg = "Security code does not match the one we sent you";
  }
  // Send user to error page
  res.render('V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/OIDV/authenticate/sign-in-2fa-Error', { "errMsg": errMsg });
}
})


// How did you find about this service
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/check-if-you-can-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['How-did-you-find-out-about-this-service']

  // Check whether the variable matches a condition
  if (findService == "Letter"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/check-if-you-can-change-bank-details');

  } else {
    // Send on contact us page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/can-not-use-this-service');
  }

})

//radio options
// this is for radio selection for 1st page
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-1', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var usedServicebefore = req.session.data['Have-you-used-this-service-before']

  // Check whether the variable matches a condition
  if (usedServicebefore == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-1');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})

// this is for radio selection for 2nd page
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var changeDetail = req.session.data['change-bank-details-for-benefits-State-Pension-or-both']

  // Check whether the variable matches a condition
  if (changeDetail == "Benefits"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-2');
  } else {
    // Send user back to same page
    res.redirect('back');
  }

})


// for who does the payment belongs to?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-3', function (req, res) {

  req.session.data['Which-benefits-do-you-get']='';

  // Make a variable and give it the value from 'how-many-balls'
  var changeFor = req.session.data['Do-you-need-to-change-bank-details-for-your-own-benefit-payments']

  // Check whether the variable matches a condition
  if (changeFor == "Yes for my own"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-3');

  } else {
      // Check whether the variable matches a condition
    if (changeFor == "someone else"){
      // Send user to next page
      res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/someone-else');
   } else {
    // Send user back to same page
    res.redirect('back');
  }
}

})

// for who does the payment belongs to?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-4', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitsYouGet = req.session.data['Which-benefits-do-you-get']

  // Check whether the variable matches a condition
  if (benefitsYouGet == "I get a different benefit"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/get-different-benefits');

  } else {
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-4');
}
})


// this is for radio selection for 3rd page
router.post('V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-5', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaid = req.session.data['benefits-get-paid']

  // Check whether the variable matches a condition
  if (benefitPaid == "Not-sure"){
    // Send user to next page
     res.redirect('V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-5');
  } else {
            // Send user back to same page
            res.redirect('back');
  }

}) 


// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-6', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitPaidUK = req.session.data['paid-into-UK-bank-account']

  // Check whether the variable matches a condition
  if (benefitPaidUK == "Yes"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-6');
  } else {
    if (benefitPaidUK == "No"){
    // Send on contact us page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/non-UKBank-message');
    } else {
    // Send user back to same page
    res.redirect('back');
  }
}
})

// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-7', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var newBankUK = req.session.data['Is-your-new-account-also-based-in-the-UK']

  // Check whether the variable matches a condition
  if (newBankUK == "Yes"){
       // Send next page
       res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-question-7');
  } else {
    if (newBankUK == "No"){
      // Send on contact us page
      res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/non-UKBank-message');
      }
      else {
      // Send user back to same page
      res.redirect('back');
    }
  }
})

// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-eligible', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var duePayment = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (duePayment == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-eligible');

    } else {
      // Send user payment due page
      res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/paymentdue');
    }

})


// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-eligible-2', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var basedAnswerCont = req.session.data['Do-you-want-to-continue']

  // Check whether the variable matches a condition
  if (basedAnswerCont == "No"){
    // Send user to next page
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/unhappy-path/contactUs');

    } else {
      // Send user payment due page
      res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/Eligibility-questions/eligibility-eligible-2');
    }

})


// // Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/Before-you-change-bank-details', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var paymentDue = req.session.data['payment-due-within-the-next-six-working-days']

  // Check whether the variable matches a condition
  if (paymentDue == "Yes") {
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/payment-in-progress');
  }
  else {
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/Before-you-change-bank-details');
  }
})



// Do you benefit paid into UK bank account?
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/all-benefits-in-One-account', function (req, res) {
  // Make a variable and give it the value from 'how-many-balls'
  var confirmBeforeChange = req.session.data['Before-you-change-bank-details']
  var benefitPayAccount = req.session.data['payments-into-one-bank-account']
  // Check whether the variable matches a condition
  if (confirmBeforeChange == "No") {
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/contactus'); 
  } else {  
      req.session.data['oneAccount'] = '';
      req.session.data['dataName'] = '';
      req.session.data['new-name-on-the-account'] = '';
      req.session.data['new-sort-code'] = '';
      req.session.data['new-account-number'] = '';
      req.session.data['new-roll-number'] = '';
      if (benefitPayAccount == "into one account") {
        res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/all-benefits-in-One-account');
      } else if (benefitPayAccount == "into separate account") {  
        req.session.data['benefitNumber'] = 0
        res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/multiple-account/new-bankdetail-for-1');
      }
  } 

})


router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/multiple-account/new-bankdetail-for-1-answers', function (req, res) {

  var benefitAmount = req.session.data['Which-benefits-do-you-get-1']
  var nextBenefitNumber = req.session.data['benefitNumber'] + 1
  
  if(benefitAmount.length == nextBenefitNumber ){
    res.redirect('../check-answers')
  }
  else {
    // Make sure we change this benefitNumber 
    req.session.data['benefitNumber'] = nextBenefitNumber
    res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/multiple-account/new-bankdetail-for-1')
  }
})


// confirmation page based on the due date within 6 days or not
router.post('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/confirmation', function (req, res) {

   // Make a variable and give it the value from 'how-many-balls'
   var paymentDue = req.session.data['payment-due-within-the-next-six-working-days']

   // Check whether the variable matches a condition
   if (paymentDue == "Yes") {
     res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/confirmation-2');
   }
   else {
     res.redirect('/V5-dynamic-prototype/Iteration4-with-returning-OIDV-journey/list-homepage/confirmation');
   }
 })

 //User who gets benefts prototype start here

// How did you find about this service
router.post('/V5/iteration-5/eligibility/test-eligibility-questions/how-did-customer-find-out-about-this-service', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['How-did-you-find-out-about-this-service']

  // Check whether the variable matches a condition
  if (findService == "Letter"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/what-does-customer-need-to-do');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/unhappy-path/can-not-use-this-service');
  }

})

// Who does the payment belong to?
router.post('/V5/iteration-5/eligibility/test-eligibility-questions/who-does-the-payment-belong-to', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['who-does-the-payment-belong-to']

  // Check whether the variable matches a condition
  if (findService == "Me"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/what-benefits-need-to-change');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/unhappy-path/someone-else');
  }

})

// Which benefits do you get?
router.post('/V5/iteration-5/eligibility/test-eligibility-questions/which-benefits-does-customer-get', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitsYouGet = req.session.data['Which-benefits-do-you-get']

  // Check whether the variable matches a condition
  if (benefitsYouGet == "I get a different benefit"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/unhappy-path/get-different-benefits');

  } else {
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/changing-the-account-we-pay-your-benefits-into');
}
})


// changing the account we pay your benefits into
router.post('/V5/iteration-5/eligibility/test-eligibility-questions/changing-the-account-we-pay-your-benefits-into', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['Is-your-new-account-also-based-in-the-UK']

  // Check whether the variable matches a condition
  if (findService == "Yes"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/are-you-expecting-a-payment');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/unhappy-path/non-UKBank-message');
  }

})

// Are you expecting a payment/voucher in the next 2 working days
router.post('/V5/iteration-5/eligibility/test-eligibility-questions/are-you-expecting-a-payment', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['expecting-payment-in-the-next-2-working-days']

  // Check whether the variable matches a condition
  if (findService == "No"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/you-can-use-this-service');

  } if (findService == "Yes"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/you-can-use-this-service-in-progress');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-questions/unhappy-path/contactUs');
  }

})

//User who gets benefts prototype end here



//User who gets benefts without (expecting payment/voucher page) prototype start here

// How did you find about this service
router.post('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/how-did-customer-find-out-about-this-service', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['How-did-you-find-out-about-this-service']

  // Check whether the variable matches a condition
  if (findService == "Letter"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/what-does-customer-need-to-do');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/unhappy-path/can-not-use-this-service');
  }

})

// Who does the payment belong to?
router.post('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/who-does-the-payment-belong-to', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['who-does-the-payment-belong-to']

  // Check whether the variable matches a condition
  if (findService == "Me"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/what-benefits-need-to-change');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/unhappy-path/someone-else');
  }

})

// Which benefits do you get?
router.post('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/which-benefits-does-customer-get', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var benefitsYouGet = req.session.data['Which-benefits-do-you-get']

  // Check whether the variable matches a condition
  if (benefitsYouGet == "I get a different benefit"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/unhappy-path/get-different-benefits');

  } else {
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/changing-the-account-we-pay-your-benefits-into');
}
})


// changing the account we pay your benefits into
router.post('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/changing-the-account-we-pay-your-benefits-into', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var findService = req.session.data['Is-your-new-account-also-based-in-the-UK']

  // Check whether the variable matches a condition
  if (findService == "Yes"){
    // Send user to next page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/you-can-use-this-service');

  } else {
    // Send on contact us page
    res.redirect('/V5/iteration-5/eligibility/test-eligibility-without-payment-due/unhappy-path/non-UKBank-message');
  }

})


// ! Get a proof of benefit letter

// Proof of benefit routes each have their own files located in the routes folder. To keep things simple, each version has its own route file :)

const pobV1 = require('./routes/pob-v1')
router.use('/', pobV1)

const pobV2 = require('./routes/pob-v2')
router.use('/', pobV2)

const pobV3 = require('./routes/pob-v3')
router.use('/', pobV3)

const pobV4 = require('./routes/pob-v4')
router.use('/', pobV4)

const pobV4Digital = require('./routes/pob-v4-digital')
router.use('/', pobV4Digital)

const pobV4Mixed = require('./routes/pob-v4-mixed')
router.use('/', pobV4Mixed)

const pobV5 = require('./routes/pob-v5')
router.use('/', pobV5)

const release2 = require('./routes/release-2')
router.use('/', release2)

const practice = require('./routes/practice')
router.use('/', practice)

const download1 = require('./routes/download-1')
router.use('/', download1)

const download2 = require('./routes/download-2')
router.use('/', download2)

const download3 = require('./routes/download-3')
router.use('/', download3)

const downloadNotifications = require('./routes/download-notifications')
router.use('/', downloadNotifications)


