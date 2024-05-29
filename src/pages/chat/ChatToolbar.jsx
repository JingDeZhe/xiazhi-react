import { Button, Popover } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

export const ChatToolbar = () => {
  const navigate = useNavigate()
  const categories = [
    {
      route: 'talk',
      icon: 'i-tabler-message-circle',
      title: 'Talk',
    },
    {
      route: 'address-book',
      icon: 'i-tabler-address-book',
      title: 'Address book',
    },
    {
      route: 'moment',
      icon: 'i-tabler-circles',
      title: 'Moment',
    },
  ]

  const location = useLocation()
  const activeCategory = categories.find(
    (d) => location.pathname.indexOf(d.route) !== -1
  )

  const [activeModule, setActiveModule] = useState(activeCategory?.route || '')
  const handleSelectModule = (mod) => {
    setActiveModule(mod.route)
    navigate(`./${mod.route}`)
  }
  return (
    <div className="chat-toolbar">
      {categories.map((d) => {
        return (
          <div
            className={cls('module-item', { active: d.route === activeModule })}
            title={d.title}
            key={d.route}
            onClick={() => handleSelectModule(d)}
          >
            <i className={d.icon}></i>
          </div>
        )
      })}
      <Popover
        placement="rightBottom"
        trigger="click"
        content={() => {
          return (
            <div className="w-[100px]">
              <Button type="text" block>
                Exit
              </Button>
            </div>
          )
        }}
      >
        <div className="module-item mt-auto">
          <i className="i-tabler-baseline-density-medium"></i>
        </div>
      </Popover>
    </div>
  )
}
