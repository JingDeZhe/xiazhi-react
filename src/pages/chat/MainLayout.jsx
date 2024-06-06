import { localGet, localSet } from '@/utils/main'
import Split from 'react-split'

export const MainLayout = (props) => {
  const MAIN_LAYOUT_SIZES = 'MAIN_LAYOUT_SIZES'
  const defaultSizes = localGet(MAIN_LAYOUT_SIZES) || [30, 70]

  const handleDragEnd = (sizes) => {
    localSet(MAIN_LAYOUT_SIZES, sizes)
  }
  return (
    <Split
      direction="horizontal"
      gutterSize={6}
      sizes={defaultSizes}
      minSize={260}
      snapOffset={5}
      className={cls('flex split full-ctn border-r', props.className)}
      cursor="/img/col-resize.png"
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </Split>
  )
}
