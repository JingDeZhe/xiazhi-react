import { localGet, localSet } from '@/utils/main'
import { server } from './db/server'
import { Button, Input } from 'antd'
import { toast } from 'react-toastify'
import Draggable from 'react-draggable'

export const EditRelation = ({ contactId, onClose }) => {
  const [relation, setRelation] = useState(null)
  const nodeRef = useRef(null)

  useEffect(() => {
    server.getRelation(contactId).then(setRelation)
  }, [contactId])

  const handleConfirm = () => {
    server.setRelation(relation.id, relation).then(() => {
      onClose()
      toast.success('Successful')
    })
  }

  const EDIT_RELATION_POS = 'EDIT_RELATION_POS'
  const defaultPosition = localGet(EDIT_RELATION_POS) || { x: 100, y: 100 }
  const handleStop = (e, data) => {
    localSet(EDIT_RELATION_POS, { x: data.x, y: data.y })
  }

  if (!relation) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={defaultPosition}
      grid={[2, 2]}
      handle=".handle"
    >
      <div className="edit-character" ref={nodeRef}>
        <i className="close-btn i-tabler-x" onClick={onClose}></i>
        <div className="mb-3 v-center p-2 handle">
          <span>{relation.alias}</span>
        </div>
        <div className="p-2">
          <Input.TextArea
            value={relation.character}
            onInput={(e) =>
              setRelation({ ...relation, character: e.target.value })
            }
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
