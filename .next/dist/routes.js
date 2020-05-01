"use strict";

var routes = require("next-routes")();

//Creación de rutas en la web
routes.add("/campaigns/new", "/campaigns/new").add("/campaigns/:address", "/campaigns/show").add("/campaigns/:address/requests", "/campaigns/requests/index").add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQTtBQUNBLE9BQ0csQUFESCxJQUNPLEFBRFAsa0JBQ3lCLEFBRHpCLGtCQUVHLEFBRkgsSUFFTyxBQUZQLHVCQUU4QixBQUY5QixtQkFHRyxBQUhILElBR08sQUFIUCxnQ0FHc0MsQUFIdEMsNkJBSUcsQUFKSCxJQUlPLEFBSlAsb0NBSTJDLEFBSjNDOztBQU1BLE9BQU8sQUFBUCxVQUFpQixBQUFqQiIsImZpbGUiOiJyb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL0dlcmlja2UvTGFjaHUifQ==