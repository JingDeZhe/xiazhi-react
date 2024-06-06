import { Button, Input } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { EditCharacter } from './EditCharacter'
import { useParams } from 'react-router-dom'

export const TalkMenu = ({ contacts, targetId, onSelect }) => {
  const { userId } = useParams()
  const [queryText, setQueryText] = useState('')
  const [editCharacterVisible, setEditCharacterVisible] = useState(false)
  const [menuTargetId, setMenuTargetId] = useState(null)

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['nickname'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'TALK_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuTargetId = ''
  const handleContactMenu = (e) => {
    _menuTargetId = e.currentTarget.dataset.id
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'editCharacter') {
      setMenuTargetId(_menuTargetId)
      setEditCharacterVisible(true)
    }
  }

  return (
    <div className="talk-menu col-ctn border-r">
      <div className="talk-menu-search v-center">
        <Input value={queryText} onInput={handleQuery}></Input>
        <Button>
          <i className="i-tabler-plus"></i>
        </Button>
      </div>
      <Scrollbar
        className="ctn-body"
        options={{ scrollbars: { autoHide: 'scroll', autoHideDelay: 500 } }}
        defer
      >
        {filteredContacts.map((d) => {
          return (
            <div
              className={cls('avatar-info', { active: targetId === d.id })}
              key={d.id}
              onClick={() => onSelect(d.id)}
              onContextMenu={handleContactMenu}
              data-id={d.id}
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

      <Menu id={CONTACT_MENU}>
        <Item id="editCharacter" onClick={handleContactMenuClick}>
          Edit Character
        </Item>
        <Item id="hide" onClick={handleContactMenuClick}>
          Hide
        </Item>
      </Menu>

      {editCharacterVisible && (
        <EditCharacter
          fromId={userId}
          targetId={menuTargetId}
          onClose={() => setEditCharacterVisible(false)}
        ></EditCharacter>
      )}
    </div>
  )
}
