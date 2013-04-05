var R = (function(my) {

  function isPromise(objOrPromise) {
    return (objOrPromise instanceof my.Deferred) || (objOrPromise instanceof Promise);
  }

  Promise = R.Class.extend({
    init: function(deferred) {
      this.deferred = deferred;
    },
    then: function() {
      return this.deferred.then.apply(this.deferred, arguments);
    }
  });

  my.Deferred = R.Class.extend({
    init: function() {
      this._promise = new Promise(this);
      this._suc = [];
      this._fail = [];
      this._state = undefined;
      // console.log("init promise");
    },
    _invoke:function(key){
      for (var i=0, _len=this[key].length; i<_len; i++){
        this[key][i].apply(this, arguments);
      }
    },
    resolve: function() {
      this._state = true;
      this._invoke("_suc");
      // console.log("resolve");
    },
    reject: function() {
      this._state = false;
      this._invoke("_fail");
      // console.log("reject");
    },
    promise: function() {
      return this._promise;
    },
    then: function(suc, fail) {

      this._suc.push(suc);
      if(fail) this._fail.push(fail);
      // /* Diferido para controlar la respuesta a devolver */
      var nextDeferred = new my.Deferred();

      // /* ??? */

      if (this._state !== undefined) {
        this[this._state ? "resolve" : "reject"].apply(this, this._values);
      }
      console.log("state="+this._state);
      /* La promesa a devolver */
      return nextDeferred.promise();
    }
  });

  return my;

}(R || {}));

/* Código de prueba */

$(function() {

  function newPromiseButton() {
    var el = $($("#prompt-item").html()),
        defer = new R.Deferred();
    el.find(".success").click(R.bind(defer, defer.resolve));
    el.find(".alert").click(R.bind(defer, defer.reject));
    el.appendTo("#promesas");
    defer.then(function() {
      el.html('<div class="panel"> <strong> Resuelta! </strong> </div>');
    }, function() {
      el.html('<div class="panel"> Rechazada...</div>');
    })
    return defer.promise();
  }

  /* Primero que funcione esto */

  newPromiseButton().then(function() {
    alert("Muy bien");
  }, function() {
    alert("Vaya por Dios...");
  });

  var d = new R.Deferred();
  var p = d.promise();

  d.resolve();

  p.then(function(){ console.log("primer then") },
    function(){
      console.log("error en el primer then");
    });

  p.then(function(){ console.log("segundo then") },
    function(){
      console.log("error en el primer then");
    });

  // d.resolve(); 

  /* Esto para un segundo paso */
  /*

  newPromiseButton().then(function() {
    return newPromiseButton();
  }).then(function() {
    return newPromiseButton();
  }).then(function() {
    return newPromiseButton();
  }).then(function() {
    alert("Todo OK!");
  }, function() {
    alert("Oh, oh...");
  });

  */

});
