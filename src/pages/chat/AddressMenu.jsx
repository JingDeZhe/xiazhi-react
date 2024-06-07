import { Button, Input, Modal } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { useNavigate, useParams } from 'react-router-dom'
import { RelationManage } from './RelationManage'

export const AddressMenu = ({
  contacts,
  contactId,
  onSelect,
  onDelete,
  onRefresh,
}) => {
  const { userId } = useParams()
  const [queryText, setQueryText] = useState('')
  const [relationManageVisible, setRelationManageVisible] = useState(false)
  const navigate = useNavigate()

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['nickname'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'ADDRESS_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuId = ''
  const handleContactMenu = (e) => {
    _menuId = e.currentTarget.dataset.id
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'chat') {
      onSelect(_menuId)
      navigate('../talk', { state: { contactId: _menuId } })
    } else if (id === 'delete') {
      onDelete(_menuId)
    }
  }
  return (
    <div className="address-menu col-ctn border-r">
      <div className="address-menu-search v-center">
        <Input value={queryText} onInput={handleQuery}></Input>
        <Button onClick={() => setRelationManageVisible(true)}>
          <i className="i-tabler-user-plus"></i>
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
              className={cls('avatar-info', {
                active: contactId === d.id,
              })}
              key={d.id}
              onClick={() => onSelect(d.id)}
              onContextMenu={handleContactMenu}
              data-id={d.id}
            >
              <img className="chat-avatar" src={d.avatar} />
              <span className="flex-1">{d.alias}</span>
            </div>
          )
        })}
      </Scrollbar>

      <Menu id={CONTACT_MENU}>
        <Item id="chat" onClick={handleContactMenuClick}>
          Chat
        </Item>
        <Item id="delete" onClick={handleContactMenuClick}>
          Delete
        </Item>
      </Menu>

      <Modal
        title="Add contact"
        open={relationManageVisible}
        onCancel={() => setRelationManageVisible(false)}
        onClose={onRefresh}
        footer={null}
      >
        <RelationManage fromId={userId}></RelationManage>
      </Modal>
    </div>
  )
}
