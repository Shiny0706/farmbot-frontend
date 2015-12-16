import * as toast from 'toastr';

var lastMsg = "Prevent Annoying Duplicates";

export function success(message, title = "Success") {
  if (lastMsg === message) {
  } else{
    toast.success(message, title);
  };
  lastMsg = message;
}

export function warning(message, title = "Warning") {
  if (lastMsg === message) {
    console.warning(message);
  } else{
    toast.warning(message, title);
  };
  lastMsg = message;
}

// Errors always play twice.
// This is a must for situations such as password guessing
export function error(message, title = "Error") {
  toast.error(message, title);
}
