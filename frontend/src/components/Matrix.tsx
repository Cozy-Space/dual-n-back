import { QueueImage } from './QueueImage'

interface MatrixProps {
  activeId: number | undefined
  imageId: number | undefined
}

export function Matrix(props: MatrixProps) {
  return (
    <div className={'flex w-screen flex-col items-center'}>
      <div
        className={
          'grid max-h-screen w-1/3 grid-cols-4 grid-rows-4 gap-2 rounded-md'
        }
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className={
              'flex aspect-square items-center justify-center rounded-md border-4 border-gray-400 bg-white'
            }
          >
            <div className={'aspect-square flex-1'}>
              {index === props.activeId && (
                <QueueImage imageId={props.imageId} className={'size-full'} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
