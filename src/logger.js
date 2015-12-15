import * as toast from 'toastr';

export function warning(message, title = "Warning") {
  toast.warning(message, title);
}

export function success(message, title = "Success") {
  toast.success(message, title);
}

export function error(message, title = "Error") {
  toast.error(message, title);
}
