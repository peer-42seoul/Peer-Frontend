// https://hits.seeyoufarm.com/

const HitsCounter = ({ targetUrl }: { targetUrl: string }) => (
  <img
    style={{ height: '20px', width: 'auto', objectFit: 'contain' }}
    alt="hits counter"
    src={`https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${targetUrl}&count_bg=%23877CFE&title_bg=%2322223A&icon=&icon_color=%23F6F6F6&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=false`}
  />
)

export default HitsCounter
