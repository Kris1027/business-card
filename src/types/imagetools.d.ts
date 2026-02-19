type PictureSource = {
  src: string
  w: number
}

type PictureData = {
  sources: Record<string, PictureSource[]>
  img: {
    src: string
    w: number
    h: number
  }
}

declare module '*&as=picture' {
  const picture: PictureData
  export default picture
}

declare module '*&as=srcset' {
  const srcset: string
  export default srcset
}
