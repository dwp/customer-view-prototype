const express = require('express')
const router = express.Router()

// * Release - 2 - England and Scotland

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/download/download-1/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/download/download-1/research-set-up/benefits-answer', function (req, res) {

    var researchSetUpBenefits = req.session.data['researchSetUpBenefits']
  
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
            researchSetUpBenefits[i] === 'Severe Disablement Allowance' ||
            researchSetUpBenefits[i] === 'Widow’s Benefit'
          ) {
            oOScope.push(researchSetUpBenefits[i])
          } 
      
      else if (researchSetUpBenefits[i] === 'Universal Credit') {
              uCBenefit = true;
      }
      
      else {
        inScope.push(researchSetUpBenefits[i])
      }
    }
  
    req.session.data.inScope = inScope;
    req.session.data.oOScope = oOScope;
    req.session.data.uCBenefit = uCBenefit;
  
  
    console.log(inScope)
    console.log(oOScope)
    console.log(uCBenefit)
  
  res.redirect('/get-a-proof-of-benefit-letter/download/download-1/research-set-up/address');
  
   })

  

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/download/download-1/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/download/download-1/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/you-cannot-use-this-service-no-benefits');
    return

  } else if ((researchSetUpBenefits.length > 0) && (inScope.length > 0 ))   {
      res.redirect('/get-a-proof-of-benefit-letter/download/download-1/select-benefits-you-need-proof-of');

  } else if (inScope.length === 0 )  {
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/you-cannot-get-proof-of-benefit-letter');

  } 
  
})

router.post('/get-a-proof-of-benefit-letter/download/download-1/select-benefits-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

    if (doYouWantLetterFor === 'no') {
      res.redirect('/get-a-proof-of-benefit-letter/download/download-1/contact-us-for-different-benefit-letter');
    } 

    else {
      res.redirect('/get-a-proof-of-benefit-letter/download/download-1/where-we-send-your-letter');
    }

})



// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/download/download-1/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/digital-or-letter');
  }

})
//On check answers page, if selected letter, send to conf, if not, send to download <!--!>
router.post('/get-a-proof-of-benefit-letter/download/download-1/check-your-answers-answer', function (req, res) {

  var digitalOrLetter = req.session.data['digitalOrLetter']

  if (digitalOrLetter === 'Posted letter') {
    res.redirect('/get-a-proof-of-benefit-letter/download/download-1/request-complete');
  
 }  else {
      res.redirect('/get-a-proof-of-benefit-letter/download/download-1/download-your-pob');
 }

})



// * Release - 2 - Norther Ireland

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/download/ni/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/download/ni/research-set-up/benefits-answer', function (req, res) {

    var researchSetUpBenefits = req.session.data['researchSetUpBenefits']
  
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
            researchSetUpBenefits[i] === 'Severe Disablement Allowance' ||
            researchSetUpBenefits[i] === 'Widow’s Benefit'
          ) {
            oOScope.push(researchSetUpBenefits[i])
          } 
      
      else if (researchSetUpBenefits[i] === 'Universal Credit') {
              uCBenefit = true;
      }
      
      else {
        inScope.push(researchSetUpBenefits[i])
      }
    }
  
    req.session.data.inScope = inScope;
    req.session.data.oOScope = oOScope;
    req.session.data.uCBenefit = uCBenefit;
  
  
    console.log(inScope)
    console.log(oOScope)
    console.log(uCBenefit)
  
  res.redirect('/get-a-proof-of-benefit-letter/download/ni/research-set-up/address');
  
   })

  

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/download/ni/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/download/ni/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/you-cannot-use-this-service-no-benefits');
    return

  } else if ((researchSetUpBenefits.length > 0) && (inScope.length > 0 ))   {
      res.redirect('/get-a-proof-of-benefit-letter/download/ni/select-benefits-you-need-proof-of');

  } else if (inScope.length === 0 )  {
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/you-cannot-get-proof-of-benefit-letter');

  } 
  
})

router.post('/get-a-proof-of-benefit-letter/download/ni/select-benefits-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

    if (doYouWantLetterFor === 'no') {
      res.redirect('/get-a-proof-of-benefit-letter/download/ni/contact-us-for-different-benefit-letter');
    } 

    else {
      res.redirect('/get-a-proof-of-benefit-letter/download/ni/where-we-send-your-letter');
    }

})


// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/practice/snacks-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/download/ni/check-your-answers');
  }

})




module.exports = router;