export function convertFormToObject(formEl) {
  var inputs = $(formEl.querySelectorAll("input"));
  var values = $.map(inputs, function(d) { return [[d.name, d.value]] });
  return _.object(values);
}
