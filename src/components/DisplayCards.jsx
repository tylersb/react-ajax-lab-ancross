export default function DisplayCards(props) {

  const villagerList = props.villagers.map((v, index) => {
    return (
      <div key={index}>
        <img src={v.image_uri} alt={v.name['name-USen']} onClick={()=> props.clickie ? props.handleClick(v) : null} style={{height: '200px', width: '200px'}}/>
        <p>{v.name['name-USen']}</p>
      </div>
    )
  })

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {villagerList}
    </div>
  )
}
