const router = require("express").Router();
const excel = require("@formulajs/formulajs");
const bancos = require("../scripts/bancos");
const interesCompuesto = require("../scripts/interescompuesto");

//cuota mensual
router.get("/:plazo&:monto&:interes", async (req, res) => {
	var tabla = [], cae;
	
	var capFinal = interesCompuesto.interescompuesto(parseInt(req.params["monto"]), parseFloat(req.params["interes"]),parseInt(req.params["plazo"]));
	var valor_cuota = capFinal/parseInt(req.params["plazo"]);

	cae = excel.RATE(parseInt(req.params["plazo"]), valor_cuota, (parseInt(req.params["monto"])*-1))*1200;
	tabla.push(["Credito Personalizado (Interes: " + req.params["interes"] + ")", ((cae).toFixed(2))+"%", (valor_cuota).toFixed(0), req.params["interes"] + "%", (valor_cuota*parseInt(req.params["plazo"])).toFixed(0)]);

	var temp = await bancos.bancos(parseInt(req.params["monto"]), parseInt(req.params["plazo"]));
	temp.forEach(element => {
		tabla.push(element);
	});

    res.send(tabla);
});

module.exports = router;