const express = require('express')
const router = express.Router()

// * Version 1

// Select address page based on how many benefits are selected by the user.
router.all('/get-a-proof-of-benefit-letter/v1/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  // Check whether multiple benefits selected
  if (researchSetUpBenefits.length > 1)  {
    // Send user to next page
    res.redirect('/get-a-proof-of-benefit-letter/v1/select-benefits');

  } else {
    // Send to single benefit page
    res.redirect('/get-a-proof-of-benefit-letter/v1/do-you-want-a-letter-for');
  }

})

// Display post or home address for MULTI benefit select page
router.post('/get-a-proof-of-benefit-letter/v1/multi-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var whichBenefitNeedProof = req.session.data['which-benefits-need-proof']

  // Check if correspondence address is available
  if (researchSetUpAddress === "post" && !whichBenefitNeedProof.includes("I need a letter for another benefit"))  {
    // Send user to multi address page
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');

  } else if (researchSetUpAddress === "home" && !whichBenefitNeedProof.includes("I need a letter for another benefit"))  {
    // Send user to single address page
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');

  } else {
    // Send to you can't get proof for all benefits.
    res.redirect('/get-a-proof-of-benefit-letter/v1/you-cannot-get-proof-of-all-your-benefits.html');


  }

})


// Display mutli address or single address page for SINGLE benefit
router.post('/get-a-proof-of-benefit-letter/v1/single-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']


  // Check if correspondence address is available
  if (researchSetUpAddress === "post" && doYouWantLetterFor == "yes")  {
    // Send user to multi address page
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');

  } else if (researchSetUpAddress === "home" && doYouWantLetterFor == "yes")  {
    // Send user to next single address page
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');


  } else if (doYouWantLetterFor == "no") {
        // Send user to can't get letter page
        res.redirect('/get-a-proof-of-benefit-letter/v1/you-cannot-get-proof-of-benefit-letter');

  }

  else {
    // Send user to can't get letter page
    res.redirect('/get-a-proof-of-benefit-letter/v1/you-cannot-get-proof-of-benefit-letter');
  }

})

// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v1/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']
  var whereToSendLetter = req.session.data['whereToSendLetter']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v1/contact-us-to-get-proof-of-benefit-letter');

    // Check if user selected no on multi address page
  } else if (whereToSendLetter === "none-of-these")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v1/contact-us-to-get-proof-of-benefit-letter');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v1/check-your-answers');
  }

})


// Place user back into journey from you cant get a proof for all benefits
router.post('/get-a-proof-of-benefit-letter/v1/cant-get-proof-all-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']

  // Check if correspondence address is available
  if (researchSetUpAddress === "post")  {
    // Show post address
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');

  } else  {
    // Show home address
    res.redirect('/get-a-proof-of-benefit-letter/v1/is-your-home-address-correct');

  } 

})

router.post('/get-a-proof-of-benefit-letter/v1/research-set-up/proof-of-benefit-placeholder', function (req, res) {
  res.redirect('/get-a-proof-of-benefit-letter/v1/research-set-up/benefits')
})

// Select address page based on how many benefits are selected by the user.
router.post('/idv/hmrciv/success', function (req, res) {
  if (req.session.data.prototypeVersion === 'protoA') {
    res.redirect('/get-a-proof-of-benefit-letter/v1/account-home')
  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v1/personal-details')
  }
})

module.exports = router;