import { Button, Input } from 'antd'
import { server } from './db/server'
import PinyinEngine from 'pinyin-engine'
import { toast } from 'react-toastify'

export const RelationManage = ({ fromId }) => {
  const [users, setUsers] = useState([])
  const [queryText, setQueryText] = useState('')

  const engine = useMemo(() => {
    return new PinyinEngine(users, ['nickname'])
  }, [users])
  const filteredUsers = engine.query(queryText)

  useEffect(() => {
    server.getRelationUsers(fromId).then(setUsers)
  }, [fromId])

  const handleAdd = (targetId) => {
    server.addRelation(fromId, targetId).then(() => {
      const arr = [...users]
      const target = arr.find((d) => d.id === targetId)
      target.inRelation = true
      setUsers(arr)
      toast.success('Successful')
    })
  }

  return (
    <div className="chat-contact-manage col-ctn gap-2">
      <div className="mt-2">
        <Input
          placeholder="search"
          value={queryText}
          onInput={(e) => setQueryText(e.target.value)}
        ></Input>
      </div>
      <Scrollbar
        options={{
          scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
        }}
        className="ctn-body"
      >
        {filteredUsers.map((d) => (
          <div className="user-info" key={d.id}>
            <img src={d.avatar} className="chat-avatar sm" />
            <span className="flex-1 truncate">{d.nickname}</span>
            {d.inRelation ? (
              <i className="i-tabler-user-check mr-10"></i>
            ) : (
              <Button
                type="text"
                className="mr-5"
                onClick={() => handleAdd(d.id)}
              >
                Add
              </Button>
            )}
          </div>
        ))}
      </Scrollbar>
    </div>
  )
}
