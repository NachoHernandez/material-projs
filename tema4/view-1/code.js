// Modelo

var Producto = ProJS.Model.extend({
  init: function() {
    this._super.apply(this, arguments);
  },
  defaults: {
    nombre: "Producto sin nombre",
    categoria: "Sin categorizar",
    pais: "España",
    precio: 0
  },
  set: function(attrs, options) {
    return this._super(attrs, merge(options, {validate: true}));
  },
  validate: function(attrs) {
    var vacio = /^\s*$/,
        pais = /España|Francia|Portugal/,
        numerico = /^\d+$/;
    if (vacio.test(attrs["nombre"]) ||
        vacio.test(attrs["categoria"]) ||
        (attrs["pais"] && !pais.test(attrs["pais"])) ||
        (attrs["precio"] && !numerico.test(attrs["precio"])) ||
        (attrs["id"] && !numerico.test(attrs["id"]))) {
      return "Producto no válido!";
    }
  }
});

// Vista

var VistaProducto = ProJS.View.extend({

  /* Completa la vista */

});

// Inicialización

$(function() {
  var producto = new Producto({
      nombre: "Vino",
      categoria: "Alimentación",
      precio: 100
    });

    /* Conecta la vista y el modelo y muéstralo */

});
