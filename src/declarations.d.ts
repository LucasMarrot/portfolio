declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module "*.pdf" {
  const content: string;
  export default content;
}
