interface QueueImageProps {
  imageId: number | undefined
}

export function QueueImage(props: QueueImageProps) {
  return (
    <div>
      {props.imageId !== undefined && (
        <img src={idToAsset(props.imageId)} alt={'Queue Image'} />
      )}
    </div>
  )
}

function idToAsset(id: number): string {
  return `images/a${id + 1}.jpg`
}
