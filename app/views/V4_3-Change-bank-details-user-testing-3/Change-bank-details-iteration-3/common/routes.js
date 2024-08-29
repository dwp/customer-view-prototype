module.exports = (function() {
    'use strict';

    var router = require('express').Router();

    router.post('/digital-service/circumstances/cora/address_location', function (req, res) {
        const editChoice = req.session.data['UKRES'];

        if (editChoice === 'UK') {
          res.redirect('/V3/digital-service/circumstances/cora/search-pattern');
        } else if (editChoice === 'Other') {
          res.redirect('/V3/digital-service/circumstances/cora/international_address_pattern');
        } else {
            res.render(__dirname + "/../digital-service/circumstances/cora/address_location", {"error":true});
        }
    });


    router.post('/digital-service/circumstances/cora/search-pattern', function (req, res) {
        const postcode = req.session.data['address-postcode'];
        const property = req.session.data['address-property'];

        if (postcode === 'LS1') {
          res.redirect('/V3/digital-service/circumstances/cora/confirm-address-pattern');
        } else if (postcode === 'LS2') {
          res.redirect('/V3/digital-service/circumstances/cora/select_address_pattern');
        }  else if (postcode === 'LS3') {
            res.redirect('/V3/digital-service/circumstances/cora/no-address');
          } else {
            let errorObject = { "error": true };
            if(!postcode) errorObject["errorPostcode"] = true;
            if(!property) errorObject["errorProperty"] = true;
console.log(postcode, property);
            res.render(__dirname + "/../digital-service/circumstances/cora/search-pattern", errorObject);
        }

    });

    router.post('/digital-service/circumstances/cora/move_date', function (req, res) {
      res.redirect('/V3/digital-service/circumstances/cora/search-pattern');
     });

     router.post('/digital-service/circumstances/cora/rent_or_own', function (req, res) {
      res.redirect('/V3/digital-service/circumstances/cora/live_with');
     });

     router.post('/digital-service/circumstances/cora/live_with', function (req, res) {
      res.redirect('/V3/digital-service/circumstances/cora/complete');
     });
//address_location

    return router;
})();
