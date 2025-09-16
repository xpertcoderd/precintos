import { reactive, readonly } from 'vue';

const state = reactive({
  message: '',
  type: 'success',
  visible: false,
});

let timeoutId = null;

function sendNotification(message, type = 'success', duration = 4000) {
  state.message = message;
  state.type = type;
  state.visible = true;

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    state.visible = false;
  }, duration);
}

export function useNotifications() {
  return {
    notification: readonly(state),
    sendNotification,
  };
}
