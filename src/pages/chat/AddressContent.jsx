import { Button, Descriptions, Input, Popconfirm, Space } from 'antd'
import { EmptyInfo } from './EmptyInfo'
import { server } from './db/server'
import { useNavigate } from 'react-router-dom'
import { EditRelation } from './EditRelation'

export const AddressContent = ({ contactId, onDelete, onRefresh }) => {
  const navigate = useNavigate()
  const [contact, setContact] = useState()
  const [editRelationVisible, setEditRelationVisible] = useState(false)

  useEffect(() => {
    server.getContact(contactId).then(setContact)
  }, [contactId])

  const handleDeleleContact = () => {
    onDelete(contact.id)
  }
  const handleEditContact = () => {
    setEditRelationVisible(true)
  }
  const handleChat = () => {
    navigate('../talk', { state: { contactId: contactId } })
  }
  const handleEditRelationClosed = () => {
    setEditRelationVisible(false)
    server.getContact(contactId).then(setContact)
    onRefresh()
  }

  return (
    <div className="address-content">
      {contact ? (
        <>
          <div className="flex gap-3">
            <img src={contact.avatar} className="chat-avatar xl" />
            <Descriptions title={contact.alias} column={1}>
              <Descriptions.Item label="Nickname">
                {contact.nickname}
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                {contact.username}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="p-2">
            <p className="font-bold">Character</p>
            <div className="text-sm">{contact.character || '无'}</div>
          </div>
          <Space className="justify-end mt-5">
            <Popconfirm
              icon={null}
              description="Sure to delete the contact?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleleContact}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button onClick={handleEditContact}>Edit</Button>
            <Button onClick={handleChat}>Chat</Button>
          </Space>

          {editRelationVisible && (
            <EditRelation
              contactId={contactId}
              onClose={handleEditRelationClosed}
            ></EditRelation>
          )}
        </>
      ) : (
        <EmptyInfo>
          <i className="i-tabler-message-circle-bolt"></i>
        </EmptyInfo>
      )}
    </div>
  )
}
