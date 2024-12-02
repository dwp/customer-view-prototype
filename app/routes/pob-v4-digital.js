const express = require('express')
const router = express.Router()

// * Version 4 - Research - digital - Email

var inScope = [];  
var uCBenefit = false;
var oOScope = [];

router.all('/get-a-proof-of-benefit-letter/v4-research/digital/email/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/research-set-up/benefits-answer', function (req, res) {

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
  
  res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/research-set-up/address');
  
   })

  

// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v4-research/digital/email/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/you-cannot-use-this-service-no-benefits');
    return

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/select-benefits-you-need-proof-of');

  } else if (inScope.length === 0 )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/you-cannot-get-proof-of-benefit-letter');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-want-proof-for');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/select-benefits-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

  if (doYouWantLetterFor == "no" )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/contact-us-for-different-benefit-letter');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-email');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/single-benefit-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

  if (doYouWantLetterFor == "no" )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/contact-us-for-different-benefit-letter');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-email');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-email-answer', function (req, res) {

  var needEmail = req.session.data['needEmail']

  if (needEmail === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/email-address-we-send-letter-to');
  
  }

  else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-letter');
  }

})

// router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/email-confirm-answer', function (req, res) {

//   var confirmEmailSend = req.session.data['confirmEmailSend']

//   if (confirmEmailSend === 'yes')   {
//     res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-letter');
  
//   }  else {
//       res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/do-you-need-letter');
//   }

// })

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/letter-confirm-answer', function (req, res) {

  var needLetter = req.session.data['needLetter']

  if (needLetter === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/where-we-send-your-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/check-your-answers');
  }

})


// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']

  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/check-your-answers');
  }

})



// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v4-research/digital/email/notify-info-answers', function (req, res) {

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
//   res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/email/confirmation');

// });







// -------------------------------------------------------------------------------------------------------------------------



// * Version 4 - Research - digital - No email

router.all('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/research-set-up/PoB-clear-data', function (req, res) {
  
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

  router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/research-set-up/benefits-answer', function (req, res) {

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
  
  res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/research-set-up/address');
  
   })


// Drop user if they were not invited to use the service
router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/how-did-you-find-out-about-this-service-answer', function (req, res) {

  var howDidYouFindOutAboutThisService = req.session.data['how-did-you-find-out-about-this-service']


  if (howDidYouFindOutAboutThisService === "heard-about-on-phone" || howDidYouFindOutAboutThisService === "job-centre")  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/go-to-identity-check');

  } else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/cannot-get-a-proof-of-benefit-letter');
  }
})

// Select which benefit selection page to show based on number of benefits available for user.
router.all('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/list-benefits-answer', function (req, res) {

  var researchSetUpBenefits = req.session.data['researchSetUpBenefits']

  if (researchSetUpBenefits == [] || researchSetUpBenefits == undefined)  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/you-cannot-use-this-service-no-benefits');
    return

  } else if (inScope.length === 0 )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/you-cannot-get-proof-of-benefit-letter');

  } else if (researchSetUpBenefits.length > 1)  {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/select-benefits-you-need-proof-of');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/do-you-want-proof-for');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/select-benefits-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

  if (doYouWantLetterFor == "no" )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/contact-us-for-different-benefit-letter');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/do-you-need-email');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/single-benefit-answer', function (req, res) {

  var doYouWantLetterFor = req.session.data['doYouWantLetterFor']

  if (doYouWantLetterFor == "no" )  {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/contact-us-for-different-benefit-letter');

  } else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/do-you-need-email');
    }  
  
})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/do-you-need-email-answer', function (req, res) {

  var needEmail = req.session.data['needEmail']

  if (needEmail === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/enter-email');
  
  }

  else {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/do-you-need-letter');
  }

})

router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/letter-confirm-answer', function (req, res) {

  var needLetter = req.session.data['needLetter']

  if (needLetter === 'yes')   {
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/where-we-send-your-letter');
  
  }  else {
      res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/check-your-answers');
  }

})


// Drop user if they state their address is incorrect
router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/send-letter-to-address-answer', function (req, res) {

  var confirmLetterSend = req.session.data['confirmLetterSend']


  // Check if user selected no on single address page
  if (confirmLetterSend == "no")  {
    // Send user to contact us page
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/you-cannot-use-this-service-incorrect-address');
  }

  else {
    // Send user to check answers
    res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/check-your-answers');
  }

})



// // The URL here needs to match the URL of the page that the user is on
// // when they type in their email address
// router.post('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/notify-info-answers', function (req, res) {

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
//   res.redirect('/get-a-proof-of-benefit-letter/v4-research/digital/noemail/confirmation');

// });


module.exports = router;