import { localGet, localSet } from '@/utils/main'
import { server } from './db/server'
import { Button, Input, message } from 'antd'
import Draggable from 'react-draggable'

export const EditCharacter = ({ fromId, targetId, onClose }) => {
  const [character, setCharacter] = useState(null)
  const [desc, setDesc] = useState()
  const nodeRef = useRef(null)

  useEffect(() => {
    server.getCharacter(fromId, targetId).then((d) => {
      setCharacter(d)
      setDesc(d.character || '')
    })
  }, [fromId, targetId])

  const handleConfirm = () => {
    server.setCharacter(character.id, desc).then(() => {
      message.success('Successful')
    })
  }

  const EDIT_CHARACTER_POS = 'EDIT_CHARACTER_POS'
  const defaultPosition = localGet(EDIT_CHARACTER_POS) || { x: 100, y: 100 }
  const handleStop = (e, data) => {
    localSet(EDIT_CHARACTER_POS, { x: data.x, y: data.y })
  }

  if (!character) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={defaultPosition}
      handle=".handle"
    >
      <div className="edit-character" ref={nodeRef}>
        <i className="close-btn i-tabler-x" onClick={onClose}></i>
        <div className="mb-3 v-center p-2 handle">
          <span>{character.alias}</span>
        </div>
        <div className="p-2">
          <Input.TextArea
            value={desc}
            onInput={(e) => setDesc(e.target.value)}
            rows={6}
          ></Input.TextArea>
          <div className="mt-2 text-right space-x-2">
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
