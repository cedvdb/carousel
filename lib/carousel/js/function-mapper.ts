import { Events } from './events';
export let mapper = {};
// which methods of the event emitter is gonna be called
// upon receiving envents
mapper[Events.SCROLL] = "onScroll";
mapper[Events.IMAGE_CLICK] = "onImageClick";
mapper[Events.CLOSE_ZOOMER] = "onZoomClosed";
mapper[Events.ARROW_DOWN] = "onArrowDown";
mapper[Events.ARROW_UP] = "onArrowUp";

