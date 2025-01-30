interface QueueImageProps {
  imageId: number | undefined
  className?: string
}

export function QueueImage(props: QueueImageProps) {
  return (
    props.imageId !== undefined && (
      <img
        className={props.className}
        src={idToAsset(props.imageId)}
        alt={''}
      />
    )
  )
}

function idToAsset(id: number): string {
  return `images/a${id + 1}.jpg`
}
