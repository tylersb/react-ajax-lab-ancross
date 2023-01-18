export default function DisplayCards(props) {

  const villagerList = props.villagers.map((v, index) => {
    return (
      <li key={index}>
        <img src={v.image_uri} alt={v.name['name-USen']} onClick={()=> props.clickie ? props.handleClick(v) : null} />
        <p>{v.name['name-USen']}</p>
      </li>
    )
  })

  return (
    <div>
      <ul>{villagerList}</ul>
    </div>
  )
}
