const express = require('express')
const router = express.Router()

// * Version 4 - Research - digital - Email

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/v4-research/mixed/email/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/research-set-up/benefits-answer', function (req, res) {

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
            researchSetUpBenefits[i] === 'Personal Independence Payment (PIP)' ||
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
  
  res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/research-set-up/address');
  
   })

  

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v4-research/mixed/email/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/you-cannot-use-this-service-no-benefits');
    return

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/select-benefits-you-need-proof-of');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/do-you-want-proof-for');
    }  
  
})


// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']
  var whereToSendLetter = req.session.data['whereToSendLetter']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/check-your-answers');
  }

})


// Place user back into journey from you cant get a proof for all benefits
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/cant-get-proof-all-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/check-your-answers');
  
  } else  {
    // Show home address
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/where-we-send-your-letter');
  } 

})

// router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/multi-benefits-answer', function (req, res) {

//   var confirmLetterSend = req.session.data['confirmLetterSend']

//   if (confirmLetterSend === 'yes')   {
//     res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/check-your-answers-exp');
  
//   }  else {
//       res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/where-we-send-your-letter');
//   }

// })

// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/notify-info-answers', function (req, res) {

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
//   res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/confirmation');

// });


router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/do-you-need-email-answer', function (req, res) {

  var notifyEmailAddress = req.session.data['notifyEmailAddress']
  var needEmail = req.session.data['needEmail']

  if (needEmail === 'no' ) {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/do-you-need-letter');
  
  }

  else if (notifyEmailAddress === '' && needEmail === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/enter-email');
  } 

  else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/email-address-we-send-letter-to');
  }

})


router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/email-confirm-answer', function (req, res) {

  var confirmEmailSend = req.session.data['confirmEmailSend']

  if (confirmEmailSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/do-you-need-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/enter-email');
  }

})

router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/email/letter-confirm-answer', function (req, res) {

  var needLetter = req.session.data['needLetter']

  if (needLetter === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/where-we-send-your-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/email/check-your-answers');
  }

})



// -------------------------------------------------------------------------------------------------------------------------



// * Version 4 - Research - digital - No email

router.all('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/research-set-up/benefits-answer', function (req, res) {

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
            researchSetUpBenefits[i] === 'Personal Independence Payment (PIP)' ||
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
  
  res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/research-set-up/address');
  
   })

  

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/you-cannot-use-this-service-no-benefits');
    return

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/select-benefits-you-need-proof-of');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/do-you-want-proof-for');
    }  
  
})


// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']
  var whereToSendLetter = req.session.data['whereToSendLetter']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/check-your-answers');
  }

})


// Place user back into journey from you cant get a proof for all benefits
router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/cant-get-proof-all-benefits-answer', function (req, res) {

  var researchSetUpAddress = req.session.data['researchSetUpAddress']
  var confirmLetterSend = req.session.data['confirmLetterSend']

  // Check if correspondence address is available
  
  if (confirmLetterSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/check-your-answers');
  
  } else  {
    // Show home address
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/where-we-send-your-letter');
  } 

})

// router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/multi-benefits-answer', function (req, res) {

//   var confirmLetterSend = req.session.data['confirmLetterSend']

//   if (confirmLetterSend === 'yes')   {
//     res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/check-your-answers-exp');
  
//   }  else {
//       res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/where-we-send-your-letter');
//   }

// })

// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/notify-info-answers', function (req, res) {

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
//   res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/confirmation');

// });


router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/do-you-need-email-answer', function (req, res) {

  var notifyEmailAddress = req.session.data['notifyEmailAddress']
  var needEmail = req.session.data['needEmail']

  if (needEmail === 'no' ) {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/do-you-need-letter');
  
  }

  else if (notifyEmailAddress === '' && needEmail === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/enter-email');
  } 

  else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/email-address-we-send-letter-to');
  }

})


router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/email-confirm-answer', function (req, res) {

  var confirmEmailSend = req.session.data['confirmEmailSend']

  if (confirmEmailSend === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/do-you-need-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/enter-email');
  }

})

router.post('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/letter-confirm-answer', function (req, res) {

  var needLetter = req.session.data['needLetter']

  if (needLetter === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/where-we-send-your-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/mixed/noemail/check-your-answers');
  }

})


module.exports = router;