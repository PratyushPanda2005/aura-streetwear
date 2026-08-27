/**
 * Minimal ambient types for curtainsjs (ships untyped).
 * Covers only the surface this project uses.
 */
declare module "curtainsjs" {
  export class Vec2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): this;
    copy(v: Vec2): this;
  }

  export interface CurtainsParams {
    container: HTMLElement | string;
    pixelRatio?: number;
    watchScroll?: boolean;
    autoRender?: boolean;
    antialias?: boolean;
    premultipliedAlpha?: boolean;
  }

  export class Curtains {
    constructor(params: CurtainsParams);
    onError(cb: () => void): this;
    onSuccess(cb: () => void): this;
    onRender(cb: () => void): this;
    onScroll(cb: () => void): this;
    updateScrollValues(x: number, y: number): void;
    resize(): void;
    dispose(): void;
  }

  export interface Uniform {
    name: string;
    type: "1f" | "2f" | "3f" | "4f" | "1i";
    value: number | number[] | Vec2;
  }

  export interface PlaneParams {
    widthSegments?: number;
    heightSegments?: number;
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: Record<string, Uniform>;
    texturesOptions?: Record<string, unknown>;
  }

  export class Plane {
    constructor(curtains: Curtains, element: HTMLElement, params?: PlaneParams);
    // Runtime-typed uniform bag; values are written per frame.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniforms: Record<string, any>;
    onReady(cb: () => void): this;
    onLoading(cb: () => void): this;
    onRender(cb: () => void): this;
    mouseToPlaneCoords(mouse: Vec2): Vec2;
    updatePosition(): void;
    remove(): void;
  }
}
