const express = require('express')
const router = express.Router()

// MAKE SURE YOU ADD ME TO THE ROUTES FILES

router.post('/practice/snacks-answer', function (req, res) {
    var snacks = req.session.data['snacks']
    
    // Creating a variable to hold our total calories
    var totalCalories = 0
    
    // Check each snack individually and add its calories
    if (snacks.includes('Kit Kat')) {
        totalCalories = totalCalories + 210
    }
    if (snacks.includes('Twix')) {
        totalCalories = totalCalories + 250
    }
    if (snacks.includes('Apple')) {
        totalCalories = totalCalories + 95
    }
    if (snacks.includes('Protein Bar')) {
        totalCalories = totalCalories + 150
    }
    
    // Store total calories in session data
    req.session.data['totalCalories'] = totalCalories

    // REPLACE THIS WITH THE COMMENTED OUT CODE BELOW
    res.redirect('/practice/report')
    
    // // THE BELOW DOES NOT WORK. FIGURE OUT WHY AND FIX IT. 

    // // If the user selects any combination of apple or protein bar, send them to the confirm page.
    // if (snacks.includes("Apple") || snacks.includes("Protein Bar")) {
    //     res.redirect('/practice/confirm')
    // } else {
    //     res.redirect('/practice/report')
    // }

    console.log(snacks)
    console.log(totalCalories)
})


router.post('/practice/report-answer', function (req, res) {

    var confirmOrder = req.session.data['confirmOrder']

    if (confirmOrder == "yes") {
      res.redirect('/practice/confirm');
    }
  
    else {
      res.redirect('/practice/no-snacks');
    }
  
})


module.exports = router;