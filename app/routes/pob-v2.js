const express = require('express')
const router = express.Router()

// * Version 2 - Research

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/v2-research/research-set-up/PoB-clear-data', function (req, res) {

  req.session.data = {}
  inScope = [];
  oOScope = [];
  uCBenefit = false
  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  // delete req.session.data['which-benefits-need-proof'];
  delete inScope;
  delete oOScope;

  console.log(inScope);
  console.log(oOScope);
  
  res.redirect("benefits");
  
  })

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v2-research/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "letter-from-the-department-for-work-and-pensions")  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/account-home');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v2-research/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/you-cannot-use-this-service-no-benefits');
    return

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v2-research/select-benefits-you-need-proof-of');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v2-research/do-you-need-proof-of-your-benefits');
    }  
  
})


// Display post or home address for SINGLE benefit select page
router.post('/get-a-proof-of-benefit-letter/v2-research/single-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']
  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  inScope = [];
  oOScope = [];
  uCBenefit = false
  delete inScope;
  delete oOScope;
  delete uCBenefit

  for (var i=0; i < researchSetUpBenefits.length; i++) {

    if (researchSetUpBenefits[i] === 'Bereavement Benefit' ||
    researchSetUpBenefits[i] === 'Bereavement Support Payment' ||
    researchSetUpBenefits[i] === 'Carer’s Allowance' ||
    researchSetUpBenefits[i] === 'Incapacity Benefit' ||
    researchSetUpBenefits[i] === 'Industrial Injuries Disablement Benefit (IIDB)' ||
    researchSetUpBenefits[i] === 'Maternity Allowance' ||
    researchSetUpBenefits[i] === 'Personal Independence Payment (PIP)' ||
    researchSetUpBenefits[i] === 'Severe Disablement Allowance' ||
    researchSetUpBenefits[i] === 'Widow’s Benefit'
          ) {
            oOScope.push(researchSetUpBenefits[i])
  
          } else if (researchSetUpBenefits[i] === 'Universal Credit') {
            uCBenefit = true;
          
          } else {
            inScope.push(researchSetUpBenefits[i])
          }
    }

  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  req.session.data.uCBenefit = uCBenefit;

  console.log(inScope)
  console.log(oOScope)
  console.log(doYouWantLetterFor)
  console.log("Confirm letter" + confirmLetterSend)
 
  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes' && oOScope.length === 0 && uCBenefit == false)   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/check-your-answers');
  
  } else if (researchSetUpAddress === "post" && doYouWantLetterFor == "yes" && inScope.length === 1)  {
    // Send user to multi address page
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/where-we-send-your-letter');

  } else if (researchSetUpAddress === "home" && doYouWantLetterFor == "yes" && inScope.length === 1)  {
    // Send user to next single address page
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/where-we-send-your-letter');

  }  else if ((oOScope.length === 1 || uCBenefit == true) && doYouWantLetterFor == "yes") {
      res.redirect('/get-a-proof-of-benefit-letter/v2-research/you-cannot-get-proof-of-benefit-letter.html');
    
  } else if (doYouWantLetterFor == "no") {
        // Send user to can't get letter page
        res.redirect('/get-a-proof-of-benefit-letter/v2-research/contact-us');
  }

})

// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v2-research/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']
  var whereToSendLetter = req.session.data['whereToSendLetter']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/check-your-answers');
  }

})


// Place user back into journey from you cant get a proof for all benefits
router.post('/get-a-proof-of-benefit-letter/v2-research/cant-get-proof-all-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/check-your-answers');
  
  } else  {
    // Show home address
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/where-we-send-your-letter');
  } 

})

