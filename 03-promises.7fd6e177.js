document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();var t=Number(e.target.elements.delay.value),n=Number(e.target.elements.step.value);(function(e){var t=[];for(i=1;i<=e;i+=1)t.push(i);return t})(Number(e.target.elements.amount.value)).reduce((function(e,t){return function(e,t){return new Promise((function(n,o){Math.random()>.3?setTimeout((function(){return n({position:e,delay:t})}),t):setTimeout((function(){return o({position:e,delay:t})}),t)}))}(t,e).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),e+n}),t),e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.7fd6e177.js.map
