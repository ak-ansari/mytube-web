import { ref, watch, type Ref } from "vue";

export function useDebouncedRef<T>(initialValue: T | Ref<T>, delay = 300) {
  const state = initialValue instanceof ref ? initialValue : ref(initialValue); // TS infers Ref<UnwrapRef<T>>
  const debounced = ref(initialValue);

  let timeout: ReturnType<typeof setTimeout> | null = null;

  watch(state, (val) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounced.value = val;
    }, delay);
  });

  return { state, debounced };
}
