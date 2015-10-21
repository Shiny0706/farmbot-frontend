var r = Rlite();

// Default route
r.add('', function () {
  document.title = 'Home';
});

// #sent?to=john -> r.params.to will equal 'john'
r.add('sent', function (r) {
  document.title = 'Out ' + r.params.to;
});

// #users/chris -> r.params.name will equal 'chris'
r.add('users/:name', function (r) {
  document.title = 'User ' + r.params.name;
});

// Hash-based routing
function processHash() {
  var hash = location.hash || '#';
  r.run(hash.slice(1));
}

window.addEventListener('hashchange', processHash);
processHash();
