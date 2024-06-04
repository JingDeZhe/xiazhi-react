import { Button, Input } from 'antd'
import PinyinEngine from 'pinyin-engine'

export const TalkMenu = ({ items, activeId, onSelect }) => {
  const [queryText, setQueryText] = useState('')

  const engine = useMemo(() => {
    return new PinyinEngine(items, ['nickname'])
  }, [items])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredItems = engine.query(queryText)

  return (
    <div className="talk-menu col-ctn">
      <div className="talk-menu-search v-center">
        <Input value={queryText} onInput={handleQuery}></Input>
        <Button>
          <i className="i-tabler-plus"></i>
        </Button>
      </div>
      <Scrollbar
        className="full-ctn"
        options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }}
        defer
      >
        {filteredItems.map((d) => {
          return (
            <div
              className={cls('avatar-info', { active: activeId === d.id })}
              key={d.id}
              onClick={() => onSelect(d.id)}
            >
              <img className="avatar" src={d.avatar} />
              <div className="info">
                <div className="flex gap-2">
                  <span className="flex-1">{d.nickname}</span>
                  <span className="text-fade-2 truncate mr-1">
                    {d.lastMessageTime}
                  </span>
                </div>
                <div className="text-fade-1">{d.lastMessage}</div>
              </div>
            </div>
          )
        })}
      </Scrollbar>
    </div>
  )
}
