declare module 'html2canvas-pro' {
  export interface Html2CanvasOptions {
    scale?: number;
    useCORS?: boolean;
    backgroundColor?: string | null;
    logging?: boolean;
    allowTaint?: boolean;
    foreignObjectRendering?: boolean;
    imageTimeout?: number;
    proxy?: string;
    removeContainer?: boolean;
    width?: number;
    height?: number;
    scrollX?: number;
    scrollY?: number;
    x?: number;
    y?: number;
    windowWidth?: number;
    windowHeight?: number;
  }

  export default function html2canvas(
    element: HTMLElement,
    options?: Html2CanvasOptions
  ): Promise<HTMLCanvasElement>;
}
