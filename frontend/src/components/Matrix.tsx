import { QueueImage } from './QueueImage'

interface MatrixProps {
  activeId: number | undefined
  imageId: number | undefined
}

export function Matrix(props: MatrixProps) {
  return (
    <div className={'aspect-square w-full max-w-screen-md'}>
      <div className={'grid h-full grid-cols-4 grid-rows-4 gap-4 p-4'}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className={
              'relative flex items-center justify-center rounded-md border border-gray-400 bg-white'
            }
          >
            {index === props.activeId && (
              <div className={''}>
                <QueueImage imageId={props.imageId} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
