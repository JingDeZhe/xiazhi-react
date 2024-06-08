import { useParams } from 'react-router-dom'
import { MomentDisplay } from './MomentDisplay'
import { server } from './db/server'

export const Moment = () => {
  const { userId } = useParams()
  const [moments, setMoments] = useState([])

  useEffect(() => {
    server.getMoments(userId).then((d) => {
      setMoments(d)
    })
  }, [])

  return (
    <div className="moment col-ctn">
      <div className="moment-header"></div>
      <Scrollbar
        options={{
          scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
        }}
        className="ctn-body"
      >
        <div className="moment-content">
          {moments.map((d) => (
            <MomentDisplay key={d.id} moment={d}></MomentDisplay>
          ))}
        </div>
      </Scrollbar>
    </div>
  )
}
