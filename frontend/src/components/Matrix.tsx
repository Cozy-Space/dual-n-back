interface MatrixProps {
  activeId: number | undefined
}

export function Matrix(props: MatrixProps) {
  // Toggle spawn/despawn of an element in a square

  return (
    <div className={'aspect-square w-full max-w-screen-md bg-amber-200'}>
      <div className={'grid h-full grid-cols-4 grid-rows-4 gap-4 p-4'}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className={
              'relative flex items-center justify-center rounded-md border border-gray-400 bg-white'
            }
          >
            <span className={'absolute left-2 top-2 text-xs text-gray-600'}>
              ID: {index}
            </span>

            {index === props.activeId && (
              <div className="size-10 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
