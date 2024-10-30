import { QueueImage } from './QueueImage'

interface MatrixProps {
  activeId: number | undefined
  imageId: number | undefined
}

export function Matrix(props: MatrixProps) {
  return (
    <div className={'flex flex-col items-center'}>
      <div className={'grid grid-cols-4 grid-rows-4 gap-2 rounded-md'}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className={
              'flex aspect-square size-12 items-center justify-center rounded-md border-4 border-gray-400 bg-white sm:size-20 md:size-28 lg:size-40 xl:size-48 2xl:size-56'
            }
          >
            <div className={'size-fit flex-1'}>
              {index === props.activeId && (
                <QueueImage imageId={props.imageId} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
