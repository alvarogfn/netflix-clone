import { ref, watch, type Ref, onUnmounted } from "vue";

export function useDragScroll(el: Ref<HTMLElement | null>) {
  const position = ref({
    left: 0,
    top: 0,
    x: 0,
    y: 0,
  });

  watch(el, (newElement) => {
    if (newElement !== null) {
      newElement.removeEventListener("mousedown", mouseDownHandler);
      newElement.addEventListener("mousedown", mouseDownHandler);
    }
  });

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener("mousedown", () => {});
    }
  });

  const mouseDownHandler = function (event: MouseEvent) {
    const element = event.target as HTMLElement;

    position.value = {
      left: element.scrollLeft ?? 0,
      top: element.scrollTop ?? 0,
      x: event.clientX,
      y: event.clientY,
    };

    element.addEventListener("mousemove", mouseMoveHandler);
    element.addEventListener("mouseup", mouseUpHandler);

    element.style.cursor = "grabbing";
    element.style.userSelect = "none";
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    if (!el.value) return;
    const dx = e.clientX - position.value.x;
    const dy = e.clientY - position.value.y;

    el.value.scrollTop = position.value.top - dy;
    el.value.scrollLeft = position.value.left - dx;
  };

  function mouseUpHandler(e: MouseEvent) {
    const element = e.target as HTMLElement;
    element.removeEventListener("mousemove", mouseMoveHandler);
    element.removeEventListener("mouseup", mouseUpHandler);
    element.style.cursor = "grab";
    element.style.removeProperty("user-select");
  }
}