router.post('/get-a-proof-of-benefit-letter/v2-research/multi-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var whichBenefitNeedProof = req.session.data['which-benefits-need-proof']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  inScope = [];
  oOScope = [];
  uCBenefit = false
  delete inScope;
  delete oOScope;
  delete uCBenefit

  for (var i=0; i < whichBenefitNeedProof.length; i++) {

    if (whichBenefitNeedProof[i] === 'Bereavement Benefit' ||
        whichBenefitNeedProof[i] === 'Bereavement Support Payment' ||
        whichBenefitNeedProof[i] === 'Carer’s Allowance' ||
        whichBenefitNeedProof[i] === 'Incapacity Benefit' ||
        whichBenefitNeedProof[i] === 'Industrial Injuries Disablement Benefit (IIDB)' ||
        whichBenefitNeedProof[i] === 'Maternity Allowance' ||
        whichBenefitNeedProof[i] === 'Personal Independence Payment (PIP)' ||
        whichBenefitNeedProof[i] === 'Severe Disablement Allowance' ||
        whichBenefitNeedProof[i] === 'Widow’s Benefit'
        ) {
          oOScope.push(whichBenefitNeedProof[i])
        } 
    
    else if (whichBenefitNeedProof[i] === 'Universal Credit') {
            uCBenefit = true;
    }
    
    else {
      inScope.push(whichBenefitNeedProof[i])
    }
  }

  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  req.session.data.uCBenefit = uCBenefit;


  console.log(inScope)
  console.log(oOScope)
  console.log(uCBenefit)

  if (confirmLetterSend === 'yes' && oOScope.length === 0 && uCBenefit == false)   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/check-your-answers');
  
  } else if (researchSetUpAddress === "post" && (oOScope.length === 0 && uCBenefit == false))  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/where-we-send-your-letter');

  } else if (researchSetUpAddress === "home" && (oOScope.length === 0 && uCBenefit == false))  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/where-we-send-your-letter');
    

  } else if (inScope.length === 0)  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/you-cannot-use-this-service-contact-us');

  } else if (inScope.length >= 1 && (oOScope.length >= 1 || uCBenefit == true)) {
    res.redirect('/get-a-proof-of-benefit-letter/v2-research/getting-proof-of-your-benefits');

  }

})

// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v2-research/notify-info-answers', function (req, res) {

//   var notifyEmailAddress = req.session.data['notifyEmailAddress']
//   var notifyName = req.session.data['notifyName']
//   req.session.data.inScope = inScope;
//   console.log(inScope)

//   notify.sendEmail(
//     // this long string is the template ID, copy it from the template
//     // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
//     // in your code.
//     '84aa1288-3b44-4ce0-a278-ae54e833dfb4', notifyEmailAddress, 
//     // `emailAddress` here needs to match the name of the form field in
//     // your HTML page
//     {
//       personalisation: {
//       'name': notifyName,
//     }
//   }
//   )
//   // This is the URL the users will be redirected to once the email
//   // has been sent
//   res.redirect('/get-a-proof-of-benefit-letter/v2-research/request-complete');

// });



// * Version 2 - Dev

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/v2-dev/dev-set-up/PoB-clear-data', function (req, res) {

  req.session.data = {}
  inScope = [];
  oOScope = [];
  uCBenefit = false
  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  // delete req.session.data['which-benefits-need-proof'];
  delete inScope;
  delete oOScope;

  console.log(inScope);
  console.log(oOScope);
  
  res.redirect("benefits");
  
  })

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v2-dev/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "letter-from-the-department-for-work-and-pensions")  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v2-dev/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/you-cannot-use-this-service-no-benefits');
    return

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v2-dev/select-benefits-you-need-proof-of');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v2-dev/do-you-need-proof-of-your-benefits');
    }  
  
})


// Display post or home address for SINGLE benefit select page
router.post('/get-a-proof-of-benefit-letter/v2-dev/single-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']
  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  inScope = [];
  oOScope = [];
  uCBenefit = false
  delete inScope;
  delete oOScope;
  delete uCBenefit

  for (var i=0; i < researchSetUpBenefits.length; i++) {

    if (researchSetUpBenefits[i] === 'Bereavement Benefit' ||
    researchSetUpBenefits[i] === 'Bereavement Support Payment' ||
    researchSetUpBenefits[i] === 'Carer’s Allowance' ||
    researchSetUpBenefits[i] === 'Incapacity Benefit' ||
    researchSetUpBenefits[i] === 'Industrial Injuries Disablement Benefit (IIDB)' ||
    researchSetUpBenefits[i] === 'Maternity Allowance' ||
    researchSetUpBenefits[i] === 'Personal Independence Payment (PIP)' ||
    researchSetUpBenefits[i] === 'Severe Disablement Allowance' ||
    researchSetUpBenefits[i] === 'Widow’s Benefit'
          ) {
            oOScope.push(researchSetUpBenefits[i])
  
          } else if (researchSetUpBenefits[i] === 'Universal Credit') {
            uCBenefit = true;
          
          } else {
            inScope.push(researchSetUpBenefits[i])
          }
    }

  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  req.session.data.uCBenefit = uCBenefit;

  console.log(inScope)
  console.log(oOScope)
  console.log(doYouWantLetterFor)
  console.log("Confirm letter" + confirmLetterSend)
 
  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes' && oOScope.length === 0 && uCBenefit == false)   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/check-your-answers');
  
  } else if (researchSetUpAddress === "post" && doYouWantLetterFor == "yes" && inScope.length === 1)  {
    // Send user to multi address page
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/where-we-send-your-letter');

  } else if (researchSetUpAddress === "home" && doYouWantLetterFor == "yes" && inScope.length === 1)  {
    // Send user to next single address page
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/where-we-send-your-letter');

  }  else if ((oOScope.length === 1 || uCBenefit == true) && doYouWantLetterFor == "yes") {
      res.redirect('/get-a-proof-of-benefit-letter/v2-dev/you-cannot-get-proof-of-benefit-letter.html');
    
  } else if (doYouWantLetterFor == "no") {
        // Send user to can't get letter page
        res.redirect('/get-a-proof-of-benefit-letter/v2-dev/contact-us');
  }

})

// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v2-dev/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']
  var whereToSendLetter = req.session.data['whereToSendLetter']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/check-your-answers');
  }

})


// Place user back into journey from you cant get a proof for all benefits
router.post('/get-a-proof-of-benefit-letter/v2-dev/cant-get-proof-all-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/check-your-answers');
  
  } else  {
    // Show home address
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/where-we-send-your-letter');
  } 

})

router.post('/get-a-proof-of-benefit-letter/v2-dev/multi-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var whichBenefitNeedProof = req.session.data['which-benefits-need-proof']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  inScope = [];
  oOScope = [];
  uCBenefit = false
  delete inScope;
  delete oOScope;
  delete uCBenefit

  for (var i=0; i < whichBenefitNeedProof.length; i++) {

    if (whichBenefitNeedProof[i] === 'Bereavement Benefit' ||
        whichBenefitNeedProof[i] === 'Bereavement Support Payment' ||
        whichBenefitNeedProof[i] === 'Carer’s Allowance' ||
        whichBenefitNeedProof[i] === 'Incapacity Benefit' ||
        whichBenefitNeedProof[i] === 'Industrial Injuries Disablement Benefit (IIDB)' ||
        whichBenefitNeedProof[i] === 'Maternity Allowance' ||
        whichBenefitNeedProof[i] === 'Personal Independence Payment (PIP)' ||
        whichBenefitNeedProof[i] === 'Severe Disablement Allowance' ||
        whichBenefitNeedProof[i] === 'Widow’s Benefit'
        ) {
          oOScope.push(whichBenefitNeedProof[i])
        } 
    
    else if (whichBenefitNeedProof[i] === 'Universal Credit') {
            uCBenefit = true;
    }
    
    else {
      inScope.push(whichBenefitNeedProof[i])
    }
  }

  req.session.data.inScope = inScope;
  req.session.data.oOScope = oOScope;
  req.session.data.uCBenefit = uCBenefit;


  console.log(inScope)
  console.log(oOScope)
  console.log(uCBenefit)

  if (confirmLetterSend === 'yes' && oOScope.length === 0 && uCBenefit == false)   {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/check-your-answers');
  
  } else if (researchSetUpAddress === "post" && (oOScope.length === 0 && uCBenefit == false))  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/where-we-send-your-letter');

  } else if (researchSetUpAddress === "home" && (oOScope.length === 0 && uCBenefit == false))  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/where-we-send-your-letter');
    

  } else if (inScope.length === 0)  {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/you-cannot-use-this-service-contact-us');

  } else if (inScope.length >= 1 && (oOScope.length >= 1 || uCBenefit == true)) {
    res.redirect('/get-a-proof-of-benefit-letter/v2-dev/getting-proof-of-your-benefits');

  }

})

// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v2-dev/notify-info-answers', function (req, res) {

//   var notifyEmailAddress = req.session.data['notifyEmailAddress']
//   var notifyName = req.session.data['notifyName']
//   req.session.data.inScope = inScope;
//   console.log(inScope)

//   notify.sendEmail(
//     // this long string is the template ID, copy it from the template
//     // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
//     // in your code.
//     '84aa1288-3b44-4ce0-a278-ae54e833dfb4', notifyEmailAddress, 
//     // `emailAddress` here needs to match the name of the form field in
//     // your HTML page
//     {
//       personalisation: {
//       'name': notifyName,
//     }
//   }
//   )
//   // This is the URL the users will be redirected to once the email
//   // has been sent
//   res.redirect('/get-a-proof-of-benefit-letter/v2-dev/request-complete');

// });

module.exports = router;